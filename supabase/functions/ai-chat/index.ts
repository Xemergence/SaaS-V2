import { corsHeaders } from "@shared/cors.ts";

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
      status: 200,
    });
  }

  try {
    // Parse request body with error handling
    let requestBody;
    try {
      requestBody = await req.json();
    } catch (parseError) {
      console.error("Failed to parse request body:", parseError);
      return new Response(
        JSON.stringify({ error: "Invalid JSON in request body" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        },
      );
    }

    const {
      message,
      conversationHistory = [],
      model = "gpt-3.5-turbo",
    } = requestBody;

    // Validate required fields
    if (!message || typeof message !== "string" || message.trim() === "") {
      return new Response(
        JSON.stringify({ error: "Message is required and cannot be empty" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        },
      );
    }

    // Validate model if provided
    if (model && typeof model !== "string") {
      return new Response(JSON.stringify({ error: "Model must be a string" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Validate environment variables
    const picaSecret = Deno.env.get("PICA_SECRET_KEY");
    const picaConnectionKey = Deno.env.get("PICA_OPENAI_CONNECTION_KEY");

    console.log("=== AI CHAT FUNCTION STARTED ===");
    console.log("Request method:", req.method);
    console.log("Message content:", message);
    console.log("Conversation history length:", conversationHistory.length);

    console.log("Environment variable validation:", {
      hasSecret: !!picaSecret,
      hasConnectionKey: !!picaConnectionKey,
      secretPreview: picaSecret
        ? `${picaSecret.substring(0, 8)}...`
        : "missing",
      connectionKeyPreview: picaConnectionKey
        ? `${picaConnectionKey.substring(0, 8)}...`
        : "missing",
    });

    console.log("Environment variables check:", {
      hasSecret: !!picaSecret,
      hasConnectionKey: !!picaConnectionKey,
      secretLength: picaSecret?.length || 0,
      connectionKeyLength: picaConnectionKey?.length || 0,
    });

    if (!picaSecret || !picaConnectionKey) {
      console.error("Missing required environment variables:", {
        hasSecret: !!picaSecret,
        hasConnectionKey: !!picaConnectionKey,
        availableEnvVars: Object.keys(Deno.env.toObject()).filter((key) =>
          key.includes("PICA"),
        ),
      });
      return new Response(
        JSON.stringify({
          error: "Server configuration error",
          details: "Missing required API keys",
          debug: {
            hasSecret: !!picaSecret,
            hasConnectionKey: !!picaConnectionKey,
            availableEnvVars: Object.keys(Deno.env.toObject()).filter((key) =>
              key.includes("PICA"),
            ),
          },
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        },
      );
    }

    // Validate conversation history format
    if (!Array.isArray(conversationHistory)) {
      return new Response(
        JSON.stringify({ error: "conversationHistory must be an array" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        },
      );
    }

    // Prepare messages for ChatGPT API with stricter limits
    const messages = [
      {
        role: "system",
        content: "You are a helpful AI assistant. Provide concise responses under 50 words.",
      },
      ...conversationHistory.slice(-3), // Reduced from 6 to 3 messages for context
      {
        role: "user",
        content: message.trim().slice(0, 500), // Limit input length to 500 characters
      },
    ];

    // Validate messages structure
    const isValidMessages = messages.every(
      (msg) =>
        msg.role &&
        typeof msg.role === "string" &&
        ["system", "user", "assistant"].includes(msg.role) &&
        msg.content &&
        typeof msg.content === "string",
    );

    if (!isValidMessages) {
      console.error("Invalid messages structure:", messages);
      return new Response(JSON.stringify({ error: "Invalid message format" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Use the model specified by the user, or fallback to gpt-3.5-turbo
    // Validate model to ensure it's one we support
    const validModels = ["gpt-3.5-turbo", "gpt-4o"];
    const selectedModel = validModels.includes(model) ? model : "gpt-3.5-turbo";

    const requestPayload = {
      model: selectedModel,
      messages: messages,
      max_completion_tokens: 50, // Reduced from 100 to 50
      temperature: 0.7,
      n: 1,
    };

    const requestHeaders = {
      "Content-Type": "application/json",
      "x-pica-secret": picaSecret,
      "x-pica-connection-key": picaConnectionKey,
      "x-pica-action-id": "conn_mod_def::GDzgi1QfvM4::4OjsWvZhRxmAVuLAuWgfVA",
    };

    console.log("Making request to OpenAI API via Pica passthrough");
    console.log("Request payload:", {
      model: requestPayload.model,
      messagesCount: requestPayload.messages.length,
      maxTokens: requestPayload.max_completion_tokens,
      requestedModel: model,
      selectedModel: selectedModel,
    });

    // Helper function for exponential backoff retry
    const makeRequestWithRetry = async (maxRetries = 3) => {
      for (let attempt = 0; attempt <= maxRetries; attempt++) {
        console.log(`Making request attempt ${attempt + 1}/${maxRetries + 1}`);

        const response = await fetch(
          "https://api.picaos.com/v1/passthrough/chat/completions",
          {
            method: "POST",
            headers: requestHeaders,
            body: JSON.stringify(requestPayload),
          },
        );

        // If successful or not a rate limit error, return the response
        if (response.ok || response.status !== 429) {
          return response;
        }

        // If this is the last attempt, return the response (will be handled as error)
        if (attempt === maxRetries) {
          console.log(`Max retries (${maxRetries}) reached for 429 error`);
          return response;
        }

        // Calculate exponential backoff delay with jitter
        const baseDelay = Math.pow(2, attempt) * 1000; // 1s, 2s, 4s
        const jitter = Math.random() * 1000; // Add up to 1s random jitter
        const delay = baseDelay + jitter;

        console.log(
          `Rate limited (429), retrying in ${Math.round(delay)}ms (attempt ${attempt + 1}/${maxRetries + 1})`,
        );

        // Wait before retrying
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    };

    // Call ChatGPT API through Pica passthrough with retry logic
    const response = await makeRequestWithRetry(3);

    console.log("OpenAI API response status:", response.status);
    console.log(
      "OpenAI API response headers:",
      Object.fromEntries(response.headers.entries()),
    );

    // Handle non-OK responses from OpenAI API
    if (!response.ok) {
      let errorData;
      const contentType = response.headers.get("content-type");
      let responseText = "";

      try {
        responseText = await response.text();
        if (contentType && contentType.includes("application/json")) {
          errorData = JSON.parse(responseText);
        } else {
          errorData = responseText;
        }
      } catch (parseError) {
        console.error("Failed to parse error response:", parseError);
        errorData = responseText || "Unable to parse error response";
      }

      console.error("OpenAI API error - Full details:", {
        status: response.status,
        statusText: response.statusText,
        contentType,
        responseHeaders: Object.fromEntries(response.headers.entries()),
        rawResponse: responseText,
        parsedData: errorData,
        requestPayload: requestPayload,
        requestHeaders: {
          "Content-Type": requestHeaders["Content-Type"],
          "x-pica-action-id": requestHeaders["x-pica-action-id"],
          hasSecret: !!requestHeaders["x-pica-secret"],
          hasConnectionKey: !!requestHeaders["x-pica-connection-key"],
        },
      });

      // Handle specific error types with user-friendly messages
      let userFriendlyError = "AI service error";
      let userFriendlyDetails = `OpenAI API returned ${response.status}: ${response.statusText}`;

      if (response.status === 429) {
        if (errorData?.error?.code === "insufficient_quota") {
          userFriendlyError = "OpenAI quota exceeded";
          userFriendlyDetails =
            "The OpenAI API quota has been exceeded. Please check your OpenAI billing at platform.openai.com/account/billing and add funds or upgrade your plan.";
        } else {
          userFriendlyError = "Rate limit exceeded";
          userFriendlyDetails =
            "Too many requests to OpenAI API. Please wait a moment and try again.";
        }
      } else if (response.status === 401) {
        userFriendlyError = "Authentication error";
        userFriendlyDetails =
          "Invalid API credentials. Please check your OpenAI API key configuration.";
      } else if (response.status >= 500) {
        userFriendlyError = "OpenAI service unavailable";
        userFriendlyDetails =
          "OpenAI service is temporarily unavailable. Please try again later.";
      }

      // Return appropriate error status
      const statusCode =
        response.status >= 400 && response.status < 500 ? 400 : 502;

      return new Response(
        JSON.stringify({
          error: userFriendlyError,
          details: userFriendlyDetails,
          apiError: errorData,
          debug: {
            status: response.status,
            statusText: response.statusText,
            contentType,
            rawResponse: responseText,
          },
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: statusCode,
        },
      );
    }

    // Parse successful response
    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      console.error("Failed to parse successful response:", parseError);
      return new Response(
        JSON.stringify({
          error: "Failed to parse AI response",
          details: "Invalid JSON response from AI service",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 502,
        },
      );
    }

    console.log("Successful response from OpenAI API");
    console.log("Response data structure:", {
      hasChoices: !!data.choices,
      choicesLength: data.choices?.length,
      hasUsage: !!data.usage,
      model: data.model,
      id: data.id,
    });

    // Validate response structure
    if (
      !data.choices ||
      !Array.isArray(data.choices) ||
      data.choices.length === 0
    ) {
      console.error("Invalid response structure:", data);
      return new Response(
        JSON.stringify({
          error: "Invalid AI response",
          details: "No choices returned from AI service",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 502,
        },
      );
    }

    // Extract the assistant's response
    const assistantMessage = data.choices[0]?.message?.content;

    if (!assistantMessage || typeof assistantMessage !== "string") {
      console.error("No valid message content in response:", data.choices[0]);
      return new Response(
        JSON.stringify({
          error: "Empty AI response",
          details: "AI service returned empty or invalid content",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 502,
        },
      );
    }

    // Return successful response with new API structure
    return new Response(
      JSON.stringify({
        message: assistantMessage.trim(),
        usage: data.usage || null,
        model: data.model || selectedModel,
        id: data.id || null,
        finish_reason: data.choices[0]?.finish_reason || null,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    console.error("Unexpected error in ai-chat function:", {
      name: error.name,
      message: error.message,
      stack: error.stack,
    });

    return new Response(
      JSON.stringify({
        error: "Internal server error",
        details: error.message || "An unexpected error occurred",
        type: error.name || "UnknownError",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      },
    );
  }
});
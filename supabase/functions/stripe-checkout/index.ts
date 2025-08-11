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
    const { priceId, quantity = 1, successUrl, cancelUrl } = await req.json();

    // Validate required parameters
    if (!priceId || !successUrl || !cancelUrl) {
      return new Response(
        JSON.stringify({
          error: "Missing required parameters: priceId, successUrl, cancelUrl",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Create Stripe checkout session
    const stripeResponse = await fetch(
      "https://api.stripe.com/v1/checkout/sessions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Deno.env.get("STRIPE_SECRET_KEY")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          mode: "payment",
          "line_items[0][price]": priceId,
          "line_items[0][quantity]": quantity.toString(),
          success_url: successUrl,
          cancel_url: cancelUrl,
          "payment_method_types[0]": "card",
        }),
      },
    );

    if (!stripeResponse.ok) {
      const errorData = await stripeResponse.text();
      console.error("Stripe API error:", errorData);
      return new Response(
        JSON.stringify({ error: "Failed to create checkout session" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const session = await stripeResponse.json();

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

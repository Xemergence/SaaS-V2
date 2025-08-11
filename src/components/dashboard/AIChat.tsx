import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/UIComponents";
import { Button } from "@/UIComponents";
import { Input } from "@/UIComponents";
import { useState } from "react";
import { Bot, Send, User, Sparkles } from "lucide-react";

export default function AIChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    Array<{ text: string; isUser: boolean }>
  >([
    {
      text: "Hello! I'm your AI assistant. How can I help you analyze your business data today?",
      isUser: false,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Limit input length
    const trimmedInput = input.trim().slice(0, 500);
    
    // Add user message
    setMessages([...messages, { text: trimmedInput, isUser: true }]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your current data, I'm seeing a 15% increase in website traffic compared to last month.",
        "Your AI usage costs have increased by 8% this month. Would you like me to suggest optimization strategies?",
        "I've analyzed your sensor data and noticed some anomalies in Server Room B. You might want to check the temperature sensors.",
        "Your revenue is trending upward by approximately 12% quarter-over-quarter. This is above industry average.",
        "I've detected unusual network traffic patterns at 2:00 AM last night. Would you like me to generate a detailed report?",
      ];

      setMessages((prev) => [
        ...prev,
        {
          text: responses[Math.floor(Math.random() * responses.length)],
          isUser: false,
        },
      ]);
      setIsLoading(false);
    }, 1500);

    setInput("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">
          AI Chat Assistant
        </h2>
        <p className="text-white">
          Ask questions about your data and get AI-powered insights.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Chat Input and Output Section */}
        <div className="md:col-span-2 space-y-6">
          {/* Chat Output */}
          <Card className="bg-[#1e1e2d] border-[#2a2a3a] h-[500px] flex flex-col">
            <CardHeader>
              <CardTitle className="text-white">Conversation</CardTitle>
              <CardDescription className="text-gray-300">
                Chat with your AI assistant about your business data
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow overflow-y-auto space-y-4 pb-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex items-start gap-3 max-w-[80%] ${message.isUser ? "flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`rounded-full p-2 ${message.isUser ? "bg-[#7b68ee]" : "bg-[#2a2a3a]"}`}
                    >
                      {message.isUser ? (
                        <User className="h-4 w-4 text-white" />
                      ) : (
                        <Bot className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div
                      className={`rounded-lg p-3 ${message.isUser ? "bg-[#7b68ee]" : "bg-[#2a2a3a]"}`}
                    >
                      <p className="text-white">{message.text}</p>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-3 max-w-[80%]">
                    <div className="rounded-full p-2 bg-[#2a2a3a]">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="rounded-lg p-3 bg-[#2a2a3a]">
                      <div className="flex space-x-2">
                        <div
                          className="h-2 w-2 rounded-full bg-white animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="h-2 w-2 rounded-full bg-white animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></div>
                        <div
                          className="h-2 w-2 rounded-full bg-white animate-bounce"
                          style={{ animationDelay: "600ms" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Chat Input */}
          <Card className="bg-[#1e1e2d] border-[#2a2a3a]">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Ask a question (max 500 characters)..."
                  value={input}
                  onChange={(e) => setInput(e.target.value.slice(0, 500))}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  className="bg-[#2a2a3a] border-[#3a3a4a] text-white"
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-[#7b68ee] hover:bg-[#6a5acd] text-white"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#2a2a3a] bg-[#2a2a3a] text-white hover:bg-[#353545]"
                  onClick={() => setInput("Analyze my website traffic trends")}
                >
                  Analyze traffic trends
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#2a2a3a] bg-[#2a2a3a] text-white hover:bg-[#353545]"
                  onClick={() => setInput("Optimize my AI usage costs")}
                >
                  Optimize AI costs
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#2a2a3a] bg-[#2a2a3a] text-white hover:bg-[#353545]"
                  onClick={() => setInput("Forecast next month's revenue")}
                >
                  Forecast revenue
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Isometric Game Visualization */}
        <Card className="bg-[#1e1e2d] border-[#2a2a3a] h-[600px] relative overflow-hidden">
          <CardHeader>
            <CardTitle className="text-white">AI Agents at Work</CardTitle>
            <CardDescription className="text-gray-300">
              Visual representation of AI agents processing your data
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 h-full">
            <div className="absolute inset-0 bg-[#1a1a24]">
              {/* Grid lines */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `linear-gradient(to right, #2a2a3a 1px, transparent 1px), linear-gradient(to bottom, #2a2a3a 1px, transparent 1px)`,
                  backgroundSize: "20px 20px",
                }}
              ></div>

              {/* Isometric platform */}
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#2a2a3a]"
                style={{
                  transform:
                    "translate(-50%, -50%) rotateX(60deg) rotateZ(45deg)",
                }}
              ></div>

              {/* AI Agent 1 */}
              <div
                className="absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-bounce"
                style={{ animationDuration: "3s" }}
              >
                <div className="relative">
                  <div className="absolute -inset-2 rounded-full bg-[#7b68ee] opacity-20 blur-md"></div>
                  <div className="relative bg-[#7b68ee] text-white p-2 rounded-full">
                    <Sparkles className="h-6 w-6" />
                  </div>
                </div>
              </div>

              {/* AI Agent 2 */}
              <div
                className="absolute left-3/4 top-1/3 -translate-x-1/2 -translate-y-1/2 animate-pulse"
                style={{ animationDuration: "2s" }}
              >
                <div className="relative">
                  <div className="absolute -inset-2 rounded-full bg-[#ff7676] opacity-20 blur-md"></div>
                  <div className="relative bg-[#ff7676] text-white p-2 rounded-full">
                    <Bot className="h-6 w-6" />
                  </div>
                </div>
              </div>

              {/* AI Agent 3 */}
              <div
                className="absolute left-1/2 top-2/3 -translate-x-1/2 -translate-y-1/2 animate-bounce"
                style={{ animationDuration: "4s" }}
              >
                <div className="relative">
                  <div className="absolute -inset-2 rounded-full bg-[#76e4ff] opacity-20 blur-md"></div>
                  <div className="relative bg-[#76e4ff] text-white p-2 rounded-full">
                    <Sparkles className="h-6 w-6" />
                  </div>
                </div>
              </div>

              {/* Data streams */}
              <div className="absolute inset-0 opacity-30">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute bg-[#7b68ee] w-1 h-1 rounded-full animate-ping"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDuration: `${1 + Math.random() * 3}s`,
                      animationDelay: `${Math.random() * 2}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
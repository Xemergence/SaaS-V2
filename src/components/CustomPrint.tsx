import { Button } from "@/UIComponents";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/UIComponents";
import { Input } from "@/UIComponents";
import { Label } from "@/UIComponents";
import { Textarea } from "@/UIComponents";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Upload,
  Package,
  Coffee,
  Palette,
  Wrench,
} from "lucide-react";
import { useState } from "react";

interface ItemOption {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  basePrice: number;
}

const itemOptions: ItemOption[] = [
  {
    id: "keychain",
    name: "Keychain",
    description:
      "Durable 3D printed keychain with your custom design. Perfect for branding, gifts, or personal use. Includes metal ring attachment.",
    icon: Package,
    basePrice: 15.99,
  },
  {
    id: "coaster",
    name: "Coaster",
    description:
      "Custom coaster set (4 pieces) with your logo or design. Heat-resistant material perfect for protecting surfaces while showcasing your brand.",
    icon: Coffee,
    basePrice: 24.99,
  },
  {
    id: "art",
    name: "Art Piece",
    description:
      "Custom 3D printed art piece or decorative item. Transform your 2D design into a stunning 3D sculpture or wall art. Various sizes available.",
    icon: Palette,
    basePrice: 49.99,
  },
  {
    id: "other",
    name: "Other",
    description:
      "Have a unique idea? Upload your design and describe what you'd like created. Our team will review and provide a custom quote for your project.",
    icon: Wrench,
    basePrice: 0,
  },
];

export default function CustomPrint() {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [customDescription, setCustomDescription] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = (file: File) => {
    if (
      file &&
      (file.type === "image/svg+xml" || file.type.startsWith("image/"))
    ) {
      setUploadedFile(file);
    } else {
      alert("Please upload an SVG file or image (PNG, JPG, etc.)");
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!selectedOption) {
      alert("Please select an item option");
      return;
    }
    if (!uploadedFile) {
      alert("Please upload your design file");
      return;
    }
    if (selectedOption === "other" && !customDescription.trim()) {
      alert("Please describe your custom project");
      return;
    }

    // Here you would typically send the data to your backend
    console.log("Order details:", {
      option: selectedOption,
      file: uploadedFile,
      description: customDescription,
    });

    alert(
      "Your custom order has been submitted! We'll contact you within 24 hours with a quote.",
    );
  };

  const selectedItem = itemOptions.find((item) => item.id === selectedOption);

  const getPreviewImage = (optionId: string) => {
    switch (optionId) {
      case "keychain":
        return "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80";
      case "coaster":
        return "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80";
      case "art":
        return "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80";
      case "other":
        return "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=800&q=80";
      default:
        return "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80";
    }
  };

  return (
    <div className="min-h-screen bg-[#121218] text-white">
      {/* Header */}
      <header className="bg-[#1e1e2d] border-b border-[#2a2a3a] sticky top-0 z-50">
        <div className="container mx-auto py-4 px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/products"
              className="flex items-center gap-2 text-white hover:text-[#7b68ee] transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Products</span>
            </Link>
            <div className="h-6 w-px bg-[#2a2a3a]"></div>
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7b68ee] to-[#9b59b6] flex items-center justify-center">
                <span className="text-white font-bold text-xs">xE</span>
              </div>
              <span className="text-xl font-bold text-white">
                Custom 3D Print
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-white">
              Create Your Custom 3D Print
            </h1>
            <p className="text-gray-300 text-lg">
              Upload your design and choose what you'd like us to create for you
            </p>
          </div>

          {/* Selected Item Summary - Moved to Top */}
          {selectedItem && (
            <div className="mb-8 p-6 bg-[#1e1e2d] rounded-lg border border-[#2a2a3a] max-w-4xl mx-auto">
              <h3 className="text-xl font-semibold text-white mb-3 text-center">
                Selected: {selectedItem.name}
              </h3>
              <p className="text-gray-300 text-center mb-4">
                {selectedItem.description}
              </p>
              {selectedItem.basePrice > 0 && (
                <p className="text-[#7b68ee] font-bold text-center text-lg">
                  Starting at ${selectedItem.basePrice}
                </p>
              )}
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Item Selection */}
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-white text-center">
                Choose Your Item
              </h2>
              <div className="space-y-4">
                {itemOptions.map((option) => {
                  const IconComponent = option.icon;
                  return (
                    <Card
                      key={option.id}
                      className={`cursor-pointer transition-all border-2 ${
                        selectedOption === option.id
                          ? "border-[#7b68ee] bg-[#2a2a3a]"
                          : "border-[#2a2a3a] bg-[#1e1e2d] hover:border-[#7b68ee] hover:bg-[#2a2a3a]"
                      }`}
                      onClick={() => setSelectedOption(option.id)}
                    >
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-3 text-white">
                          <IconComponent className="h-6 w-6 text-[#7b68ee]" />
                          <span className="flex-1">{option.name}</span>
                          {option.basePrice > 0 && (
                            <span className="text-[#7b68ee] font-bold">
                              ${option.basePrice}
                            </span>
                          )}
                          {option.id === "other" && (
                            <span className="text-[#7b68ee] font-bold">
                              Quote
                            </span>
                          )}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-gray-300 text-sm leading-relaxed">
                          {option.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Right Column - File Upload & Details */}
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-white text-center">
                Upload Your Design
              </h2>

              {/* Preview Image Section */}
              {selectedOption && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3 text-center">
                    Preview: {selectedItem?.name}
                  </h3>
                  <div className="bg-[#1e1e2d] rounded-lg p-4 border border-[#2a2a3a]">
                    <img
                      src={getPreviewImage(selectedOption)}
                      alt={`${selectedItem?.name} preview`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <p className="text-gray-300 text-sm mt-2 text-center">
                      Example of {selectedItem?.name.toLowerCase()}
                    </p>
                  </div>
                </div>
              )}

              {/* File Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                  dragActive
                    ? "border-[#7b68ee] bg-[#2a2a3a]"
                    : "border-[#2a2a3a] hover:border-[#7b68ee]"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="h-12 w-12 text-[#7b68ee] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  Drop your file here or click to browse
                </h3>
                <p className="text-gray-300 mb-4">
                  SVG files preferred for best results. PNG, JPG also accepted.
                </p>
                <Input
                  type="file"
                  accept=".svg,.png,.jpg,.jpeg"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file);
                  }}
                  className="hidden"
                  id="file-upload"
                />
                <Label
                  htmlFor="file-upload"
                  className="inline-block bg-[#7b68ee] hover:bg-[#6a5acd] text-white px-6 py-2 rounded-lg cursor-pointer transition-colors"
                >
                  Choose File
                </Label>
                {uploadedFile && (
                  <div className="mt-4 p-3 bg-[#2a2a3a] rounded-lg">
                    <p className="text-white font-medium">
                      ✓ {uploadedFile.name}
                    </p>
                    <p className="text-gray-300 text-sm">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                )}
              </div>

              {/* Custom Description for "Other" option */}
              {selectedOption === "other" && (
                <div className="mt-6">
                  <Label
                    htmlFor="description"
                    className="text-white font-medium mb-2 block text-center"
                  >
                    Describe Your Project
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Please describe what you'd like us to create, including size preferences, materials, and any special requirements..."
                    value={customDescription}
                    onChange={(e) => setCustomDescription(e.target.value)}
                    className="bg-[#1e1e2d] border-[#2a2a3a] text-white placeholder-gray-400 min-h-[120px]"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Centered Submit Button */}
          <div className="flex justify-center mt-12">
            <Button
              onClick={handleSubmit}
              disabled={!selectedOption || !uploadedFile}
              className="px-12 py-4 h-14 bg-[#7b68ee] hover:bg-[#6a5acd] text-white disabled:opacity-50 disabled:cursor-not-allowed font-medium text-lg rounded-lg"
            >
              Submit Custom Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

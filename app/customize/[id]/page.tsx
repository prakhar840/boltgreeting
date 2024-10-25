"use client";

import { useState } from "react";
import { Upload, Download, Share2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import GreetingPreview from "@/components/GreetingPreview";
import { removeImageBackground, downloadImage, shareImage } from "@/lib/imageProcessing";

const templates = [
  {
    id: 1,
    name: "Diwali Lights",
    image: "https://images.unsplash.com/photo-1574781035463-e669252c0c97?w=800&auto=format&fit=crop",
    category: "diwali"
  },
  {
    id: 2,
    name: "Diwali Lanterns",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop",
    category: "diwali"
  },
  {
    id: 3,
    name: "Traditional Diwali",
    image: "https://images.unsplash.com/photo-1605021154928-08d2b8c44f37?w=800&auto=format&fit=crop",
    category: "diwali"
  }
];

// Generate static paths for all templates
export function generateStaticParams() {
  return templates.map((template) => ({
    id: template.id.toString(),
  }));
}

export default function CustomizePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  const [userImage, setUserImage] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const template = templates.find(t => t.id === parseInt(params.id));

  if (!template) {
    return <div>Template not found</div>;
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsProcessing(true);
      try {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64Image = reader.result as string;
          const processedImage = await removeImageBackground(base64Image);
          setUserImage(processedImage);
          toast({
            title: "Image processed successfully!",
            description: "Your image has been processed and background removed.",
          });
        };
        reader.readAsDataURL(file);
      } catch (error) {
        toast({
          title: "Error processing image",
          description: "Failed to process the image. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleDownload = async () => {
    try {
      await downloadImage('greeting-preview', 'festive-greeting.png');
      toast({
        title: "Success!",
        description: "Your greeting has been downloaded.",
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: "Failed to download the greeting. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    try {
      await shareImage('greeting-preview');
      toast({
        title: "Success!",
        description: "Your greeting has been shared.",
      });
    } catch (error) {
      toast({
        title: "Share failed",
        description: "Failed to share the greeting. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => router.push('/')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Templates
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Preview Section */}
          <div className="order-2 md:order-1">
            <GreetingPreview
              template={template}
              userImage={userImage}
              message={message}
              onMessageChange={setMessage}
            />
          </div>

          {/* Controls Section */}
          <div className="order-1 md:order-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-6 gradient-text">
                Customize Your Greeting
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">1. Upload Your Photo</h3>
                  <Button
                    className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
                    onClick={() => document.getElementById("imageUpload")?.click()}
                    disabled={isProcessing}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    {isProcessing ? "Processing..." : "Choose Photo"}
                  </Button>
                  <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">2. Share Your Creation</h3>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                      onClick={handleDownload}
                      disabled={!userImage}
                    >
                      <Download className="mr-2 h-4 w-4" /> Download
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-orange-200 hover:bg-orange-50"
                      onClick={handleShare}
                      disabled={!userImage}
                    >
                      <Share2 className="mr-2 h-4 w-4" /> Share
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
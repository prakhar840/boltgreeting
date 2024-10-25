"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";

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

export default function Home() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTemplateSelect = (templateId: number) => {
    router.push(`/customize/${templateId}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Festive Greeting Creator
          </h1>
          <p className="text-gray-600 text-lg">
            Choose a template to start creating your personalized greeting
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search templates (e.g., Diwali, Christmas...)"
            className="pl-10 bg-white/80 backdrop-blur-sm border-orange-200 focus:border-orange-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Templates Grid */}
        <ScrollArea className="h-[600px] rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <Card
                key={template.id}
                className="overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer hover:scale-105"
                onClick={() => handleTemplateSelect(template.id)}
              >
                <div className="aspect-video relative">
                  <img
                    src={template.image}
                    alt={template.name}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-semibold text-white text-lg">
                        {template.name}
                      </h3>
                      <p className="text-white/80 text-sm">
                        Click to customize
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </main>
  );
}
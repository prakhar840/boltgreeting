"use client";

import { useRef } from 'react';
import { Input } from "@/components/ui/input";
import { cn } from '@/lib/utils';

interface GreetingPreviewProps {
  template: any;
  userImage: string | null;
  message: string;
  onMessageChange: (message: string) => void;
}

export default function GreetingPreview({
  template,
  userImage,
  message,
  onMessageChange
}: GreetingPreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null);

  return (
    <div className="mt-8 p-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Preview Your Greeting</h2>
      <div id="greeting-preview" ref={previewRef} className="relative">
        <div className="aspect-video relative rounded-lg overflow-hidden">
          <img
            src={template.image}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          
          {/* Message Overlay */}
          <div className="absolute top-8 left-0 right-0 text-center">
            <h3 className={cn(
              "text-3xl font-bold px-6 py-3",
              "bg-gradient-to-r from-orange-600 to-yellow-500",
              "text-white rounded-lg shadow-lg",
              "mx-auto inline-block"
            )}>
              {message || "Your Greeting Message"}
            </h3>
          </div>

          {/* User Image */}
          {userImage && (
            <div className="absolute bottom-4 right-4 w-32 h-32">
              <img
                src={userImage}
                alt="User"
                className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
              />
            </div>
          )}
        </div>
      </div>
      
      <Input
        type="text"
        placeholder="Add your greeting message here..."
        className="mt-4 bg-white/90"
        value={message}
        onChange={(e) => onMessageChange(e.target.value)}
      />
    </div>
  );
}
import { toPng } from 'html-to-image';

export const removeImageBackground = async (imageUrl: string): Promise<string> => {
  // Simulated background removal - in a real app, you'd use an API like Remove.bg
  // For now, we'll add a white background with reduced opacity
  const canvas = document.createElement('canvas');
  const img = new Image();
  
  return new Promise((resolve) => {
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return resolve(imageUrl);
      
      ctx.globalAlpha = 0.8;
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    img.src = imageUrl;
  });
};

export const downloadImage = async (elementId: string, fileName: string) => {
  try {
    const dataUrl = await toPng(document.getElementById(elementId)!);
    const link = document.createElement('a');
    link.download = fileName;
    link.href = dataUrl;
    link.click();
  } catch (err) {
    console.error('Failed to download image:', err);
  }
};

export const shareImage = async (elementId: string) => {
  try {
    const dataUrl = await toPng(document.getElementById(elementId)!);
    const blob = await (await fetch(dataUrl)).blob();
    const file = new File([blob], 'greeting.png', { type: blob.type });
    
    if (navigator.share) {
      await navigator.share({
        files: [file],
        title: 'My Festive Greeting',
        text: 'Check out my custom greeting!'
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
      URL.revokeObjectURL(url);
    }
  } catch (err) {
    console.error('Failed to share image:', err);
  }
};
export const templates = [
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
] as const;

export type Template = typeof templates[number];
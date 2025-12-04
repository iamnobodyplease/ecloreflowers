export interface Product {
  id: string
  title: string
  price: string
  description: string
  image: string
  category: "roses" | "peonies" | "hydrangeas" | "mixed"
  featured?: boolean // For best sellers section
}

export const products: Product[] = [
  {
    id: "1",
    title: "Signature Bouquet",
    price: "$249.99",
    description: "Florist's special! This large hand-crafted bouquet is made with professionally curated in-season blooms, wrapped in premium heavyweight paper and finished with a ribbon of your choice.",
    image: "/1.png",
    category: "mixed",
    featured: true,
  },
  {
    id: "2",
    title: "Large Rose Round Box",
    price: "$499.99",
    description: "A stunning arrangement of 150 premium roses arranged in a beautiful velvet lined round box with 24kt Eclore branding. Perfect for grand gestures and special celebrations.",
    image: "/2.png",
    category: "roses",
    featured: true,
  },
  {
    id: "3",
    title: "Classic 100 Roses",
    price: "$399.99",
    description: "A hundred flawless long-stem Ecuadorian roses chosen for their size, shape, and texture wrapped in heavy paper with your choice of ribbon and color.",
    image: "/3.png",
    category: "roses",
    featured: true,
  },
  {
    id: "4",
    title: "Mixed Color Hydrangeas",
    price: "$199.99",
    description: "A lush, full arrangement of mixed-color hydrangeas, showcasing layered hues and cloud-like blooms for a soft, elegant statement. ",
    image: "/4.png",
    category: "hydrangeas",
    featured: true,
  },
]

// Helper functions
export function getProductsByCategory(category: string): Product[] {
  if (category === "shop-all") return products
  return products.filter(p => p.category === category)
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.featured)
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}



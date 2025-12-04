"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { ShoppingCart } from "lucide-react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { ProductModal } from "@/components/product-modal"
import { getProductsByCategory, type Product } from "@/data/products"

const categoryImages: Record<string, string> = {
  roses: "/roses.png",
  peonies: "/peonies.png",
  hydrangeas: "/hydra.png",
  "shop-all": "/roses.png", // Default image
}

const categoryTitles: Record<string, string> = {
  roses: "Roses",
  peonies: "Peonies",
  hydrangeas: "Hydrangeas",
  "shop-all": "Shop All",
}

export default function GardenCategoryPage() {
  const params = useParams()
  const category = (params?.category as string) || "roses"
  const categoryImage = categoryImages[category] || "/roses.png"
  const categoryTitle = categoryTitles[category] || "Roses"
  
  const categoryProducts = getProductsByCategory(category)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <ProductModal
        product={selectedProduct}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
      
      {/* Header Image with Text */}
      <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        <Image
          src={categoryImage}
          alt={categoryTitle}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-serif text-white uppercase"
          >
            {categoryTitle}
          </motion.h1>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryProducts.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative z-10 cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
                <div className="glass rounded-3xl overflow-hidden group hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#f9abb9]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
                  <div className="relative w-full h-64 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1 relative z-10">
                    <h3 className="text-xl font-semibold mb-2 text-white">{product.title}</h3>
                    <p className="text-xl font-light text-white/80 mb-4">{product.price}</p>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        handleProductClick(product)
                      }}
                      className="mt-auto px-6 py-3 bg-[#f9abb9] hover:bg-[#f9abb9]/90 text-black rounded-full font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Buy
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}


"use client"

import { useState, useEffect, useCallback } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { motion } from "framer-motion"
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ProductModal } from "@/components/product-modal"
import useEmblaCarousel from "embla-carousel-react"
import { getFeaturedProducts, type Product } from "@/data/products"

const products = getFeaturedProducts()

export function Services() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  })
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
  }, [emblaApi, onSelect])

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  return (
    <section id="services" className="pt-12 pb-16 md:pb-24 relative">
      <ProductModal
        product={selectedProduct}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
      <div className="container mx-auto px-6">
        <div className="mb-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-serif mb-6"
          >
            CHERISHED BEST SELLERS
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "100px" }}
            viewport={{ once: true }}
            className="h-1 bg-[#f9abb9] rounded-full mx-auto"
            style={{ marginLeft: "auto", marginRight: "auto" }}
          />
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden overflow-hidden pt-8" ref={emblaRef}>
          <div className="flex gap-6">
            {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative z-10 cursor-pointer flex-[0_0_85%] min-w-0 -mt-8"
              onClick={() => handleProductClick(product)}
            >
              <div className="glass rounded-3xl overflow-hidden group hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#f9abb9]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
                  <div className="relative w-full h-96 overflow-hidden rounded-t-3xl">
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
          
          {/* Navigation Arrows */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={scrollPrev}
              disabled={prevBtnDisabled}
              className={`p-2 rounded-full glass border border-white/20 transition-all ${
                prevBtnDisabled 
                  ? "opacity-40 cursor-not-allowed" 
                  : "hover:bg-[#f9abb9]/20 cursor-pointer"
              }`}
              aria-label="Previous product"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={scrollNext}
              disabled={nextBtnDisabled}
              className={`p-2 rounded-full glass border border-white/20 transition-all ${
                nextBtnDisabled 
                  ? "opacity-40 cursor-not-allowed" 
                  : "hover:bg-[#f9abb9]/20 cursor-pointer"
              }`}
              aria-label="Next product"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 relative pt-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative z-10 cursor-pointer -mt-8"
              onClick={() => handleProductClick(product)}
            >
              <div className="glass rounded-3xl overflow-hidden group hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                <div className="absolute inset-0 bg-gradient-to-br from-[#f9abb9]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
                <div className="relative w-full h-96 overflow-hidden rounded-t-3xl">
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

        {/* Explore Our Gardens Section */}
        <div className="mt-32">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-serif mb-6"
            >
              EXPLORE OUR GARDENS
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: "100px" }}
              viewport={{ once: true }}
              className="h-1 bg-[#f9abb9] rounded-full mx-auto"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Roses", image: "/roses.png", slug: "roses" },
              { name: "Peonies", image: "/peonies.png", slug: "peonies" },
              { name: "Hydrangeas", image: "/hydra.png", slug: "hydrangeas" },
              { name: "Shop All", image: "/placeholder.jpg", slug: "shop-all" },
            ].map((category, index) => (
              <Link key={index} href={`/garden/${category.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative h-80 rounded-2xl overflow-hidden group cursor-pointer"
                >
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-2xl font-light text-white uppercase">{category.name}</h3>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

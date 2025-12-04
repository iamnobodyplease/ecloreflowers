"use client"

import { GlassCard } from "@/components/ui/glass-card"
import { motion } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

const projects = [
  {
    title: "Proposals",
    category: "Romantic Arrangements",
    image: "/proposal.webp",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "Weddings",
    category: "Bridal Collections",
    image: "/weding.jpeg",
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "Custom Bouquets",
    category: "Personalized Designs",
    image: "/car.jpg",
    color: "from-orange-500/20 to-red-500/20",
  },
]

export function Work() {
  return (
    <section id="work" className="pt-12 pb-16 md:pb-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-serif mb-6"
          >
            SPECIALTIES
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "100px" }}
            viewport={{ once: true }}
            className="h-1 bg-[#f9abb9] rounded-full mx-auto"
            style={{ marginLeft: "auto", marginRight: "auto" }}
          />
        </div>

        <div className="space-y-20">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <GlassCard className="p-0 overflow-hidden group border-[#f9abb9]/20">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className={`p-12 flex flex-col justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#f9abb9]/15 to-transparent opacity-50" />
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-[#f9abb9]/30 to-[#f9abb9]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    />
                    <div className="relative z-10">
                      <span className="text-sm font-medium text-white/50 mb-4 block uppercase tracking-wider">
                        {project.category}
                      </span>
                      <h3 className="text-4xl md:text-5xl font-serif mb-6 group-hover:translate-x-2 transition-transform duration-500">
                        {project.title}
                      </h3>
                      <p className="text-white/70 mb-8 max-w-md">
                        Exquisite floral arrangements crafted with care and attention to detail.
                      </p>
                      <button className="px-6 py-3 bg-[#f9abb9] hover:bg-[#f9abb9]/90 text-black rounded-full font-medium transition-colors">
                        Inquire
                      </button>
                    </div>
                  </div>
                  <div className="relative h-[400px] md:h-auto overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className={cn(
                        "object-cover",
                        project.title === "Custom Bouquets" ? "object-[center_bottom]" : ""
                      )}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
          
          {/* Glyph centered under Custom Bouquets and above footer */}
          <div className="flex justify-center mt-8 -mb-4">
            <Image src="/glyph.png" alt="Glyph" width={200} height={200} className="w-40 h-40 md:w-48 md:h-48 object-contain opacity-30" />
          </div>
        </div>
      </div>
    </section>
  )
}

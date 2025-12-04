"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-end justify-start overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Image
          src="/g63background.png"
          alt="Background"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="w-full px-6 pb-16 md:pb-24 relative z-10 text-left">
        <div className="max-w-xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-tighter mb-3 text-white leading-tight"
          >
            Holiday Elegance
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-base md:text-lg text-white/60 mb-4 leading-relaxed font-semibold"
          >
            Embrace the season of giving with exquisite arrangements that mirror the vibrant journey of the holidays
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-start justify-start gap-4"
          >
          <button className="group relative px-6 py-3 bg-[#f9abb9] text-white rounded-full font-semibold text-base overflow-hidden transition-all hover:scale-105">
            <span className="relative z-10 flex items-center gap-2">
              Shop The Collection <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#f9abb9]/80 to-[#f9abb9] opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-white/40 uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white/40 to-white/0" />
      </motion.div>
    </section>
  )
}

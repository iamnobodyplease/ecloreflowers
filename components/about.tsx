"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function About() {
  return (
    <>
      {/* Studio Banner */}
      <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        <Image
          src="/studio-banner.jpg"
          alt="Eclore Flowers Studio"
          fill
          className="object-cover"
          priority
          onError={(e) => {
            // Fallback if image doesn't exist
            e.currentTarget.style.display = 'none'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        {/* Placeholder if image doesn't exist */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f9abb9]/10 to-black/40 flex items-center justify-center">
          <span className="text-white/40 text-lg">Studio Photo</span>
        </div>
      </section>

      <section id="about" className="pt-12 pb-16 md:pb-24 relative">
        <div className="container mx-auto px-6">
          <div className="mb-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-serif mb-6"
          >
            ABOUT
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "100px" }}
            viewport={{ once: true }}
            className="h-1 bg-[#f9abb9] rounded-full mx-auto"
          />
          </div>

        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Profile Picture */}
            <div className="relative w-48 h-48 md:w-64 md:h-64 flex-shrink-0">
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-[#f9abb9]/20">
                <Image
                  src="/profile.png"
                  alt="CEO"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-4xl font-serif mb-4 text-white"
              >
                Victoria
              </motion.h3>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-white/70 leading-relaxed text-base md:text-lg"
              >
                <p>
                  wi wi wi crashout wi wi wi
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}


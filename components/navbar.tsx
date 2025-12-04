"use client"

import { useState } from "react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const pathname = usePathname()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Flowers", href: "/garden/shop-all" },
    { name: "About", href: "/about" },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled ? "py-4" : "py-6",
      )}
    >
      {/* Mobile Menu Dropdown - Outside navbar container */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 z-[45] md:hidden"
          />
          {/* Menu Dropdown */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 left-6 right-6 glass bg-black/40 backdrop-blur-xl rounded-3xl p-6 z-[60] md:hidden border border-[#f9abb9]/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => {
                const isActive = (link.href === "/" && pathname === "/") || (link.href === "/about" && pathname === "/about")
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "text-lg font-medium transition-colors uppercase text-center py-2",
                      isActive 
                        ? "text-[#f9abb9] drop-shadow-[0_0_8px_rgba(249,171,185,0.6)]" 
                        : "text-white/70 hover:text-white"
                    )}
                  >
                    {link.name}
                  </Link>
                )
              })}
              <button className="bg-[#f9abb9] text-white px-6 py-3 rounded-full text-base font-semibold hover:bg-[#f9abb9]/90 transition-colors">
                Contact Us
              </button>
            </div>
          </motion.div>
        </>
      )}
      <div
        className={cn(
          "max-w-7xl mx-auto rounded-full transition-all duration-300 flex items-center justify-between px-6 py-3",
          "glass bg-black/40",
        )}
      >
        <Link href="/" className="relative z-50 h-6 w-auto ml-2">
          <Image 
            src="/eclore_logo.png" 
            alt="Eclore" 
            width={90} 
            height={24} 
            className="h-6 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = (link.href === "/" && pathname === "/") || (link.href === "/about" && pathname === "/about")
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors uppercase",
                  isActive 
                    ? "text-[#f9abb9] drop-shadow-[0_0_8px_rgba(249,171,185,0.6)]" 
                    : "text-white/70 hover:text-white"
                )}
              >
                {link.name}
              </Link>
            )
          })}
          <button className="bg-[#f9abb9] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#f9abb9]/90 transition-colors">
            Contact Us
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden relative z-50 text-[#f9abb9]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="text-white" /> : <Menu />}
        </button>
      </div>
    </motion.nav>
  )
}

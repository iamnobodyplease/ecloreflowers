import Link from "next/link"
import Image from "next/image"
import { Github, Twitter, Instagram, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="relative pt-12 pb-12 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#f9abb9]/30 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div>
            <Link href="/" className="mb-6 block h-6 w-auto">
              <Image 
                src="/eclore_logo.png" 
                alt="Eclore" 
                width={90} 
                height={24} 
                className="h-6 w-auto object-contain"
              />
            </Link>
            <p className="text-white/50 leading-relaxed">
              Creating bespoke european style floral pieces since 2016. Based in the heart of Georgetown DC
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-6 text-[#f9abb9]">Sitemap</h4>
            <ul className="space-y-4 text-white/60">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="#work" className="hover:text-white transition-colors">Flowers</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="#contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-6 text-[#f9abb9]">Socials</h4>
            <ul className="space-y-4 text-white/60">
              <li><Link href="#" className="hover:text-white transition-colors">TikTok</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Twitter</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Facebook</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-6 text-[#f9abb9]">Let's Chat</h4>
            <p className="text-white/60 mb-4">Talk to our conceriage anytime</p>
            <a 
              href="mailto:Vika@EcloreFlowers.com" 
              className="text-xl font-medium hover:text-blue-400 transition-colors"
            >
              Vika@EcloreFlowers.com
            </a>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[#f9abb9]/30 text-sm text-white/40">
          <p>&copy; 2025 Eclore Flowers. All rights reserved.</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

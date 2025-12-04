import { Navbar } from "@/components/navbar"
import { About } from "@/components/about"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <Navbar />
      <About />
      <Footer />
    </main>
  )
}



"use client"

import { useState, useEffect, useRef } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import Image from "next/image"
import type { Product } from "@/data/products"

interface ProductModalProps {
  product: Product | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProductModal({ product, open, onOpenChange }: ProductModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    dateDesired: undefined as Date | undefined,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)
  const [datePickerOpen, setDatePickerOpen] = useState(false)
  const formContainerRef = useRef<HTMLDivElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)
  const phoneInputRef = useRef<HTMLInputElement>(null)

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      // Save current scroll position
      const scrollY = window.scrollY
      const scrollX = window.scrollX
      
      // Prevent body scroll - use a more reliable method
      const body = document.body
      const html = document.documentElement
      
      // Store original styles
      const originalBodyOverflow = body.style.overflow
      const originalBodyPosition = body.style.position
      const originalBodyTop = body.style.top
      const originalBodyLeft = body.style.left
      const originalBodyWidth = body.style.width
      const originalHtmlOverflow = html.style.overflow
      
      // Apply styles to prevent scroll
      body.style.overflow = 'hidden'
      body.style.position = 'fixed'
      body.style.top = `-${scrollY}px`
      body.style.left = `-${scrollX}px`
      body.style.width = '100%'
      html.style.overflow = 'hidden'
      
      return () => {
        // Restore original styles
        body.style.overflow = originalBodyOverflow
        body.style.position = originalBodyPosition
        body.style.top = originalBodyTop
        body.style.left = originalBodyLeft
        body.style.width = originalBodyWidth
        html.style.overflow = originalHtmlOverflow
        
        // Restore scroll position
        window.scrollTo(scrollX, scrollY)
      }
    }
  }, [open])

  // Handle input focus and scroll within modal container
  const scrollInputIntoView = (element: HTMLElement) => {
    // Find the scrollable container (DialogContent)
    const dialogContent = formContainerRef.current?.closest('[data-slot="dialog-content"]') as HTMLElement
    const container = dialogContent || formContainerRef.current
    if (!container) return

    setTimeout(() => {
      const containerRect = container.getBoundingClientRect()
      const elementRect = element.getBoundingClientRect()
      
      // Calculate if element is outside visible area
      const isAbove = elementRect.top < containerRect.top + 100 // Add some padding
      const isBelow = elementRect.bottom > containerRect.bottom - 100
      
      if (isAbove || isBelow) {
        // Calculate scroll position to center the element
        const scrollTop = container.scrollTop
        const elementOffsetTop = element.offsetTop - (container.offsetTop || 0)
        const containerHeight = container.clientHeight
        const elementHeight = element.offsetHeight
        
        const targetScrollTop = elementOffsetTop - (containerHeight / 2) + (elementHeight / 2)
        
        container.scrollTo({
          top: Math.max(0, targetScrollTop),
          behavior: 'smooth'
        })
      }
    }, 300)
  }

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const phoneNumber = value.replace(/\D/g, "")
    
    // Limit to 10 digits
    const limitedNumber = phoneNumber.slice(0, 10)
    
    // Format as (XXX) XXX-XXXX
    if (limitedNumber.length === 0) return ""
    if (limitedNumber.length <= 3) return `(${limitedNumber}`
    if (limitedNumber.length <= 6) return `(${limitedNumber.slice(0, 3)}) ${limitedNumber.slice(3)}`
    return `(${limitedNumber.slice(0, 3)}) ${limitedNumber.slice(3, 6)}-${limitedNumber.slice(6, 10)}`
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setFormData({ ...formData, phone: formatted })
  }

  const getPhoneDigits = (phone: string) => {
    return phone.replace(/\D/g, "")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.dateDesired) {
      return // Date is required
    }
    const phoneDigits = getPhoneDigits(formData.phone)
    if (phoneDigits.length !== 10) {
      return // Phone number must be exactly 10 digits
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: phoneDigits,
          dateDesired: formData.dateDesired.toISOString(),
          productTitle: product.title,
          productPrice: product.price,
        }),
      })

      if (response.ok) {
        // Success - show thank you modal
        setShowThankYou(true)
      } else {
        // Handle error
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        console.error('Failed to submit form:', errorData)
        const errorMessage = errorData.error || errorData.details || 'Failed to submit form. Please try again.'
        alert(errorMessage)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDone = () => {
    setShowThankYou(false)
    onOpenChange(false)
    setFormData({ name: "", phone: "", dateDesired: undefined })
  }

  if (!product) return null

  return (
    <>
      {/* Thank You Modal */}
      <Dialog open={showThankYou} onOpenChange={setShowThankYou}>
        <DialogContent className="glass !max-w-[90vw] md:!max-w-md !rounded-2xl p-8 text-center">
          <DialogHeader>
            <DialogTitle className="text-3xl font-serif text-white mb-2">
              Thank You
            </DialogTitle>
            <div className="flex justify-center mb-4">
              <Image
                src="/glyph.png"
                alt="Eclore"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
          </DialogHeader>
          <p className="text-white/80 text-base leading-relaxed mb-6">
            Our concierge team will reach out to you in a few minutes to customize and complete your order.
          </p>
          <button
            onClick={handleDone}
            className="w-full px-8 py-3 bg-[#f9abb9] hover:bg-[#f9abb9]/90 text-black rounded-full font-medium transition-colors"
          >
            Done
          </button>
        </DialogContent>
      </Dialog>

      {/* Product Modal */}
      <Dialog open={open && !showThankYou} onOpenChange={onOpenChange}>
      <DialogContent 
        className="glass !max-w-[100vw] !w-[100vw] md:!max-w-[98vw] md:!w-[98vw] !h-[100dvh] md:!h-auto !top-0 md:!top-[50%] !left-0 md:!left-[50%] !translate-x-0 md:!translate-x-[-50%] !translate-y-0 md:!translate-y-[-50%] !rounded-none md:!rounded-lg p-0 !overflow-y-auto md:overflow-hidden [&>button]:text-[#f9abb9] md:[&>button]:text-white [&>button]:hover:text-[#f9abb9]/80 md:[&>button]:hover:text-white/80 [&>button]:glass [&>button]:rounded-full [&>button]:w-10 [&>button]:h-10 [&>button]:flex [&>button]:items-center [&>button]:justify-center [&>button]:border [&>button]:border-[#f9abb9]/30 md:[&>button]:border-white/20 [&>button]:bg-[#f9abb9]/20 md:[&>button]:bg-[#f9abb9]/10 [&>button]:backdrop-blur-xl [&>button]:!fixed [&>button]:md:!absolute [&>button]:!top-4 [&>button]:!right-4 [&>button]:!z-50" 
        onOpenAutoFocus={(e) => e.preventDefault()}
        style={{
          WebkitOverflowScrolling: 'touch',
          touchAction: 'pan-y',
          overscrollBehavior: 'contain'
        }}
      >
        <div 
          ref={formContainerRef}
          className="flex flex-col md:flex-row min-h-full md:h-auto"
        >
          {/* Left Side - Product Image */}
          <div className="relative w-full md:w-1/2 h-64 md:h-auto md:min-h-[600px] flex-shrink-0">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
            />
          </div>

          {/* Right Side - Product Info and Form */}
          <div 
            className="w-full md:w-1/2 p-6 md:p-12 flex flex-col flex-1"
            style={{ 
              paddingBottom: 'max(env(safe-area-inset-bottom), 2rem)'
            }}
          >
            <DialogHeader className="mb-6">
              <DialogTitle className="text-3xl font-serif text-white mb-2">
                {product.title}
              </DialogTitle>
              <p className="text-2xl font-light text-white/80">{product.price}</p>
            </DialogHeader>

            {/* Product Description */}
            <div className="mb-6 text-white/70">
              <p className="text-sm leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Pink Line */}
            <div className="h-px bg-[#f9abb9] rounded-full mb-6" />

            {/* Additional Text */}
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              We believe that every flower arrangement is unique, so please fill out your information below and we will get back to you within the hour.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                  Name
                </label>
                <input
                  ref={nameInputRef}
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onFocus={(e) => {
                    // Scroll input into view within modal container
                    scrollInputIntoView(e.target)
                  }}
                  className="w-full px-4 py-3 rounded-full border border-white/20 bg-white/60 backdrop-blur-sm text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[#f9abb9]/50 transition-all"
                  placeholder="Your name"
                  autoComplete="name"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">
                  Phone Number
                </label>
                <input
                  ref={phoneInputRef}
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  onFocus={(e) => {
                    // Scroll input into view within modal container
                    scrollInputIntoView(e.target)
                  }}
                  maxLength={14} // (XXX) XXX-XXXX = 14 characters
                  className="w-full px-4 py-3 rounded-full border border-white/20 bg-white/60 backdrop-blur-sm text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[#f9abb9]/50 transition-all"
                  placeholder="(555) 123-4567"
                  autoComplete="tel"
                />
                {formData.phone && getPhoneDigits(formData.phone).length !== 10 && (
                  <p className="mt-1 text-xs text-[#f9abb9]/80">
                    Please enter a valid 10-digit phone number
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="dateDesired" className="block text-sm font-medium text-white/80 mb-2">
                  Date Desired
                </label>
                <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      id="dateDesired"
                      className={cn(
                        "w-full px-4 py-3 rounded-full border border-white/20 bg-white/60 backdrop-blur-sm text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[#f9abb9]/50 transition-all text-left font-normal",
                        !formData.dateDesired && "text-black/40"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span>
                          {formData.dateDesired ? (
                            format(formData.dateDesired, "PPP")
                          ) : (
                            <span className="text-black/40">Pick a date</span>
                          )}
                        </span>
                        <CalendarIcon className="h-4 w-4 text-black/40" />
                      </div>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 glass bg-black/40 backdrop-blur-xl border border-[#f9abb9]/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] rounded-2xl">
                    <Calendar
                      mode="single"
                      selected={formData.dateDesired}
                      onSelect={(date) => {
                        setFormData({ ...formData, dateDesired: date })
                        // Close the popover when a date is selected
                        if (date) {
                          setDatePickerOpen(false)
                        }
                      }}
                      disabled={(date) => {
                        const today = new Date()
                        today.setHours(0, 0, 0, 0)
                        return date < today
                      }}
                      className="glass bg-transparent text-white [&_.rdp-button_previous]:text-white/70 [&_.rdp-button_previous]:hover:text-white [&_.rdp-button_previous]:hover:bg-[#f9abb9]/20 [&_.rdp-button_next]:text-white/70 [&_.rdp-button_next]:hover:text-white [&_.rdp-button_next]:hover:bg-[#f9abb9]/20 [&_.rdp-caption_label]:text-white [&_.rdp-weekday]:text-white/60 [&_.rdp-day]:text-white/80 [&_.rdp-day:hover]:bg-[#f9abb9]/20 [&_.rdp-day:hover]:text-white [&_.rdp-day[data-selected=true]]:bg-[#f9abb9] [&_.rdp-day[data-selected=true]]:text-black [&_.rdp-day[data-selected=true]]:font-semibold [&_.rdp-day[data-disabled=true]]:text-white/20 [&_.rdp-day[data-disabled=true]]:opacity-50 [&_.rdp-day[data-today=true]]:bg-[#f9abb9]/30 [&_.rdp-day[data-today=true]]:text-white [&_.rdp-day[data-today=true]]:font-semibold"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-auto px-8 py-3 bg-[#f9abb9] hover:bg-[#f9abb9]/90 disabled:opacity-50 disabled:cursor-not-allowed text-black rounded-full font-medium transition-colors"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
    </>
  )
}


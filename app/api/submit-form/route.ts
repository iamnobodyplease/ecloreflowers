import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, dateDesired, productTitle, productPrice } = body

    // Validate required fields
    if (!name || !phone || !dateDesired) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Format date
    const formattedDate = new Date(dateDesired).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    // Get phone number and carrier from env
    const phoneNumber = process.env.YOUR_PHONE_NUMBER
    const carrier = process.env.YOUR_CARRIER

    if (!phoneNumber || !carrier) {
      console.error('Phone number or carrier not configured')
      return NextResponse.json(
        { error: 'SMS configuration missing' },
        { status: 500 }
      )
    }

    // Construct email-to-SMS address
    const smsEmail = `${phoneNumber}@${carrier}`

    // Send SMS via Resend (email-to-SMS)
    await resend.emails.send({
      from: 'onboarding@resend.dev', // You can change this after verifying your domain
      to: smsEmail,
      subject: 'New Order - Eclore',
      text: `New order from ${name}!\n\nPhone: ${phone}\nDate Desired: ${formattedDate}\nProduct: ${productTitle}\nPrice: ${productPrice}\n\nReply ASAP!`,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending SMS:', error)
    return NextResponse.json(
      { error: 'Failed to send notification' },
      { status: 500 }
    )
  }
}


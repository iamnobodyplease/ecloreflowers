import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  // Check if Resend API key is configured
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY not configured')
    return NextResponse.json(
      { error: 'Email service not configured' },
      { status: 500 }
    )
  }

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

    // Get current timestamp
    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'America/New_York',
      dateStyle: 'short',
      timeStyle: 'short',
    })

    // Get SMS email address from env (email-to-SMS address)
    const smsEmail = process.env.SMS_EMAIL

    if (!smsEmail) {
      console.error('SMS email address not configured')
      return NextResponse.json(
        { error: 'SMS configuration missing' },
        { status: 500 }
      )
    }
    
    // Also send to regular email if configured (for testing/backup)
    const backupEmail = process.env.BACKUP_EMAIL

    console.log('Attempting to send SMS to:', smsEmail)
    console.log('Resend API Key present:', !!process.env.RESEND_API_KEY)

    // Prepare recipients - include backup email if configured
    const recipients = [smsEmail]
    if (backupEmail) {
      recipients.push(backupEmail)
    }

    // Send SMS via Resend (email-to-SMS)
    // Use verified domain - must be set in environment variables
    const fromEmail = process.env.RESEND_FROM_EMAIL
    
    if (!fromEmail) {
      console.error('RESEND_FROM_EMAIL not set in environment variables')
      return NextResponse.json(
        { error: 'Email configuration missing' },
        { status: 500 }
      )
    }
    
    console.log('Sending from:', fromEmail)
    console.log('Sending to:', recipients)

    const result = await resend.emails.send({
      from: fromEmail,
      to: recipients,
      subject: 'New Order - Eclore',
      text: `New Order Received\n\nName: ${name}\nPhone: ${phone}\nDate Desired: ${formattedDate}\nProduct: ${productTitle}\nPrice: ${productPrice}\n\nSubmitted: ${timestamp}`,
    })

    console.log('Resend response:', result)

    return NextResponse.json({ 
      success: true,
      messageId: result.id,
      smsEmail: smsEmail
    })
  } catch (error: any) {
    console.error('Error sending SMS:', error)
    console.error('Error details:', JSON.stringify(error, null, 2))
    return NextResponse.json(
      { 
        error: 'Failed to send notification',
        details: error?.message || 'Unknown error'
      },
      { status: 500 }
    )
  }
}


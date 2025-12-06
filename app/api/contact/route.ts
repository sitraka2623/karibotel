import { NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { nom, email, message } = body

    // Validation
    if (!nom || !email || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      )
    }

    // Envoyer l'email à l'hôtel
    await sendEmail({
      to: process.env.EMAIL_USER || 'contact@karibotel.com',
      subject: `Nouveau message de ${nom}`,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom:</strong> ${nom}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Vous pouvez répondre directement à ${email}</small></p>
      `,
    })

    // Envoyer un email de confirmation au client
    await sendEmail({
      to: email,
      subject: 'Message reçu - Karibotel Ranomafana',
      html: `
        <h2>Merci pour votre message !</h2>
        <p>Bonjour ${nom},</p>
        <p>Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.</p>
        <p><strong>Votre message :</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p>Cordialement,<br>L'équipe Karibotel Ranomafana</p>
        <p>📞 +261 34 22 606 67 | +261 32 55 206 99</p>
      `,
    })

    return NextResponse.json({
      message: 'Message envoyé avec succès',
    })
  } catch (error) {
    console.error('Erreur envoi message:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du message' },
      { status: 500 }
    )
  }
}

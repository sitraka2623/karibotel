import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

export async function sendReservationEmail(
  to: string,
  reservation: {
    nom: string
    numero: string
    dateArrivee: string
    dateDepart: string
    montantTotal: string
  }
) {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to,
    subject: 'Confirmation de réservation - Karibotel',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #2E7D32; color: white; padding: 20px; text-align: center;">
          <h1>Karibotel</h1>
        </div>
        <div style="padding: 20px; background-color: #f5f5f5;">
          <h2 style="color: #2E7D32;">Confirmation de réservation</h2>
          <p>Bonjour ${reservation.nom},</p>
          <p>Votre réservation a été confirmée avec succès !</p>
          
          <div style="background-color: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2E7D32;">Détails de la réservation</h3>
            <p><strong>Chambre :</strong> ${reservation.numero}</p>
            <p><strong>Date d'arrivée :</strong> ${reservation.dateArrivee}</p>
            <p><strong>Date de départ :</strong> ${reservation.dateDepart}</p>
            <p><strong>Montant total :</strong> ${reservation.montantTotal}</p>
          </div>
          
          <p>Nous vous attendons avec impatience !</p>
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            Cet email est envoyé automatiquement, merci de ne pas y répondre.
          </p>
        </div>
      </div>
    `,
  }

  await transporter.sendMail(mailOptions)
}

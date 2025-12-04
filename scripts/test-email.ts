import { sendReservationEmail } from '../lib/email'

async function testEmail() {
  console.log('🧪 Test d\'envoi d\'email...\n')

  const testEmail = process.argv[2] || 'test@example.com'

  console.log(`📧 Envoi à : ${testEmail}`)

  try {
    await sendReservationEmail(testEmail, {
      nom: 'Test Client',
      numero: 'B01',
      dateArrivee: new Date().toLocaleDateString('fr-FR'),
      dateDepart: new Date(Date.now() + 86400000 * 3).toLocaleDateString('fr-FR'),
      montantTotal: '425 000 Ar',
    })

    console.log('\n✅ Email envoyé avec succès !')
    console.log('📬 Vérifiez votre boîte email (et le dossier spam)')
  } catch (error: any) {
    console.error('\n❌ Erreur lors de l\'envoi de l\'email:')
    console.error(error.message)
    
    if (error.message.includes('Invalid login')) {
      console.log('\n💡 Conseil : Utilisez un mot de passe d\'application Gmail')
      console.log('   Voir : https://myaccount.google.com/apppasswords')
    }
  }
}

testEmail()
  .catch(console.error)
  .finally(() => process.exit())

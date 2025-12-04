import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Créer un utilisateur admin
  const hashedPassword = await bcrypt.hash('admin123', 10)
  await prisma.user.upsert({
    where: { email: 'admin@karibotel.com' },
    update: {},
    create: {
      email: 'admin@karibotel.com',
      password: hashedPassword,
      nom: 'Administrateur',
      role: 'admin',
    },
  })

  // Créer les chambres B01 à B14 (prix en Ariary)
  const prixBase = [425000, 450000, 475000, 500000]
  for (let i = 1; i <= 14; i++) {
    const numero = `B${i.toString().padStart(2, '0')}`
    await prisma.chambre.upsert({
      where: { numero },
      update: {},
      create: {
        numero,
        description: `Chambre confortable avec vue sur le jardin. Équipée d'un lit double, salle de bain privée, TV et WiFi gratuit.`,
        prix: prixBase[i % 4],
        disponible: true,
      },
    })
  }

  // Créer les infos piscine
  await prisma.piscine.create({
    data: {
      horaires: `Lundi - Dimanche : 8h00 - 20h00
Fermeture exceptionnelle le mardi pour entretien`,
      reglement: `- La piscine est réservée aux clients de l'hôtel
- Douche obligatoire avant l'accès
- Pas de plongeon
- Surveillance non assurée, baignade sous votre responsabilité
- Les enfants doivent être accompagnés d'un adulte
- Respect des autres clients`,
      description: `Notre piscine chauffée de 15m x 8m vous accueille dans un cadre verdoyant et apaisant. 
Profitez de transats confortables et d'un espace détente pour vous relaxer après une journée de visite.
L'accès à la piscine est inclus dans votre réservation.`,
    },
  })

  console.log('✅ Base de données initialisée avec succès')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

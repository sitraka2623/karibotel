import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import * as readline from 'readline'

const prisma = new PrismaClient()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve)
  })
}

async function main() {
  console.log('=== Création d\'un nouvel administrateur ===\n')

  const nom = await question('Nom complet: ')
  const email = await question('Email: ')
  const password = await question('Mot de passe: ')

  if (!nom || !email || !password) {
    console.error('❌ Tous les champs sont requis')
    process.exit(1)
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const user = await prisma.user.create({
      data: {
        nom,
        email,
        password: hashedPassword,
        role: 'admin',
      },
    })

    console.log('\n✅ Administrateur créé avec succès!')
    console.log(`ID: ${user.id}`)
    console.log(`Email: ${user.email}`)
    console.log(`Nom: ${user.nom}`)
  } catch (error: any) {
    if (error.code === 'P2002') {
      console.error('\n❌ Cet email existe déjà')
    } else {
      console.error('\n❌ Erreur:', error.message)
    }
    process.exit(1)
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    rl.close()
    await prisma.$disconnect()
  })

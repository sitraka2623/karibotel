import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const chambre = await prisma.chambre.findUnique({
      where: { id: params.id },
    })
    if (!chambre) {
      return NextResponse.json(
        { error: 'Chambre non trouvée' },
        { status: 404 }
      )
    }
    return NextResponse.json(chambre)
  } catch (error) {
    console.error('Erreur GET chambre:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération de la chambre' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const body = await request.json()
    
    // Ne mettre à jour que les champs autorisés
    const { numero, description, prix, photo } = body
    
    const chambre = await prisma.chambre.update({
      where: { id: params.id },
      data: {
        numero,
        description,
        prix: parseFloat(prix),
        photo,
      },
    })
    return NextResponse.json(chambre)
  } catch (error) {
    console.error('Erreur PUT chambre:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour de la chambre' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    await prisma.chambre.delete({
      where: { id: params.id },
    })
    return NextResponse.json({ message: 'Chambre supprimée' })
  } catch (error) {
    console.error('Erreur DELETE chambre:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de la chambre' },
      { status: 500 }
    )
  }
}

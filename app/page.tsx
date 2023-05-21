import { Inter } from '@next/font/google'
import Header from './components/Header'
import Card from './components/Card'
import { Cuisine, Location, PRICE, PrismaClient, Review } from '@prisma/client'

const inter = Inter({ subsets: ['latin'] })
export interface CardType {
	id: Number
	name: string
	main_image: string
	cuisine: Cuisine
	location: Location
	price: PRICE
	slug: string
	review: Review[]
}
const prisma = new PrismaClient()
const fetchResturants = async (): Promise<CardType[]> => {
	const restaurants = await prisma.restaurant.findMany({
		select: {
			id: true,
			name: true,
			main_image: true,
			cuisine: true,
			location: true,
			price: true,
			created_at: true,
			slug: true,
			review: true,
		},
	})
	return restaurants
}

export default async function Home() {
	const restaurants = await fetchResturants()

	return (
		<>
			<main>
				<Header />

				<div className='py-3 px-36 mt-10 flex flex-wrap justify-center'>
					{restaurants.map((restaurant) => (
						<Card {...restaurant} />
					))}
				</div>
			</main>
		</>
	)
}

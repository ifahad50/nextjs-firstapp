import Header from '../components/Header'
import RestaurantNavBar from '../components/RestrauntNavbar'
import Title from '../components/Title'
import Rating from '../components/Rating'
import Description from '../components/Description'
import Images from '../components/Images'
import Reviews from '../components/Reviews'
import Reservations from '../components/Reservations'
import { Location, PrismaClient, Review } from '@prisma/client'

interface RestaurantType {
	id: number
	name: string
	description: string
	images: string[]
	slug: string
	location: Location
	review: Review[]
}
const prisma = new PrismaClient()
const fetchResturantBySlug = async (slug: string): Promise<RestaurantType> => {
	const restaurant = await prisma.restaurant.findUnique({
		where: {
			slug: slug,
		},
		select: {
			id: true,
			name: true,
			description: true,
			images: true,
			slug: true,
			location: true,
			review: true,
		},
	})
	if (!restaurant) throw new Error('Not found')
	return restaurant
}
export default async function RestaurantDetails({
	params,
}: {
	params: { slug: string }
}) {
	const restaurant = await fetchResturantBySlug(params.slug)

	return (
		<>
			<div className='bg-white w-[70%] rounded p-3 shadow'>
				<RestaurantNavBar slug={params.slug} />
				<Title title={restaurant.name} />
				<Rating />
				<Description description={restaurant.description} />
				<Images images={restaurant.images} />
				<Reviews reviews={restaurant.review} />
			</div>
			<div className='w-[27%] relative text-reg'>
				<Reservations />
			</div>
		</>
	)
}

import Header from './components/Header'
import SearchSideBar from './components/SearchSideBar'
import RestaurantCard, { cardType } from './components/RestaurantCard'
import { PRICE, PrismaClient } from '@prisma/client'

interface SearchParams {
	city?: string | undefined
	cuisine?: string | undefined
	price?: PRICE | undefined
}

const prisma = new PrismaClient()

const getRestaurants = (searchParams: SearchParams) => {
	const where: any = {}
	if (searchParams.city) {
		const city = {
			name: { equals: searchParams.city.toLowerCase() },
		}
		where.location = city
	}
	if (searchParams.cuisine) {
		const cuisine = {
			name: { equals: searchParams.cuisine.toLowerCase() },
		}
		where.cuisine = cuisine
	}
	if (searchParams.price) {
		const price = {
			equals: searchParams.price,
		}
		where.price = price
	}
	const select = {
		id: true,
		name: true,
		main_image: true,
		price: true,
		cuisine: true,
		location: true,
		slug: true,
		review: true,
	}

	return prisma.restaurant.findMany({
		where: where,
		select: select,
	})
}

const fetchLocations = async () => {
	return prisma.location.findMany()
}
const fetchCuisines = async () => {
	return prisma.cuisine.findMany()
}
export default async function Search({
	searchParams,
}: {
	searchParams: SearchParams
}) {
	const restaurants = await getRestaurants(searchParams)
	const locations = await fetchLocations()
	const cuisines = await fetchCuisines()
	return (
		<>
			<Header />
			<div className='flex py-4 m-auto w-2/3 justify-between items-start'>
				<SearchSideBar
					location={locations}
					cuisine={cuisines}
					searchParams={searchParams}
				/>
				<div className='w-5/6'>
					{restaurants.length > 0 ? (
						restaurants?.map((restaurant: cardType) => (
							<RestaurantCard restaurant={restaurant} />
						))
					) : (
						<h6>No Result Found</h6>
					)}
				</div>
			</div>
		</>
	)
}

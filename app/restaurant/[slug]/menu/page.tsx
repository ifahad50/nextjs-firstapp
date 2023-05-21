import RestaurantNavBar from '../../components/RestrauntNavbar'
import Menu from '../../components/Menu'
import { Item, PrismaClient } from '@prisma/client'

interface RestaurantItemType {
	id: number
	items: Item[]
}
const prisma = new PrismaClient()
const fetchItems = async (slug: string): Promise<RestaurantItemType> => {
	const restaurant = await prisma.restaurant.findUnique({
		where: { slug: slug },
		select: { id: true, items: true },
	})
	if (!restaurant) throw new Error('Not found')
	return restaurant
}
export default async function RestaurantMenu({
	params,
}: {
	params: { slug: string }
}) {
	const menu = await fetchItems(params.slug)

	return (
		<div className='bg-white w-[70%] rounded p-3 shadow'>
			<RestaurantNavBar slug={params.slug} />
			<Menu menu={menu.items} />
		</div>
	)
}

import { Item } from '@prisma/client'
import MenuCard from './MenuCard'

export default function Menu({ menu }: { menu: Item[] }) {
	return (
		<main className='bg-white mt-5'>
			<div>
				<div className='mt-4 pb-1 mb-1'>
					<h1 className='font-bold text-4xl'>Menu</h1>
				</div>
				<div className='flex flex-wrap justify-between'>
					{menu.length > 0 ? (
						menu.map((item) => <MenuCard item={item} />)
					) : (
						<h6>No Menu Found</h6>
					)}
				</div>
			</div>
		</main>
	)
}

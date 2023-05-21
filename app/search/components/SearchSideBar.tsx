import { Cuisine, Location, PRICE } from '@prisma/client'
import Link from 'next/link'

export default function SearchSideBar({
	location,
	cuisine,
	searchParams,
}: {
	location: Location[]
	cuisine: Cuisine[]
	searchParams: {
		city?: string | undefined
		cuisine?: string | undefined
		price?: PRICE
	}
}) {
	const prices = [
		{ price: PRICE.CHEAP, lable: '$$' },
		{ price: PRICE.REGULAR, lable: '$$$' },
		{ price: PRICE.EXPENSIVE, lable: '$$$$' },
	]
	return (
		<div className='w-1/5'>
			<div className='border-b pb-4 flex flex-col'>
				<h1 className='mb-2'>Region</h1>
				{location.map((loc) => (
					<Link
						href={{
							pathname: '/search',
							query: { ...searchParams, city: loc.name },
						}}
						className='font-light text-reg capitalize'
						key={loc.id}
					>
						{loc.name}
					</Link>
				))}
			</div>
			<div className='border-b pb-4 mt-3 flex flex-col'>
				<h1 className='mb-2'>Cuisine</h1>
				{cuisine.map((cus) => (
					<Link
						href={{
							pathname: '/search',
							query: { ...searchParams, cuisine: cus.name },
						}}
						className='font-light text-reg capitalize'
						key={cus.id}
					>
						{cus.name}
					</Link>
				))}
			</div>
			<div className='mt-3 pb-4'>
				<h1 className='mb-2'>Price</h1>
				<div className='flex'>
					{prices.map((price) => (
						<Link
							href={{
								pathname: '/search',
								query: { ...searchParams, price: price.price },
							}}
							className='border w-full text-reg font-light rounded-l p-2'
						>
							{price.lable}
						</Link>
					))}
				</div>
			</div>
		</div>
	)
}

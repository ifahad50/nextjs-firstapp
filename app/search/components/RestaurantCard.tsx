import { Cuisine, Location, PRICE, Restaurant, Review } from '@prisma/client'
import Link from 'next/link'
import Price from '../../components/Price'
import { calculateReviewRatingAverage } from '../../../utils/calculateReviewRatingAverage'

export interface cardType {
	id: number
	name: string
	main_image: string
	price: PRICE
	cuisine: Cuisine
	location: Location
	slug: string
	review: Review[]
}

export default function RestaurantCard({
	restaurant,
}: {
	restaurant: cardType
}) {
	const renderRatingText = () => {
		const rating = calculateReviewRatingAverage(restaurant.review)
		if (rating > 4) return 'Awesome'
		else if (rating <= 4 && rating > 3) return 'Good'
		else if (rating <= 3 && rating > 0) return 'Average'
		else return ''
	}
	return (
		<div className='border-b flex pb-5'>
			<Link href={`/restaurant/${restaurant.slug}`}>
				<img src={restaurant.main_image} alt='' className='w-44 rounded' />
			</Link>

			<div className='pl-5'>
				<h2 className='text-3xl'>{restaurant.name}</h2>
				<div className='flex items-start'>
					<div className='flex mb-2'>*****</div>
					<p className='ml-2 text-sm'>{renderRatingText()}</p>
				</div>
				<div className='mb-9'>
					<div className='font-light flex text-reg'>
						<Price price={restaurant.price} />
						<p className='mr-4'>{restaurant.cuisine.name}</p>
						<p className='mr-4'>{restaurant.location.name}</p>
					</div>
				</div>
				<div className='text-red-600'>
					<Link href='/restaurant/someting'>View more information</Link>
				</div>
			</div>
		</div>
	)
}

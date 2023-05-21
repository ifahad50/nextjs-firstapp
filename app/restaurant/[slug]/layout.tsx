import Header from '../components/Header'
import RestaurantNavBar from '../components/RestrauntNavbar'

export default function RestaurantLayout({
	children,
	params,
}: {
	children: React.ReactNode
	params: { slug: string }
}) {
	return (
		<>
			<Header title={params.slug} />
			<div className='flex m-auto w-2/3 justify-between items-start 0 -mt-11'>
				{children}
			</div>
		</>
	)
}

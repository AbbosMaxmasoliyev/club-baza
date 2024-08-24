import { Card } from 'components/ui'
import React, { useEffect, useState } from 'react'
import { getDashboard } from 'services/product.service'
import Table from "components/ui/Table"
import { Link } from 'react-router-dom'
const { Tr, Th, Td, THead, TBody } = Table
const Home = () => {
	const [information, setInformation] = useState([])
	const role = localStorage.getItem("role")
	const dashboard = async () => {
		try {
			let response = await getDashboard()
			console.log(response);

			setInformation(response.data.clubs)
		} catch (error) {

		}
	}

	const dashboardManager = async () => {
		try {
			let response = await getDashboard()
			console.log(response);

			setInformation(response.data.clubs)
		} catch (error) {

		}
	}
	useEffect(() => {
		if (role === "superadmin") {

			dashboard()
		} else if (role == "manager" || role == "founder") {
			dashboardManager()
		}

	}, [])



	return (
		<div className='flex flex-col'>
			<h1 className='mb-5'>Dashboard</h1>
			{role === "superadmin" ? <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-3">
				{
					information?.map((key) => {
						return (
							<Link to={`/club/${key._id}`}>
								<Card className="w-full max-h-36">
									<p className='text-2xl font-semibold font-mont '>{key?.name}</p>
									<p className='text-xl dark:text-white'>Loyihalar soni: {key?.projects?.length}</p>
									<p className='text-xl dark:text-white'>Url: {key?.url}</p>
								</Card>
							</Link>
						)

					})
				}
			</div> : null

			}
			{role === "manager" ? <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-3">
				{
					information?.map((key) => {
						return (
							<Link to={`/club/${key._id}`}>
								<Card className="w-full max-h-36">
									<p className='text-2xl font-semibold font-mont '>{key?.name}</p>
									<p className='text-xl dark:text-white'>Loyihalar soni: {key?.projects?.length}</p>
									<p className='text-xl dark:text-white'>Url: {key?.url}</p>
								</Card>
							</Link>
						)

					})
				}
			</div> : null

			}

		</div>
	)
}

export default Home

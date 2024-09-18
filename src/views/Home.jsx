import { Card } from 'components/ui'
import React, { useEffect, useState } from 'react'
import { getDashboard } from 'services/product.service'
import Table from "components/ui/Table"
import { Link } from 'react-router-dom'
import { getUsersDebtors } from 'services/founder-menejer.service'
const { Tr, Th, Td, THead, TBody } = Table
const Home = () => {
	const [information, setInformation] = useState([])
	const [managerInformation, setManagerInformation] = useState(null)
	const role = localStorage.getItem("role")
	// getClients(`?page=${page}&item=${selectValue}`)

	const getManagerDashboard = async () => {
		if (role === "manager") {
			try {

				let clientsResponse = await getUsersDebtors()
				console.log(clientsResponse);
				if (!clientsResponse.data?.data?.subscriptions.length) {
					console.log(clientsResponse.data);

					setManagerInformation("Ushbu Club bo'yicha qarzdorlar hozirda yo'q")
				} else {
					setManagerInformation(clientsResponse.data.subscriptions.length)
				}
			} catch (error) {
				console.log(error);

			}
		}
	}
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
			let response = await getManagerDashboard()
			console.log(response);

			setInformation(response.data.clubs)
		} catch (error) {

		}
	}
	useEffect(() => {
		console.log(role);

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
				<p>{managerInformation ? "Hozirda klub bo'yicha qarzdorlar yo'q" : managerInformation}</p>
			</div> : null

			}

		</div>
	)
}

export default Home

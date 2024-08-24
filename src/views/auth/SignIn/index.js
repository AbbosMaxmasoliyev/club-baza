import React, { useEffect, useState } from 'react'
import SignInForm from './SignInForm'
import { openNotification } from 'utils/notification'
import { Card } from 'primereact/card'
import DemoTitleSection from 'components/docs/DemoTitleSection'
import { useDispatch } from 'react-redux'
import { setCurrentprefix, setCurrentRole } from 'store/base/commonSlice'
import { useNavigate } from 'react-router-dom'



const SignIn = () => {
	const navigate = useNavigate()
	const [prefix, setPrefix] = useState(null)
	const [club, setClub] = useState(null)
	const [clubs, setClubs] = useState()
	const dispatch = useDispatch()
	const getClubs = async () => {
		try {
			fetch("https://admin.launchpro.uz/api/v1/admin/club")
				.then(res => res.json())
				.then(res => {

					let superadmin = {
						name: "Superadmin",
						url: "https://admin.launchpro.uz/api/v1",
						role: "superadmin"
					}
					setClubs([...res.clubs.map(club => {
						club.url = `${club.url}/menejer`
						club.role = `manager`
						return club
					}), superadmin])
				})

		} catch (error) {
			openNotification("error", "Malumotlarni yuklashda xatolik")
		}
	}
	useEffect(() => {
		setPrefix(localStorage.getItem("prefix"))

		dispatch(setCurrentprefix(prefix))
		dispatch(setCurrentRole(localStorage.getItem("role")))
		getClubs()
	}, [])
	const handleClub = (club) => {
		console.log(club);
		console.log(prefix);

		if (!prefix) {
			console.log(club);

			localStorage.setItem("prefix", club?.url)
			localStorage.setItem("role", club?.role)
			navigate(0)
		}

		// localStorage.setItem("prefix", "http://localhost:5000/")
	}

	return (
		<>
			<div className="mb-8">
				<h3 className="mb-1">Welcome back!</h3>
				<p>Please enter your credentials to sign in!</p>
			</div>
			{
				prefix ?

					<SignInForm disableSubmit={false} />
					: null

			}

			{
				!club && clubs instanceof Array && !prefix && clubs.length ?
					<div className='grid grid-cols-4 gap-4'>
						{
							clubs.map(club => {
								return <Card onClick={() => handleClub(club)}>
									<p className='my-5 font-semibold'>{club.name}</p>
									<p>{club?.url}</p>
								</Card>
							})
						}
					</div>
					: null
			}
		</>
	)
}

export default SignIn
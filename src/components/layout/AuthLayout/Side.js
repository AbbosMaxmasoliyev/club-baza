import React, { cloneElement } from 'react'
import { Avatar } from 'components/ui'
import Logo from 'components/template/Logo'
import { APP_NAME } from 'constants/app.constant'

const Side = ({ children, content, ...rest }) => {
	return (
		<div className="grid grid-cols-1 h-full">
			{/* <div
				className="bg-no-repeat bg-cover py-6 px-16 flex-col justify-between hidden lg:flex"
				style={{ backgroundImage: `url('/img/others/auth-side-bg.jpg')` }}
			>
				<Logo mode="dark" className="w-10" />
				<div >
				</div>
				<span className="text-white">Copyright  &copy;  {`${new Date().getFullYear()}`} <span className="font-semibold">{`${APP_NAME}`}</span> </span>
			</div> */}
			<div className="col-span-2 flex flex-col justify-center items-center bg-white dark:bg-gray-800">
				<div className="xl:min-w-[450px] px-8">
					<div className="mb-8">
						{content}
					</div>
					{children ? cloneElement(children, { ...rest }) : null}
				</div>
			</div>
		</div>
	)
}

export default Side
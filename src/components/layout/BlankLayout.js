import React from 'react'
import View from 'views'
import SidePanel from 'components/template/SidePanel'
import LanguageSelector from "../template/LanguageSelector";

const BlankLayout = props => {
	return (
		<div className="app-layout-blank flex flex-auto flex-col h-[100vh]">
			<View {...props}/>
			<LanguageSelector />
			<SidePanel className="hidden" />
		</div>
	)
}

export default BlankLayout
import {
	NAV_ITEM_TYPE_TITLE,
	NAV_ITEM_TYPE_COLLAPSE,
	NAV_ITEM_TYPE_ITEM
} from 'constants/navigation.constant'
import { FOUNDER, MANAGER } from 'constants/roles.constant';
import deepParseJson from 'utils/deepParseJson';

const navigationConfig = [
	{
		key: 'home',
		path: '/home',
		title: 'Home',
		translateKey: 'nav.home',
		icon: 'home',
		type: NAV_ITEM_TYPE_ITEM,
		authority: [],

		subMenu: []
	},
	// /** Example purpose only */
	// {
	// 	key: 'singleMenuItem',
	// 	path: '/single-menu-view',
	// 	title: 'Single menu item',
	// 	translateKey: 'nav.singleMenuItem',
	// 	icon: 'singleMenu',
	// 	type: NAV_ITEM_TYPE_ITEM,
	// 	authority: [],
	// 	subMenu: []
	// },
	// {
	// 	key: 'users',
	// 	path: '/users',
	// 	title: "Foydalanuvchilar ro'yxati",
	// 	translateKey: 'nav.users',
	// 	icon: 'users',
	// 	type: NAV_ITEM_TYPE_ITEM,
	// 	authority: [],
	// 	subMenu: []
	// },
	// {
	// 	key: 'manager',
	// 	path: '/manager',
	// 	title: "Menejerlar ro'yxati",
	// 	translateKey: 'nav.manager',
	// 	icon: 'home',
	// 	type: NAV_ITEM_TYPE_ITEM,
	// 	authority: [],
	// 	subMenu: []
	// },
	// {
	// 	key: 'clubs',
	// 	path: '/club/:clubId',
	// 	title: "Club",
	// 	translateKey: 'nav.manager',
	// 	icon: 'home',
	// 	type: NAV_ITEM_TYPE_ITEM,
	// 	authority: [],
	// 	subMenu: []
	// },
	// {
	//     key: 'collapseMenu',
	// 	path: '',
	// 	title: 'Collapse Menu',
	// 	translateKey: 'nav.collapseMenu.collapseMenu',
	// 	icon: 'collapseMenu',
	// 	type: NAV_ITEM_TYPE_COLLAPSE,
	// 	authority: [],
	//     subMenu: [
	//         {
	//             key: 'collapseMenu.item1',
	//             path: '/collapse-menu-item-view-1',
	//             title: 'Collapse menu item 1',
	//             translateKey: 'nav.collapseMenu.item1',
	//             icon: '',
	//             type: NAV_ITEM_TYPE_ITEM,
	//             authority: [],
	//             subMenu: []
	//         },
	//         {
	//             key: 'collapseMenu.item2',
	//             path: '/collapse-menu-item-view-2',
	//             title: 'Collapse menu item 2',
	//             translateKey: 'nav.collapseMenu.item2',
	//             icon: '',
	//             type: NAV_ITEM_TYPE_ITEM,
	//             authority: [],
	//             subMenu: []
	//         },
	//     ]
	// },
	// {
	// 	key: 'groupMenu',
	// 	path: '',
	// 	title: 'Group Menu',
	// 	translateKey: 'nav.groupMenu.groupMenu',
	// 	icon: '',
	// 	type: NAV_ITEM_TYPE_TITLE,
	// 	authority: [],
	// 	subMenu: [
	//         {
	//             key: 'groupMenu.single',
	//             path: '/group-single-menu-item-view',
	//             title: 'Group single menu item',
	//             translateKey: 'nav.groupMenu.single',
	//             icon: 'groupSingleMenu',
	//             type: NAV_ITEM_TYPE_ITEM,
	//             authority: [],
	//             subMenu: []
	//         },
	// 		{
	// 			key: 'groupMenu.collapse',
	// 			path: '',
	// 			title: 'Group collapse menu',
	// 			translateKey: 'nav.groupMenu.collapse.collapse',
	// 			icon: 'groupCollapseMenu',
	// 			type: NAV_ITEM_TYPE_COLLAPSE,
	// 			authority: [],
	// 			subMenu: [
	// 				{
	// 					key: 'groupMenu.collapse.item1',
	// 					path: '/group-collapse-menu-item-view-1',
	// 					title: 'Menu item 1',
	// 					translateKey: 'nav.groupMenu.collapse.item1',
	// 					icon: '',
	// 					type: NAV_ITEM_TYPE_ITEM,
	// 					authority: [],
	// 					subMenu: []
	// 				},
	//                 {
	// 					key: 'groupMenu.collapse.item2',
	// 					path: '/group-collapse-menu-item-view-2',
	// 					title: 'Menu item 2',
	// 					translateKey: 'nav.groupMenu.collapse.item2',
	// 					icon: '',
	// 					type: NAV_ITEM_TYPE_ITEM,
	// 					authority: [],
	// 					subMenu: []
	// 				},
	//             ]
	//         }
	//     ]
	// }
]


export let permission = deepParseJson(localStorage.getItem("permissions"))

let manager = localStorage.getItem("role") == "manager"
let founder = localStorage.getItem("role") == "founder"
let superadmin = localStorage.getItem("role") == "superadmin"


// if (founder) {
// 	navigationConfig.push(
// 		{
// 			key: 'admins',
// 			path: '/admins',
// 			title: "lar ro'yxati",
// 			translateKey: 'nav.manager',
// 			icon: 'home',
// 			type: NAV_ITEM_TYPE_ITEM,
// 			authority: [,],

// 			subMenu: []
// 		},
// 		{
// 			key: 'clubs',
// 			path: '/clubs',
// 			title: "Klublar ro'yxati",
// 			translateKey: 'nav.manager',
// 			icon: 'home',
// 			type: NAV_ITEM_TYPE_ITEM,
// 			authority: [],
// 			subMenu: []
// 		},


// 	)
// }

if (manager) {
	navigationConfig.push({
		key: 'admins',
		path: '/debtors',
		title: "Qarzdorlar ro'yxati",
		translateKey: 'nav.manager',
		icon: 'home',
		type: NAV_ITEM_TYPE_ITEM,
		authority: [],
		subMenu: []
	},)
}


if (superadmin) {
	navigationConfig.push(
		{
			key: 'clubs',
			path: '/clubs',
			title: "Klublar ro'yxati",
			translateKey: 'nav.manager',
			icon: 'home',
			type: NAV_ITEM_TYPE_ITEM,
			authority: [],
			subMenu: []
		},
		// {
		// 	key: 'clubs',
		// 	path: '/club/:club_id',
		// 	title: "Klublar ro'yxati",
		// 	translateKey: 'nav.manager',
		// 	icon: 'home',
		// 	type: NAV_ITEM_TYPE_ITEM,
		// 	authority: [],
		// 	subMenu: []
		// },
		// {
		// 	key: 'founders',
		// 	path: '/founders',
		// 	title: "Founderlar ro'yxati",
		// 	translateKey: 'nav.manager',
		// 	icon: 'home',
		// 	type: NAV_ITEM_TYPE_ITEM,
		// 	authority: [],
		// 	subMenu: []
		// },
		// {
		// 	key: 'manager',
		// 	path: '/managers',
		// 	title: "Menejerlar ro'yxati",
		// 	translateKey: 'nav.manager',
		// 	icon: 'home',
		// 	type: NAV_ITEM_TYPE_ITEM,
		// 	authority: [],
		// 	subMenu: []
		// },
	)
}

export default navigationConfig
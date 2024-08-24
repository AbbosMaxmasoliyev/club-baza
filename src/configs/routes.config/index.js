import React from 'react'
import authRoute from './authRoute'
import deepParseJson from 'utils/deepParseJson'
import { FOUNDER, MANAGER, ADMIN } from 'constants/roles.constant'

export const publicRoutes = [
    ...authRoute
]

const protectedRoutesOld = [
    {
        key: 'home',
        path: '/home',
        component: React.lazy(() => import('views/Home')),
        authority: [],
    },
    // {
    //     key: 'home',
    //     path: '/club/:clubId',
    //     component: React.lazy(() => import('views/Users')),
    //     authority: [],
    // },
    // {
    //     key: 'collapseMenu.item1',
    //     path: '/users',
    //     component: React.lazy(() => import('views/Users')),
    //     authority: [],
    // },
    {
        key: 'collapseMenu.item1',
        path: '/clubs',
        component: React.lazy(() => import('views/Clubs')),
        authority: [],
    },

    /** Example purpose only */
    // {
    //     key: 'singleMenuItem',
    //     path: '/single-menu-view',
    //     component: React.lazy(() => import('views/demo/SingleMenuView')),
    //     authority: [],
    // },
    // {
    //     key: 'collapseMenu.item1',
    //     path: '/collapse-menu-item-view-1',
    //     component: React.lazy(() => import('views/demo/CollapseMenuItemView1')),
    //     authority: [],
    // },
    // {
    //     key: 'collapseMenu.item1',
    //     path: '/manager',
    //     component: React.lazy(() => import('views/Manager')),
    //     authority: [],
    // },
    // {
    //     key: 'collapseMenu.item2',
    //     path: '/collapse-menu-item-view-2',
    //     component: React.lazy(() => import('views/demo/CollapseMenuItemView2')),
    //     authority: [],
    // },
    // {
    //     key: 'groupMenu.single',
    //     path: '/group-single-menu-item-view',
    //     component: React.lazy(() => import('views/demo/GroupSingleMenuItemView')),
    //     authority: [],
    // },
    // {
    //     key: 'groupMenu.collapse.item1',
    //     path: '/group-collapse-menu-item-view-1',
    //     component: React.lazy(() => import('views/demo/GroupCollapseMenuItemView1')),
    //     authority: [],
    // },
    // {
    //     key: 'groupMenu.collapse.item2',
    //     path: '/group-collapse-menu-item-view-2',
    //     component: React.lazy(() => import('views/demo/GroupCollapseMenuItemView2')),
    //     authority: [],
    // },
]

let permission = deepParseJson(localStorage.getItem("permissions"))
console.log(permission);
let manager = localStorage.getItem("role") == "manager"
let founder = localStorage.getItem("role") == "founder"
let superadmin = localStorage.getItem("role") == "superadmin"





if (superadmin) {
    protectedRoutesOld.push(
        {
            key: 'admins',
            path: '/admins',
            component: React.lazy(() => import('views/Admins')),
            authority: [],
        },
        {
            key: 'founders',
            path: '/founders',
            component: React.lazy(() => import('views/ClubItem')),
            authority: [],
        },
        {
            key: 'manager',
            path: '/managers',
            component: React.lazy(() => import('views/Manager')),
            authority: [],
        },
        {
            key: 'collapseMenu.item1',
            path: '/club/:club_id',
            component: React.lazy(() => import('views/ClubItem')),
            authority: [],
        },
    )
}

if (manager) {
    protectedRoutesOld.push(
        {
            key: 'collapseMenu.item1',
            path: '/debtors',
            component: React.lazy(() => import('views/Users')),
            authority: [],
        },
    )
}

export const protectedRoutes = [...protectedRoutesOld]


import { lazy } from 'react';
import BaseLayout from 'components/layouts/base-layout';
import { AppRoute } from '../components/app-routes';
import AuthLayout from 'components/layouts/auth-layout';
import AuthGuard from 'common/auth/AuthGuard';
export const routesPaths = {
    base: '/',
    menu: '/menu',
    menuControl: '/menu/control',
    login: '/login',
    register: '/register',
};
export const appRoutes: AppRoute[] = [
    {
        exact: true,
        path: routesPaths.base,
        guard: AuthGuard,
        guardCondition: true,
        redirect: routesPaths.login,
        layout: BaseLayout,
        component: lazy(() => import('../pages/Home')),
    },
    {
        exact: true,
        path: routesPaths.menuControl + '/:menu_id',
        guard: AuthGuard,
        guardCondition: true,
        redirect: routesPaths.login,
        layout: BaseLayout,
        component: lazy(() => import('../pages/Menu')),
    },
    {
        exact: true,
        path: routesPaths.menuControl + '/:menu_id/:item_id',
        guard: AuthGuard,
        guardCondition: true,
        redirect: routesPaths.login,
        layout: BaseLayout,
        component: lazy(() => import('../pages/Menu')),
    },
    {
        exact: true,
        path: routesPaths.menu + '/:menu_id',
        layout: AuthLayout,
        component: lazy(() => import('../pages/ShowMenu')),
    },
    {
        exact: true,
        path: routesPaths.login,
        layout: AuthLayout,
        component: lazy(() => import('../pages/Login')),
    },
    {
        exact: true,
        path: routesPaths.register,
        layout: AuthLayout,
        component: lazy(() => import('../pages/Register')),
    },
    {
        exact: true,
        path: '*',
        layout: AuthLayout,
        component: lazy(() => import('../pages/Login')),
    },
];

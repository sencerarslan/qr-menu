import { Loading } from 'components/loading';
import { appRoutes } from 'config/routes';
import { HomePageProps } from 'pages/Home';
import { Fragment, Suspense, useCallback, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

export interface AppRoute {
    exact?: boolean;
    path: string;
    component?: any;
    layout?: any;
    guard?: any;
    guardCondition?: boolean;
    before?: () => Promise<any>;
    redirect?: string;
    className?: string;
}

type PageTypes = HomePageProps;

interface RouteComposerProps extends PageTypes {
    before?: () => Promise<any>;
    route: Pick<AppRoute, 'component' | 'layout' | 'guard' | 'redirect' | 'guardCondition' | 'className'>;
}

const DefaultGuardAndLayout = ({ children }: any) => {
    return <>{children}</>;
};

const RouteComposer = ({ route, before, ...restProps }: RouteComposerProps) => {
    const Component = route.component || Fragment;
    const Guard = route.guard || DefaultGuardAndLayout;
    const Layout = route.layout || DefaultGuardAndLayout;
    const rootClassName = route.className;

    const [ready, setReady] = useState<boolean>(false);
    const [initValue, setInitValue] = useState<any>();

    const beforeHandler = useCallback(async () => {
        let callbackValue;
        if (before) {
            callbackValue = await before();
        }
        setInitValue(callbackValue);
        setReady(true);
    }, [before]);

    useEffect(() => {
        beforeHandler();
    }, [beforeHandler]);

    return (
        <>
            {ready ? (
                <Guard guardCondition={route?.guardCondition} redirect={route?.redirect}>
                    <Layout className={rootClassName}>
                        <Component {...restProps} initValue={initValue} />
                    </Layout>
                </Guard>
            ) : (
                // TODO: add loading component...
                <Loading />
            )}
        </>
    );
};

export const renderRoutes = (routes: AppRoute[]) =>
    routes ? (
        <Routes>
            {routes.map((route) => {
                return (
                    <Route
                        key={route.path}
                        path={route.path}
                        index={route?.exact}
                        element={
                            <RouteComposer
                                before={route?.before}
                                route={{
                                    component: route.component,
                                    layout: route.layout,
                                    guard: route.guard,
                                    redirect: route.redirect,
                                    guardCondition: route.guardCondition,
                                    className: route.className,
                                }}
                            />
                        }
                    />
                );
            })}
        </Routes>
    ) : null;

function AppRoutes() {
    return <Suspense fallback={<Loading />}>{renderRoutes(appRoutes)}</Suspense>;
}

export default AppRoutes;

import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from '../config/routeConfig';
import { Loader } from 'components/Loader';
import MainLayout from 'layouts/MainLayout';

export const AppRouter = () => {
	return (
		<Suspense fallback={<Loader />}>
			<Routes>
				<Route path="/" element={<MainLayout />}>
					{
						Object.values(routeConfig).map(({ element, path }) => (
							<Route
								key={path}
								path={path}
								element={element}
							/>
						))
					}
				</Route>
			</Routes>
		</Suspense>
	);
};

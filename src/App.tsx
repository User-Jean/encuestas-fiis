import { Route, Routes } from 'react-router-dom';
import HomePage from './app/home/Home';
import LoginPage from './app/auth/LoginPage';
import RegisterPage from './app/auth/RegisterPage';
import RedirectIfAuth from './app/shared/RedirectIfAuth';
import ProtectedRoute from './app/shared/ProtectedRoute';
import { DashLayout } from './app/dash/DashLayout';
import { DashHome } from './app/dash/pages/DashHome';
import { EncuestaPage } from './app/encuesta/EncuestaPage';
import { EncuestaUserPage } from './app/encuesta_user/EncuestaUserPage';

function App() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route
				path="/auth"
				element={
					<RedirectIfAuth>
						<LoginPage />
					</RedirectIfAuth>
				}
			/>
			<Route
				path="/auth/register"
				element={
					<RedirectIfAuth>
						<RegisterPage />
					</RedirectIfAuth>
				}
			/>

			<Route
				path="/dash"
				element={
					<ProtectedRoute>
						<DashLayout />
					</ProtectedRoute>
				}
			>
				<Route index element={<DashHome />} />
			</Route>

			<Route
				path="/encuestas/:id"
				element={
					<ProtectedRoute>
						<DashLayout>
							<EncuestaPage />
						</DashLayout>
					</ProtectedRoute>
				}
			/>

			<Route
				path="/encuestas_user/:id"
				element={
					<ProtectedRoute>
						<DashLayout>
							<EncuestaUserPage />
						</DashLayout>
					</ProtectedRoute>
				}
			/>
		</Routes>
	);
}

export default App;

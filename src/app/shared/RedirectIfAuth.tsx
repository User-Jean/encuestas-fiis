import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const RedirectIfAuth: React.FC<React.PropsWithChildren> = ({ children }) => {
	const { loading, user } = useAuth();
	const isAuthenticated = !!user;

	if (loading) return <h1>Cargando...</h1>;

	if (isAuthenticated) return <Navigate to="/dash" />;

	return <>{children}</>;
};

export default RedirectIfAuth;

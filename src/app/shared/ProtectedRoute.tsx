import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const ProtectedRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
	const { user, loading } = useAuth();

	if (loading) return <h1>Cargando...</h1>;

	if (!user) return <Navigate to="/auth" />;

	return <>{children}</>;
};

export default ProtectedRoute;

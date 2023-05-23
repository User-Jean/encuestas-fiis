import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Home: React.FC = () => {
	const { loading, user } = useAuth();
	const isAuthenticated = !!user;

	if (loading) return <h1>Cargando...</h1>;

	if (!isAuthenticated) return <Navigate to="/auth" />;

	return <Navigate to="/dash" />;
};

export default Home;

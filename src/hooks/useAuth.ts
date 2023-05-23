import { useContext } from 'react';
import { AuthContext } from '../app/shared/AuthContext';

export default function useAuth() {
	const context = useContext(AuthContext);

	if (!context) throw new Error('No hay Auth Provider');

	return context;
}

import { AppBar, Toolbar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Colors } from '../../utils/colors';
import HeaderStyled from './Header.styled';
import useAuth from '../../../../hooks/useAuth';

const Header: React.FC = () => {
	const { user, logout } = useAuth();

	return (
		<AppBar position="fixed" sx={{ backgroundColor: Colors.Primary }}>
			<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Typography
					variant="h5"
					noWrap
					component="h2"
					fontWeight="bold"
					sx={{ cursor: 'pointer' }}
				>
					Encuesta FIIS
				</Typography>
				<Box display="flex" alignItems="center" gap={3}>
					<Typography fontWeight="bold">Bienvenido {user?.email}</Typography>
					<HeaderStyled.ButtonHeader onClick={logout}>
						<Typography fontSize="14px">Cerrar sesión</Typography>
					</HeaderStyled.ButtonHeader>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default Header;

import { AppBar, Toolbar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Colors } from '../../utils/colors';
import HeaderStyled from './Header.styled';
import useAuth from '../../../../hooks/useAuth';
import { Facebook, Instagram, Phone, Twitter, YouTube } from '@mui/icons-material';

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
				<div style={{display: 'flex', textAlign: 'center', fontSize: '15px'}}>
					<Phone fontSize='small' style={{cursor: 'pointer', marginRight: '5px'}}/> Telf: (+51) 748 0888
				</div>
				<div style={{display: 'flex', textAlign: 'center', fontSize: '15px'}}>
					<Facebook fontSize='small' style={{cursor: 'pointer'}}/> 
					<Twitter  fontSize='small' style={{cursor: 'pointer'}}/>
					<YouTube  fontSize='small' style={{cursor: 'pointer'}}/>
					<Instagram  fontSize='small' style={{cursor: 'pointer', marginRight: '5px'}}/>
					Redes sociales</div>
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

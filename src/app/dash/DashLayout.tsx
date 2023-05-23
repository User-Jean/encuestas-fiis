import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import Header from '../shared/components/Header/Header';

export const DashLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				width: '100vw',
				height: '100vh',
				boxSizing: 'border-box',
			}}
		>
			<Header />
			<Container
				sx={{ marginTop: '100px', marginBottom: 5, overflowY: 'auto' }}
			>
				<Outlet />
				{children}
			</Container>
		</Box>
	);
};

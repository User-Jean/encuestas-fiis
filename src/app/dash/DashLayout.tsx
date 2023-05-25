import { Facebook, Instagram, Twitter, YouTube } from '@mui/icons-material';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import Header from '../shared/components/Header/Header';
import './DashLayout.css'

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
			<div style={{
				position: 'fixed',
				top: '30%',
				display: 'flex',
				flexDirection: 'column'
			}}
			>
				<a href='https://www.facebook.com/UNFV.EDU' target='_blank' className='icon fb'>
					<span>Síguenos en Facebook </span><Facebook htmlColor='white'/>
				</a>
				<a href='https://twitter.com/UNFVoficial' target='_blank' className='icon tw'>
					<span>Síguenos en Twiter </span><Twitter htmlColor='white'/>
				</a>
				<a href='https://www.youtube.com/user/PrensaUNFV' target='_blank' className='icon ig'>
					<span>Síguenos en Instagram </span><Instagram htmlColor='white'/>
				</a>
				<a href='https://www.instagram.com/unfvoficial/' target='_blank' className='icon yt'>
					<span>Síguenos en Youtube </span><YouTube htmlColor='white'/>
				</a>
			</div>
			<Container
				sx={{ marginTop: '100px', marginBottom: 5, overflowY: 'auto' }}
			>
				<Outlet />
				{children}
			</Container>
		</Box>
	);
};

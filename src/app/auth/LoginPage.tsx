import { AccountCircle } from '@mui/icons-material';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import amber from '@mui/material/colors/amber';
import { Colors } from '../shared/utils/colors';
import ImgLogo from '../../assets/images/logo.jpg';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as Yup from 'yup';
import LoginStyled from './Login.styled';
import useAuth from '../../hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage: React.FC = () => {
	const { login } = useAuth();
	const [hasUser] = useState<boolean>(false);
	const navigate = useNavigate();

	const validationSchema = Yup.object().shape({
		email: Yup.string().email().required('El correo es requerido'),
		password: Yup.string()
			.min(8, 'Password should be of minimum 8 characters length')
			.required('Password is required'),
	});

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: validationSchema,
		onSubmit: ({ email, password }) => {
			verifyLogin(email, password);
		},
	});

	const verifyLogin = (email: string, password: string) => {
		login({ email, password }).then(() => {
			navigate('/dash');
			toast.success('Usuario correcto', {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		}).catch((e) => {
			toast.error('Error de credenciales', {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		});
	};

	return (
		<Grid
			display="flex"
			justifyContent="center"
			alignItems="center"
			width="100vw"
			height="100vh"
			sx={{ backgroundColor: amber[50] }}
		>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
				/>
			<Card sx={{ width: '70%', height: 450 }}>
				<Grid container sx={{ width: '100%', height: '100%' }}>
					<Grid item xs={6} height="100%">
						<LoginStyled.Logo src={ImgLogo} alt="" />
					</Grid>
					<Grid item xs={6} height="100%">
						<LoginStyled.FormContainer onSubmit={formik.handleSubmit}>
							<Stack
								sx={{
									alignItems: 'center',
									justifyContent: 'center',
									height: '100%',
									padding: 10,
								}}
								spacing={1}
							>
								<Typography fontWeight="bold" fontSize={24}>
									Iniciar Sesión
								</Typography>
								<AccountCircle
									sx={{
										fontSize: 80,
										color: Colors.Primary,
									}}
								/>
								{hasUser && (
									<Typography
										sx={{
											backgroundColor: Colors.Close,
											width: '100%',
											color: Colors.White,
											textAlign: 'center',
											padding: '6px 0',
											borderRadius: 1,
										}}
										fontWeight="bold"
										fontSize={14}
									>
										Credenciales incorrectas
									</Typography>
								)}
								<TextField
									fullWidth
									size="small"
									type="email"
									name="email"
									label="Usuario"
									onChange={formik.handleChange}
									value={formik.values.email}
									error={formik.touched.email && Boolean(formik.errors.email)}
									helperText={formik.touched.email && formik.errors.email}
								/>
								<TextField
									fullWidth
									size="small"
									type="password"
									name="password"
									label="password"
									onChange={formik.handleChange}
									value={formik.values.password}
									error={
										formik.touched.password && Boolean(formik.errors.password)
									}
									helperText={formik.touched.password && formik.errors.password}
								/>
								<LoginStyled.ButtonLogin type="submit">
									<Typography fontWeight="bold" fontSize={14}>
										Ingresar
									</Typography>
								</LoginStyled.ButtonLogin>

								<Link to="/auth/register">Registrarse</Link>
							</Stack>
						</LoginStyled.FormContainer>
					</Grid>
				</Grid>
			</Card>
		</Grid>
	);
};

export default LoginPage;

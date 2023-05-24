import { ArrowCircleLeft } from '@mui/icons-material';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { finalizarEncuesta, getEncuesta, getPreguntas } from '../../services/db/encuestas';
import { Encuesta, Question } from '../shared/types';
import { Colors } from '../shared/utils/colors';
import './EncuestaUserPage.css';
import CardQuestionUser from '../shared/components/CardQuestionUser';

export const EncuestaUserPage: React.FC = () => {
	const [questions, setQuestions] = useState<Question[] | null>(null);
	const [encuesta, setEncuesta] = useState<Encuesta | null>(null)
	const [loading, setLoading] = useState<Boolean>(false);
	const navigate = useNavigate();
	const params = useParams();
	const id = params.id as string;

	const loadData = async () => {
		const queryPreguntas = await getPreguntas(id);
		const queryEncuesta = await getEncuesta(id);

		setEncuesta({
			id: queryEncuesta.id,
			title: queryEncuesta.data()?.title,
			description: queryEncuesta.data()?.description,
			fecha: new Date(queryEncuesta?.data()?.fecha.seconds * 1000),
			questions : []
		});
		
		const _questions = [] as Question[];
		
		queryPreguntas.forEach(question => {
			_questions.push({
				id: question.id,
				name : question.data().name,
				type : question.data().type,
				options: question.data().options
			})
		})
		setQuestions(_questions)
	};

	const finalizar = async () => {
		if(encuesta) {
			setLoading(true)
			await finalizarEncuesta(encuesta.id)
			navigate('/dash');
		}
	}

	useEffect(() => {
		loadData();
	}, []);

	return (
		<Stack spacing={4} position="relative">
			<Box
				display="flex"
				alignItems="center"
				justifyContent="space-between"
				position="fixed"
				width={1135}
				sx={{ backgroundColor: Colors.White, zIndex: 9 }}
				padding={2}
			>
				<Typography variant="h5" component="h5" style={{display: 'flex', alignItems: 'center'}}>
					<Link to={`/dash`}>
						<ArrowCircleLeft fontSize='large' htmlColor='#f57c00' 
							style={{cursor: 'pointer', paddingRight: '5px'}}/>
					</Link>
					<div style={{fontWeight: 'bold', textTransform: 'uppercase'}}>{encuesta?.title}</div>
				</Typography>
			</Box>
			<div style={{marginBottom: '50px'}}></div>
			{questions == null 
				? <p style={{marginTop: '80px', padding: '16px', fontSize: '1.3rem', fontWeight: 'bold'}}>Cargando data... </p>
				: questions.length === 0
					? <p style={{marginTop: '80px', padding: '16px', fontSize: '1.3rem', fontWeight: 'bold'}}>No hay preguntas en la encuesta... </p>
					: questions.map((question) => <CardQuestionUser question={question}/>)
			}
			<div style={{textAlign: 'center'}}>
				<Button 
					onClick={finalizar}
					style={{padding: '10px 15px'}}
					sx={{
						backgroundColor: Colors.Primary,
						color: 'white',
						':hover': {
							backgroundColor: Colors.Secundary,
						},
					}}> 
					Finalizar
				</Button>
			</div>
			<div className={`container ${loading ? '' : 'd-none'}`}><div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>
		</Stack>
	);
};

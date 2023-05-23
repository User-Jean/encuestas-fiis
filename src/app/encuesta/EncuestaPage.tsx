import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEncuesta, getPreguntas, savePregunta } from '../../services/db/encuestas';
import { Encuesta, Question } from '../shared/types';
import './EncuestaPage.css';
import { Box, Button, Stack, Typography } from '@mui/material';
import CardQuestion from '../shared/components/CardQuestion';
import { Colors } from '../shared/utils/colors';

export const EncuestaPage: React.FC = () => {
	const [questions, setQuestions] = useState<Question[] | null>(null);
	const [encuesta, setEncuesta] = useState<Encuesta | null>(null)
	const [loading, setLoading] = useState<Boolean>(false);
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

	const addQuestion = async () => {
		if(encuesta) {
			setLoading(true)
			await savePregunta(encuesta.id);
			await loadData();
			setLoading(false)
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
				<Typography variant="h5" component="h5">
					Modulo de preguntas
				</Typography>
				<Button
					onClick={addQuestion}
					sx={{
						backgroundColor: Colors.Primary,
						color: 'white',
						textTransform: 'capitalize',
						':hover': {
							backgroundColor: Colors.Secundary,
						},
					}}
				>
					Agregar pregunta
				</Button>
			</Box>
			{questions == null 
				? <p style={{marginTop: '80px', padding: '16px', fontSize: '1.3rem', fontWeight: 'bold'}}>Cargando data... </p>
				: questions.length === 0
					? <p style={{marginTop: '80px', padding: '16px', fontSize: '1.3rem', fontWeight: 'bold'}}>No hay preguntas en la encuesta... </p>
					: questions?.map((question) => (
						<CardQuestion
							key={question.id}
							loadData={loadData}
							question={question}
							encuesta={encuesta as Encuesta}
							setLoading={setLoading}
						/>
					))
			}
			<div className={`container ${loading ? '' : 'd-none'}`}><div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>
		</Stack>
	);
};

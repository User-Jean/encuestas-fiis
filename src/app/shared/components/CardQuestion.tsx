import { CheckCircleSharp } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	FormControl,
	FormLabel,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { deletePregunta, updatePregunta } from '../../../services/db/encuestas';
import { Colors } from '../../shared/utils/colors';
import { Encuesta, Question, TypeQuestion } from '../types';

interface ButtonsCrud {
	name: any;
	bgColor: any;
	icon: any;
	handle: () => void;
}

export const ButtonsCRUD: React.FC<ButtonsCrud> = ({
	name,
	bgColor,
	icon,
	handle
}) => {
	return (
		<Button
			onClick={() => handle()}
			size="small"
			sx={{
				color: bgColor,
				borderWidth: '1px',
				borderColor: bgColor,
				borderStyle: 'solid',
				alignItems: 'flex-end',
				'&:hover': { backgroundColor: bgColor, color: Colors.White },
			}}
		>
			{name} {icon}
		</Button>
	);
};

export interface CardQuestionInterface {
	question: Question;
	encuesta: Encuesta;
	loadData: any;
	setLoading: any;
}

const CardQuestion: React.FC<CardQuestionInterface> = ({
	encuesta,
	question,
	loadData,
	setLoading
}) => {
	const [options, setOptions] = useState<string[]>(['opcion 1']);
	const [loadingCard, setLoadingCard] = useState<Boolean>(false);

	const editOption = (index: number) => {
		const optionsSelected = options;
		optionsSelected[index] = values.option;
		setOptions([...optionsSelected]);
		setFieldValue('option', '');
	};

	const deleteOption = (index: number) => {
		const optionsFilter = options.filter((_, select) => select !== index);
		setOptions([...optionsFilter]);
	};

	const saveOption = () => {
		setOptions([...options, values.option]);
		setFieldValue('option', '');
	};

	const operations = [
		{ name: 'guardar', bgColor: Colors.Save, icon: <SaveIcon />, handle: async() => {
			setLoadingCard(true)
			await updatePregunta(encuesta.id, question.id, {...values, name: values.question, options});
			setLoadingCard(false)
		}},
		// { name: 'editar', bgColor: Colors.Edit, icon: <EditIcon /> },
		{ name: 'eliminar', bgColor: Colors.Close, icon: <DeleteIcon />, handle: async () => {
			setLoading(true)
			await deletePregunta(encuesta.id, question.id)
			await loadData()
			setLoading(false)
		} },
	];

	const onSubmit = () => {};

	const validationSchema = Yup.object().shape({
		question: Yup.string().required('El título es requerido'),
		description: Yup.string().required('La descripción es requerida'),
	});

	const { values, setFieldValue, handleChange, handleSubmit, errors, touched } =
		useFormik({
			initialValues: {
				question: 'Ingrese una pregunta',
				type: TypeQuestion.Regular,
				option: '',
			},
			validationSchema,
			onSubmit: () => onSubmit(),
		});

	useEffect(() => {
		setFieldValue('question', question.name);
		setFieldValue('type', question.type);
		setOptions([...question.options]);
	}, [question]);

	return (
		<form onSubmit={handleSubmit} style={{ marginTop: 50, position: 'relative' }}>
			<Card>
				<CardContent
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'flex-end',
					}}
				>
					<TextField
						sx={{ minWidth: 500 }}
						autoFocus
						margin="normal"
						label="Pregunta"
						placeholder="Ingresa la pregunta"
						type="text"
						variant="filled"
						name="question"
						onChange={handleChange}
						value={values.question}
						error={touched.question && Boolean(errors.question)}
						helperText={touched.question && errors.question}
					/>
					<FormControl variant="filled" sx={{ m: 1, minWidth: 200 }}>
						<InputLabel id="demo-simple-select-standard-label">
							Tipo de pregunta
						</InputLabel>
						<Select
							labelId="demo-simple-select-standard-label"
							id="demo-simple-select-standard"
							value={values.type}
							onChange={handleChange}
							name="type"
							label="Tipo de pregunta"
						>
							<MenuItem value={TypeQuestion.Regular}>
								{TypeQuestion.Regular}
							</MenuItem>
							<MenuItem value={TypeQuestion.Multiple}>
								{TypeQuestion.Multiple}
							</MenuItem>
						</Select>
					</FormControl>
				</CardContent>
				{values.type === TypeQuestion.Multiple && (
					<CardContent>
						<FormControl>
							<Box display="flex" alignItems="center" gap={4}>
								<FormLabel id="demo-radio-buttons-group-label">
									Opciones
								</FormLabel>
								<TextField
									margin="dense"
									placeholder="Ingresa la opcion"
									type="text"
									variant="standard"
									name="option"
									size="small"
									onChange={handleChange}
									value={values.option}
									error={touched.option && Boolean(errors.option)}
									helperText={touched.option && errors.option}
									sx={{ minWidth: 400 }}
								/>
								<Button
									sx={{ backgroundColor: Colors.Save }}
									onClick={saveOption}
								>
									<SaveIcon sx={{ color: Colors.White }} fontSize="medium" />
								</Button>
							</Box>
							<Stack spacing={2} marginTop={3}>
								{options.map((option, index) => (
										<Box display="flex" alignItems="center" gap={2}>
											<CheckCircleSharp sx={{ color: Colors.Primary }} />
											<Typography>{option}</Typography>
											<Button onClick={() => deleteOption(index)}>
												<DeleteIcon
													sx={{ color: Colors.Close }}
													fontSize="medium"
												/>
											</Button>
										</Box>
								))}
							</Stack>
						</FormControl>
					</CardContent>
				)}
				<CardActions sx={{ justifyContent: 'flex-end' }}>
					{operations.map((operation) => (
						<ButtonsCRUD
							{...operation}
							key={`operation-${operation.name}`}
						/>
					))}
				</CardActions>
			</Card>
			<div className={`container ${loadingCard ? '' : 'd-none'}`}><div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>
		</form>
	);
};

export default CardQuestion;

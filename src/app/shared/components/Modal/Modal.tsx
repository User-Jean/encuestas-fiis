import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Encuesta } from '../../types';
import {
	saveEncuesta,
	updateEncuesta,
} from '../../../../services/db/encuestas';

export enum Type {
	Edit = 'Editar',
	Add = 'Agregar',
}

export enum TitleModal {
	Edit = 'Editar encuesta',
	Add = 'Agregar nueva encuesta',
}

interface ModalInterface {
	type: Type;
	open: boolean;
	setOpen: (value: boolean) => void;
	encuesta?: Encuesta;
	loadData: () => void;
}

const validationSchema = Yup.object().shape({
	title: Yup.string().required('El título es requerido'),
	description: Yup.string().required('La descripción es requerida'),
});

const Modal: React.FC<ModalInterface> = ({
	open,
	setOpen,
	type,
	encuesta = {} as Encuesta,
	loadData
}) => {
	console.log(encuesta.id);
	const { id, title, description } = encuesta as Encuesta;

	const handleClose = () => {
		setOpen(false);
	};

	const onSubmit = async (values: Partial<Encuesta>) => {
		switch (type) {
			case Type.Add:
				await saveEncuesta({
					title: values.title!,
					description: values.description!,
					questions: values.questions! ?? [],
				});
				loadData();
				resetForm();
				handleClose();
				break;
			case Type.Edit:
				const encuestaEdited: Partial<Encuesta> = {
					...values,
					id: id,
				};
				await updateEncuesta(encuestaEdited.id!, encuestaEdited);
				loadData();
				resetForm();
				handleClose();
				break;
		}
	};

	const { handleChange, resetForm, handleSubmit, errors, values, touched } =
		useFormik({
			initialValues: {
				title: type === Type.Add ? '' : `${title ?? ''}`,
				description: type === Type.Add ? '' : `${description ?? ''}`,
			},
			validationSchema: validationSchema,
			onSubmit: (values: Partial<Encuesta>) => onSubmit(values),
		});

	return (
		<>
			<Dialog open={open} onClose={handleClose}>
				<form onSubmit={handleSubmit}>
					<DialogTitle>
						{type === Type.Add ? TitleModal.Add : TitleModal.Edit}
					</DialogTitle>
					<DialogContent>
						<TextField
							autoFocus
							margin="dense"
							label="Título"
							placeholder="Ingresa el título"
							type="text"
							fullWidth
							variant="standard"
							name="title"
							onChange={handleChange}
							value={values.title}
							error={touched.title && Boolean(errors.title)}
							helperText={touched.title && errors.title}
						/>
						<TextField
							autoFocus
							margin="dense"
							label="Descripción"
							placeholder="Ingresa una descripción"
							type="text"
							fullWidth
							variant="standard"
							name="description"
							onChange={handleChange}
							value={values.description}
							error={touched.description && Boolean(errors.description)}
							helperText={touched.description && errors.description}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Cancelar</Button>
						<Button type="submit">
							{type === Type.Add ? Type.Add : Type.Edit} Encuesta
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</>
	);
};

export default Modal;

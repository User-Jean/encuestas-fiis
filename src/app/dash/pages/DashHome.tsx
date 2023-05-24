import { useState, useEffect } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Modal, { Type } from '../../shared/components/Modal/Modal';
import Table, { Operations } from '../../shared/components/Table/Table';
import { Colors } from '../../shared/utils/colors';
import { Link } from 'react-router-dom';
import './DashHome.css';
import { Encuesta } from '../../shared/types';
import { getEncuestas } from '../../../services/db/encuestas';

export const DashHome: React.FC = () => {
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
	const [encuestas, setEncuestas] = useState<Encuesta[]>([]);
	const isAdmin = localStorage.getItem('perfil') == 'admin' ? true : false;

	const loadData = async () => {
		const querySnapshot = await getEncuestas();
		const docs: Encuesta[] = [];
		console.log(querySnapshot);
		querySnapshot.forEach((doc) => {
			console.log(doc.data())
			// @ts-ignore
			docs.push({
				...doc.data(),
				id: doc.id,
				fecha: new Date(doc.data().fecha.seconds * 1000),
			});
		});
		setEncuestas(docs);
	};

	const columns: GridColDef[] = [
		{ field: 'id', headerName: 'ID', maxWidth: 100 },
		{ field: 'title', headerName: 'Título', minWidth: 200 },
		{ field: 'description', headerName: 'Descripción', width: 360 },
		{
			field: 'fecha',
			headerName: 'Fecha',
			type: 'date',
			maxWidth: 200,
		},
		{
			field: 'actions',
			headerName: 'Acciones',
			renderCell: ({ row }: GridRenderCellParams) => (
				<Operations encuesta={row} />
			),
			minWidth: 180,
		},
		{
			field: 'view',
			headerName: 'Ver encuesta',
			renderCell: ({ row }: GridRenderCellParams) => (
				<Link className="linkEncuesta" to={`/encuestas/${row.id}`}>
					Ver encuesta
				</Link>
			),
			minWidth: 180,
		},
	];

	const columnsUsers: GridColDef[] = [
		{ field: 'id', headerName: 'ID', maxWidth: 100 },
		{ field: 'title', headerName: 'Título', minWidth: 200 },
		{ field: 'description', headerName: 'Descripción', width: 360 },
		{
			field: 'fecha',
			headerName: 'Fecha',
			type: 'date',
			maxWidth: 200,
		},
		{
			field: 'status',
			headerName: 'Estado',
			minWidth: 180,
		},
		{
			field: 'view',
			headerName: 'Encuesta',
			renderCell: ({ row }: GridRenderCellParams) => {
				if(row.status != 'Finalizado')
					return <Link className="linkEncuesta" to={`/encuestas_user/${row.id}`}>
						Realizar Encuesta
					</Link>
			},
			minWidth: 180,
		},
	];

	useEffect(() => {
		loadData();
	}, []);

	return (
		<Stack spacing={4}>
			<Box display="flex" alignItems="center" justifyContent="space-between">
				<Typography variant="h5" component="h5">
					Modulo de Encuestas
				</Typography>
				{isAdmin ? <Button
					onClick={() => setIsOpenModal(true)}
					sx={{
						backgroundColor: Colors.Primary,
						color: 'white',
						textTransform: 'capitalize',
						':hover': {
							backgroundColor: Colors.Secundary,
						},
					}}
				>
					Crear Encuesta
				</Button> : ''}
			</Box>
			<Table rows={encuestas} columns={isAdmin ? columns : columnsUsers} />
			<Modal open={isOpenModal} setOpen={setIsOpenModal} type={Type.Add} />
		</Stack>
	);
};

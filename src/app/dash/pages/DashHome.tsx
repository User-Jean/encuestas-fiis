import { Box, Button, Stack, Typography } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ImgVillarreal from '../../../assets/images/villarreal.png';
import { getEncuestaByUser, getEncuestas } from '../../../services/db/encuestas';
import LoginStyled from '../../auth/Login.styled';
import Modal, { Type } from '../../shared/components/Modal/Modal';
import Table, { Operations } from '../../shared/components/Table/Table';
import { Encuesta } from '../../shared/types';
import { Colors } from '../../shared/utils/colors';
import './DashHome.css';

export const DashHome: React.FC = () => {
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
	const [encuestas, setEncuestas] = useState<Encuesta[]>([]);
	const [encuestasFinalizadas, setEncuestasFinalizadas] = useState<string[]>([]);
	const isAdmin = localStorage.getItem('perfil') == 'admin' ? true : false;

	const loadData = async () => {
		const querySnapshot = await getEncuestas();
		const docs: Encuesta[] = [];
		querySnapshot.forEach((doc) => {
			// @ts-ignore
			docs.push({
				...doc.data(),
				id: doc.id,
				fecha: new Date(doc.data().fecha.seconds * 1000),
			});
		});
		setEncuestas(docs);

		const _encuestas = await getEncuestaByUser(localStorage.getItem('idUser') ?? '');
		const object:string[] = []
		_encuestas.forEach((e) => {
			// @ts-ignore
			object.push(e.data().idEncuesta);
		})
		setEncuestasFinalizadas(object);
	};

	const columns: GridColDef[] = [
		{ field: 'id', headerName: 'ID', maxWidth: 100 },
		{ field: 'title', headerName: 'Título', minWidth: 200 },
		{ field: 'description', headerName: 'Descripción', width: 250 },
		{ field: 'count', headerName: 'N° Respondieron', width: 150, renderCell: ({ row }: GridRenderCellParams) => row.count ?? 0 },
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
				<Operations encuesta={row} loadData={loadData} />
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
			renderCell: ({ row }: GridRenderCellParams) => {
				if(!encuestasFinalizadas.includes(row.id))
					return 'Pendiente'
				else 
					return 'Finalizado'
			},
			minWidth: 180,
		},
		{
			field: 'view',
			headerName: 'Encuesta',
			renderCell: ({ row }: GridRenderCellParams) => {
				if(!encuestasFinalizadas.includes(row.id))
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
			<LoginStyled.Logo style={{width: '250px'}} src={ImgVillarreal} alt="" />
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
			<Modal open={isOpenModal} setOpen={setIsOpenModal} loadData={loadData} type={Type.Add} />
		</Stack>
	);
};

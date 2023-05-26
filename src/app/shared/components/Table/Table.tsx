import { useState } from 'react';
import { Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Colors } from '../../utils/colors';
import Modal, { Type } from '../Modal/Modal';
import { Encuesta } from '../../types';
import { deleteEncuesta } from '../../../../services/db/encuestas';

interface OperationsInterface {
	encuesta: Encuesta;
	loadData: () => void;
}

export const Operations: React.FC<OperationsInterface> = ({ encuesta, loadData }) => {
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

	const remove = async () => {
		await deleteEncuesta(encuesta.id);
		loadData();
		// dispatch(removeEncuesta(encuesta.id));
	};

	const update = () => {
		setIsOpenModal(true);
	};

	return (
		<Box display="flex" gap={2}>
			<Button onClick={update}>
				<EditIcon sx={{ color: Colors.Edit }} fontSize="medium" />
			</Button>
			<Button onClick={remove}>
				<DeleteIcon sx={{ color: Colors.Close }} fontSize="medium" />
			</Button>
			<Modal
				open={isOpenModal}
				setOpen={setIsOpenModal}
				type={Type.Edit}
				encuesta={encuesta}
				loadData={loadData}
			/>
		</Box>
	);
};

interface TableInterface {
	rows: any[];
	columns: any[];
}

const Table: React.FC<TableInterface> = ({ rows, columns }) => {
	return (
		<div style={{ height: 400, width: '100%' }}>
			<DataGrid
				rows={rows}
				columns={columns}
				// rowsPerPageOptions={[5]}
			/>
		</div>
	);
};

export default Table;

import { Button, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { useState, useEffect } from 'react';
import { activarEncuesta } from '../../../services/db/encuestas';

interface ModalInterface {
	open: boolean;
	setOpen: (value: boolean) => void;
	loadData: () => void;
	idEncuesta: string;
}

const ModalActivateEncuesta: React.FC<ModalInterface> = ({
	open,
	setOpen,
	idEncuesta,
  loadData
}) => {
  const spaceWithZero = (leading: string | number) => {
    return ('0'+ leading).slice(-2)
  }
  const dates = (new Date());
  const [date, setDate] = useState(`${dates.getFullYear()}-${spaceWithZero(dates.getMonth() + 1)}-${spaceWithZero(dates.getDate())}T${spaceWithZero(dates.getHours())}:${spaceWithZero(dates.getMinutes())}`);
  console.log(date);

  useEffect(() => {
  }, [])


	const handleClose = () => {
		setOpen(false);
	};

  const activar = async () => {
    console.log(idEncuesta)
    await activarEncuesta(idEncuesta, { fechaFinal : new Date(date)});
    setOpen(false)
    loadData();
	};

	return (
		<>
			<Dialog open={open} onClose={handleClose}>
        <DialogTitle>Activar Encuesta</DialogTitle>
        <DialogContent>
          Tiempo de finalización de la encuesta: <br/><br/>
          <input type='datetime-local' min={dates.toISOString().slice(0, 16)} value={date} onChange={(e) => setDate(e.target.value)}/>
        </DialogContent>
        <DialogActions>
						<Button onClick={activar}>Activar</Button>
					</DialogActions>
			</Dialog>
		</>
	);
};

export default ModalActivateEncuesta;


import { DialogContent, DialogTitle } from '@mui/material';
import Dialog from '@mui/material/Dialog';

interface ModalInterface {
	open: boolean;
	setOpen: (value: boolean) => void;
	usuarios: string[];
}

const ModalUser: React.FC<ModalInterface> = ({
	open,
	setOpen,
	usuarios
}) => {

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Dialog open={open} onClose={handleClose}>
        <DialogTitle>Usuarios</DialogTitle>
        <DialogContent>
          <ul>
            {usuarios.map(user => (
              <li>{user}</li>
            ))}
          </ul>
        </DialogContent>
			</Dialog>
		</>
	);
};

export default ModalUser;

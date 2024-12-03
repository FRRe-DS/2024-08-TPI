import axios from 'axios';
import { Button } from 'semantic-ui-react';

export default function DeleteEvento({ id }) {
    const deleteData = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/escultura/${id}`);
            alert('Evento eliminado correctamente');
        } catch (error) {
            console.error('Error al eliminar el evento', error);
        }
    };

    return (
        <Button onClick={deleteData} color="red">
            Eliminar Evento
        </Button>
    );
}
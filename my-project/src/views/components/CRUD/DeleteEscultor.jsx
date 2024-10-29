import axios from 'axios';
import { Button } from 'semantic-ui-react';

export default function DeleteEscultor({ id_escultor }) {
    const deleteData = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/escultor/${id_escultor}`);
            alert('Escultura eliminada correctamente');
        } catch (error) {
            console.error('Error al eliminar al escultor', error);
        }
    };

    return (
        <Button onClick={deleteData} color="red">
            Eliminar Escultor
        </Button>
    );
}

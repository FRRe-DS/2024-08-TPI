import axios from 'axios';
import { Button } from 'semantic-ui-react';

export default function DeleteEscultura({ id_escultura }) {
    const deleteData = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/escultura/${id_escultura}`);
            alert('Escultura eliminada correctamente');
        } catch (error) {
            console.error('Error al eliminar la escultura', error);
        }
    };

    return (
        <Button onClick={deleteData} color="red">
            Eliminar Escultura
        </Button>
    );
}

import { useParams } from "react-router-dom"; 

const PresentacionQR = () => {
  const { id } = useParams();  // Obtener el id del escultor desde la URL

  return (
    <div>
      <h1>Escultor: {id}</h1>  {/* Mostrar el nombre del escultor o algún detalle más en el futuro */}
    </div>
  );
};

export default PresentacionQR;

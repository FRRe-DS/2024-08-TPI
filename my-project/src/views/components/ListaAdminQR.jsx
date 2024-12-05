import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '/public/css/ListaEscultoresQR.css';

const ListaAdminQR = () => {
  const [escultores, setEscultores] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEscultores = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/escultor/evento/activo"); //Aca tiene que ser escultores que participan en el evento acutal
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        const data = await response.json();
        console.log('Datos recibidos:', data); // Log para verificar la respuesta
        setEscultores(data);
      } catch (err) {
        console.error("Error al obtener los escultores activos:", err);
        setError("No se pudieron cargar los escultores activos.");
      }
    };
    fetchEscultores();
  }, []);

  const filteredEscultores = escultores.filter((escultor) =>
    `${escultor.nombre_esc} ${escultor.apellido}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="escultores-container">
      <h2>Escultores del evento actual</h2>
      <input
        type="text"
        placeholder="Buscar escultor"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <div className="scroll-container">
          <ul className="escultores-list">
            {filteredEscultores.map((escultor) => (
              <li key={escultor.id_escultor} className="escultor-item">
                <h4>{escultor.nombre_esc} {escultor.apellido}</h4>
                <Link to={`/qr/${escultor.id_escultor}`}>
                  <button className="view-details-btn">Ver QR</button>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ListaAdminQR;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '/public/css/ListaEscultoresQR.css';

const ListaAdminQR = () => {
  const [escultores, setEscultores] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEscultores = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/escultor/");
        const data = await response.json();
        setEscultores(data);
      } catch (err) {
        console.error("Error al obtener los escultores:", err);
        setError("No se pudieron cargar los escultores.");
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
        <ul className="escultores-list">
          {filteredEscultores.map((escultor) => (
            <li key={escultor.id_escultor} className="escultor-item">
              <h4>{escultor.nombre_esc} {escultor.apellido}</h4>
              <Link to={`/qr:/id${escultor.id_escultor}`}>
                <button className="view-details-btn">Ver QR</button>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListaAdminQR;

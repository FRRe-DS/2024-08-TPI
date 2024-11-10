import { useState, useEffect } from 'react';

const Eventos = () => {
    const [eventos, setEventos] = useState([]);

    useEffect (() => {
        const fetchEventos = async () =>{
            try {
                const response = await fetch('http://localhost:3000/api/eventos');
                const data = await response.json()
                setEventos(data)
            } catch(error){
                console.error('Error al traer los eventos', error)
            }
        }
        fetchEventos();
        },[]);
        return(
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-10">
          {eventos.map((evento) => (
            <div key={evento.id} className="relative bg-gradient-to-t from-[#9fa3a9] to-white shadow-md p-4 rounded-lg flex flex-col items-center transition-all duration-300 hover:shadow-xl"
>
              <div className="flex flex-col justify-between h-full">
                <div className="flex justify-between items-center border-b-2 border-gray-400 pb-2 mb-4">
                  <h2 className="text-xl m-0">{evento.nombre}</h2>
                  <p className="bg-[#393d42] text-white text-sm py-1 px-2 rounded-lg">{evento.tematica}</p>
                </div>
                <div className="grid grid-cols-1 gap-y-2">
                  <p className="text-sm mb-1"><strong>Fecha:</strong> {evento.fecha}</p>
                  <p className="text-sm mb-1"><strong>Lugar:</strong> {evento.lugar}</p>
                  <p className="text-sm text-black">{evento.descripcion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        );
      };

export default Eventos;
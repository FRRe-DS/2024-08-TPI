

import { useState, useEffect } from 'react';

const useCountdown = (initialTime) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft === 0) return; // Si el tiempo ya llegó a 0, no se inicia el contador.

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 1) {
          clearInterval(interval); // Detener el contador cuando llegue a 0
        }
        return prevTime - 1;
      });
    }, 1000); // Actualizar cada segundo

    return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonte
  }, [timeLeft]);

  return timeLeft;
};

export default useCountdown;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './views/components/Header';
import Footer from './views/components/Footer';
import Cuerpo from './views/components/Cuerpo';
import Eventos from './views/components/Eventos';
import Escultores from './views/components/Escultores';
import Esculturas from './views/components/Esculturas';
import Votacion from './views/components/Votacion';
import RutasProtegidas from './views/components/RutasProtegidas';
import Create from './views/components/create-escultor'; // Asegúrate de importar el componente Create}
import Admin from './views/components/CRUD';


const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen"> 
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Cuerpo />} />
            <Route path="/eventos" element={<Eventos />} />
            <Route path="/escultores" element={<Escultores />} />
            <Route path="/esculturas" element={<Esculturas />} />
            <Route path="/create" element={<Create />} />
            <Route path="/votacion/:id_escultor" element={<Votacion />} />
            <Route 
              path="/votacion" 
              element={
                <RutasProtegidas component={Votacion} role="user" />
              }
            />
            <Route 
              path="/Admin" 
              element={
                <RutasProtegidas component={Admin} role="admin" />
              }
            />
            {/* Ruta 404 */}
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;



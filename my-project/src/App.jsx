import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './views/components/Header';
import Footer from './views/components/Footer';
import Cuerpo from './views/components/Cuerpo';
import Eventos from './views/components/Eventos';
import Escultores from './views/components/Escultores';
import Esculturas from './views/components/Esculturas';
import Votacion from './views/components/Votacion';
import RutasProtegidas from './views/components/RutasProtegidas';
import CreateEscultor from './views/components/CRUD/CreateEscultor'; 
import UpdateEscultor from './views/components/CRUD/UpdateEscultor';
import DeleteEscultor from './views/components/CRUD/DeleteEscultor';
import Admin from './views/components/CRUD';
import CreateEscultura from './views/components/CRUD/CreateEscultura'
import UpdateEscultura from './views/components/CRUD/UpdateEscultura';
import DeleteEscultura from './views/components/CRUD/DeleteEscultura';


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
            <Route path="/create" element={<CreateEscultor />} />
            <Route path="/modificar-escultor/:id_escultor" element={<UpdateEscultor />} />
            <Route path="/delete-escultor" element={<DeleteEscultor />} />
            <Route path="/votacion/:id_escultor" element={<Votacion />} />
            <Route path="/create-escultura" element={<CreateEscultura />} />
            <Route path="/modificar-escultura/:id_escultura" element={<UpdateEscultura />} />
            <Route path="/delete-escultura" element={<DeleteEscultura />} />
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



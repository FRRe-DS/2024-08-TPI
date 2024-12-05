import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './views/components/Header';
import Footer from './views/components/Footer';
import Cuerpo from './views/components/Cuerpo';
import Eventos from './views/components/Eventos';
import Escultores from './views/components/Escultores';
import Esculturas from './views/components/Esculturas';
import RutasProtegidas from './views/components/RutasProtegidas';
import CreateEscultor from './views/components/CRUD/CreateEscultor'; 
import UpdateEscultor from './views/components/CRUD/UpdateEscultor';
import DeleteEscultor from './views/components/CRUD/DeleteEscultor';
import Admin from './views/components/CRUD';
import CreateEscultura from './views/components/CRUD/CreateEscultura'
import UpdateEscultura from './views/components/CRUD/UpdateEscultura';
import DeleteEscultura from './views/components/CRUD/DeleteEscultura';
import Votar from './views/components/Votar';
import Biografia from './views/components/Biografia';
import Resultados from './views/components/Resultados';
import CreateEvento from './views/components/CRUD/CreateEvento';
import DeleteEvento from './views/components/CRUD/DeleteEvento';
import ListaAdminQR from './views/components/ListaAdminQR';
import PresentacionQR from './views/components/PresentacionQR';
import UpdateEvento from './views/components/CRUD/UpdateEvento'
import UpdateUsuario from './views/components/CRUD/UpdateUsuario'


const App = () => {
  const [showMenuMobile, setShowMenuMobile]= useState(false);
  return (
    <Router>
      <div className="flex flex-col min-h-screen"> 
      <Header showMenuMobile = {showMenuMobile} setShowMenuMobile = {setShowMenuMobile}/>
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Cuerpo />} />
            <Route path="/eventos" element={<Eventos />} />
            <Route path="/escultores" element={<Escultores />} />
            <Route path="/esculturas" element={<Esculturas />} />
            <Route path="/create" element={<CreateEscultor />} />
            <Route path="/modificar-escultor/:id_escultor" element={<UpdateEscultor />} />
            <Route path="/delete-escultor" element={<DeleteEscultor />} />
            <Route path="/biografia/:id_escultor" element={<Biografia />} />
            <Route path="/create-escultura" element={<CreateEscultura />} />
            <Route path="/modificar-escultura/:id_escultura" element={<UpdateEscultura />} />
            <Route path="/delete-escultura" element={<DeleteEscultura />} />
            <Route path="/Resultados" element={<Resultados />} />
            <Route path="/create-evento" element={<CreateEvento />} />
            <Route path="/delete-evento" element={<DeleteEvento />} />
            <Route path="/modificar-evento/:id" element={<UpdateEvento />} />
            <Route path="/modificar-usuario/:email" element={<UpdateUsuario />} />
            <Route path="/votar/:id_escultor" element={<RutasProtegidas component={Votar} role="user" />} />   
            <Route 
              path="/Admin" 
              element={
                <RutasProtegidas component={Admin} role="admin" />
              }
            />
            <Route
              path="admin/qr-list"
              element={<RutasProtegidas component={ListaAdminQR} role="admin"/>}
            />
            <Route
              path="/qr/:id"
              element={<RutasProtegidas component={PresentacionQR} role="admin"/>}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;



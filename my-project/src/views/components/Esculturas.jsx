import './custom.css'

const Esculturas = () => {
    const imagen = 'public/img/imagen_bienal.jpg'
    return (
        <div className="font-medium custom-bg rounded-lg shadow-lg max-w-lg m-12 p-7">
            <h2 className="custom-bg2 text-3xl py-1 rounded-lg mb-4 text-center">Nombre</h2> 
            <div className="flex items-start">
                {imagen && (
                    <img
                        src={imagen}
                        alt="Nombre"
                        className="w-1/2 h-auto object-cover rounded-lg mr-5"
                    />
                )}
                <div className="flex-1">
                    <p className="custom-bg2 rounded-lg text-black text-center text-md py-1 px-10 mb-1"><strong>Tematica:</strong> Tematica</p>
                    <div className="custom-bg2 rounded-lg py-1 px-2">
                        <p className="text-md mb-1 font-semibold"><strong>Fecha de creación:</strong> fecha</p>
                        <p className="text-sm text-black font-black">descripcion</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Esculturas;

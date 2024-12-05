import '/public/css/cuerpo.css'; // Acá se incluye el archivo CSS de ser necesario

const Cuerpo = () => {
    return (
        <main>
            <div className="main-content">
                <div className="titulos">
                    <h1>
                        <span id='titulo1'>Bienal </span>
                        <span id='titulo2'>del </span>
                        <span id='titulo3'>Chaco </span>
                    </h1>
                </div>
                <div id="frase">
                    <cite>Donde el arte, <span>FLUYE.</span></cite>
                </div>
            </div>

            <div className="info">
                <div className="stitulos">
                    <h2>
                        <span id="stitulo1">¿Qué es </span><span id="stitulo2"> la Bienal? </span>
                    </h2>
                </div>
                <p>
                    La Bienal Internacional de Escultura del Chaco es un evento cultural que celebra el arte de la escultura en un escenario de prestigio internacional. Cada dos años, artistas de todo el mundo se reúnen para exhibir sus obras, intercambiar ideas y participar en actividades y talleres relacionados con la escultura.
                </p>
                <p>
                    Desde su primera edición, la Bienal ha crecido en tamaño y prestigio, atrayendo a un público diverso que incluye tanto profesionales del arte como entusiastas del público. La Bienal también ofrece oportunidades para que los escultores emergentes ganen reconocimiento y establezcan conexiones valiosas en el mundo del arte.
                </p>
                <p>
                    Además de las exposiciones, el evento incluye conferencias, presentaciones y eventos educativos que buscan fomentar el diálogo y la apreciación por el arte de la escultura. La Bienal se ha convertido en un punto de referencia importante en el calendario cultural de la región.
                </p>
            </div>
            <div className="demas_info">
                <h2 className="Historia">Nuestra Historia</h2>
                <p>
                    La Bienal Internacional de Escultura del Chaco fue fundada en 1988, con el objetivo de posicionar al Chaco como un epicentro cultural y artístico. Lo que comenzó como una iniciativa local pronto ganó reconocimiento internacional gracias a la calidad de las obras presentadas y la participación de escultores de renombre mundial.
                </p>
                <p>
                    A lo largo de los años, el evento ha evolucionado, incorporando nuevas tecnologías y tendencias del mundo del arte, sin perder de vista el respeto por las técnicas tradicionales. La Bienal ha sido testigo de la creación de algunas de las esculturas más icónicas que ahora adornan plazas y parques públicos de la ciudad.
                </p>
                <p>
                    Con más de 30 años de historia, la Bienal ha visto pasar por sus ediciones a algunos de los escultores más influyentes del mundo, transformando la ciudad del Chaco en un museo al aire libre, y permitiendo que el arte fluya en las calles y en el corazón de su gente.
                </p>
            </div>
        </main>
    );
};

export default Cuerpo;
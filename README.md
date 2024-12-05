# **DESARROLLO DE SOFTWARE**
## Grupo 8
### Integrantes
+ Bangher, Matias Ezequiel :disguised_face:
+ Cabral Castella, Agustin Robertino :disguised_face:
+ Gomez, Marcelo Edgardo :disguised_face:
+ Martinez, Denise Agostina :disguised_face:
+ Nuñez, Ian Lautaro :disguised_face:
+ Tourn, Miguel Agustin :disguised_face:

> [!NOTE]
> **Como incializar el backend:**
```
cd backend
```

```
npm install
```

```
npm run dev
```
1. **Tener en cuenta que primero hay que crear la base de datos en tu mySQL.** 
2. Se debe crear un archivo .env y poner las siguientes credenciales** 
    - DB_HOST=localhost
    - DB_USER=root
    - DB_PASSWORD=su contraseña
    - DB_NAME=bienal_escultura
    - DB_PORT=3306


> [!IMPORTANT]
> **DEBEN TENER ABIERTO SU MYSQL PARA EL BACKEND** 

> [!NOTE]
> **Como incializar el frontend**
```
cd my-proyect
```

```
npm install
```

```
npm run dev
```
> [!NOTE]
> **Script automatico en python para actualizar la bd**

> [!IMPORTANT]
> **DEBEN TENER ABIERTO SU MYSQL PARA ESTO Y TENER INSTALADO PYTHON** 


El CMD les va pedir su contraseña del servidor de MYSQL, al escribir no van a ver lo que escriben por seguridad. 
> Si es la primera vez que ejecutan el script, ejecuten lo siguiente, si ya hicieron esto una vez no es necesario: :alien:

``` 
pip install mysql
```

## Escenario Planteado

La organización de la Bienal Internacional de Escultura del Chaco, se a contactado son su empresa para planificar, analizar, desarrollar e implementar un sistema de gestión que soporte el registro de los eventos, escultores como así también aplicaciones satélites para que los ciudadanos/ publico en general pueda realizar comentarios y votación durante el evento.
    
## Alcance 

El sistema contempla la creacion, la baja y la modificacion de esculturas, escultores y eventos siempre y cuando el usuario sea un **administrador**. 

En el sistema se pueden visualizar los escultores, eventos y esculturas, esto es indiferente del usuario. Si el usuario es un **usuario logueado**, este mismo puede votar a una escultura si la misma se encuentra en un evento activo, esta votacion solo puede ser realizada una vez y es via web o via QR. 

## Diagrama de casos de uso
![Casos de uso](https://github.com/FRRe-DS/2024-08-TPI/blob/frontend/Documentacion/Casos_De_Uso.jpg)
## Diagrama ENTIDAD-RELACION
![Entidad relacion](https://github.com/FRRe-DS/2024-08-TPI/blob/frontend/Documentacion/derfinal.jpg)
## Arquitectura utilizada

Se simula una arquitectura, Modelo Vista Controlador.

En el backend trabajamos con **Node.JS**, donde hicimos los modelos de negocio y los controladores de cada uno, el controlador hace peticiones al modelo el cual hace consultas directas a la base de datos.

En el frontend trabajamos con **React.JS**, para los estilos se uso **CSS** y **Tailwind**.

La comunicacion entre frontend y backend sucede a traves de peticiones HTTP, las cuales se realizan mediante una API.

Para la base de datos usamos **MySQL**.

![Arquitectura](https://github.com/FRRe-DS/2024-08-TPI/blob/frontend/Documentacion/ArquitecturaMVC.jpg)

## Tecnologias 
- **Node.js**: Es un entorno de ejecución de JavaScript en el lado del servidor que permite construir aplicaciones escalables y rápidas. Es conocido por su modelo de programación asincrónica y basada en eventos, lo que lo hace ideal para aplicaciones en tiempo real y sistemas de alta concurrencia.
- **Express:** Es un marco de trabajo para Node.js que facilita la creación de aplicaciones web y API. Proporciona una estructura ligera y modular para manejar rutas, middleware y lógica de negocio, simplificando el desarrollo.
- **React.js:** Es una biblioteca de JavaScript desarrollada por Meta (Facebook) para construir interfaces de usuario interactivas. React permite crear componentes reutilizables y gestionar el estado de las aplicaciones de forma eficiente. Su enfoque en un DOM virtual asegura un rendimiento óptimo, incluso en aplicaciones complejas.

- **MYSQL:** Es un sistema de gestión de bases de datos relacional (RDBMS) basado en SQL. MySQL es conocido por ser robusto, seguro y ampliamente utilizado en aplicaciones web y empresariales. Es ideal para almacenar, organizar y consultar grandes volúmenes de datos, gracias a su compatibilidad con transacciones y su arquitectura de almacenamiento optimizada. 
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

##

import mysql.connector
import os
import getpass

def crear_schema(schema_name, db_config):
    try:
        # Conectar al servidor MySQL
        conexion = mysql.connector.connect(
            host=db_config['host'],
            user=db_config['user'],
            password=db_config['password']
        )
        cursor = conexion.cursor()

        # Eliminar el schema si existe
        cursor.execute(f"DROP SCHEMA IF EXISTS {schema_name}")
        print(f"Schema '{schema_name}' eliminado si existía.")

        # Crear el nuevo schema
        cursor.execute(f"CREATE SCHEMA {schema_name}")
        print(f"Schema '{schema_name}' creado correctamente.")
        return True

    except mysql.connector.Error as err:
        print(f"Error al crear el schema: {err}")
        return False

    finally:
        cursor.close()
        conexion.close()

def importar_sql(archivo_sql, schema_name, db_config):
    # Conectar al schema
    try:
        db_config['database'] = schema_name  # Usar el nuevo schema
        conexion = mysql.connector.connect(**db_config)
        cursor = conexion.cursor()

        # Leer el archivo SQL
        with open(archivo_sql, 'r', encoding='utf-8') as archivo:
            sql_script = archivo.read()

        # Ejecutar el script SQL
        for statement in sql_script.split(';'):
            statement = statement.strip()  # Limpiar espacios en blanco
            if statement:
                cursor.execute(statement)

        # Confirmar los cambios
        conexion.commit()
        print("Datos importados correctamente.")

    except FileNotFoundError:
        print(f"El archivo {archivo_sql} no fue encontrado. Asegúrate de que la ruta sea correcta.")
    except mysql.connector.Error as err:
        print(f"Error al importar datos: {err}")
    finally:
        cursor.close()
        conexion.close()

if __name__ == "__main__":
    # Configuración de la base de datos
    db_config = {
        'user': 'root',
        'password': getpass.getpass("Ingresa la contraseña de MySQL: "),  # Solicitar la contraseña
        'host': 'localhost'  # Cambia esto si tu servidor MySQL está en otro lugar
    }

    nombre_schema = 'bienal_g8'  # Cambia esto por el nombre que desees
    archivo_sql = 'db/bienal_escultura.sql'  # Cambia esto por el nombre de tu archivo SQL

    # Asegúrate de que el archivo SQL existe
    if not os.path.isfile(archivo_sql):
        print(f"El archivo {archivo_sql} no se encontró en la ruta especificada.")
    else:
        # Crear el nuevo schema
        if crear_schema(nombre_schema, db_config):
            # Llamar a la función de importación
            importar_sql(archivo_sql, nombre_schema, db_config)
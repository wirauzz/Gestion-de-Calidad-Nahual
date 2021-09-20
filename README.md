# Nahual-Argentina
Proyecto de unificación.


# Instalación de herramientas para el entorno de desarrollo
Como paso inicial deberemos instalar Node.js, este es un entorno en tiempo de ejecución multiplataforma, de código abierto, para la capa del servidor (pero no limitándose a ello) basado en el lenguaje de programación JavaScript, asíncrono.

Debemos instalar la versión 12.18.3, la cual puede ser conseguida en el siguiente link; https://nodejs.org/download/release/v12.18.3/ para verificar la correcta instalación podemos correr el comando: 
    
    node -v

este debería mostrarnos la versión instalada de Node.js en respuesta.

Una vez instalado Node.js procederemos a la instalación de Yarn, un nuevo tipo de instalador de paquetes JavaScript y gestor de dependencias lanzado por la empresa Facebook en colaboración con otros desarrolladores como Google donde introduce cambios en esa gestión de dependencias, en la ejecución de tareas y algunas mejoras de rendimiento, también en el cambio de enfoque en la descarga e instalación de los paquetes y en su gestión de las dependencias.

Podemos instalar Yarn corriendo el siguiente comando en la consola:
    
    npm i yarn@1.22.4

como siguiente paso debemos instalar express, un marco de aplicación web de back-end para Node.js, lanzado como software gratuito y de código abierto bajo la licencia MIT. Está diseñado para crear aplicaciones web y API, lo haremos de la siguiente manera, en consola corremos el siguiente comando:

    yarn add express.

De esta manera tenemos todo lo necesario instalado en nuestras máquinas. 

# Correr “Nahual - Argentina”
Lo primero es ingresar a la página del repositorio de Nahual - Argentina (https://github.com/TallerDeDesarrollo-UCB/Nahual-Argentina) en GitHub, una vez aquí debemos clonar la rama
Como siguiente paso ingresamos a la carpeta Nahual-Argentina e instalamos las dependencias ejecutando el siguiente comando en consola:

    yarn install 

el cual instalará todas las dependencias necesarias para el proyecto, entre ellas Semantic UI, framework utilizado para el diseño de interfaces.
(Más acerca de Semantic UI; https://semantic-ui.com/)
si queremos correr el proyecto finalizamos con:
    
    yarn start 
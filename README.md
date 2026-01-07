🃏 Proyecto Académico: Set Game

  Este proyecto consiste en el desarrollo de una versión web interactiva del popular juego de mesa "Set". La aplicación está diseñada para ser accesible e intuitiva para cualquier usuario, priorizando la usabilidad y la experiencia de juego.
  Aunque no soluciona un problema real, su valor académico reside en la implementación de una lógica de juego compleja, validaciones en tiempo real, un sistema de puntuación persistente y la inclusión de modos de juego contra la máquina.

🚀 Funcionalidades Principales (Casos de Uso)

  El sistema de juego ofrece las siguientes características clave:

  — Inicio de sesión del usuario registrado
  — Acceso como invitado
  — Gestión de perfil (modificación de nombre y contraseña)
  — Configuración e inicio de partidas (selección de dificultad)
  — Solicitud de pistas durante el juego
  — Visualización de rankings (historial individual y global)
  — Modo de juego competitivo contra la máquina (PvE)
  — Gestión de cuentas (creación y eliminación de usuario)

🛠️ Tecnologías Utilizadas

  El proyecto se ha desarrollado utilizando un stack tecnológico moderno, visible en el siguiente diagrama de arquitectura:
  
  Área	              Tecnología	                      Descripción
  Frontend	          HTML5, CSS3, JavaScript	          Estructura, estilos (con Tailwind CSS) e interactividad.
  Backend	            PHP (>=7.4)                       Lógica del juego, control de sesiones y gestión de datos.
  BBDD	              MySQL / MariaDB	                  Gestor de BBDD para la persistencia de usuarios y puntuaciones.
  Nube	              Aiven	                            Almacenamiento remoto de la base de datos.
  Variables Entorno	  vlucas/phpdotenv	                Gestión segura de variables de entorno.
  DevOps	            Git/GitHub, Docker	              Control de versiones, contenedores y despliegue en Render.

☁️ Despliegue y Acceso

  La aplicación es una web app pura, por lo que no requiere instalación local compleja por parte del usuario final. El proyecto está configurado para un entorno de desarrollo profesional utilizando Docker para la contenedorización y Render para el despliegue continuo.
  Una vez desplegada, simplemente se accede a través de una URL pública.
  URL de la Demo: [https://set-game-8god.onrender.com]

▶️ Ejecución en Local (XAMPP)

  Para facilitar la ejecución del proyecto en entorno local sin necesidad de Docker, se ha configurado Apache mediante un VirtualHost personalizado.
  La aplicación utiliza la carpeta `public/` como raíz del servidor web, mientras que el código del backend y los recursos compartidos se mantienen en `src/`, siguiendo una arquitectura modular.
  La configuración necesaria en el archivo `httpd-vhosts.conf` es la siguiente:

  Archivo:
  C:\xampp\apache\conf\extra\httpd-vhosts.conf

  <VirtualHost *:80>
      ServerName set.local
      DocumentRoot "C:/xampp/htdocs/Proyecto Set/Set/public"

      <Directory "C:/xampp/htdocs/Proyecto Set/Set/public">
          AllowOverride All
          Require all granted
      </Directory>

      Alias /global "C:/xampp/htdocs/Proyecto Set/Set/src/global"
      Alias /modules "C:/xampp/htdocs/Proyecto Set/Set/src/modules"

      <Directory "C:/xampp/htdocs/Proyecto Set/Set/src">
          AllowOverride All
          Require all granted
      </Directory>
  </VirtualHost>

  Gracias al uso de alias, se permite el acceso a los recursos estáticos (CSS y JavaScript)ubicados en `src/global` y a los distintos módulos de la aplicación sin necesidad de duplicar archivos ni alterar la estructura del proyecto.
  Una vez aplicada esta configuración y reiniciado Apache, la aplicación queda accesible desde el navegador mediante la URL: http://set.local

🧑‍💻 Autoría y Contacto

  Este proyecto ha sido desarrollado por:
  Alberto Arias López
  Ana Hernánz Carro
  Christian I. Espinal Barrera





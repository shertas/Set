
Cada desarrollador debe:

- Instalar dependencias: ejecutar `composer install` en la raíz del repositorio (una sola vez por máquina).
- Crear su propio fichero de entorno `.env` y rellenando las variables privadas (DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME). No subir `.env` al repo.
- Ejecutar la aplicación usando el método que prefiera:
  - Servidor embebido de PHP (rápido para desarrollo): `php -S localhost:8000 -t public`.
  - XAMPP/Apache en Windows: crear un VirtualHost que apunte a la carpeta `.../Set/public` o mover el proyecto a `C:\xampp\htdocs` y acceder por la URL correspondiente, en mi caso es `http://localhost/Set/public/index.php`


Para comprobar rápidamente la conexión a la BD se puede ejecutar el script de verificación por CLI: `php public/index.php`.

## Base de datos y acceso remoto (Aiven)
- Cada desarrollador debe usar su propio `.env` con las credenciales proporcionadas por el administrador de la BD.
- Para comprobar conectividad desde tu máquina:

```powershell
Test-NetConnection -ComputerName <DB_HOST> -Port <DB_PORT>
```


## Troubleshooting rápido

- `vendor/` NO debe subirse al repo. Cada dev debe ejecutar `composer install`.
- Si la página funciona por CLI (`php public/index.php`) pero no desde Apache:
  - Verificar que Apache sirve la carpeta `public` (DocumentRoot / VirtualHost).
  - Usar `phpinfo()` servido por Apache para ver qué `php.ini` y extensiones están activas (PDO, pdo_mysql).
  - Evitar servir el proyecto desde carpetas sincronizadas por OneDrive/Dropbox; puede provocar locks o permisos extraños.
- Mensaje Xdebug: `Xdebug: [Step Debug] Could not connect to debugging client` es informativo y no impide la ejecución; desactivar Xdebug en el `php.ini` si se desea.

## Buenas prácticas del equipo
- Mantener `main` estable; usar ramas para features/fixes.
- No subir `.env` ni `vendor/`.
- Hacer commits descriptivos y semánticos, en inglés.



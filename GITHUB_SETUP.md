# Configuración de GitHub para VS Code

Para conectar este repositorio con GitHub, sigue estos pasos:

## Paso 1: Crear un repositorio en GitHub

1. Ve a [github.com](https://github.com) e inicia sesión
2. Haz clic en "+" en la esquina superior derecha y selecciona "New repository"
3. Nombra el repositorio: `Cypress-Tests` o el nombre que prefieras
4. NO inicialices con README, .gitignore o license (ya tenemos estos)
5. Haz clic en "Create repository"

## Paso 2: Conectar el repositorio local con GitHub

En VS Code o en PowerShell, ejecuta estos comandos en `C:\Users\Mateo\OneDrive\Desktop\Cypress`:

```powershell
# Configurar tu usuario y email de Git
git config --global user.name "Tu Nombre"
git config --global user.email "tu.email@example.com"

# Inicializar el repositorio (si no está inicializado)
git init

# Agregar todos los archivos
git add .

# Crear el primer commit
git commit -m "Initial commit: Cypress tests and Planify app"

# Agregar el remote de GitHub
git remote add origin https://github.com/TU_USUARIO/Cypress-Tests.git

# Cambiar a main (GitHub usa main por defecto)
git branch -M main

# Subir el código
git push -u origin main
```

## Paso 3: Autenticación con GitHub

Si es la primera vez, GitHub te pedirá autenticación:
- Puedes usar un token de acceso personal (PAT)
- O conectar con SSH

### Usando Token de Acceso Personal:
1. Ve a GitHub → Settings → Developer settings → Personal access tokens
2. Genera un nuevo token con permisos de repositorio
3. Usa este token como contraseña cuando Git lo pida

## Verificar la conexión

Una vez completado, puedes:
- Ver el repositorio en GitHub
- Hacer cambios en VS Code y usar Source Control para commits
- Usar `git push` y `git pull`

¡Listo! Ahora tu código está sincronizado con GitHub.

@echo off
cd /d "C:\Users\Mateo\OneDrive\Desktop\Cypress"
set PATH=C:\Program Files\Git\cmd;%PATH%
git remote remove origin 2>nul
git remote add origin https://github.com/mateoburatti044-hub/Planify.git
set GIT_EDITOR=true
git push -f origin main
echo.
echo Push completado. Presiona una tecla para cerrar.
pause

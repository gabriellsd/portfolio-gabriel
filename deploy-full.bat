@echo off
echo.
echo =============================================
echo   DEPLOY COMPLETO - GIT + GITHUB PAGES
echo =============================================
echo.

echo [1/5] Verificando status do repositorio...
git status
echo.

echo [2/5] Adicionando todos os arquivos...
git add .
echo.

echo [3/5] Fazendo commit...
set /p message="Digite a mensagem do commit (ou pressione Enter para usar padrao): "
if "%message%"=="" set message="Atualizacao do portfolio"
git commit -m "%message%"
echo.

echo [4/5] Enviando para o repositorio remoto...
git push
echo.

echo [5/5] Fazendo deploy para GitHub Pages...
npm run deploy:github
echo.

echo =============================================
echo        DEPLOY COMPLETO FINALIZADO!
echo =============================================
echo.
echo Portfolio atualizado em:
echo - GitHub (repositorio principal)
echo - Vercel (deploy automatico)
echo - GitHub Pages (deploy manual)
echo.
pause 
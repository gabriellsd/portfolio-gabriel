@echo off
echo.
echo =============================================
echo        DEPLOY PORTFOLIO GABRIEL - GIT
echo =============================================
echo.

echo [1/4] Verificando status do repositorio...
git status
echo.

echo [2/4] Adicionando todos os arquivos...
git add .
echo.

echo [3/4] Fazendo commit...
set /p message="Digite a mensagem do commit (ou pressione Enter para usar padrao): "
if "%message%"=="" set message="Atualizacao do portfolio"
git commit -m "%message%"
echo.

echo [4/4] Enviando para o repositorio remoto...
git push
echo.

echo =============================================
echo           DEPLOY CONCLUIDO!
echo =============================================
echo.
echo O portfolio foi enviado para o GitHub com sucesso!
echo As mudancas estarao disponiveis no Vercel e GitHub Pages em alguns minutos.
echo.
pause 
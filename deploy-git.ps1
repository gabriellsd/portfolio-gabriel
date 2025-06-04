# Portfolio Gabriel - Deploy Script PowerShell
# =============================================

Write-Host ""
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "       DEPLOY PORTFOLIO GABRIEL - GIT" -ForegroundColor Cyan  
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

# Verificar status
Write-Host "[1/4] Verificando status do repositório..." -ForegroundColor Yellow
git status
Write-Host ""

# Adicionar arquivos
Write-Host "[2/4] Adicionando todos os arquivos..." -ForegroundColor Yellow
git add .
Write-Host ""

# Commit
Write-Host "[3/4] Fazendo commit..." -ForegroundColor Yellow
$message = Read-Host "Digite a mensagem do commit (ou pressione Enter para usar padrão)"
if ([string]::IsNullOrWhiteSpace($message)) {
    $message = "Atualização do portfolio"
}
git commit -m "$message"
Write-Host ""

# Push
Write-Host "[4/4] Enviando para o repositório remoto..." -ForegroundColor Yellow
git push
Write-Host ""

# Sucesso
Write-Host "=============================================" -ForegroundColor Green
Write-Host "           DEPLOY CONCLUÍDO!" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green
Write-Host ""
Write-Host "O portfólio foi enviado para o GitHub com sucesso!" -ForegroundColor Green
Write-Host "As mudanças estarão disponíveis no Vercel e GitHub Pages em alguns minutos." -ForegroundColor Green
Write-Host ""

Read-Host "Pressione Enter para sair" 
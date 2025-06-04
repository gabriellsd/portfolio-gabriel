# Scripts de Deploy - Portfolio Gabriel

Este repositório contém scripts para facilitar o envio de mudanças para o Git.

## 📁 Arquivos de Deploy

### `deploy-git.bat` (Windows - Prompt de Comando)
```bash
# Para executar:
.\deploy-git.bat
```

### `deploy-git.ps1` (Windows - PowerShell)
```powershell
# Para executar:
.\deploy-git.ps1
```

## 🚀 Como usar

1. **Faça suas mudanças** nos arquivos do portfólio
2. **Execute um dos scripts** acima
3. **Digite uma mensagem** de commit (ou pressione Enter para usar a padrão)
4. **Aguarde** o script fazer o deploy automático

## 📋 O que os scripts fazem

1. ✅ Verificam o status do repositório Git
2. ✅ Adicionam todos os arquivos modificados (`git add .`)
3. ✅ Fazem o commit com sua mensagem (`git commit -m "sua mensagem"`)
4. ✅ Enviam para o GitHub (`git push`)

## 🌐 Deploy Automático

Após executar os scripts, as mudanças serão automaticamente enviadas para:
- **GitHub** (repositório principal)
- **Vercel** (deploy automático)
- **GitHub Pages** (se configurado)

## ⚡ Comandos Manuais

Se preferir fazer manualmente:
```bash
git add .
git commit -m "Sua mensagem aqui"
git push
```

---
**Desenvolvido para facilitar o deploy do Portfolio Gabriel** 
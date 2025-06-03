# 🚀 Portfolio Futurista - Analista de Sistemas

Um portfólio minimalista, tecnológico e cheio de animações surreais, construído com as mais modernas tecnologias web.

## ✨ Características

- **Design Futurista**: Interface cyberpunk com gradientes neon e efeitos visuais impressionantes
- **Animações Surreais**: Efeitos de partículas, glitch, matrix rain e transições fluidas
- **Minimalista & Moderno**: Layout clean com foco na experiência do usuário
- **Totalmente Responsivo**: Funciona perfeitamente em todos os dispositivos
- **Performance Otimizada**: Carregamento rápido e animações suaves
- **Tecnologias Modernas**: Next.js 14, React 18, Tailwind CSS e muito mais

## 🛠️ Tecnologias Utilizadas

- **Frontend Framework**: Next.js 14 com App Router
- **UI Library**: React 18 com TypeScript
- **Styling**: Tailwind CSS com animações customizadas
- **Animações**: Framer Motion e CSS Animations
- **3D Graphics**: Three.js com React Three Fiber
- **Icons**: React Icons
- **Fonts**: Google Fonts (Inter + Orbitron)

## 🎨 Features Visuais

### Efeitos de Background
- Grid cyberpunk animado
- Partículas flutuantes com movimento randômico
- Gradient overlays com cores neon
- Matrix rain effect
- Orbs luminosos pulsantes

### Animações Interativas
- Efeito de glitch no título principal
- Typing animation para texto
- Hover effects com neon glow
- Transições suaves entre seções
- Barras de progresso animadas
- Cards com efeitos 3D

### Paleta de Cores Neon
- **Neon Blue**: `#00f5ff`
- **Neon Purple**: `#8b5cf6`
- **Neon Pink**: `#f72585`
- **Neon Green**: `#39ff14`

## 📁 Estrutura do Projeto

```
portfolio-surreal/
├── app/
│   ├── components/
│   │   ├── BackgroundEffects.tsx    # Efeitos de background
│   │   ├── Navigation.tsx           # Barra de navegação
│   │   ├── Hero.tsx                 # Seção principal
│   │   ├── About.tsx                # Sobre mim
│   │   ├── Skills.tsx               # Habilidades técnicas
│   │   ├── Projects.tsx             # Portfólio de projetos
│   │   └── Contact.tsx              # Formulário de contato
│   ├── globals.css                  # Estilos globais
│   ├── layout.tsx                   # Layout principal
│   └── page.tsx                     # Página inicial
├── public/                          # Arquivos estáticos
├── tailwind.config.js              # Configuração do Tailwind
├── next.config.js                   # Configuração do Next.js
└── package.json                     # Dependências do projeto
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18.0 ou superior
- npm ou yarn

### Instalação

1. **Clone o repositório** (se aplicável):
```bash
git clone <url-do-repositorio>
cd portfolio-surreal
```

2. **Instale as dependências**:
```bash
npm install
# ou
yarn install
```

3. **Execute o projeto em modo de desenvolvimento**:
```bash
npm run dev
# ou
yarn dev
```

4. **Abra no navegador**:
Acesse [http://localhost:3000](http://localhost:3000)

### Scripts Disponíveis

```bash
npm run dev      # Executa em modo de desenvolvimento
npm run build    # Gera build de produção
npm run start    # Executa build de produção
npm run lint     # Executa verificação de código
```

## 📱 Seções do Portfolio

### 🏠 Hero Section
- Animação de typing para o título
- Avatar com efeito de glow rotativo
- Buttons com efeitos hover avançados
- Indicador de scroll animado

### 👨‍💻 Sobre Mim
- Informações profissionais
- Estatísticas animadas
- Card interativo com efeitos visuais
- Elementos flutuantes decorativos

### 💼 Skills & Expertise
- Barras de progresso animadas
- Grid de ferramentas interativo
- Lista de metodologias
- Efeitos de hover personalizados

### 🚀 Projetos
- Grid responsivo de projetos
- Filtros por categoria
- Cards com efeitos 3D
- Status dos projetos com cores

### 📞 Contato
- Formulário funcional animado
- Informações de contato interativas
- Status de disponibilidade
- Links para redes sociais

## 🎯 Customização

### Cores Neon
Edite as variáveis CSS em `globals.css`:
```css
:root {
  --neon-blue: #00f5ff;
  --neon-purple: #8b5cf6;
  --neon-pink: #f72585;
  --neon-green: #39ff14;
}
```

### Animações
Modifique as animações no `tailwind.config.js`:
```js
animation: {
  'float': 'float 6s ease-in-out infinite',
  'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
  // Adicione suas próprias animações
}
```

### Conteúdo
Edite os componentes em `app/components/` para personalizar:
- Informações pessoais
- Projetos exibidos
- Skills e tecnologias
- Informações de contato

## 🌟 Funcionalidades Avançadas

- **Scroll Suave**: Navegação fluida entre seções
- **Intersection Observer**: Animações triggeradas por scroll
- **Responsive Design**: Adapta-se a todos os tamanhos de tela
- **Performance**: Otimizado para velocidade e SEO
- **Acessibilidade**: Seguindo boas práticas de a11y

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir melhorias
- Adicionar novas funcionalidades
- Melhorar a documentação

---

**Desenvolvido com ❤️ e muito código por um Analista de Sistemas apaixonado por tecnologia!** 
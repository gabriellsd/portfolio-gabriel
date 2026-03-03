import { useState, useEffect } from 'react';
import { useReveal } from './useReveal';
import {
  Menu, X, GitBranch, Search, Zap,
  Mail, Linkedin, Github, ExternalLink,
} from 'lucide-react';

const gabriel = {
  nome: 'Gabriel Dias',
  titulo: 'Analista de Sistemas',
  email: 'gabriel.dias@email.com',
  linkedin: 'https://linkedin.com/in/gabrieldias',
  github: 'https://github.com/gabrieldias',
  foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=800&q=80',
};

const techStack = ['Python', 'JavaScript', 'AWS', 'Docker', 'PostgreSQL'];

const specialties = [
  {
    icon: GitBranch,
    title: 'Arquitetura',
    desc: 'Desenho de sistemas distribuídos e microserviços.',
  },
  {
    icon: Search,
    title: 'Análise',
    desc: 'Levantamento de requisitos e modelagem de dados.',
  },
  {
    icon: Zap,
    title: 'Otimização',
    desc: 'Melhoria de performance e refatoração de sistemas.',
  },
];

const experience = [
  {
    period: '2021 - Presente',
    company: 'Empresa de Tecnologia',
    role: 'Analista de Sistemas Sênior',
    desc: 'Liderança técnica no desenvolvimento de plataforma ERP, implementando melhorias que reduziram o tempo de processamento de dados em 40%.',
    current: true,
  },
  {
    period: '2018 - 2021',
    company: 'Consultoria Logística',
    role: 'Desenvolvedor Full Stack',
    desc: 'Responsável pela criação de módulos de rastreamento em tempo real utilizando Node.js e integrações com APIs de terceiros.',
    current: false,
  },
];

const projects = [
  {
    title: 'Smart Analytics Dashboard',
    desc: 'Ferramenta de visualização de dados para o setor financeiro integrada com Python e React.',
    image: 'https://images.unsplash.com/photo-1551288049-bbbda536339a?fit=crop&w=800&q=80',
    tags: ['Python', 'React'],
    link: '#',
  },
  {
    title: 'Cloud Migrate Automator',
    desc: 'Scripts de automação para migração de servidores on-premise para AWS utilizando Terraform.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?fit=crop&w=800&q=80',
    tags: ['Terraform', 'AWS'],
    link: '#',
  },
  {
    title: 'Inventory Mobile API',
    desc: 'API REST robusta para controle de estoque com suporte a leitura de QR Code em tempo real.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?fit=crop&w=800&q=80',
    tags: ['Node.js', 'Redis'],
    link: '#',
  },
];

const navLinks = [
  { name: 'Início', href: '#inicio' },
  { name: 'Sobre', href: '#sobre' },
  { name: 'Experiência', href: '#experiencia' },
  { name: 'Projetos', href: '#projetos' },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const heroRef = useReveal(0);
  const stackRef = useReveal(0);
  const aboutRef = useReveal(0);
  const expRef = useReveal(0);
  const projectsRef = useReveal(0);
  const contactRef = useReveal(0);

  return (
    <div className="bg-slate-50 text-slate-900">

      {/* Nav */}
      <header
        className={`fixed w-full z-50 transition-all duration-300 border-b ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md border-slate-200 shadow-sm'
            : 'bg-transparent border-transparent'
        }`}
      >
        <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            GD.dev
          </span>

          <div className="hidden md:flex items-center space-x-8 font-medium">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-blue-600 transition"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contato"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Contato
            </a>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Abrir menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-2 shadow-lg">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="block py-2 font-medium hover:text-blue-600 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contato"
              className="block bg-blue-600 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-700 transition mt-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </a>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="inicio" className="pt-32 pb-20 px-4">
        <div
          ref={heroRef}
          className="reveal max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12"
        >
          <div className="md:w-1/2 space-y-6 text-center md:text-left">
            <h2 className="text-blue-600 font-semibold tracking-wide uppercase">
              Olá, eu sou o
            </h2>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900">
              {gabriel.nome}
            </h1>
            <p className="text-2xl md:text-3xl text-slate-600 font-light">
              {gabriel.titulo} focado em{' '}
              <span className="font-semibold text-slate-800 underline decoration-blue-500">
                soluções eficientes
              </span>{' '}
              e escaláveis.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
              <a
                href="#projetos"
                className="bg-slate-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-slate-800 transition shadow-lg"
              >
                Ver Projetos
              </a>
              <a
                href="#contato"
                className="border-2 border-slate-200 px-8 py-3 rounded-full font-semibold hover:bg-slate-100 transition"
              >
                Entre em contato
              </a>
            </div>
          </div>

          <div className="md:w-1/3 relative flex justify-center">
            <div className="w-64 h-64 md:w-80 md:h-80 bg-blue-100 rounded-3xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition duration-500">
              <img
                src={gabriel.foto}
                alt={`Foto de ${gabriel.nome}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-xl flex items-center space-x-3">
              <div className="bg-green-500 w-3 h-3 rounded-full animate-pulse" />
              <span className="font-medium text-sm">Disponível para novos projetos</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-12 bg-slate-100 border-y border-slate-200">
        <div ref={stackRef} className="reveal max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {techStack.map(tech => (
              <span
                key={tech}
                className="font-bold text-lg text-slate-400 hover:text-slate-700 transition"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="py-24 px-4 bg-white">
        <div ref={aboutRef} className="reveal max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl font-bold">Sobre Mim</h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Com sólida experiência em análise e desenvolvimento de sistemas, transformo
            requisitos complexos em arquiteturas de software robustas. Meu foco é entender
            a dor do negócio e traduzi-la em tecnologia que agrega valor real, sempre
            prezando pela qualidade do código e escalabilidade.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
            {specialties.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-6 bg-slate-50 rounded-2xl hover:-translate-y-1 transition duration-300"
              >
                <Icon className="text-blue-600 mb-4 mx-auto md:mx-0" size={28} />
                <h3 className="font-bold mb-2">{title}</h3>
                <p className="text-sm text-slate-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experiência */}
      <section id="experiencia" className="py-24 px-4 bg-slate-50">
        <div ref={expRef} className="reveal max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Trajetória Profissional</h2>
          <div className="space-y-12">
            {experience.map((job, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-4 md:gap-12">
                <div className="md:w-1/4">
                  <span className={`font-bold ${job.current ? 'text-blue-600' : 'text-slate-400'}`}>
                    {job.period}
                  </span>
                  <p className="text-sm text-slate-500">{job.company}</p>
                </div>
                <div className="md:w-3/4 pb-8 border-l-2 border-slate-200 pl-8 relative">
                  <div
                    className={`absolute w-4 h-4 rounded-full -left-[9px] top-1 ${
                      job.current ? 'bg-blue-600' : 'bg-slate-300'
                    }`}
                  />
                  <h3 className="text-xl font-bold mb-2">{job.role}</h3>
                  <p className="text-slate-600">{job.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projetos */}
      <section id="projetos" className="py-24 px-4 bg-white">
        <div ref={projectsRef} className="reveal max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Projetos em Destaque</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map(project => (
              <div
                key={project.title}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:-translate-y-1.5 transition duration-300 flex flex-col"
              >
                <div className="h-48 bg-slate-200 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="p-6 space-y-4 flex flex-col flex-1">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <p className="text-slate-600 text-sm flex-1">{project.desc}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2 flex-wrap">
                      {project.tags.map(tag => (
                        <span
                          key={tag}
                          className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href={project.link}
                      className="text-slate-400 hover:text-blue-600 transition"
                      aria-label={`Ver projeto ${project.title}`}
                    >
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="py-24 px-4 bg-slate-900 text-white">
        <div ref={contactRef} className="reveal max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Vamos conversar?</h2>
          <p className="text-slate-400 mb-12">
            Estou sempre aberto a novas oportunidades e desafios técnicos interessantes.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              href={`mailto:${gabriel.email}`}
              className="flex items-center justify-center space-x-4 p-6 bg-slate-800 rounded-2xl hover:bg-slate-700 transition"
            >
              <Mail className="text-blue-400" size={24} />
              <span className="font-medium">{gabriel.email}</span>
            </a>
            <a
              href={gabriel.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center space-x-4 p-6 bg-slate-800 rounded-2xl hover:bg-slate-700 transition"
            >
              <Linkedin className="text-blue-400" size={24} />
              <span className="font-medium">linkedin.com/in/gabrieldias</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-900 border-t border-slate-800 text-center text-slate-500 text-sm">
        <div className="flex items-center justify-center gap-4 mb-3">
          <a
            href={gabriel.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-slate-300 transition"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href={gabriel.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-slate-300 transition"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <a
            href={`mailto:${gabriel.email}`}
            className="hover:text-slate-300 transition"
            aria-label="E-mail"
          >
            <Mail size={18} />
          </a>
        </div>
        <p>&copy; {new Date().getFullYear()} Gabriel Dias. Todos os direitos reservados.</p>
      </footer>

    </div>
  );
}

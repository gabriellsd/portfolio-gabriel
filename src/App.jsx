import { useState, useEffect } from 'react';
import { useReveal } from './useReveal';
import {
  Menu, X, GitBranch, Search, Zap, Shield,
  Mail, Linkedin, Github, ExternalLink, Network, Instagram,
} from 'lucide-react';

const gabriel = {
  nome: 'Gabriel Dias',
  titulo: 'Analista de Sistemas',
  cidade: 'Campo Largo, Paraná',
  email: 'gabrielsilvadis@outlook.com',
  linkedin: 'https://www.linkedin.com/in/gabriel-dias-676a68266/',
  github: 'https://github.com/gabriellsd',
  instagram: 'https://www.instagram.com/gabriellsd_',
  foto: '/gabriel-foto.png',
};

const techStack = ['Linux', 'Redes', 'Windows Server', 'Firewall', 'Hardware', 'Suporte N2'];

const specialties = [
  {
    icon: Network,
    title: 'Redes',
    desc: 'Configuração e gerenciamento de roteadores, switches, firewalls e VLANs.',
  },
  {
    icon: Search,
    title: 'Análise de Sistemas',
    desc: 'Desenvolvimento, integração e validação de sistemas de informação.',
  },
  {
    icon: Shield,
    title: 'Segurança',
    desc: 'Implementação de políticas de segurança, monitoramento de ameaças e proteção de infraestrutura.',
  },
];

const experience = [
  {
    period: 'Nov 2021 - Presente',
    company: 'Supermercado Colatusso · Campo Largo, PR',
    role: 'Analista de Sistemas',
    desc: 'Desenvolvimento e implementação de sistemas de informação. Integração de diferentes sistemas e aplicações. Testes, validação e treinamento de usuários finais com criação de documentação técnica.',
    current: true,
  },
  {
    period: 'Ago 2020 - Out 2021',
    company: 'Supermercado Colatusso · Campo Largo, PR',
    role: 'Analista de Suporte Computacional',
    desc: 'Suporte técnico a usuários, instalação e configuração de hardware e software, administração de redes LAN/WAN, gerenciamento de contas e permissões, manutenção de servidores e implementação de políticas de segurança.',
    current: false,
  },
  {
    period: 'Mai 2019 - Ago 2020',
    company: 'Supermercado Colatusso · Campo Largo, PR',
    role: 'Assistente Administrativo',
    desc: 'Apoio administrativo às operações internas da empresa.',
    current: false,
  },
  {
    period: 'Jul 2017 - Mai 2019',
    company: 'Supermercado Colatusso · Campo Largo, PR',
    role: 'Repositor',
    desc: 'Organização e reposição de mercadorias.',
    current: false,
  },
  {
    period: 'Jul 2015 - Jun 2017',
    company: 'Supermercado Colatusso · Campo Largo, PR',
    role: 'Aprendiz Comercial',
    desc: 'Programa de aprendizagem comercial, início da trajetória profissional.',
    current: false,
  },
];

const certifications = [
  { name: 'Linux NetAdmin SecAdmin II', school: 'Elaborata Informática', year: '2022', hours: 36 },
  { name: 'Linux NetAdmin SecAdmin I', school: 'Elaborata Informática', year: '2022', hours: 36 },
  { name: 'Linux SysAdmin II', school: 'Elaborata Informática', year: '2021', hours: 36 },
  { name: 'Linux SysAdmin I', school: 'Elaborata Informática', year: '2021', hours: 36 },
  { name: 'Switches e Roteadores I', school: 'Elaborata Informática', year: '2021', hours: 45 },
  { name: 'Reparo de Placa Notebook e Desktop', school: 'Elaborata Informática', year: '2021', hours: 24 },
  { name: 'Analista de Suporte II', school: 'Elaborata Informática', year: '2021', hours: 30 },
  { name: 'Analista de Suporte I', school: 'Elaborata Informática', year: '2021', hours: 30 },
];

const projects = [
  {
    title: 'Em breve',
    desc: 'Projetos em desenvolvimento. Acompanhe meu GitHub para novidades.',
    image: 'https://images.unsplash.com/photo-1551288049-bbbda536339a?fit=crop&w=800&q=80',
    tags: ['Linux', 'Redes'],
    link: gabriel.github,
  },
];

const navLinks = [
  { name: 'Início', href: '#inicio' },
  { name: 'Sobre', href: '#sobre' },
  { name: 'Experiência', href: '#experiencia' },
  { name: 'Certificações', href: '#certificacoes' },
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
  const certRef = useReveal(0);
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
              {gabriel.titulo} com foco em{' '}
              <span className="font-semibold text-slate-800 underline decoration-blue-500">
                redes, sistemas
              </span>{' '}
              e segurança de TI.
            </p>
            <p className="text-slate-500 text-base">{gabriel.cidade}</p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
              <a
                href="#experiencia"
                className="bg-slate-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-slate-800 transition shadow-lg"
              >
                Ver Experiência
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
            Analista de Sistemas em Campo Largo, PR, com trajetória construída desde 2015 na
            mesma empresa, crescendo do início da carreira até a área de TI. Sou formado em
            Análise e Desenvolvimento de Sistemas pelo Centro Universitário Cenecista de Osório
            (2020–2023) e possuo certificações em Linux, redes, segurança e suporte técnico.
            Atuo no desenvolvimento e integração de sistemas, administração de redes LAN/WAN e
            implementação de políticas de segurança de TI.
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

      {/* Certificações */}
      <section id="certificacoes" className="py-24 px-4 bg-white">
        <div ref={certRef} className="reveal max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Certificações</h2>
          <p className="text-center text-slate-500 mb-12">Elaborata Informática · Todas com média 100</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certifications.map(cert => (
              <div
                key={cert.name}
                className="flex items-start gap-4 p-5 bg-slate-50 rounded-2xl hover:-translate-y-0.5 transition duration-300"
              >
                <div className="bg-blue-100 text-blue-700 rounded-xl p-2 text-xs font-bold text-center min-w-[52px]">
                  <div>{cert.hours}h</div>
                  <div>{cert.year}</div>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 leading-snug">{cert.name}</p>
                  <p className="text-xs text-slate-500 mt-1">{cert.school}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projetos */}
      <section id="projetos" className="py-24 px-4 bg-slate-50">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href={`mailto:${gabriel.email}`}
              className="flex items-center justify-center space-x-3 p-6 bg-slate-800 rounded-2xl hover:bg-slate-700 transition"
            >
              <Mail className="text-blue-400 shrink-0" size={22} />
              <span className="font-medium text-sm break-all">{gabriel.email}</span>
            </a>
            <a
              href={gabriel.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center space-x-3 p-6 bg-slate-800 rounded-2xl hover:bg-slate-700 transition"
            >
              <Linkedin className="text-blue-400 shrink-0" size={22} />
              <span className="font-medium text-sm">LinkedIn</span>
            </a>
            <a
              href={gabriel.instagram}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center space-x-3 p-6 bg-slate-800 rounded-2xl hover:bg-slate-700 transition"
            >
              <Instagram className="text-blue-400 shrink-0" size={22} />
              <span className="font-medium text-sm">@gabriellsd_</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-900 border-t border-slate-800 text-center text-slate-500 text-sm">
        <div className="flex items-center justify-center gap-5 mb-3">
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
            href={gabriel.instagram}
            target="_blank"
            rel="noreferrer"
            className="hover:text-slate-300 transition"
            aria-label="Instagram"
          >
            <Instagram size={18} />
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

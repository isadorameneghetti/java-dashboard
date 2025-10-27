# Java Market Dashboard

Um dashboard moderno e responsivo para análise do mercado de tecnologia Java, desenvolvido em React com Tailwind CSS. Dados baseados no site "TIOBE Index".

## Link do Site
![Dashboard](https://isadorameneghetti.github.io/java-dashboard)

## Características

- **Design Moderno** - Interface limpa e profissional com modo escuro/claro
- **Totalmente Responsivo** - Adaptável para desktop, tablet e mobile
- **Performance Otimizada** - Desenvolvido com React e Vite
- **Visualizações de Dados** - Gráficos e métricas do mercado Java
- **Fácil Customização** - Componentes modulares e reutilizáveis

## Tecnologias Utilizadas

- **Frontend:** React 18, JavaScript/JSX
- **Estilização:** Tailwind CSS
- **Roteamento:** React Router DOM
- **Ícones:** FontAwesome
- **Build Tool:** Vite
- **Package Manager:** npm

## Instalação e Configuração

### Pré-requisitos
- Node.js 16+ 
- npm ou yarn

### Passos para Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd java-dashboard
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente** (se necessário)
```bash
cp .env.example .env
```

4. **Execute em modo de desenvolvimento**
```bash
npm run dev
```

5. **Acesse a aplicação**
```
http://localhost:5173
```

### Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build
npm run lint         # Análise de código
```

## Funcionalidades

### Dashboard Principal
- Visão geral do mercado Java
- Métricas principais e KPI's
- Gráficos de tendências
- Análise comparativa

### Desenvolvedores
- Perfil dos desenvolvedores Java
- Skills e especialidades
- Análise demográfica
- Tendências de carreira

### Tecnologias
- Ecossistema Java (Spring, Hibernate, etc.)
- Frameworks e bibliotecas
- Versões e adoção
- Comparativo de tecnologias

### Vagas e Mercado
- Análise do mercado de trabalho
- Salários e remuneração
- Demandas por região
- Tendências de contratação

### Relatórios
- Relatórios personalizáveis
- Exportação de dados
- Análises detalhadas
- Métricas históricas

## Personalização

### Cores e Tema
O projeto usa Tailwind CSS com configuração personalizável. Edite `tailwind.config.js` para alterar:

- Cores da marca
- Tipografia
- Espaçamentos
- Breakpoints

### Adicionando Novas Páginas
1. Crie o componente em `src/pages/`
2. Adicione a rota em `App.jsx`
3. Atualize a navegação no `Sidebar`

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## Problemas Conhecidos

- [ ] Avisos do React Router v7 (inofensivos)
- [ ] Otimização de performance para grandes datasets
- [ ] Melhorias na acessibilidade

## Suporte

Se você encontrar problemas ou tiver dúvidas:

1. Verifique os [Issues](https://github.com/seu-usuario/java-dashboard/issues)
2. Crie um novo issue com detalhes do problema
3. Entre em contato com a equipe de desenvolvimento

## Atualizações Futuras

- [ ] Integração com APIs reais
- [ ] Dashboard em tempo real
- [ ] Exportação para PDF/Excel
- [ ] Análises preditivas
- [ ] Internacionalização (i18n)

---

**Desenvolvido com ❤️ pela Equipe Java Market Analysis**
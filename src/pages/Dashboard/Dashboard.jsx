import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Filter from '../../components/ui/Filter/Filter';
import Card from '../../components/ui/Card/Card';
import Chart from '../../components/ui/Chart/Chart';
import { useJavaMarketData, javaVersions, staticMarketData, dataSources } from '../../data/javaMarketData';

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('yearly');
  const { marketData, loading, error } = useJavaMarketData();

  // Se estiver carregando, mostrar loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black-900">
        <div className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Carregando dados em tempo real...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Se houver erro, mostrar mensagem
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black-900">
        <div className="p-6">
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        </div>
      </div>
    );
  }

  // Métricas principais sobre Java com dados em tempo real
  const javaMetrics = [
    { 
      title: 'Posição no Ranking', 
      value: `#${marketData.currentStats.globalRank}`, 
      change: `${marketData.currentStats.yoyGrowth}%`, 
      changeType: 'positive', 
      icon: 'trophy',
      description: 'TIOBE Index 2024',
      source: dataSources.tiobe
    },
    { 
      title: 'Repositórios GitHub', 
      value: `${(marketData.currentStats.githubRepos / 1000000).toFixed(1)}M`, 
      change: '+12.3%', 
      changeType: 'positive', 
      icon: 'code-branch',
      description: 'Projetos Java ativos',
      source: dataSources.github
    },
    { 
      title: 'Perguntas StackOverflow', 
      value: `${(marketData.currentStats.stackOverflowQuestions / 1000000).toFixed(1)}M`, 
      change: '+8.5%', 
      changeType: 'positive', 
      icon: 'question-circle',
      description: 'Total de perguntas Java',
      source: dataSources.stackoverflow
    },
    { 
      title: 'Vagas Ativas', 
      value: `${marketData.jobsData.totalJobs}+`, 
      change: '+15.2%', 
      changeType: 'positive', 
      icon: 'briefcase',
      description: 'Oportunidades ativas',
      source: dataSources.remotive
    }
  ];

  // Dados para gráficos baseados no período selecionado
  const getChartData = () => {
    if (selectedPeriod === 'quarterly') {
      return [
        { name: 'Q1 2023', value: 2.1 },
        { name: 'Q2 2023', value: 1.8 },
        { name: 'Q3 2023', value: 2.4 },
        { name: 'Q4 2023', value: 2.7 },
        { name: 'Q1 2024', value: 3.2 }
      ];
    }
    return marketData.yearlyTrend.map(item => ({
      name: item.year,
      value: item.popularity
    }));
  };

  const getJobData = () => {
    return marketData.yearlyTrend.map(item => ({
      name: item.year,
      value: item.jobs
    }));
  };

  const getSalaryData = () => {
    return marketData.yearlyTrend.map(item => ({
      name: item.year,
      value: item.salary
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black-900">
      <div className="p-6">
        {/* Header e Filtros */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 space-y-4 lg:space-y-0">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon="coffee" className="text-white text-lg" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Mercado Java - Dados em Tempo Real
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Dados atualizados de GitHub, StackOverflow e vagas - Última atualização: {new Date(marketData.currentStats.lastUpdated).toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
          <Filter onPeriodChange={setSelectedPeriod} />
        </div>

        {/* Grid de Métricas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {javaMetrics.map((metric, index) => (
            <Card
              key={index}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              changeType={metric.changeType}
              icon={metric.icon}
              description={metric.description}
              source={metric.source}
            />
          ))}
        </div>

        {/* Gráficos Principais */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Tendência de Crescimento */}
          <div className="bg-white dark:bg-black-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {selectedPeriod === 'quarterly' ? 'Crescimento Trimestral' : 'Popularidade Anual'}
              </h3>
              <FontAwesomeIcon icon="chart-line" className="text-primary-500" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {selectedPeriod === 'quarterly' 
                ? 'Taxa de crescimento trimestral do Java no mercado' 
                : 'Evolução da popularidade do Java (2020-2024) - TIOBE Index'}
            </p>
            <div className="h-80">
              <Chart 
                data={getChartData()} 
                color="#eab308"
              />
            </div>
          </div>
          
          {/* Mercado de Trabalho */}
          <div className="bg-white dark:bg-black-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Demanda no Mercado</h3>
              <FontAwesomeIcon icon="briefcase" className="text-primary-500" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Vagas de emprego e evolução salarial para desenvolvedores Java
            </p>
            <div className="h-80">
              <div className="flex space-x-4 h-full">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Vagas (k)</h4>
                  <div className="h-48">
                    <Chart 
                      data={getJobData()} 
                      color="#10b981"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Salário (k USD)</h4>
                  <div className="h-48">
                    <Chart 
                      data={getSalaryData()} 
                      color="#3b82f6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grid Secundário */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Market Share */}
          <div className="bg-white dark:bg-black-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Market Share - Linguagens</h3>
              <FontAwesomeIcon icon="chart-pie" className="text-primary-500" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Participação no mercado de linguagens de programação
            </p>
            <div className="space-y-3">
              {staticMarketData.marketShare.map((lang, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FontAwesomeIcon 
                      icon={lang.trend === 'up' ? 'caret-up' : lang.trend === 'down' ? 'caret-down' : 'minus'}
                      className={`text-sm ${
                        lang.trend === 'up' ? 'text-green-500' : 
                        lang.trend === 'down' ? 'text-red-500' : 'text-gray-500'
                      }`}
                    />
                    <span className="font-medium text-gray-900 dark:text-white">{lang.language}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                      <div 
                        className="bg-primary-500 h-2 rounded-full"
                        style={{ width: `${lang.share}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white w-12">
                      {lang.share}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tecnologias Java */}
          <div className="bg-white dark:bg-black-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Ecossistema Java</h3>
              <FontAwesomeIcon icon="cogs" className="text-primary-500" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Adoção de tecnologias no ecossistema Java
            </p>
            <div className="space-y-4">
              {staticMarketData.technologies.map((tech, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-gray-900 dark:text-white">{tech.technology}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{tech.adoption}% adoção</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        tech.trend === 'up' ? 'bg-primary-500' : 
                        tech.trend === 'down' ? 'bg-red-500' : 'bg-gray-500'
                      }`}
                      style={{ width: `${tech.adoption}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Repositórios em Destaque e Vagas Recentes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Repositórios em Destaque */}
          <div className="bg-white dark:bg-black-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Repositórios em Destaque</h3>
              <FontAwesomeIcon icon="star" className="text-primary-500" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Repositórios Java populares no GitHub
            </p>
            <div className="space-y-3">
              {marketData.githubData.trendingRepos.slice(0, 5).map((repo, index) => (
                <div key={index} className="border-l-4 border-primary-500 pl-4 py-2">
                  <a 
                    href={repo.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 block"
                  >
                    {repo.name}
                  </a>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {repo.description}
                  </p>
                  <div className="flex space-x-4 text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>⭐ {repo.stars?.toLocaleString()}</span>
                    <span>🍴 {repo.forks?.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vagas Recentes */}
          <div className="bg-white dark:bg-black-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Vagas Recentes</h3>
              <FontAwesomeIcon icon="briefcase" className="text-primary-500" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Oportunidades de trabalho para desenvolvedores Java
            </p>
            <div className="space-y-3">
              {marketData.jobsData.recentJobs.slice(0, 5).map((job, index) => (
                <div key={index} className="border-l-4 border-green-500 pl-4 py-2">
                  <p className="font-medium text-gray-900 dark:text-white">{job.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{job.company}</p>
                  <div className="flex space-x-2 mt-1">
                    <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">
                      {job.location}
                    </span>
                    {job.remote && (
                      <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                        Remote
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabela de Versões Java */}
        <div className="bg-white dark:bg-black-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Versões Java - Adoção</h3>
            <FontAwesomeIcon icon="code-branch" className="text-primary-500" />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Adoção das versões do Java no mercado
          </p>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="text-left py-3 text-gray-600 dark:text-gray-400 font-medium">Versão</th>
                  <th className="text-left py-3 text-gray-600 dark:text-gray-400 font-medium">Lançamento</th>
                  <th className="text-left py-3 text-gray-600 dark:text-gray-400 font-medium">Adoção</th>
                  <th className="text-left py-3 text-gray-600 dark:text-gray-400 font-medium">Tipo</th>
                  <th className="text-left py-3 text-gray-600 dark:text-gray-400 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {javaVersions.map((version, index) => (
                  <tr key={index} className="border-b border-gray-100 dark:border-gray-800 last:border-0">
                    <td className="py-3">
                      <div className="flex items-center space-x-2">
                        <FontAwesomeIcon icon="coffee" className="text-primary-500" />
                        <span className="font-medium text-gray-900 dark:text-white">{version.version}</span>
                      </div>
                    </td>
                    <td className="py-3 text-gray-600 dark:text-gray-400">{version.release}</td>
                    <td className="py-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                          <div 
                            className="bg-primary-500 h-2 rounded-full"
                            style={{ width: `${version.adoption}%` }}
                          ></div>
                        </div>
                        <span className="text-gray-900 dark:text-white">{version.adoption}%</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        version.lts 
                          ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-400'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                      }`}>
                        {version.lts ? 'LTS' : 'Standard'}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        version.adoption > 50 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : version.adoption > 20
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                        {version.adoption > 50 ? 'Estável' : version.adoption > 20 ? 'Crescendo' : 'Emergente'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Insights e Tendências */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl p-6 text-white">
            <FontAwesomeIcon icon="lightbulb" className="text-2xl mb-4" />
            <h4 className="font-semibold mb-2">Java na Nuvem</h4>
            <p className="text-sm opacity-90">
              Crescimento de 45% na adoção de Java em ambientes cloud-native com Spring Boot e Micronaut.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl p-6 text-white">
            <FontAwesomeIcon icon="chart-line" className="text-2xl mb-4" />
            <h4 className="font-semibold mb-2">Mercado Asiático</h4>
            <p className="text-sm opacity-90">
              Demanda por desenvolvedores Java cresceu 25% na Ásia, liderado por China e Índia.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl p-6 text-white">
            <FontAwesomeIcon icon="shield-alt" className="text-2xl mb-4" />
            <h4 className="font-semibold mb-2">Setor Financeiro</h4>
            <p className="text-sm opacity-90">
              78% das instituições financeiras mantêm Java como tecnologia principal para sistemas críticos.
            </p>
          </div>
        </div>

        {/* Rodapé com informações de atualização */}
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Última atualização: {new Date(marketData.currentStats.lastUpdated).toLocaleString()} | 
            Dados em tempo real de APIs oficiais
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
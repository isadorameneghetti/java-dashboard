// API para dados de vagas (usando API pública)
const REMOTIVE_API_URL = 'https://remotive.com/api/remote-jobs';

export const getJavaJobs = async (limit = 10) => {
  try {
    const response = await fetch(`${REMOTIVE_API_URL}?category=software-dev&search=java&limit=${limit}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch jobs');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

// Fallback API caso a principal falhe
export const getJavaJobsFromAdzuna = async () => {
  try {
    // API pública alternativa para vagas
    const response = await fetch('https://www.arbeitnow.com/api/job-board-api');
    
    if (!response.ok) {
      throw new Error('Failed to fetch jobs from alternative API');
    }
    
    const data = await response.json();
    // Filtrar vagas Java
    const javaJobs = data.data.filter(job => 
      job.title.toLowerCase().includes('java') || 
      job.description.toLowerCase().includes('java')
    );
    
    return { jobs: javaJobs.slice(0, 10) };
  } catch (error) {
    console.error('Error fetching jobs from alternative API:', error);
    throw error;
  }
};
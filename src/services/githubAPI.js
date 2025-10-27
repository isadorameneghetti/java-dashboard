// API para dados do GitHub
const GITHUB_API_URL = 'https://api.github.com';

export const getJavaRepositories = async (page = 1, perPage = 10) => {
  try {
    const response = await fetch(
      `${GITHUB_API_URL}/search/repositories?q=language:java&sort=stars&order=desc&page=${page}&per_page=${perPage}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch GitHub repositories');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    throw error;
  }
};

export const getJavaTrends = async () => {
  try {
    const response = await fetch(
      `${GITHUB_API_URL}/search/repositories?q=language:java&sort=updated&order=desc&per_page=5`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch Java trends');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Java trends:', error);
    throw error;
  }
};
// API para dados do StackOverflow
const STACKOVERFLOW_API_URL = 'https://api.stackexchange.com/2.3';

export const getJavaQuestions = async (page = 1, pagesize = 10) => {
  try {
    const response = await fetch(
      `${STACKOVERFLOW_API_URL}/questions?order=desc&sort=activity&tagged=java&site=stackoverflow&page=${page}&pagesize=${pagesize}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch StackOverflow questions');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching StackOverflow questions:', error);
    throw error;
  }
};

export const getJavaTagsStats = async () => {
  try {
    const response = await fetch(
      `${STACKOVERFLOW_API_URL}/tags/java/info?site=stackoverflow`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch Java tag stats');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Java tag stats:', error);
    throw error;
  }
};
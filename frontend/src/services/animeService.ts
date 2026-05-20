import axios from 'axios';
import { Anime, SearchQuery } from '../types/anime';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const searchAnime = async (query: string): Promise<Anime[]> => {
  try {
    const response = await apiClient.get('/anime/search', {
      params: { q: query },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching anime:', error);
    throw error;
  }
};

export const getUpcomingAnime = async (): Promise<Anime[]> => {
  try {
    const response = await apiClient.get('/anime/upcoming');
    return response.data;
  } catch (error) {
    console.error('Error fetching upcoming anime:', error);
    throw error;
  }
};

export const getAnimeDetail = async (id: string): Promise<Anime> => {
  try {
    const response = await apiClient.get(`/anime/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching anime details:', error);
    throw error;
  }
};

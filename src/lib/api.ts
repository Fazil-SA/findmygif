import { SearchResponse } from '@/types/gif';

export async function searchGifs(query: string, limit: number = 24): Promise<SearchResponse> {
  try {
    const response = await fetch(`/api/gifs?q=${encodeURIComponent(query)}&limit=${limit}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch GIFs');
    }

    const data: SearchResponse = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

export async function getTrendingGifs(limit: number = 24): Promise<SearchResponse> {
  try {
    const response = await fetch(`/api/trending?limit=${limit}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch trending GIFs');
    }

    const data: SearchResponse = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

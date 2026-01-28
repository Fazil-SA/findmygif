import { SearchResponse } from '@/types/gif';

export async function searchGifs(query: string, limit: number = 24, offset: number = 0): Promise<SearchResponse> {
  try {
    const response = await fetch(`/api/gifs?q=${encodeURIComponent(query)}&limit=${limit}&offset=${offset}`);

    if (!response.ok) {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch GIFs');
      } else {
        throw new Error(`Failed to fetch GIFs: ${response.status} ${response.statusText}`);
      }
    }

    const data: SearchResponse = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

export async function getTrendingGifs(limit: number = 24, offset: number = 0): Promise<SearchResponse> {
  try {
    const response = await fetch(`/api/trending?limit=${limit}&offset=${offset}`);

    if (!response.ok) {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch trending GIFs');
      } else {
        throw new Error(`Failed to fetch trending GIFs: ${response.status} ${response.statusText}`);
      }
    }

    const data: SearchResponse = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

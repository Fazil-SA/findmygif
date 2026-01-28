import { NextRequest, NextResponse } from 'next/server';

const GIPHY_API_KEY = process.env.NEXT_PUBLIC_GIPHY_API_KEY;
const GIPHY_API_URL = 'https://api.giphy.com/v1/gifs/search';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const limit = searchParams.get('limit') || '24';
    const offset = searchParams.get('offset') || '0';

    if (!query) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    if (!GIPHY_API_KEY) {
      return NextResponse.json(
        { error: 'Giphy API key is not configured' },
        { status: 500 }
      );
    }

    const url = new URL(GIPHY_API_URL);
    url.searchParams.append('api_key', GIPHY_API_KEY);
    url.searchParams.append('q', query);
    url.searchParams.append('limit', limit);
    url.searchParams.append('offset', offset);
    url.searchParams.append('rating', 'g');
    url.searchParams.append('lang', 'en');

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`Giphy API error: ${response.statusText}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching GIFs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GIFs' },
      { status: 500 }
    );
  }
}

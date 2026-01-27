export interface GifImage {
  url: string;
  width: string;
  height: string;
  size?: string;
  mp4?: string;
  mp4_size?: string;
  webp?: string;
  webp_size?: string;
}

export interface GifImages {
  original: GifImage;
  downsized: GifImage;
  downsized_large: GifImage;
  downsized_medium: GifImage;
  downsized_small: GifImage;
  fixed_height: GifImage;
  fixed_height_downsampled: GifImage;
  fixed_height_small: GifImage;
  fixed_width: GifImage;
  fixed_width_downsampled: GifImage;
  fixed_width_small: GifImage;
  preview_gif: GifImage;
}

export interface Gif {
  id: string;
  title: string;
  images: GifImages;
  url: string;
  rating?: string;
  username?: string;
  user?: {
    display_name?: string;
    username?: string;
  };
}

export interface SearchResponse {
  data: Gif[];
  pagination: {
    total_count: number;
    count: number;
    offset: number;
  };
  meta: {
    status: number;
    msg: string;
  };
}

# GIF Explorer

A modern Next.js application for searching and browsing GIFs using the Giphy API.

## Features

- 🔍 Real-time GIF search with debounced input
- 📱 Responsive grid layout (2/3/4 columns)
- 🎬 Full-screen GIF detail view with modal
- ⚡ Built with Next.js 15, TypeScript, and Tailwind CSS
- 🎨 Smooth animations and loading states
- ♿ Keyboard navigation and accessibility features

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Giphy API key (free from [Giphy Developers](https://developers.giphy.com/))

### Installation

1. Clone or navigate to the project directory:
```bash
cd gif-explorer
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your Giphy API key:
```env
NEXT_PUBLIC_GIPHY_API_KEY=your_api_key_here
```

To get a Giphy API key:
1. Visit https://developers.giphy.com/
2. Create an account or sign in
3. Create a new app (select SDK option)
4. Copy your API key

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
gif-explorer/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout with metadata
│   │   ├── page.tsx              # Home page with search and grid
│   │   ├── globals.css           # Global styles + Tailwind
│   │   └── api/
│   │       └── gifs/
│   │           └── route.ts      # API route for Giphy requests
│   ├── components/
│   │   ├── SearchBar.tsx         # Search input component
│   │   ├── GifGrid.tsx           # Grid display component
│   │   ├── GifCard.tsx           # Individual GIF card
│   │   ├── GifModal.tsx          # Modal for GIF detail view
│   │   └── LoadingState.tsx      # Loading skeleton/spinner
│   ├── types/
│   │   └── gif.ts                # TypeScript interfaces for GIF data
│   └── lib/
│       └── api.ts                # API client functions
├── public/
├── .env.local                     # API key storage (gitignored)
└── ...config files
```

## Usage

1. **Search for GIFs**: Type a keyword in the search bar
2. **Browse Results**: View GIFs in a responsive grid layout
3. **View Details**: Click any GIF to see it in full size with details
4. **Close Modal**: Click the X button, press Escape, or click outside
5. **Copy URL**: Use the "Copy URL" button in the modal to copy the GIF URL

## Features in Detail

### Search Bar
- Debounced input (300ms delay) to reduce API calls
- Clear button to reset search
- Loading state during search
- Enter key support

### GIF Grid
- Responsive layout adapts to screen size
- Hover effects show GIF title and creator
- Lazy loading for better performance
- Empty state for no results

### GIF Modal
- Full-screen detail view
- Large GIF display
- Metadata (title, creator, rating)
- Links to view on Giphy
- Copy URL functionality
- Keyboard (Escape) and click-outside to close

## Technologies Used

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Giphy API**: GIF search and data

## Build for Production

```bash
npm run build
npm start
```

## License

MIT

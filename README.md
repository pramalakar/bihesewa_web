# BiheSewa Web

A privacy-first, minimal website for BiheSewa matrimonial platform.

## Features

- **Privacy-Focused Design**: Minimal, blank-screen landing page emphasizing privacy
- **Bottom Navigation**: Easy access to Privacy, Terms, About, and Contact pages
- **Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark Mode**: Automatic dark mode support based on system preferences
- **Modern Stack**: Built with Next.js 16, TypeScript, and Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file:
```bash
cp .env.example .env.local
```

3. Update the environment variables in `.env.local` (if needed):
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

**Note:** The default Next.js port is 3000, but if you're running on a different port (e.g., 3001), adjust accordingly.

### Build

Build for production:

```bash
npm run build
```

Start production server:

```bash
npm start
```

## Project Structure

```
bihesewa_web/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page (privacy-focused landing)
│   ├── privacy/           # Privacy policy page
│   ├── terms/             # Terms & conditions page
│   ├── about/             # About us page
│   ├── contact/           # Contact page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   └── BottomNavigation.tsx
├── src/
│   ├── config.ts          # Configuration constants
│   ├── lib/
│   │   └── api.ts         # API client setup
│   └── services/
│       └── cmsService.ts  # CMS service
└── public/                # Static assets
```

## Design Philosophy

This website is designed with privacy as the core principle:

- **Minimal Interface**: Clean, blank-screen design that doesn't reveal user information
- **Privacy Message**: Clear communication that "what you can't see, others can't see either"
- **Bottom Navigation**: Small, unobtrusive menu for essential information
- **Trust Building**: Focus on security and privacy features

## API Integration

The website is configured to connect to the existing BiheSewa backend API. Update the `NEXT_PUBLIC_API_BASE_URL` environment variable to point to your API server.

## Technologies

- **Next.js 16**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **Axios**: HTTP client for API calls

## License

Private - BiheSewa Platform

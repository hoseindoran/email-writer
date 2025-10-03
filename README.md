# Email Writing Agent

An intelligent email writing assistant powered by AI that helps you compose professional, contextually appropriate emails effortlessly.

## Features

- 🤖 **AI-Powered Email Generation** - Leverages Google's AI models to generate high-quality email content
- ✍️ **Rich Text Editor** - Built with BlockSuite for a seamless writing experience
- 📝 **Form Validation** - Robust input validation using React Hook Form and Zod
- 🔐 **Authentication** - Secure user authentication with NextAuth
- 💾 **Data Persistence** - Efficient data management with Prisma ORM
- 🎨 **Modern UI** - Beautiful, responsive interface built with Tailwind CSS and shadcn/ui components
- ⚡ **Server-Side Rendering** - Fast performance with Next.js App Router

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript/JavaScript
- **AI Integration**: AI SDK (Google)
- **Authentication**: NextAuth
- **Database ORM**: Prisma
- **Editor**: BlockSuite
- **Form Management**: React Hook Form
- **Validation**: Zod
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Runtime**: Node.js 22.14.0

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 22.14.0 or higher
- npm or yarn package manager
- A database (PostgreSQL/MySQL/MongoDB - depending on your Prisma setup)

## Installation

1. **Clone the repository**

```bash
git clone <your-repository-url>
cd <project-directory>
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory and add the following variables:

```env
# Database
DATABASE_URL="your-database-connection-string"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"

# Google AI
GOOGLE_GENERATIVE_AI_API_KEY="your-google-ai-api-key"

# Optional: Additional auth providers
# GOOGLE_CLIENT_ID="your-google-client-id"
# GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

4. **Set up the database**

```bash
npx prisma generate
npx prisma db push
# or for migrations
npx prisma migrate dev
```

## Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Build

Create a production build:

```bash
npm run build
```

## Production

Start the production server:

```bash
npm start
```

## Project Structure

```
/prisma             # Database schema and migrations
/src
  /app                 # Next.js App Router pages and layouts
    /api              # API routes
    ...               # Page routes and layouts
  /components         # Reusable React components
  /hooks              # Custom React hooks
  /lib                # Utility functions and configurations
  /providers          # Context providers and wrappers
  /public             # Static assets
```

## Key Directories

- **`/app`** - Contains all application routes, layouts, and API endpoints using Next.js App Router
- **`/components`** - Shared UI components including shadcn/ui components
- **`/hooks`** - Custom React hooks for shared logic
- **`/lib`** - Helper functions, constants, and configuration files
- **`/providers`** - React context providers for global state management

## Environment Variables

| Variable                       | Description                  | Required |
| ------------------------------ | ---------------------------- | -------- |
| `DATABASE_URL`                 | Database connection string   | Yes      |
| `NEXTAUTH_URL`                 | Application URL              | Yes      |
| `NEXTAUTH_SECRET`              | Secret for NextAuth sessions | Yes      |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Google AI API key            | Yes      |
| `GITHUB_ID`                    | Github ID                    | Yes      |
| `GITHUB_SECRET`                | Github Secret                | Yes      |

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For support, please open an issue in the GitHub repository.

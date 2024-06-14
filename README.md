# Tree Hole: a Next.js SPA with CRUD Operations

## Overview

This project is a Single Page Application (SPA) built with Next.js, styled with TailwindCSS, and uses Redux for state management. The application performs CRUD operations (Create, Read, Update, Delete) by interacting with a mock API provided by JSONPlaceholder. The project is written in TypeScript.

## Features

- View a list of posts
- Add a new post
- Edit an existing post
- Delete a post

## Assumptions

- The mock API (JSONPlaceholder) simulates typical CRUD operations.
- No authentication is required for the operations.
- The application uses both TailwindCSS for styling and Redux Toolkit for state management.

## Prerequisites

- Node.js (>= 14.x)
- npm or yarn

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/kwanljuin/next-blog-assessment.git
cd next-blog-assessment
```

### Install Dependencies

Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

### Environment Variables

Create a `.env.local` file in the root directory and add the following:

```bash
NEXT_PUBLIC_API_URL=https://my-json-server.typicode.com/kwanljuin/next-blog-assessment
```

### Running the Application

To run the application in development mode:

```bash
npm run dev
```

Or using yarn:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

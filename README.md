# Blogging Website  

A modern blogging platform built with a powerful stack to deliver a seamless and dynamic user experience. This project leverages the best of frontend and backend technologies, ensuring efficiency, scalability, and a delightful user interface.  

## Features  

- **Rich Text Editor**: Write and format blogs effortlessly with a robust editor.  
- **Optimistic Loading**: Enjoy a fast and responsive UI with skeleton loaders for a smoother user experience.  
- **Autosave**: Automatically save blog drafts while writing to prevent data loss.  
- **Modern Styling**: Beautiful and responsive UI styled with Tailwind CSS.  

## Tech Stack  

### Frontend  
- **Framework**: React.js with TypeScript for a type-safe and scalable architecture.  
- **Styling**: Tailwind CSS for sleek and responsive design.  
- **Features**:  
  - Integrated rich text editor for creating blogs.  
  - Skeleton structure for optimistic UI loading.  

### Backend  
- **Hono Framework** (TypeScript):  
  - Built on a serverless architecture for high scalability and performance.  
  - Handles blog creation, reading, updating, and deleting operations.  
  - Powered by Prisma as the ORM for seamless database interactions with PostgreSQL. 
  - Utilizes Prisma Accelerate to make the database calls faster with the help of Prisma's cache 

- **Express.js Backend** (TypeScript):  
  - Specialized WebSocket server for real-time blog writing.  
  - Implements an autosave feature with a 2-second debounce for efficient content saving.  
  - Utilizes `node-pg` to execute raw PostgreSQL queries for optimized database operations.  

### Database  
- **PostgreSQL**: A robust relational database management system.  
- **Prisma ORM**: Simplifies database interactions and migrations.  

## Installation  

1. Clone the repository:  
   ```bash  
   git clone https://github.com/your-username/blogging-website.git  
   cd BlogIt
   npm install  
   ```  

2. Install dependencies for both frontend and backend:  
   ```bash  
   # Frontend  
   cd frontend  
   npm install  

   # Backend (Hono)  
   cd ../backend-hono  
   npm install  

   # Backend (Express)  
   cd ../backend-express  
   npm install  
   ```  

3. Set up environment variables for each backend service:  
   - Hono Backend:  
     - `DATABASE_URL` 
     - `DIRECT_URL` 
     - `JWT_SECRET`  
   - Express Backend:  
     - `DATABASE_URL`  

4. Start the services:  
   ```bash  
   # Frontend  
   npm start  

   # Backend (Hono)  
   npm run dev  

   # Backend (Express)  
   npm run dev  
   ```  

## Usage  

- Access the frontend at `http://localhost:3000`.  
- Log in to create, edit, or delete blogs.  
- Blogs are saved in real time while being written.  

## Project Structure  

### Frontend  
- **Rich Text Editor**: Integrated for dynamic blog creation.  
- **Optimistic Loading**: Skeleton components ensure a seamless experience.  

### Backend  
- **Hono Framework**: Efficient serverless solution for core blog operations.  
- **Express WebSocket Server**: Enables real-time blog writing and autosave functionality.  

### Database  
- **PostgreSQL**: Handles all data persistence.  
- **Prisma ORM**: Simplifies schema management and database queries.  

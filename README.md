# Task Management Dashboard

This project is a task management dashboard that allows users to manage their tasks with features like adding, editing, deleting, and viewing tasks. The dashboard uses a glassmorphic design for a modern and clean user interface.

## Features

- **User Authentication**: Secure login and logout using Kinde authentication.
- **Task Management**: Add, edit, delete, and view tasks.
- **Task Categories**: View the last ten incomplete, completed, and deleted tasks.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## API Endpoints

### Fetch Deleted Tasks

- **Endpoint**: `/api/tasks/deleted`
- **Method**: `GET`
- **Description**: Fetches the last ten deleted tasks for the authenticated user.
- **Response**: Returns a JSON array of deleted tasks.

## Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/chengivan2/task-dashboard.git
   cd task-dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**: Set up the following environment variables in your `.env` file or Vercel dashboard:
   - `KINDE_CLIENT_ID`
   - `KINDE_CLIENT_SECRET`
   - `KINDE_REDIRECT_URI`
   - `DATABASE_URL`

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Access the application**: Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This project is set up for deployment on Vercel. Ensure all environment variables are configured in the Vercel dashboard.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.
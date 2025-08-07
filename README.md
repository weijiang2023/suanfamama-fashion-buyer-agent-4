# AI Chat with Response Timer

## Overview

This application combines a chat interface with a response timer, allowing users to interact with AI models while measuring response times. It features a visually appealing timer, a modern chat UI with Hugging Face integration for streaming responses, and automatic timer control linked to message sending and response completion.

## Features

- **Interactive Chat Interface**: Modern, visually appealing chat UI with message bubbles and smooth animations
- **Response Timer**: Elegant timer display that automatically starts when sending a message and stops when the AI response completes
- **Hugging Face Integration**: Connects to Hugging Face's API for AI model responses with streaming capability
- **Simulation Mode**: Option to use simulated responses for testing without API calls
- **Responsive Design**: Built with Tailwind CSS for a fully responsive experience across devices

## Project Structure

```
├── backend/                # Python backend service
│   ├── main.py            # Main backend application
│   ├── render.yaml        # Render deployment configuration
│   └── requiremnts.txt    # Python dependencies
└── frontend/              # React frontend application
    ├── public/            # Static assets
    ├── src/               # Source code
    │   ├── components/    # React components
    │   │   ├── ChatInterface.jsx  # Main chat component
    │   │   └── Timer.jsx          # Timer component
    │   ├── assets/        # Images and other assets
    │   ├── App.jsx        # Main application component
    │   ├── index.css      # Global styles
    │   └── main.jsx       # Application entry point
    ├── .env.example       # Example environment variables
    └── package.json       # Frontend dependencies
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Python 3.8+ (for backend)

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file based on `.env.example` and add your Hugging Face API key if needed.

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

### Backend Setup (if needed)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requiremnts.txt
   ```

4. Start the backend server:
   ```bash
   python main.py
   ```

## Technologies Used

- **Frontend**:
  - React
  - Vite
  - Tailwind CSS
  - Hugging Face API

- **Backend**:
  - Python

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Hugging Face for providing the AI model API
- Tailwind CSS for the styling framework
- React and Vite for the frontend development environment
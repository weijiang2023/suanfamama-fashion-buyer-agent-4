# AI Chat with Response Timer - Frontend

This application allows you to chat with AI models from Hugging Face while tracking the response time with a beautiful timer. The frontend is built with React, Vite, and Tailwind CSS, providing a modern and responsive user interface.

## Features

- **Interactive Chat Interface**: Modern, visually appealing chat UI with message bubbles and smooth animations
- **Response Timer**: Elegant timer display that automatically starts when sending a message and stops when the AI response completes
- **Hugging Face Integration**: Connects to Hugging Face's API for AI model responses with streaming capability
- **Simulation Mode**: Option to use simulated responses for testing without API calls
- **Responsive Design**: Built with Tailwind CSS for a fully responsive experience across devices

## Project Structure

```
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

## Setup

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

2. Set up your Hugging Face API token:
   - Rename `.env.example` to `.env` (or create a new `.env` file)
   - Add your Hugging Face API token to the `.env` file:
     ```
     VITE_HF_TOKEN=your_huggingface_token_here
     ```
   - You can get a token from [Hugging Face](https://huggingface.co/settings/tokens)

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal)

## Usage

1. Type your message in the input field
2. Press the send button to submit your query
3. The timer will start automatically when you send a message
4. The timer will stop when the response is complete
5. You can view the total response time in the timer display

## Components

### ChatInterface

The main component that handles:
- User input and message submission
- Displaying message history
- Communicating with the Hugging Face API
- Controlling the timer based on message status

### Timer

A reusable component that:
- Displays elapsed time in a visually appealing format
- Provides start, pause, and reset functionality
- Automatically updates the display while running

## Styling

The application uses Tailwind CSS for styling with:
- Modern gradient backgrounds
- Responsive layouts that work on mobile and desktop
- Smooth animations and transitions
- Custom grid patterns and decorative elements

## Development

### Adding New Features

1. Create new components in the `src/components` directory
2. Import and use them in the appropriate parent component
3. Add any necessary state management or API calls

### Modifying Styles

1. Use Tailwind CSS classes directly in the JSX
2. For custom styles, add them to `index.css`
3. Configure Tailwind in `tailwind.config.js` for theme customization

## Notes

- If no Hugging Face token is provided, the application will run in simulation mode
- The application uses the `openai/gpt-oss-120b` model by default
- The UI is designed to be responsive and work on both desktop and mobile devices

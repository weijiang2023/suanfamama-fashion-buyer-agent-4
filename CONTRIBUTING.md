# Contributing to AI Chat with Response Timer

Thank you for considering contributing to the AI Chat with Response Timer project! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## How Can I Contribute?

### Reporting Bugs

Bugs are tracked as GitHub issues. When you create an issue, please include:

- A clear and descriptive title
- Steps to reproduce the issue
- Expected behavior vs. actual behavior
- Screenshots if applicable
- Any relevant details about your environment (browser, OS, etc.)

### Suggesting Enhancements

Enhancement suggestions are also tracked as GitHub issues. When suggesting an enhancement, please include:

- A clear and descriptive title
- A detailed description of the proposed functionality
- Any potential implementation details you can provide
- Why this enhancement would be useful to most users

### Pull Requests

1. Fork the repository
2. Create a new branch for your feature or bugfix (`git checkout -b feature/your-feature-name`)
3. Make your changes
4. Run tests if available
5. Commit your changes with clear, descriptive commit messages
6. Push to your branch
7. Submit a pull request to the main repository

## Development Setup

### Frontend

1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Create a `.env` file based on `.env.example`
4. Start the development server: `npm run dev`

### Backend (if needed)

1. Navigate to the backend directory: `cd backend`
2. Create a virtual environment: `python -m venv venv`
3. Activate the virtual environment: 
   - Windows: `venv\Scripts\activate`
   - Unix/MacOS: `source venv/bin/activate`
4. Install dependencies: `pip install -r requiremnts.txt`
5. Start the backend server: `python main.py`

## Style Guidelines

### JavaScript/React

- Follow the existing code style in the project
- Use ES6+ features where appropriate
- Use functional components with hooks for React components
- Document complex functions and components

### CSS/Tailwind

- Follow the existing Tailwind CSS class naming conventions
- Group related classes together
- Prefer Tailwind utility classes over custom CSS when possible

### Python (Backend)

- Follow PEP 8 style guidelines
- Document functions and classes with docstrings
- Use type hints where appropriate

## License

By contributing to this project, you agree that your contributions will be licensed under the project's MIT License.
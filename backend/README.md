# AI Chat with Response Timer - Backend

## Overview

This is the backend service for the AI Chat with Response Timer application. It's built with FastAPI and provides API endpoints for the frontend to interact with.

## API Endpoints

- `GET /`: Root endpoint that returns a simple hello world message
- `GET /items/{item_id}`: Example endpoint that returns an item by ID with an optional query parameter

## Setup and Installation

### Prerequisites

- Python 3.8+
- pip

### Installation

1. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requiremnts.txt
   ```

### Running the Server

```bash
python main.py
```

Alternatively, you can use Uvicorn directly:

```bash
uvicorn main:app --reload
```

The server will start on `http://localhost:8000` by default.

## API Documentation

Once the server is running, you can access the auto-generated API documentation at:

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Development

### Adding New Endpoints

To add new endpoints, follow the FastAPI pattern in `main.py`:

```python
@app.get("/your-endpoint")
def your_endpoint_function(param: type):
    # Your logic here
    return {"result": "data"}
```

### Environment Variables

Create a `.env` file in the backend directory for any environment variables needed:

```
API_KEY=your_api_key
DEBUG=True
```

## Deployment

This backend is configured for deployment on Render using the `render.yaml` file. To deploy:

1. Push your changes to your repository
2. Connect your repository to Render
3. Render will automatically deploy the service based on the configuration

## License

This project is licensed under the MIT License - see the LICENSE file in the root directory for details.
import './App.css'
import ChatInterface from './components/ChatInterface'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full filter blur-[100px] opacity-20"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600 rounded-full filter blur-[100px] opacity-20"></div>
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-indigo-600 rounded-full filter blur-[80px] opacity-20"></div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      
      <div className="relative z-10 w-full max-w-6xl">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 mb-4 tracking-tight">
            AI Chat with Response Timer
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Chat with AI models and measure their response times with precision
          </p>
        </header>
        
        <div className="w-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-700">
          <ChatInterface />
        </div>
        
        <footer className="mt-16 text-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="h-1 w-1 rounded-full bg-indigo-500"></div>
            <div className="h-1 w-1 rounded-full bg-purple-500"></div>
            <div className="h-1 w-1 rounded-full bg-blue-500"></div>
          </div>
          <p className="text-gray-400 text-sm">
            Chat with the latest AI models and track response times with millisecond precision
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App

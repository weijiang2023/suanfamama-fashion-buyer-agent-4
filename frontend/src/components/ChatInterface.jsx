import { useState, useRef, useEffect } from 'react';
import { InferenceClient } from '@huggingface/inference';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Timer from './Timer';

const ChatInterface = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [streamingResponse, setStreamingResponse] = useState('');
  const [hfToken, setHfToken] = useState('');
  const timerRef = useRef(null);
  
  useEffect(() => {
    // In a real app, you would get this from environment variables
    // For demo purposes, we're using the environment variable if available
    const token = import.meta.env.VITE_HF_TOKEN || '';
    setHfToken(token);
  }, []);
  
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message to chat
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    
    // Clear input field
    setInput('');
    
    // Start timer when sending request
    if (timerRef.current) {
      timerRef.current.handleStartStop();
    }
    
    setIsLoading(true);
    
    try {
      // Reset streaming response
      setStreamingResponse('');
      
      if (!hfToken || hfToken === 'your_huggingface_token_here') {
        // If no token is provided, use simulation mode
        console.log('No Hugging Face token provided. Using simulation mode.');
        
        // Add a temporary streaming message
        const tempMessage = { role: 'assistant', content: 'Thinking...' };
        setMessages(prev => [...prev, tempMessage]);
        
        // Simulate streaming response with markdown formatting
        const fullResponse = `# AI Response

This is a simulated response since no Hugging Face token was provided. In a real implementation, this would be the response from the Hugging Face model.

## Features

- **Markdown support** for better formatting
- Support for *italic* and **bold** text
- Code blocks with syntax highlighting

### Code Example

\`\`\`javascript
const greeting = (name) => {
  return "Hello, " + name + "!";
};

console.log(greeting('User'));
\`\`\`

> This is a blockquote that can be used for important information or quotes.

### Table Example

| Feature | Description |
| ------- | ----------- |
| Markdown | Formats text with headings, lists, etc. |
| Code Highlighting | Shows code with proper syntax colors |
| Tables | Organizes data in rows and columns |

You can also include [links](https://example.com) and organize information with different heading levels.`;
        let currentResponse = '';
        
        const simulateStream = async () => {
          for (let i = 0; i < fullResponse.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 30));
            currentResponse += fullResponse[i];
            setStreamingResponse(currentResponse);
            
            // Update the last message with the current streaming response
            setMessages(prev => {
              const newMessages = [...prev];
              newMessages[newMessages.length - 1] = {
                role: 'assistant',
                content: currentResponse
              };
              return newMessages;
            });
          }
          
          setIsLoading(false);
          
          // Stop timer when response is complete
          if (timerRef.current) {
            timerRef.current.handleStartStop();
          }
        };
        
        simulateStream();
      } else {
        // Use actual Hugging Face API
        const client = new InferenceClient(hfToken);
        
        // Add a temporary streaming message
        const tempMessage = { role: 'assistant', content: 'Thinking...' };
        setMessages(prev => [...prev, tempMessage]);
        
        let responseText = "";
        
        try {
          const stream = client.chatCompletionStream({
            provider: "novita",
            model: "openai/gpt-oss-120b",
            messages: [
              ...messages.map(msg => ({ role: msg.role, content: msg.content })),
              { role: "user", content: input },
            ],
          });
          
          for await (const chunk of stream) {
            if (chunk.choices && chunk.choices.length > 0) {
              const newContent = chunk.choices[0].delta.content;
              responseText += newContent;
              setStreamingResponse(responseText);
              
              // Update the last message with the current streaming response
              setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = {
                  role: 'assistant',
                  content: responseText
                };
                return newMessages;
              });
            }
          }
          
          setIsLoading(false);
          
          // Stop timer when response is complete
          if (timerRef.current) {
            timerRef.current.handleStartStop();
          }
        } catch (apiError) {
          console.error('API Error:', apiError);
          
          // Update the last message with the error
          setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = {
              role: 'assistant',
              content: 'Sorry, there was an error with the Hugging Face API. Please check your token and try again.'
            };
            return newMessages;
          });
          
          setIsLoading(false);
          
          // Stop timer on error
          if (timerRef.current) {
            timerRef.current.handleStartStop();
          }
        }
      }
      
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, there was an error processing your request.'
      }]);
      setIsLoading(false);
      
      // Stop timer on error
      if (timerRef.current) {
        timerRef.current.handleStartStop();
      }
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      <div className="flex-1 overflow-y-auto p-6 space-y-6 mb-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-inner border border-gray-700">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-center opacity-70">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-indigo-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <p className="text-gray-400 text-lg">Start a conversation with the AI</p>
            <p className="text-gray-500 text-sm mt-2">Your messages will appear here</p>
          </div>
        )}
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`p-4 rounded-2xl shadow-md max-w-[80%] transform transition-all duration-300 ease-in-out ${message.role === 'user' 
              ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white' 
              : 'bg-gradient-to-r from-gray-700 to-gray-800 text-gray-100 border border-gray-600'}`}
            >
              <div className="flex items-center mb-2">
                {message.role === 'user' ? (
                  <>
                    <span className="font-medium">You</span>
                    <div className="ml-2 h-2 w-2 rounded-full bg-blue-400"></div>
                  </>
                ) : (
                  <>
                    <div className="h-2 w-2 rounded-full bg-purple-400 mr-2"></div>
                    <span className="font-medium">AI Assistant</span>
                  </>
                )}
              </div>
              {message.role === 'user' ? (
                <p className="whitespace-pre-wrap">{message.content}</p>
              ) : (
                <div className="markdown-content">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                          <SyntaxHighlighter
                            style={atomDark}
                            language={match[1]}
                            PreTag="div"
                            className="rounded-md my-2"
                            {...props}
                          >
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                        ) : (
                          <code className="bg-gray-800 px-1 rounded text-sm" {...props}>
                            {children}
                          </code>
                        );
                      },
                      h1: ({ node, ...props }) => <h1 className="text-xl font-bold my-3 pb-1 border-b border-gray-600" {...props} />,
                      h2: ({ node, ...props }) => <h2 className="text-lg font-bold my-2 pb-1 border-b border-gray-700" {...props} />,
                      h3: ({ node, ...props }) => <h3 className="text-md font-bold my-2" {...props} />,
                      h4: ({ node, ...props }) => <h4 className="font-bold my-2" {...props} />,
                      p: ({ node, ...props }) => <p className="my-2" {...props} />,
                      ul: ({ node, ...props }) => <ul className="list-disc pl-6 my-2" {...props} />,
                      ol: ({ node, ...props }) => <ol className="list-decimal pl-6 my-2" {...props} />,
                      li: ({ node, ...props }) => <li className="my-1" {...props} />,
                      blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-gray-500 pl-4 italic my-2" {...props} />,
                      a: ({ node, ...props }) => <a className="text-blue-400 hover:underline" {...props} />,
                      table: ({ node, ...props }) => <div className="overflow-x-auto my-2"><table className="min-w-full border border-gray-600" {...props} /></div>,
                      thead: ({ node, ...props }) => <thead className="bg-gray-700" {...props} />,
                      tbody: ({ node, ...props }) => <tbody className="divide-y divide-gray-600" {...props} />,
                      tr: ({ node, ...props }) => <tr className="" {...props} />,
                      th: ({ node, ...props }) => <th className="px-3 py-2 text-left text-sm font-medium text-gray-300 uppercase tracking-wider border-r border-gray-600 last:border-r-0" {...props} />,
                      td: ({ node, ...props }) => <td className="px-3 py-2 whitespace-nowrap text-sm border-r border-gray-600 last:border-r-0" {...props} />,
                      hr: ({ node, ...props }) => <hr className="my-4 border-gray-600" {...props} />,
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-gray-700 to-gray-800 text-gray-100 border border-gray-600 shadow-md max-w-[80%]">
              <div className="flex items-center mb-2">
                <div className="h-2 w-2 rounded-full bg-purple-400 mr-2 animate-pulse"></div>
                <span className="font-medium">AI Assistant</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 bg-indigo-500 rounded-full animate-bounce"></div>
                <div className="h-3 w-3 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="h-3 w-3 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="mb-8">
        <Timer ref={timerRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Ask something..."
          className="flex-1 p-4 rounded-xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-inner transition-all duration-300 placeholder-gray-400"
        />
        <button 
          type="submit" 
          disabled={isLoading}
          className="px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transform transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;
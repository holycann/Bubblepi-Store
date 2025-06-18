import { Component } from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    console.error('ErrorBoundary caught an error', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-white dark:bg-dark">
          <div className="text-center">
            <div className="mb-8">
              <span className="text-6xl font-bold bg-gradient-to-r from-pink-soft to-purple-dark bg-clip-text text-transparent">
                Oops!
              </span>
            </div>
            
            <h1 className="text-2xl font-bold mb-4 text-blue-dark dark:text-dark-primary">
              Something went wrong
            </h1>
            
            <p className="text-lg mb-8 text-gray-600 dark:text-dark-secondary">
              We're sorry, but we encountered an error while rendering this page.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/" 
                className="btn-primary px-8 py-3"
              >
                Go Home
              </Link>
              
              <button 
                onClick={() => window.location.reload()}
                className="btn-secondary px-8 py-3"
              >
                Try Again
              </button>
            </div>
            
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-8 p-4 bg-gray-100 dark:bg-dark-card rounded-md text-left overflow-auto max-w-2xl mx-auto">
                <p className="font-mono text-sm text-red-500 mb-2">
                  {this.state.error && this.state.error.toString()}
                </p>
                <p className="font-mono text-xs text-gray-700 dark:text-gray-300">
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 
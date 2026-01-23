
import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

// Fixed ErrorBoundary to correctly inherit from React.Component to ensure 'props' is recognized by the TypeScript compiler.
export class ErrorBoundary extends React.Component<Props, State> {
  // Explicitly declare state as a class property to fix "Property 'state' does not exist" errors
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render(): ReactNode {
    // Access state properties safely from the inherited Component class
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6" data-testid="error-boundary-screen">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
            <div className="text-red-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
            <p className="text-gray-600 mb-6">
              The application encountered an unexpected error. This has been logged.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    // Fix: Using type assertion to access children via this.props in environments where inheritance might be partially obscured or restricted.
    return (this as any).props.children;
  }
}

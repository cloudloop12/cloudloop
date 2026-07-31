import React from 'react';
import { ShieldAlert, RefreshCw, Home } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface ErrorBoundaryProps {
  children?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  declare props: ErrorBoundaryProps;
  declare state: ErrorBoundaryState;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  public render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 [data-theme=light]:bg-[#f8fafc] [data-theme=eyecare]:bg-[#f4f0ea] p-6 text-slate-100 [data-theme=light]:text-slate-900 [data-theme=eyecare]:text-[#2c2724]">
          <div className="max-w-md w-full p-8 rounded-3xl bg-slate-900/90 [data-theme=light]:bg-white [data-theme=eyecare]:bg-[#fbf8f3] border border-slate-800 [data-theme=light]:border-slate-200 [data-theme=eyecare]:border-[#ded6cc] shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-500 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Unexpected Exception Occurred</h2>
              <p className="text-xs text-slate-400 [data-theme=light]:text-slate-600 [data-theme=eyecare]:text-[#665d53]">
                Our application encountered an isolated runtime issue. Don't worry, your data is completely secure.
              </p>
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload Application</span>
              </button>

              <a
                href="/"
                className="w-full py-3 rounded-xl bg-slate-950 [data-theme=light]:bg-slate-100 [data-theme=eyecare]:bg-[#eae4db] border border-slate-800 [data-theme=light]:border-slate-300 [data-theme=eyecare]:border-[#ded6cc] text-xs font-semibold flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" />
                <span>Back to Safety (Home)</span>
              </a>
            </div>

            <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-800/60">
              Need assistance? Call Cloudloop Support at {COMPANY_INFO.phone}
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Mail, CheckCircle2, XCircle, AlertTriangle, RefreshCw, Send, ShieldCheck, 
  Terminal, Server, Lock, Cpu, Clock, Layers, HelpCircle
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

interface EnvCheckData {
  runtime: string;
  nodeVersion: string;
  environment: string;
  vercelEnv: string;
  vercelRegion: string;
  timestamp: string;
  env: {
    GMAIL_USER: boolean;
    GMAIL_APP_PASSWORD: boolean;
    NOTIFICATION_EMAIL: boolean;
  };
  missingVars: string[];
  sanitizedPasswordLength: number;
  hasSpacesInPassword: boolean;
}

interface SMTPStatus {
  connected: boolean;
  authStatus: string;
  gmailUser: string;
  notificationEmail: string;
  envLoaded: {
    GMAIL_USER: boolean;
    GMAIL_APP_PASSWORD: boolean;
    NOTIFICATION_EMAIL: boolean;
  };
  missingVars?: string[];
  sanitizedPasswordLength?: number;
  hasSpacesInPassword?: boolean;
  platform?: string;
  meta?: {
    runtime: string;
    nodeVersion: string;
    environment: string;
    vercelEnv: string;
    vercelRegion: string;
    timestamp: string;
  };
  lastError: string | null;
  totalLogs: number;
}

interface EmailLog {
  id: string;
  timestamp: string;
  type: string;
  recipient: string;
  subject: string;
  status: 'success' | 'failed';
  error?: string;
  details?: Record<string, any>;
}

export const EmailDebugPage: React.FC = () => {
  const [status, setStatus] = useState<SMTPStatus | null>(null);
  const [envCheck, setEnvCheck] = useState<EnvCheckData | null>(null);
  const [logs, setLogs] = useState<EmailLog[]>([]);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [responseTimeMs, setResponseTimeMs] = useState<number | null>(null);
  const [testRecipient, setTestRecipient] = useState('');
  const [testSending, setTestSending] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string; error?: string } | null>(null);
  const [showRawEnvJson, setShowRawEnvJson] = useState(false);

  const fetchDiagnosticData = async () => {
    setLoadingStatus(true);
    const startTime = performance.now();
    try {
      const [statusRes, logsRes, envRes] = await Promise.all([
        fetch('/api/email/status'),
        fetch('/api/email/logs'),
        fetch('/api/env-check'),
      ]);

      const endTime = performance.now();
      setResponseTimeMs(Math.round(endTime - startTime));

      let statusData: SMTPStatus;
      const statusContentType = statusRes.headers.get('content-type');
      if (statusContentType && statusContentType.includes('application/json')) {
        statusData = await statusRes.json();
      } else {
        const text = await statusRes.text();
        statusData = {
          connected: false,
          authStatus: `Server returned non-JSON (${statusRes.status} ${statusRes.statusText})`,
          gmailUser: 'N/A',
          notificationEmail: 'N/A',
          envLoaded: { GMAIL_USER: false, GMAIL_APP_PASSWORD: false, NOTIFICATION_EMAIL: false },
          lastError: `Server error output: ${text.substring(0, 150)}...`,
          totalLogs: 0,
        };
      }

      let envCheckData: EnvCheckData | null = null;
      if (envRes.ok && envRes.headers.get('content-type')?.includes('application/json')) {
        envCheckData = await envRes.json();
      }

      let logsData = { logs: [] };
      if (logsRes.ok && logsRes.headers.get('content-type')?.includes('application/json')) {
        logsData = await logsRes.json();
      }

      setStatus(statusData);
      setEnvCheck(envCheckData);
      setLogs(logsData.logs || []);
      if (statusData.notificationEmail && statusData.notificationEmail !== 'N/A' && !testRecipient) {
        setTestRecipient(statusData.notificationEmail);
      }
    } catch (err: any) {
      console.error('Failed to fetch diagnostic data:', err);
      setStatus({
        connected: false,
        authStatus: `Client Network Error: ${err.message || String(err)}`,
        gmailUser: 'N/A',
        notificationEmail: 'N/A',
        envLoaded: { GMAIL_USER: false, GMAIL_APP_PASSWORD: false, NOTIFICATION_EMAIL: false },
        lastError: err.message || String(err),
        totalLogs: 0,
      });
    } finally {
      setLoadingStatus(false);
    }
  };

  useEffect(() => {
    fetchDiagnosticData();
  }, []);

  const handleSendTestEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setTestSending(true);
    setTestResult(null);

    try {
      const response = await fetch('/api/email/test-send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipient: testRecipient }),
      });

      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const errorText = await response.text();
        data = {
          success: false,
          error: `Server HTTP ${response.status} non-JSON response: ${errorText.substring(0, 200)}`,
        };
      }

      if (data.success) {
        setTestResult({
          success: true,
          message: data.message || `Test email dispatched successfully! ID: ${data.messageId || 'N/A'}`,
        });
      } else {
        setTestResult({
          success: false,
          message: 'Failed to send test email',
          error: data.error || 'Unknown SMTP error',
        });
      }

      fetchDiagnosticData();
    } catch (err: any) {
      setTestResult({
        success: false,
        message: 'Network or API failure during test send',
        error: err.message || String(err),
      });
    } finally {
      setTestSending(false);
    }
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-950 [data-theme=light]:bg-[#f8fafc] [data-theme=eyecare]:bg-[#f4f0ea] text-slate-100 [data-theme=light]:text-slate-900 [data-theme=eyecare]:text-[#2c2724]">
      <SEOHead
        title="Email System Diagnostics & SMTP Control | Cloudloop Group"
        description="Real-time SMTP status monitor, test email generator, and transaction log auditor for Cloudloop Group."
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 [data-theme=light]:border-slate-200 [data-theme=eyecare]:border-[#ded6cc] pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-blue-950/80 [data-theme=light]:bg-blue-50 [data-theme=eyecare]:bg-[#eae4db] border border-blue-500/30 text-blue-400 [data-theme=light]:text-blue-700 [data-theme=eyecare]:text-[#2a7375] text-[11px] font-bold uppercase tracking-wider">
                PROD SMTP DEBUGGER
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-950/80 [data-theme=light]:bg-emerald-50 [data-theme=eyecare]:bg-[#eae4db] border border-emerald-500/30 text-emerald-400 [data-theme=light]:text-emerald-700 text-[11px] font-bold uppercase tracking-wider">
                VERCEL / GMAIL READY
              </span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">Email System Diagnostics & Live Logs</h1>
            <p className="text-xs sm:text-sm text-slate-400 [data-theme=light]:text-slate-600 [data-theme=eyecare]:text-[#665d53] mt-1">
              Verify Gmail App Password authentication, inspect serverless SMTP handlers, and send live test dispatches.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowRawEnvJson(!showRawEnvJson)}
              className="px-3.5 py-2.5 rounded-xl bg-slate-900 [data-theme=light]:bg-white border border-slate-800 [data-theme=light]:border-slate-300 text-xs font-semibold text-slate-300 [data-theme=light]:text-slate-700 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Cpu className="w-4 h-4 text-purple-400" />
              <span>/api/env-check</span>
            </button>
            <button
              onClick={fetchDiagnosticData}
              disabled={loadingStatus}
              className="px-4 py-2.5 rounded-xl bg-slate-900 [data-theme=light]:bg-white [data-theme=eyecare]:bg-[#fbf8f3] border border-slate-800 [data-theme=light]:border-slate-300 [data-theme=eyecare]:border-[#ded6cc] hover:border-cyan-500/50 text-xs font-bold flex items-center gap-2 shadow-sm cursor-pointer transition-all"
            >
              <RefreshCw className={`w-4 h-4 text-cyan-400 ${loadingStatus ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Production Runtime & Serverless Diagnostics Bar */}
        <div className="p-5 rounded-2xl bg-slate-900/90 [data-theme=light]:bg-white border border-slate-800 [data-theme=light]:border-slate-200 shadow-lg space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800/80 [data-theme=light]:border-slate-100 pb-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300 [data-theme=light]:text-slate-800">
              <Server className="w-4 h-4 text-cyan-400" />
              <span>Vercel Serverless & Production Architecture Audit</span>
            </div>
            {responseTimeMs && (
              <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-950/60 p-1.5 px-3 rounded-full border border-emerald-500/30">
                <Clock className="w-3 h-3" /> API Latency: {responseTimeMs}ms
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-950/60 [data-theme=light]:bg-slate-50 border border-slate-800/60 [data-theme=light]:border-slate-200">
              <span className="block text-[10px] uppercase font-bold text-slate-500">Runtime Engine</span>
              <span className="font-bold text-cyan-400 truncate block mt-0.5">
                {envCheck?.runtime || status?.platform || 'Vercel Serverless'}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/60 [data-theme=light]:bg-slate-50 border border-slate-800/60 [data-theme=light]:border-slate-200">
              <span className="block text-[10px] uppercase font-bold text-slate-500">Node.js Version</span>
              <span className="font-mono text-slate-200 [data-theme=light]:text-slate-800 truncate block mt-0.5">
                {envCheck?.nodeVersion || status?.meta?.nodeVersion || 'v22.x'}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/60 [data-theme=light]:bg-slate-50 border border-slate-800/60 [data-theme=light]:border-slate-200">
              <span className="block text-[10px] uppercase font-bold text-slate-500">Vercel Env</span>
              <span className="font-bold text-amber-400 truncate block mt-0.5">
                {envCheck?.vercelEnv || status?.meta?.vercelEnv || 'production'}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/60 [data-theme=light]:bg-slate-50 border border-slate-800/60 [data-theme=light]:border-slate-200">
              <span className="block text-[10px] uppercase font-bold text-slate-500">Vercel Region</span>
              <span className="font-mono text-slate-300 [data-theme=light]:text-slate-700 truncate block mt-0.5">
                {envCheck?.vercelRegion || status?.meta?.vercelRegion || 'iad1'}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/60 [data-theme=light]:bg-slate-50 border border-slate-800/60 [data-theme=light]:border-slate-200 col-span-2">
              <span className="block text-[10px] uppercase font-bold text-slate-500">API Base Endpoint</span>
              <span className="font-mono text-[11px] text-cyan-300 [data-theme=light]:text-blue-600 truncate block mt-0.5">
                {typeof window !== 'undefined' ? `${window.location.origin}/api` : '/api'}
              </span>
            </div>
          </div>

          {showRawEnvJson && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pt-2">
              <div className="p-4 rounded-xl bg-black border border-slate-800 font-mono text-[11px] text-cyan-300 overflow-x-auto space-y-2">
                <div className="text-slate-400 font-bold border-b border-slate-800 pb-1">
                  GET /api/env-check Payload Response:
                </div>
                <pre>{JSON.stringify(envCheck || { error: 'No response from /api/env-check' }, null, 2)}</pre>
              </div>
            </motion.div>
          )}
        </div>

        {/* 1. Status Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* SMTP Status */}
          <div className="p-6 rounded-3xl bg-slate-900/80 [data-theme=light]:bg-white [data-theme=eyecare]:bg-[#fbf8f3] border border-slate-800 [data-theme=light]:border-slate-200 [data-theme=eyecare]:border-[#ded6cc] shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">SMTP Connection</span>
              {status?.connected ? (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5" /> VERIFIED
                </span>
              ) : (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold border border-rose-500/30">
                  <XCircle className="w-3.5 h-3.5" /> DISCONNECTED
                </span>
              )}
            </div>

            <div>
              <div className="text-2xl font-black text-slate-100 [data-theme=light]:text-slate-900 [data-theme=eyecare]:text-[#1c1815]">
                {status?.gmailUser || 'mailtocloudloop@gmail.com'}
              </div>
              <div className="text-xs text-slate-400 [data-theme=light]:text-slate-600 [data-theme=eyecare]:text-[#665d53] mt-1 flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5 text-cyan-400" />
                <span>Host: smtp.gmail.com (Port 465 SSL)</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 [data-theme=light]:border-slate-100 [data-theme=eyecare]:border-[#eae4db] text-xs space-y-1">
              <div className="font-semibold text-slate-300 [data-theme=light]:text-slate-700 [data-theme=eyecare]:text-[#3d3630]">
                Status Detail:
              </div>
              <div className="text-[11px] text-slate-400 [data-theme=light]:text-slate-600 [data-theme=eyecare]:text-[#665d53] font-mono leading-relaxed bg-slate-950/60 [data-theme=light]:bg-slate-100 [data-theme=eyecare]:bg-[#eae4db] p-2.5 rounded-lg border border-slate-800/50">
                {status?.authStatus || 'Checking connection...'}
              </div>
            </div>
          </div>

          {/* Environment Variable Checklist */}
          <div className="p-6 rounded-3xl bg-slate-900/80 [data-theme=light]:bg-white [data-theme=eyecare]:bg-[#fbf8f3] border border-slate-800 [data-theme=light]:border-slate-200 [data-theme=eyecare]:border-[#ded6cc] shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Environment Variables</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                {status?.platform || 'Vercel Serverless'}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/50 [data-theme=light]:bg-slate-50 [data-theme=eyecare]:bg-[#eae4db]/50 border border-slate-800/60 [data-theme=light]:border-slate-200 [data-theme=eyecare]:border-[#ded6cc]">
                <div className="text-xs font-mono">GMAIL_USER</div>
                {status?.envLoaded.GMAIL_USER ? (
                  <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Loaded
                  </span>
                ) : (
                  <span className="text-[11px] font-bold text-rose-400 flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5" /> Missing in Env
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/50 [data-theme=light]:bg-slate-50 [data-theme=eyecare]:bg-[#eae4db]/50 border border-slate-800/60 [data-theme=light]:border-slate-200 [data-theme=eyecare]:border-[#ded6cc]">
                <div>
                  <div className="text-xs font-mono">GMAIL_APP_PASSWORD</div>
                  {status?.sanitizedPasswordLength ? (
                    <div className="text-[10px] text-slate-400">
                      {status.sanitizedPasswordLength} chars {status.hasSpacesInPassword ? '(Spaces sanitized)' : ''}
                    </div>
                  ) : null}
                </div>
                {status?.envLoaded.GMAIL_APP_PASSWORD ? (
                  <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Configured
                  </span>
                ) : (
                  <span className="text-[11px] font-bold text-rose-400 flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5" /> Missing in Env
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/50 [data-theme=light]:bg-slate-50 [data-theme=eyecare]:bg-[#eae4db]/50 border border-slate-800/60 [data-theme=light]:border-slate-200 [data-theme=eyecare]:border-[#ded6cc]">
                <div className="text-xs font-mono">NOTIFICATION_EMAIL</div>
                {status?.envLoaded.NOTIFICATION_EMAIL ? (
                  <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Configured
                  </span>
                ) : (
                  <span className="text-[11px] font-bold text-rose-400 flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5" /> Missing in Env
                  </span>
                )}
              </div>
            </div>

            {/* Vercel Redeployment Notice */}
            <div className="p-3 bg-amber-950/30 border border-amber-500/30 rounded-xl text-[11px] text-amber-300 leading-relaxed flex gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-amber-200">Vercel Deployment Notice:</strong>
                Environment variables set in Vercel settings require a <strong>new deployment (Redeploy)</strong> to take effect in serverless functions. If any variable shows "Missing in Env", go to your Vercel Dashboard → Deployments → Redeploy.
              </div>
            </div>
          </div>

          {/* Target Notification Recipient */}
          <div className="p-6 rounded-3xl bg-slate-900/80 [data-theme=light]:bg-white [data-theme=eyecare]:bg-[#fbf8f3] border border-slate-800 [data-theme=light]:border-slate-200 [data-theme=eyecare]:border-[#ded6cc] shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Target Notification Inbox</span>
              <Mail className="w-4 h-4 text-cyan-400" />
            </div>

            <div>
              <div className="text-lg font-bold text-slate-100 [data-theme=light]:text-slate-900 [data-theme=eyecare]:text-[#1c1815]">
                {status?.notificationEmail || 'mailtocloudloop@gmail.com'}
              </div>
              <p className="text-xs text-slate-400 [data-theme=light]:text-slate-600 [data-theme=eyecare]:text-[#665d53] mt-1">
                Admin alerts for Contact, Consultation, Quote, Newsletter & Careers will dispatch to this address.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 [data-theme=light]:border-slate-100 [data-theme=eyecare]:border-[#eae4db]">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Total Email Activity Logs:</span>
                <span className="font-bold text-cyan-400 [data-theme=light]:text-blue-600">{logs.length} logged</span>
              </div>
            </div>
          </div>

        </div>

        {/* 2. Live Email Test Panel */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 [data-theme=light]:bg-white [data-theme=eyecare]:bg-[#fbf8f3] border border-slate-800 [data-theme=light]:border-slate-200 [data-theme=eyecare]:border-[#ded6cc] shadow-2xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Dispatch Live Test Email</h2>
              <p className="text-xs text-slate-400 [data-theme=light]:text-slate-600 [data-theme=eyecare]:text-[#665d53]">
                Triggers a real SMTP transport message to verify Gmail credentials and template rendering.
              </p>
            </div>
          </div>

          <form onSubmit={handleSendTestEmail} className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="email"
              required
              value={testRecipient}
              onChange={(e) => setTestRecipient(e.target.value)}
              placeholder="e.g. mailtocloudloop@gmail.com"
              className="flex-1 w-full px-4 py-3 rounded-xl bg-slate-950 [data-theme=light]:bg-slate-50 [data-theme=eyecare]:bg-[#eae4db] border border-slate-800 [data-theme=light]:border-slate-300 [data-theme=eyecare]:border-[#ded6cc] text-xs text-slate-100 [data-theme=light]:text-slate-900 [data-theme=eyecare]:text-[#1c1815] focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            />
            <button
              type="submit"
              disabled={testSending}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-all disabled:opacity-50 shrink-0"
            >
              <Send className={`w-4 h-4 ${testSending ? 'animate-bounce' : ''}`} />
              <span>{testSending ? 'Transmitting Email...' : 'Send Test Email'}</span>
            </button>
          </form>

          {/* Test Result Alert */}
          {testResult && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                testResult.success
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                  : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
              }`}
            >
              <div className="font-bold flex items-center gap-2 mb-1">
                {testResult.success ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-rose-400" />}
                <span>{testResult.success ? 'TEST EMAIL SUCCESS' : 'TEST EMAIL FAILED'}</span>
              </div>
              <p>{testResult.message}</p>
              {testResult.error && (
                <div className="mt-2 p-2.5 rounded-lg bg-black/40 border border-rose-500/30 font-mono text-[11px] text-rose-200 overflow-x-auto">
                  {testResult.error}
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* 3. Real-Time Activity Logs */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 [data-theme=light]:bg-white [data-theme=eyecare]:bg-[#fbf8f3] border border-slate-800 [data-theme=light]:border-slate-200 [data-theme=eyecare]:border-[#ded6cc] shadow-2xl space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Email Transaction Activity Logs</h2>
                <p className="text-xs text-slate-400 [data-theme=light]:text-slate-600 [data-theme=eyecare]:text-[#665d53]">
                  Shows recent form submissions, admin dispatches, and customer confirmation delivery logs.
                </p>
              </div>
            </div>

            <button
              onClick={fetchDiagnosticData}
              className="px-3 py-1.5 rounded-lg bg-slate-950 [data-theme=light]:bg-slate-100 [data-theme=eyecare]:bg-[#eae4db] border border-slate-800 [data-theme=light]:border-slate-300 [data-theme=eyecare]:border-[#ded6cc] text-[11px] font-semibold text-slate-300 [data-theme=light]:text-slate-700 hover:text-white"
            >
              Refresh Logs
            </button>
          </div>

          {logs.length === 0 ? (
            <div className="p-12 text-center border-2 border-dashed border-slate-800 [data-theme=light]:border-slate-200 [data-theme=eyecare]:border-[#ded6cc] rounded-2xl">
              <Mail className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <p className="text-xs text-slate-400 [data-theme=light]:text-slate-600">No email events recorded yet.</p>
              <p className="text-[11px] text-slate-500 mt-1">Submit a contact form or send a test email above to see live activity.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 [data-theme=light]:border-slate-200 [data-theme=eyecare]:border-[#ded6cc] text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <th className="py-3 px-3">Timestamp</th>
                    <th className="py-3 px-3">Type</th>
                    <th className="py-3 px-3">Recipient</th>
                    <th className="py-3 px-3">Subject</th>
                    <th className="py-3 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 [data-theme=light]:divide-slate-200 [data-theme=eyecare]:divide-[#ded6cc] text-xs">
                  {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-950/40 [data-theme=light]:hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-3 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </td>
                      <td className="py-3 px-3 font-bold text-slate-200 [data-theme=light]:text-slate-800">
                        {log.type}
                      </td>
                      <td className="py-3 px-3 font-mono text-[11px] text-slate-300 [data-theme=light]:text-slate-700">
                        {log.recipient}
                      </td>
                      <td className="py-3 px-3 text-slate-300 [data-theme=light]:text-slate-700 truncate max-w-xs">
                        {log.subject}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        {log.status === 'success' ? (
                          <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                            SUCCESS
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-400 text-[10px] font-bold border border-rose-500/30" title={log.error}>
                            FAILED
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

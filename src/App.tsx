import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';
import { WhatsAppButton } from './components/WhatsAppButton';
import { BackToTop } from './components/BackToTop';
import { ThemeSwitcher } from './components/ThemeSwitcher';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { DocumentsClearingPage } from './pages/DocumentsClearingPage';
import { DocServiceDetailPage } from './pages/DocServiceDetailPage';
import { ITPage } from './pages/ITPage';
import { ITServiceDetailPage } from './pages/ITServiceDetailPage';
import { WhyChooseUsPage } from './pages/WhyChooseUsPage';
import { ProcessPage } from './pages/ProcessPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { FAQsPage } from './pages/FAQsPage';
import { ContactPage } from './pages/ContactPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { CareersPage } from './pages/CareersPage';
import { EmailDebugPage } from './pages/EmailDebugPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ErrorBoundary } from './components/ErrorBoundary';

import { DivisionType } from './types';

// Scroll to top helper on route change
function ScrollToTopOnNavigate() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

export default function App() {
  const [activeDivisionFilter, setActiveDivisionFilter] = useState<DivisionType>('all');
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenConsultation = (serviceName?: string) => {
    setPreselectedService(serviceName || 'General Corporate Advisory');
    setIsConsultationOpen(true);
  };

  const handleSelectDivisionFilter = (division: DivisionType) => {
    setActiveDivisionFilter(division);
  };

  return (
    <div className="min-h-screen bg-slate-950 [data-theme=light]:bg-[#f8fafc] [data-theme=eyecare]:bg-[#f4f0ea] text-slate-100 [data-theme=light]:text-slate-900 [data-theme=eyecare]:text-[#2c2724] font-sans transition-colors duration-300 selection:bg-cyan-500 selection:text-slate-950">
      <Preloader />
      <ScrollToTopOnNavigate />

      {/* Top Scroll Progress Indicator */}
      <div
        className="fixed top-0 left-0 h-0.5 bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Sticky Navigation Bar */}
      <Navbar
        onOpenConsultation={handleOpenConsultation}
        activeDivisionFilter={activeDivisionFilter}
        onSelectDivisionFilter={handleSelectDivisionFilter}
      />

      {/* Application Routes */}
      <ErrorBoundary>
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  onOpenConsultation={handleOpenConsultation}
                  activeDivisionFilter={activeDivisionFilter}
                  onSelectDivisionFilter={handleSelectDivisionFilter}
                />
              }
            />
            <Route
              path="/about"
              element={<AboutPage onOpenConsultation={handleOpenConsultation} />}
            />

            {/* Documents Clearing Division Routes */}
            <Route
              path="/documents-clearing"
              element={<DocumentsClearingPage onOpenConsultation={handleOpenConsultation} />}
            />
            <Route
              path="/documents-clearing/:slug"
              element={<DocServiceDetailPage onOpenConsultation={handleOpenConsultation} />}
            />

            {/* IT Division Routes */}
            <Route
              path="/information-technology"
              element={<ITPage onOpenConsultation={handleOpenConsultation} />}
            />
            <Route
              path="/information-technology/:slug"
              element={<ITServiceDetailPage onOpenConsultation={handleOpenConsultation} />}
            />

            {/* Key Inner Pages */}
            <Route
              path="/why-choose-us"
              element={<WhyChooseUsPage onOpenConsultation={handleOpenConsultation} />}
            />
            <Route
              path="/process"
              element={<ProcessPage onOpenConsultation={handleOpenConsultation} />}
            />
            <Route
              path="/reviews"
              element={<ReviewsPage onOpenConsultation={handleOpenConsultation} />}
            />
            <Route
              path="/faqs"
              element={<FAQsPage onOpenConsultation={handleOpenConsultation} />}
            />
            <Route
              path="/contact"
              element={<ContactPage />}
            />

            {/* Blog Routes */}
            <Route path="/blog" element={<BlogPage />} />
            <Route
              path="/blog/:slug"
              element={<BlogPostPage onOpenConsultation={handleOpenConsultation} />}
            />

            {/* Careers Route */}
            <Route path="/careers" element={<CareersPage />} />

            {/* Email System Debug & Monitoring */}
            <Route path="/email-debug" element={<EmailDebugPage />} />

            {/* 404 Catch All Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </ErrorBoundary>

      {/* Global Corporate Footer */}
      <Footer
        onSelectDivision={handleSelectDivisionFilter}
        onOpenConsultation={handleOpenConsultation}
      />

      {/* Interactive Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        preselectedService={preselectedService}
      />

      {/* Floating Buttons & Theme Customizer */}
      <WhatsAppButton />
      <BackToTop />
      <ThemeSwitcher />
    </div>
  );
}

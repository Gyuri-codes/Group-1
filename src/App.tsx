import React, { useState, useEffect } from 'react';
import { ResortProvider, useResort } from './context/ResortContext';
import { Header } from './components/Header';
import { SectionNavBar } from './components/SectionNavBar';
import { Hero } from './components/Hero';
import { DayglowExperienceSection } from './components/DayglowExperienceSection';
import { RoomsSection } from './components/RoomsSection';
import { InteractiveMap } from './components/InteractiveMap';
import { DiningSection } from './components/DiningSection';
import { ActivitiesSection } from './components/ActivitiesSection';
import { GallerySection } from './components/GallerySection';
import { SocialFeed } from './components/SocialFeed';
import { LoyaltyProgram } from './components/LoyaltyProgram';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { DayglowBookingModal } from './components/DayglowBookingModal';
import { OfflineItineraryModal } from './components/OfflineItineraryModal';
import { LiveChatWidget } from './components/LiveChatWidget';
import { AuthModal } from './components/AuthModal';
import { AdminDashboard } from './components/AdminDashboard';
import { WifiOff, Sparkles, MapPin } from 'lucide-react';

const ResortAppContent: React.FC = () => {
  const { 
    isOfflineMode, 
    toggleOfflineMode, 
    weather, 
    t, 
    currentSection, 
    setCurrentSection 
  } = useResort();

  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isVirtualTourOpen, setIsVirtualTourOpen] = useState<boolean>(false);
  const [isDayglowModalOpen, setIsDayglowModalOpen] = useState<boolean>(false);
  const [dayglowGuestType, setDayglowGuestType] = useState<'overnight' | 'daypass'>('overnight');

  const handleOpenDayglowModal = (guestType: 'overnight' | 'daypass' = 'overnight') => {
    setDayglowGuestType(guestType);
    setIsDayglowModalOpen(true);
  };

  const handleSelectSection = (sectionId: string) => {
    setCurrentSection(sectionId);
    try {
      window.location.hash = '#' + sectionId;
    } catch {
      // ignore
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Synchronize hash with currentSection
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (!hash) return;
      if (['home', 'rooms', 'dining', 'gallery', 'all'].includes(hash)) {
        setCurrentSection(hash);
      } else if (['experiences', 'dayglow', 'activities'].includes(hash)) {
        setCurrentSection('experiences');
      } else if (['location', 'map', 'competitors'].includes(hash)) {
        setCurrentSection('location');
      } else if (['reviews', 'loyalty', 'social'].includes(hash)) {
        setCurrentSection('reviews');
      } else if (['contact', 'about'].includes(hash)) {
        setCurrentSection('contact');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [setCurrentSection]);

  return (
    <div className="min-h-screen bg-[#F8F5F2] text-[#2D3436] font-sans antialiased selection:bg-[#006D77] selection:text-white flex flex-col">
      {/* Offline Mode Indicator Bar */}
      {isOfflineMode && (
        <div className="bg-[#006D77] text-white px-4 py-2 text-xs font-semibold flex items-center justify-between sticky top-0 z-50 border-b border-teal-900 shadow-md">
          <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
            <span className="flex items-center gap-2">
              <WifiOff className="w-4 h-4 text-[#83C5BE] animate-pulse" />
              <span>
                <strong>{t('offlineBannerTitle', 'Offline Travel Mode Active')}:</strong> {t('offlineBannerDesc', 'All your reservations, itineraries, and emergency guides are loaded locally.')}
              </span>
            </span>
            <button
              onClick={toggleOfflineMode}
              className="text-[11px] bg-white/20 hover:bg-white/30 px-3 py-1 rounded-sm uppercase tracking-wider font-bold transition cursor-pointer"
            >
              {t('resumeOnline', 'Resume Online')}
            </button>
          </div>
        </div>
      )}

      {/* Public Guest Website Layout */}
      {!isAdminOpen ? (
        <>
          {/* Main Top Header */}
          <Header onOpenAdmin={() => setIsAdminOpen(true)} />

          {/* Sticky Section-Based Navigation Bar */}
          <SectionNavBar 
            currentSection={currentSection}
            onSelectSection={handleSelectSection}
          />

          {/* Section-Based Main Display Area */}
          <main className="flex-1 transition-all duration-300">
            {/* 1. HOME: Welcome Hero */}
            {currentSection === 'home' && (
              <div id="home" className="animate-fadeIn">
                <Hero 
                  onOpenVirtualTour={() => setIsVirtualTourOpen(true)}
                  onOpenDayglowModal={handleOpenDayglowModal}
                />
              </div>
            )}

            {/* 2. ACCOMMODATIONS: Rooms & Suites */}
            {(currentSection === 'rooms' || currentSection === 'all') && (
              <div id="rooms" className="animate-fadeIn">
                <RoomsSection />
              </div>
            )}

            {/* 3. EXPERIENCES: Signature Dayglow & Curated Island Activities */}
            {(currentSection === 'experiences' || currentSection === 'all') && (
              <div id="experiences" className="animate-fadeIn">
                <DayglowExperienceSection onOpenBookingModal={handleOpenDayglowModal} />
                <ActivitiesSection onOpenDayglowModal={handleOpenDayglowModal} />
              </div>
            )}

            {/* 4. DINING: Beachfront Restaurant & Sunset Bar */}
            {(currentSection === 'dining' || currentSection === 'all') && (
              <div id="dining" className="animate-fadeIn">
                <DiningSection />
              </div>
            )}

            {/* 5. GALLERY: Visual Journal & 360° Virtual Tour */}
            {(currentSection === 'gallery' || currentSection === 'all') && (
              <div id="gallery" className="animate-fadeIn">
                <GallerySection
                  isVirtualTourOpen={isVirtualTourOpen}
                  onCloseVirtualTour={() => setIsVirtualTourOpen(false)}
                  onOpenVirtualTour={() => setIsVirtualTourOpen(true)}
                />
              </div>
            )}

            {/* 6. LOCATION & MAP: Sipalay Geographic Landscape & Directions */}
            {(currentSection === 'location' || currentSection === 'all') && (
              <div id="location" className="animate-fadeIn">
                <InteractiveMap />
              </div>
            )}

            {/* 7. REVIEWS & LOYALTY: Guest Wall & Glow Club Rewards */}
            {(currentSection === 'reviews' || currentSection === 'all') && (
              <div id="reviews" className="animate-fadeIn">
                <SocialFeed />
                <LoyaltyProgram />
              </div>
            )}

            {/* 8. CONTACT & ABOUT: Concierge, Hotlines, Policies & Story */}
            {(currentSection === 'contact' || currentSection === 'all') && (
              <div id="contact" className="animate-fadeIn">
                <ContactSection />
              </div>
            )}
          </main>

          {/* Footer */}
          <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

          {/* Interactive Modals & Floating Widgets */}
          <BookingModal />
          <DayglowBookingModal
            isOpen={isDayglowModalOpen}
            onClose={() => setIsDayglowModalOpen(false)}
            defaultGuestType={dayglowGuestType}
          />
          <OfflineItineraryModal />
          <AuthModal />
          <LiveChatWidget />
        </>
      ) : (
        /* Staff / Manager Admin Portal */
        <AdminDashboard onClose={() => setIsAdminOpen(false)} />
      )}
    </div>
  );
};

export function App() {
  return (
    <ResortProvider>
      <ResortAppContent />
    </ResortProvider>
  );
}

export default App;

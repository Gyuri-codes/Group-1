import React from 'react';
import { useResort } from '../context/ResortContext';
import { 
  Home, 
  BedDouble, 
  Waves, 
  Utensils, 
  Camera, 
  MapPin, 
  Bookmark, 
  Phone
} from 'lucide-react';

interface SectionNavBarProps {
  currentSection: string;
  onSelectSection: (sectionId: string) => void;
}

export const SectionNavBar: React.FC<SectionNavBarProps> = ({
  currentSection,
  onSelectSection
}) => {
  const { t } = useResort();

  const sections = [
    { id: 'home', label: t('navHome', 'Home'), icon: Home },
    { id: 'rooms', label: t('navRooms', 'Rooms & Suites'), icon: BedDouble },
    { id: 'experiences', label: t('navExperiences', 'Dayglow & Kayak'), icon: Waves },
    { id: 'dining', label: t('navDining', 'Dining & Bar'), icon: Utensils },
    { id: 'gallery', label: t('navGallery', 'Gallery'), icon: Camera },
    { id: 'location', label: t('navMap', 'Competitor Map'), icon: MapPin },
    { id: 'reviews', label: t('navLoyalty', 'Glow Club'), icon: Bookmark },
    { id: 'contact', label: t('navContact', 'Contact'), icon: Phone }
  ];

  return (
    <nav className="sticky top-20 z-30 bg-white border-b border-stone-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-2.5">
        <div className="flex items-center lg:justify-center gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar py-0.5">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = currentSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => onSelectSection(section.id)}
                className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#006D77] text-white shadow-xs font-semibold'
                    : 'bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 hover:border-stone-300'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-stone-500'}`} />
                <span>{section.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

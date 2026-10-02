import React, { useState, useRef } from 'react';
import { useResort } from '../context/ResortContext';
import { COMPETITORS_DATA } from '../data/resortData';
import { CompetitorResort } from '../types';
import { 
  MapPin, 
  Compass, 
  Navigation, 
  Copy, 
  Check, 
  Route, 
  Award,
  ZoomIn,
  ZoomOut,
  Crosshair,
  ArrowRight
} from 'lucide-react';

export const InteractiveMap: React.FC = () => {
  const { addNotification, requestUserLocation, distanceToResortKm, t } = useResort();
  const [selectedCompetitor, setSelectedCompetitor] = useState<CompetitorResort>(COMPETITORS_DATA[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [isZoomed, setIsZoomed] = useState<boolean>(true); // Default to focused/zoomed into the selected area
  const [activeAreaTag, setActiveAreaTag] = useState<string>('North Sipalay Coast');

  // DOM ref to the map display area so we can scroll the browser directly to it
  const mapSectionRef = useRef<HTMLDivElement>(null);
  const mapCanvasRef = useRef<HTMLDivElement>(null);

  const handleCopyAddress = (resortName: string, address: string, id: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${resortName}: ${address}`);
      setCopiedId(id);
      addNotification(t('addressCopied', 'Address Copied'), `${resortName} ${t('addressCopiedDesc', 'address copied to clipboard!')}`, 'alert');
      setTimeout(() => setCopiedId(null), 2200);
    }
  };

  // When a user selects a resort (via card, button, or map pin)
  const handleSelectResort = (competitor: CompetitorResort, shouldScroll: boolean = true) => {
    setSelectedCompetitor(competitor);
    setIsZoomed(true); // Automatically zoom in & pan directly to that geographic area!

    // Update geographic zone tag
    if (competitor.id === 'comp-nayah') {
      setActiveAreaTag(t('northSipalayPlains', 'North Sipalay Coastal Plains'));
    } else if (competitor.id === 'comp-bugana') {
      setActiveAreaTag(t('campomanesBayEnclave', 'Campomanes Bay Coastal Enclave'));
    } else if (competitor.id === 'comp-takatuka') {
      setActiveAreaTag(t('sugarBeachCoast', 'Sugar Beach (Langub) Golden Coast'));
    } else if (competitor.id === 'comp-nataasan') {
      setActiveAreaTag(t('puntaBalloCliffside', 'Punta Ballo Elevated Cliffside'));
    } else if (competitor.id === 'comp-manami') {
      setActiveAreaTag(t('cayhaganNatureCove', 'Cayhagan Nature Valley & Cove'));
    }

    if (shouldScroll && mapSectionRef.current) {
      // Direct smooth movement directly to that geographic map area
      mapSectionRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }

    addNotification(
      t('geoAreaFocused', 'Geographic Area Focused'), 
      `${t('movedTo', 'Directly moved to')} ${competitor.name} (${competitor.distanceKm} km ${t('away', 'away')}).`, 
      'alert'
    );
  };

  // Direct pan coordinate math:
  // SVG viewBox is 600 x 480.
  // Center is (300, 240). When zoomed 1.65x, we translate the board so (pin.x, pin.y) is near center
  const getMapTransform = () => {
    if (!isZoomed) return 'translate(0px, 0px) scale(1)';
    
    const pinX = (selectedCompetitor.mapPin.leftPercent / 100) * 600;
    const pinY = (selectedCompetitor.mapPin.topPercent / 100) * 480;
    
    const scale = 1.65;
    const targetCenterX = 300;
    const targetCenterY = 240;
    
    const deltaX = (targetCenterX - pinX) * scale * 0.65;
    const deltaY = (targetCenterY - pinY) * scale * 0.65;

    return `translate(${deltaX}px, ${deltaY}px) scale(${scale})`;
  };

  const ourResort = {
    name: 'Alon & Aninag Boutique Beach Resort',
    location: 'Poblacion Beach (near Jazz Inn), Sipalay City, 6113 Negros Occidental, Philippines',
    category: t('boutiqueSanctuaryCategory', '12-Room Boutique Beachfront Sanctuary'),
    distanceKm: 0,
    travelTime: t('townCenterBeachfront', 'Town Center Beachfront'),
    mapPin: { leftPercent: 55.8, topPercent: 42.7, x: 335, y: 205 },
    highlights: [
      t('ourHighlight1', 'Direct golden sand beachfront on Poblacion Bay'),
      t('ourHighlight2', 'Signature Aninag Dayglow & Paddle Experience'),
      t('ourHighlight3', 'Nightly acoustic soul bonfires on the sand'),
      t('ourHighlight4', 'Walking distance to Poblacion market & food hub')
    ],
    priceRange: '₱3,200 – ₱7,200 / night',
    atmosphere: t('ourAtmosphere', 'Intimate, warm wood & white minimalist coastal aesthetic with personalized service')
  };

  // Convert competitor map pins to SVG coordinates for SVG line drawing & pin icons
  const competitorsWithCoordinates = COMPETITORS_DATA.map((c) => ({
    ...c,
    svgX: (c.mapPin.leftPercent / 100) * 600,
    svgY: (c.mapPin.topPercent / 100) * 480,
  }));

  const selectedWithCoords = competitorsWithCoordinates.find(c => c.id === selectedCompetitor.id) || competitorsWithCoordinates[0];

  // Filtering logic
  const isCompetitorVisible = (comp: CompetitorResort) => {
    if (filterType === 'nearby') return comp.distanceKm <= 12;
    if (filterType === 'luxury') return comp.category.toLowerCase().includes('luxury') || comp.category.toLowerCase().includes('villa');
    return true;
  };

  return (
    <section id="competitors" className="py-20 bg-[#FAF7F2] border-b border-[#E8DFC8] scroll-mt-20">
      {/* Anchor for backwards compatibility */}
      <span id="map" className="sr-only" aria-hidden="true">{t('competitorsMapAnchor', 'Nearby Competitors & Map')}</span>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-sm bg-teal-50 text-[#006D77] border border-teal-200 text-xs font-bold uppercase tracking-widest mb-3">
            <Compass className="w-3.5 h-3.5 text-[#006D77]" />
            {t('sipalayGeographicLandscape', 'Sipalay Geographic Landscape')}
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C241D] tracking-tight mb-4">
            {t('competitorsTitle', 'Nearby Competitors & Resort Locations')}
          </h2>
          <p className="text-sm sm:text-base text-[#6B5A48] leading-relaxed">
            {t('competitorsSubtitle', 'A realistic geographic area map of Sipalay. All resort properties are situated accurately across Sipalay’s terrestrial coastal land—from our central haven on Poblacion Beach to coastal enclaves in North Sipalay, Sugar Beach, Campomanes Bay, Punta Ballo, and Cayhagan.')}
          </p>
        </div>

        {/* Quick Filter & GPS Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setFilterType('all')}
              className={`px-4 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition cursor-pointer ${
                filterType === 'all'
                  ? 'bg-[#006D77] text-white shadow-sm'
                  : 'bg-white border border-[#DDD0B9] text-[#5C4E3F] hover:bg-[#F3EDE2]'
              }`}
            >
              {t('all5Competitors', 'All 5 Competitors')}
            </button>
            <button
              onClick={() => setFilterType('nearby')}
              className={`px-4 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition cursor-pointer ${
                filterType === 'nearby'
                  ? 'bg-[#006D77] text-white shadow-sm'
                  : 'bg-white border border-[#DDD0B9] text-[#5C4E3F] hover:bg-[#F3EDE2]'
              }`}
            >
              {t('under12Km', 'Under 12 km')}
            </button>
            <button
              onClick={() => setFilterType('luxury')}
              className={`px-4 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition cursor-pointer ${
                filterType === 'luxury'
                  ? 'bg-[#006D77] text-white shadow-sm'
                  : 'bg-white border border-[#DDD0B9] text-[#5C4E3F] hover:bg-[#F3EDE2]'
              }`}
            >
              {t('luxuryVillas', 'Luxury & Villas')}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => requestUserLocation()}
              className="px-4 py-1.5 rounded-sm bg-white border border-[#DDD0B9] hover:bg-[#FAF7F2] text-xs font-semibold text-[#2C241D] flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
            >
              <Navigation className="w-3.5 h-3.5 text-[#E29578]" />
              <span>{distanceToResortKm !== null ? `${t('yourGps', 'Your GPS')}: ${distanceToResortKm} ${t('kmToPoblacion', 'km to Poblacion')}` : t('measureDistance', 'Measure Distance to Alon')}</span>
            </button>
          </div>
        </div>

        {/* Map & Competitor Panel Split */}
        <div ref={mapSectionRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14 scroll-mt-24">
          {/* Interactive Realistic Geographic Competitor Map */}
          <div className="lg:col-span-7 bg-[#E8EFF1] rounded-2xl p-4 sm:p-5 border border-[#D0DFE2] shadow-sm relative overflow-hidden flex flex-col justify-between">
            {/* Top Toolbar */}
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#D0DFE2] text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold text-stone-800">
                  {t('activeGeographicArea', 'Active Geographic Area:')} <span className="text-[#006D77] font-bold">{activeAreaTag}</span>
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button 
                  onClick={() => setIsZoomed(!isZoomed)}
                  className={`px-3 py-1 rounded transition cursor-pointer flex items-center gap-1 text-[11px] font-semibold border ${
                    isZoomed 
                      ? 'bg-[#006D77] text-white border-[#006D77]' 
                      : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                  }`}
                  title={isZoomed ? "Reset Map to Overview" : "Zoom directly into selected area"}
                >
                  {isZoomed ? <ZoomOut className="w-3.5 h-3.5 text-white" /> : <ZoomIn className="w-3.5 h-3.5 text-[#006D77]" />}
                  <span>{isZoomed ? t('overviewMap', 'Overview Map') : t('directAreaZoom', 'Direct Area Zoom')}</span>
                </button>
              </div>
            </div>

            {/* Map Canvas with Direct Pan & Zoom Transform */}
            <div 
              ref={mapCanvasRef}
              className="relative w-full h-[490px] bg-[#67A4B8] rounded-xl overflow-hidden border border-[#89BFCE] select-none shadow-inner"
            >
              {/* SVG Layer that animates panning & zooming directly to the selected area */}
              <div 
                className="w-full h-full transition-transform duration-700 ease-out origin-center"
                style={{ transform: getMapTransform() }}
              >
                <svg 
                  className="w-full h-full"
                  viewBox="0 0 600 480" 
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
                    {/* Realistic Terrain Gradients */}
                    <linearGradient id="sipalayTerrainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F1EAD8" />
                      <stop offset="35%" stopColor="#E9DFCA" />
                      <stop offset="70%" stopColor="#DFD4BC" />
                      <stop offset="100%" stopColor="#D5C7AC" />
                    </linearGradient>

                    {/* Coastal Hills Shading */}
                    <linearGradient id="hillShading" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#D3C7AB" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#C2B495" stopOpacity="0.4" />
                    </linearGradient>

                    {/* Lush Forest & Eco Nature Reserve */}
                    <linearGradient id="ecoForestGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#D2DEC5" stopOpacity="0.65" />
                      <stop offset="100%" stopColor="#BFCFB1" stopOpacity="0.75" />
                    </linearGradient>

                    {/* Shallow Coastal Coral Reef Waters */}
                    <linearGradient id="coastalReefGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#5596A9" />
                      <stop offset="70%" stopColor="#7FBECB" />
                      <stop offset="100%" stopColor="#A8DEE6" />
                    </linearGradient>

                    {/* Golden Beach Sand Pattern */}
                    <pattern id="beachSandPattern" width="10" height="10" patternUnits="userSpaceOnUse">
                      <rect width="10" height="10" fill="#F7EDCE" />
                      <circle cx="2" cy="3" r="0.7" fill="#E8D9A8" opacity="0.6" />
                      <circle cx="7" cy="8" r="0.7" fill="#E8D9A8" opacity="0.6" />
                    </pattern>

                    {/* Subtle Topographic Hill Texture Pattern */}
                    <pattern id="topoPattern" width="60" height="60" patternUnits="userSpaceOnUse">
                      <path d="M 0,30 Q 15,22 30,30 T 60,30" fill="none" stroke="#C8B896" strokeWidth="0.75" opacity="0.45" />
                      <path d="M 0,15 Q 15,8 30,15 T 60,15" fill="none" stroke="#C8B896" strokeWidth="0.6" opacity="0.35" />
                      <path d="M 0,45 Q 15,38 30,45 T 60,45" fill="none" stroke="#C8B896" strokeWidth="0.6" opacity="0.35" />
                    </pattern>

                    {/* Water Shadow Filter */}
                    <filter id="waterGlow" x="-10%" y="-10%" width="120%" height="120%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* 1. DEEP SULU SEA WATER BASE */}
                  <rect width="600" height="480" fill="url(#coastalReefGradient)" />

                  {/* Bathymetric depth contours in Sulu Sea */}
                  <g fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.25">
                    <path d="M 20,40 Q 120,60 180,140 T 160,300 T 130,440" />
                    <path d="M 60,20 Q 160,80 210,180 T 195,350 T 165,470" />
                    <path d="M 110,10 Q 200,90 240,190 T 225,380 T 190,480" strokeDasharray="3 3" />
                  </g>

                  {/* Ocean ripples / waves */}
                  <g fill="none" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.35">
                    <path d="M 30,90 Q 55,83 80,90 T 130,90" />
                    <path d="M 45,210 Q 70,203 95,210 T 145,210" />
                    <path d="M 35,340 Q 60,333 85,340 T 135,340" />
                    <path d="M 25,430 Q 50,423 75,430 T 125,430" />
                  </g>

                  {/* Nautical Compass Rose (Upper Left Sea Area) */}
                  <g transform="translate(65, 55)" opacity="0.7">
                    <circle r="26" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="2 3" />
                    <circle r="18" fill="none" stroke="#FFFFFF" strokeWidth="0.8" />
                    <polygon points="0,-24 4,-6 0,0 -4,-6" fill="#FFFFFF" />
                    <polygon points="0,24 4,6 0,0 -4,6" fill="#8AC4D0" />
                    <polygon points="24,0 6,4 0,0 6,-4" fill="#8AC4D0" />
                    <polygon points="-24,0 -6,4 0,0 -6,-4" fill="#8AC4D0" />
                    <text x="0" y="-27" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold">N</text>
                    <text x="0" y="34" textAnchor="middle" fill="#FFFFFF" fontSize="7">S</text>
                    <text x="31" y="2.5" textAnchor="middle" fill="#FFFFFF" fontSize="7">E</text>
                    <text x="-31" y="2.5" textAnchor="middle" fill="#FFFFFF" fontSize="7">W</text>
                  </g>

                  {/* Sea Labels */}
                  <g fill="#FFFFFF" fontSize="9" fontWeight="bold" letterSpacing="2" opacity="0.85">
                    <text x="25" y="140">SULU SEA</text>
                    <text x="25" y="153" fontSize="7" fontWeight="normal" letterSpacing="1" opacity="0.75">COASTAL MARINE BASIN</text>
                    <text x="25" y="280">PANAY GULF WATERS</text>
                    <text x="25" y="293" fontSize="7" fontWeight="normal" letterSpacing="1" opacity="0.75">SIPALAY COASTAL PASS</text>
                  </g>

                  {/* 2. SHALLOW TURQUOISE REEF BUFFER (Sandbars & Coral Reef Fringe) */}
                  <path
                    d="M 600,-10 
                       L 320,-10 
                       Q 295,30 285,55 
                       Q 275,80 290,95 
                       Q 265,115 258,135 
                       Q 252,155 262,175 
                       Q 245,190 240,210 
                       Q 248,225 252,235 
                       Q 258,250 240,270 
                       Q 225,290 255,300 
                       Q 210,315 205,330 
                       Q 220,345 250,350 
                       Q 205,365 180,385 
                       Q 170,405 195,420 
                       Q 215,435 225,455 
                       Q 235,470 245,490 
                       L 600,490 Z"
                    fill="#9FE2EC"
                    opacity="0.55"
                  />

                  {/* 3. TERRESTRIAL NEGROS ISLAND LANDMASS (SIPALAY COASTAL LAND) */}
                  {/* Accurate Sipalay Coastline geometry:
                      - North: Nauhang Beach & River
                      - North-Central: Sugar Beach (Langub Beach)
                      - Center: Sipalay Bay / Poblacion Beach
                      - Mid-South: Tinagong Dagat Lagoon & Campomanes Bay
                      - Southwest: Punta Ballo Peninsula
                      - South: Brgy. Cayhagan
                  */}
                  <path
                    d="M 600,0 
                       L 345,0 
                       Q 325,30 315,55 
                       Q 305,80 318,95 
                       Q 295,115 288,135 
                       Q 282,155 292,175 
                       Q 275,190 270,210 
                       Q 278,225 282,235 
                       Q 288,250 270,270 
                       Q 255,290 285,300 
                       Q 240,315 235,330 
                       Q 250,345 280,350 
                       Q 235,365 210,385 
                       Q 200,405 225,420 
                       Q 245,435 255,455 
                       Q 265,470 275,480 
                       L 600,480 Z"
                    fill="url(#sipalayTerrainGradient)"
                    stroke="#BBAA88"
                    strokeWidth="2.5"
                  />

                  {/* Topographic pattern & hill contours across land */}
                  <path
                    d="M 600,0 
                       L 345,0 
                       Q 325,30 315,55 
                       Q 305,80 318,95 
                       Q 295,115 288,135 
                       Q 282,155 292,175 
                       Q 275,190 270,210 
                       Q 278,225 282,235 
                       Q 288,250 270,270 
                       Q 255,290 285,300 
                       Q 240,315 235,330 
                       Q 250,345 280,350 
                       Q 235,365 210,385 
                       Q 200,405 225,420 
                       Q 245,435 255,455 
                       Q 265,470 275,480 
                       L 600,480 Z"
                    fill="url(#topoPattern)"
                  />

                  {/* Shaded Topographic Elevation Ridges (Inland Karst Hills) */}
                  <path
                    d="M 520,30 Q 480,90 495,160 Q 470,220 500,280 Q 460,340 480,410 Q 450,450 490,480"
                    fill="none"
                    stroke="#C8B896"
                    strokeWidth="8"
                    strokeLinecap="round"
                    opacity="0.4"
                  />
                  <path
                    d="M 450,80 Q 430,130 440,170 Q 420,230 435,300 Q 400,360 415,440"
                    fill="none"
                    stroke="#C8B896"
                    strokeWidth="5"
                    strokeLinecap="round"
                    opacity="0.35"
                  />

                  {/* Forest & Nature Eco Reserves (Lush Greenery Patches on Land) */}
                  {/* Cayhagan Nature Reserve (South) */}
                  <path
                    d="M 330,420 Q 380,410 420,430 Q 440,460 390,480 L 320,480 Z"
                    fill="url(#ecoForestGradient)"
                  />
                  {/* Campomanes Coastal Forest (Mid-South) */}
                  <path
                    d="M 290,320 Q 330,310 350,340 Q 330,370 290,360 Z"
                    fill="url(#ecoForestGradient)"
                  />
                  {/* Sugar Beach Coastal Palm Grove (North) */}
                  <path
                    d="M 320,110 Q 360,100 370,130 Q 350,150 310,140 Z"
                    fill="url(#ecoForestGradient)"
                  />

                  {/* 4. REALISTIC GOLDEN SAND BEACHES (Along the Coastline) */}
                  {/* Nauhang Beach (North) */}
                  <path
                    d="M 315,55 Q 310,70 318,95"
                    fill="none"
                    stroke="#F4E6BC"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                  {/* Sugar Beach (Langub Beach Crescent) */}
                  <path
                    d="M 295,115 Q 288,135 292,165"
                    fill="none"
                    stroke="#F4E6BC"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  {/* Sipalay Poblacion Beach (Alon & Aninag Beachfront!) */}
                  <path
                    d="M 275,190 Q 270,210 278,225"
                    fill="none"
                    stroke="#F4E6BC"
                    strokeWidth="9"
                    strokeLinecap="round"
                  />
                  {/* Campomanes Bay Beach Cove */}
                  <path
                    d="M 240,315 Q 235,330 255,345"
                    fill="none"
                    stroke="#F4E6BC"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                  {/* Punta Ballo White Sand Beach */}
                  <path
                    d="M 210,385 Q 200,405 220,418"
                    fill="none"
                    stroke="#FFF7D6"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />

                  {/* 5. SIPALAY RIVER & TRIBUTARIES (Freshwater Streams to Sea) */}
                  {/* Main Sipalay River flowing into Poblacion Bay */}
                  <path
                    d="M 580,215 Q 490,225 430,220 Q 370,220 330,222 Q 300,225 280,228"
                    fill="none"
                    stroke="#76B5C5"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  {/* Northern Nauhang Stream */}
                  <path
                    d="M 450,45 Q 400,50 355,55 L 315,58"
                    fill="none"
                    stroke="#76B5C5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.8"
                  />

                  {/* 6. TINAGONG DAGAT KARST ISLETS (In Protected Lagoon) */}
                  <g id="tinagong-dagat-islets">
                    <circle cx="250" cy="270" r="6" fill="#8BA888" stroke="#5E7A5B" strokeWidth="1" />
                    <circle cx="262" cy="278" r="5" fill="#8BA888" stroke="#5E7A5B" strokeWidth="1" />
                    <circle cx="240" cy="282" r="4.5" fill="#8BA888" stroke="#5E7A5B" strokeWidth="1" />
                    {/* Hanging footbridge connecting islets */}
                    <line x1="250" y1="270" x2="262" y2="278" stroke="#8C6F4B" strokeWidth="1" strokeDasharray="1.5 1" />
                    <line x1="250" y1="270" x2="240" y2="282" stroke="#8C6F4B" strokeWidth="1" strokeDasharray="1.5 1" />
                    <text x="215" y="260" fill="#2C4A3E" fontSize="7" fontWeight="bold">Tinagong Dagat Islets</text>
                  </g>

                  {/* 7. ROAD & TRANSPORTATION INFRASTRUCTURE (Subtle Real Roads) */}
                  {/* Negros South National Highway (Major Arterial Road through Sipalay) */}
                  {/* Casing */}
                  <path
                    d="M 440,0 L 420,60 Q 405,120 390,170 L 365,220 Q 375,270 365,310 Q 355,350 370,395 Q 380,440 375,480"
                    fill="none"
                    stroke="#D9822B"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Highway Center Core */}
                  <path
                    d="M 440,0 L 420,60 Q 405,120 390,170 L 365,220 Q 375,270 365,310 Q 355,350 370,395 Q 380,440 375,480"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Bridge over Sipalay River */}
                  <line x1="362" y1="217" x2="368" y2="225" stroke="#333333" strokeWidth="4" />

                  {/* Secondary Coastal Feeder Roads Leading Directly to Each Resort on Land */}
                  {/* Road to Nayah Beach Resort (1) */}
                  <path d="M 420,60 L 355,60" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
                  <path d="M 420,60 L 355,60" fill="none" stroke="#A89878" strokeWidth="3.2" strokeLinecap="round" style={{ zIndex: -1 }} />

                  {/* Road/Trail to Takatuka Beach Resort (3) on Sugar Beach */}
                  <path d="M 400,125 L 320,125" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
                  <path d="M 400,125 L 320,125" fill="none" stroke="#A89878" strokeWidth="3.2" strokeLinecap="round" style={{ zIndex: -1 }} />

                  {/* Poblacion Town Center Street Grid & Promenade to Alon & Aninag (Our Resort) */}
                  <path d="M 365,205 L 335,205" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
                  <path d="M 365,205 L 335,205" fill="none" stroke="#A89878" strokeWidth="4.2" strokeLinecap="round" style={{ zIndex: -1 }} />
                  <path d="M 355,190 L 355,220" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 345,195 L 345,215" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />

                  {/* Road to Bugana Beach & Dive Resort (2) in Campomanes Bay */}
                  <path d="M 365,310 Q 340,320 315,335" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
                  <path d="M 365,310 Q 340,320 315,335" fill="none" stroke="#A89878" strokeWidth="3.2" strokeLinecap="round" style={{ zIndex: -1 }} />

                  {/* Scenic Coastal Road to Punta Ballo & Nataasan Resort (4) */}
                  <path d="M 365,365 Q 320,375 265,395" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
                  <path d="M 365,365 Q 320,375 265,395" fill="none" stroke="#A89878" strokeWidth="3.2" strokeLinecap="round" style={{ zIndex: -1 }} />

                  {/* Private Estate Access Road to Manami Resort (5) in Cayhagan */}
                  <path d="M 375,445 L 345,445" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
                  <path d="M 375,445 L 345,445" fill="none" stroke="#A89878" strokeWidth="3.2" strokeLinecap="round" style={{ zIndex: -1 }} />

                  {/* Highway Route Badge */}
                  <g transform="translate(425, 20)">
                    <rect x="-18" y="-7" width="36" height="14" rx="3" fill="#D9822B" stroke="#FFFFFF" strokeWidth="1" />
                    <text x="0" y="3" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontWeight="bold">ROUTE 6</text>
                  </g>

                  {/* 8. GEOGRAPHIC DISTRICT & NEIGHBORHOOD LABELS ON LAND */}
                  <g fill="#6E5D48" fontSize="8" fontWeight="bold" letterSpacing="0.8">
                    <text x="365" y="42">BRGY. NAUHANG (NORTH SIPALAY)</text>
                    <text x="330" y="105">SUGAR BEACH (LANGUB COAST)</text>
                    
                    {/* Sipalay Poblacion Town Center */}
                    <g transform="translate(370, 195)">
                      <rect x="-5" y="-10" width="130" height="16" rx="3" fill="#FAF6EE" fillOpacity="0.85" stroke="#D3C7AB" strokeWidth="0.8" />
                      <circle cx="3" cy="-2" r="3" fill="#006D77" />
                      <text x="12" y="1" fill="#006D77" fontSize="8.5" fontWeight="bold">SIPALAY CITY (POBLACION)</text>
                    </g>

                    <text x="325" y="318">CAMPOMANES BAY COAST</text>
                    <text x="245" y="425">PUNTA BALLO PENINSULA</text>
                    <text x="375" y="470">BRGY. CAYHAGAN VALLEY</text>
                  </g>

                  {/* 9. DYNAMIC ROUTE LINE CONNECTING ALON & ANINAG (335, 205) TO SELECTED RESORT */}
                  <line
                    x1="335"
                    y1="205"
                    x2={selectedWithCoords.svgX}
                    y2={selectedWithCoords.svgY}
                    stroke="#E29578"
                    strokeWidth="3"
                    strokeDasharray="6 4"
                    className="animate-pulse"
                  />

                  {/* Route Distance Badge floating mid-line */}
                  <g transform={`translate(${(335 + selectedWithCoords.svgX) / 2}, ${(205 + selectedWithCoords.svgY) / 2})`}>
                    <rect x="-24" y="-9" width="48" height="18" rx="4" fill="#2C241D" stroke="#E29578" strokeWidth="1" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))" />
                    <text x="0" y="3" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold">
                      {selectedCompetitor.distanceKm} km
                    </text>
                  </g>

                  {/* Highlighting Spotlight / Radius Circle on Selected Resort Area */}
                  <circle
                    cx={selectedWithCoords.svgX}
                    cy={selectedWithCoords.svgY}
                    r="28"
                    fill="#E29578"
                    fillOpacity="0.16"
                    stroke="#E29578"
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                    className="animate-spin"
                    style={{ transformOrigin: `${selectedWithCoords.svgX}px ${selectedWithCoords.svgY}px`, animationDuration: '12s' }}
                  />

                  {/* 10. RESORT PINS (STRICTLY ON TERRESTRIAL LAND) */}
                  
                  {/* PIN 0: ALON & ANINAG BOUTIQUE RESORT (Our Resort - Solidly on Poblacion Beach Land) */}
                  <g 
                    transform="translate(335, 205)" 
                    className="cursor-pointer"
                    onClick={() => addNotification('Alon & Aninag', 'You are viewing our 12-room boutique sanctuary on Poblacion Beach.', 'alert')}
                  >
                    {/* Glowing radar ring */}
                    <circle r="22" fill="#006D77" fillOpacity="0.18" className="animate-ping" />
                    <circle r="16" fill="#006D77" stroke="#FFFFFF" strokeWidth="3" filter="drop-shadow(0 2px 6px rgba(0,0,0,0.35))" />
                    <text x="0" y="4.5" textAnchor="middle" fill="#FFD166" fontSize="12" fontWeight="bold">✨</text>
                    {/* Badge */}
                    <rect x="-70" y="20" width="140" height="20" rx="4" fill="#1A1A1A" fillOpacity="0.95" stroke="#83C5BE" strokeWidth="1" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.25))" />
                    <text x="0" y="33" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontWeight="bold">Alon & Aninag (Our Resort)</text>
                  </g>

                  {/* PINS 1 to 5: COMPETITOR RESORTS (ALL FIRMLY POSITIONED ON LAND) */}
                  {competitorsWithCoordinates.map((comp, idx) => {
                    const isCurrent = comp.id === selectedCompetitor.id;
                    const isVisible = isCompetitorVisible(comp);

                    return (
                      <g 
                        key={comp.id} 
                        transform={`translate(${comp.svgX}, ${comp.svgY})`}
                        className={`cursor-pointer transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-35'}`}
                        onClick={() => handleSelectResort(comp, false)}
                      >
                        {/* Selected halo */}
                        {isCurrent && (
                          <circle r="20" fill="none" stroke="#E29578" strokeWidth="3" className="animate-ping" opacity="0.8" />
                        )}
                        <circle 
                          r={isCurrent ? "14" : "11"} 
                          fill={isCurrent ? "#2C241D" : "#FFFFFF"} 
                          stroke={isCurrent ? "#E29578" : "#2C241D"} 
                          strokeWidth={isCurrent ? "3" : "2"} 
                          filter="drop-shadow(0 2px 4px rgba(0,0,0,0.25))"
                        />
                        <text 
                          x="0" 
                          y="4" 
                          textAnchor="middle" 
                          fill={isCurrent ? "#FFFFFF" : "#2C241D"} 
                          fontSize={isCurrent ? "10" : "9"} 
                          fontWeight="bold"
                        >
                          {idx + 1}
                        </text>
                        {/* Resort label box - positioned securely on land */}
                        <rect 
                          x="-48" 
                          y={isCurrent ? "18" : "15"} 
                          width="96" 
                          height="17" 
                          rx="3.5" 
                          fill={isCurrent ? "#2C241D" : "#FFFFFF"} 
                          stroke={isCurrent ? "#E29578" : "#B8AB94"} 
                          strokeWidth="1"
                          filter="drop-shadow(0 1px 3px rgba(0,0,0,0.2))"
                        />
                        <text 
                          x="0" 
                          y={isCurrent ? "30" : "27"} 
                          textAnchor="middle" 
                          fill={isCurrent ? "#FFFFFF" : "#2C241D"} 
                          fontSize="7.5" 
                          fontWeight="bold"
                        >
                          {comp.name.split(' ')[0]} {comp.name.split(' ')[1] || ''}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Map Legend Overlay */}
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs p-3 rounded-lg border border-stone-200 text-xs text-[#2C241D] shadow-sm space-y-1.5 z-10 max-w-[210px]">
                <div className="font-bold text-stone-500 uppercase text-[9.5px] tracking-wider">{t('mapPinLegend', 'Sipalay Map Legend')}</div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#006D77] border border-white shrink-0" />
                  <span className="font-semibold text-stone-900 text-[11px]">{t('ourResortTitle', 'Alon & Aninag (Our Resort)')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#2C241D] border border-[#E29578] shrink-0" />
                  <span className="text-stone-700 text-[11px]">{t('competitorsOnLand', 'Competitors on Land (1–5)')}</span>
                </div>
                <div className="flex items-center gap-2 pt-1 border-t border-stone-100">
                  <span className="w-4 h-1 bg-[#D9822B] rounded-xs shrink-0" />
                  <span className="text-stone-600 text-[10px]">National Highway (Route 6)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-1 bg-white border border-stone-400 rounded-xs shrink-0" />
                  <span className="text-stone-600 text-[10px]">Coastal Resort Access Roads</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-1 bg-[#F4E6BC] rounded-xs shrink-0" />
                  <span className="text-stone-600 text-[10px]">Natural Sandy Beach Shoreline</span>
                </div>
              </div>

              {/* Terrestrial Land Verification Seal */}
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1.5 rounded text-[11px] font-medium text-stone-700 border border-stone-200 flex items-center gap-1.5 shadow-xs z-10">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>{t('terrestrialVerified', 'Terrestrial Geographic Placement Verified')}</span>
              </div>

              {/* Currently Focused Area Chip */}
              <div className="absolute bottom-3 right-3 bg-[#006D77] text-white px-3 py-1.5 rounded text-xs font-semibold shadow-md flex items-center gap-1.5 z-10">
                <Crosshair className="w-3.5 h-3.5 text-[#83C5BE]" />
                <span>{t('viewing', 'Viewing:')} {selectedCompetitor.name}</span>
              </div>
            </div>

            {/* Route & Distance Footer */}
            <div className="mt-3 flex flex-wrap items-center justify-between text-xs text-[#5C4E3F] px-2 gap-2">
              <div className="flex items-center gap-2">
                <Route className="w-4 h-4 text-[#E29578]" />
                <span className="font-bold">{t('distanceFromAlon', 'Distance from Alon & Aninag:')}</span>
                <span className="font-semibold text-[#006D77]">{selectedCompetitor.distanceKm} km</span>
                <span>• {t(selectedCompetitor.travelTime, selectedCompetitor.travelTime)}</span>
              </div>
              <span className="text-[11px] text-stone-500">{t('poblacionTransitNotice', 'Poblacion central access allows seamless transit across all Sipalay districts.')}</span>
            </div>
          </div>

          {/* Selected Resort Details & Comparative Inspector */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-7 border border-[#E5DAC4] shadow-sm flex flex-col justify-between">
            <div>
              {/* Category Badge & Distance */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#006D77] bg-teal-50 px-2.5 py-1 rounded-sm border border-teal-100">
                  {t(selectedCompetitor.category, selectedCompetitor.category)}
                </span>
                <span className="text-xs font-bold text-[#E29578] bg-amber-50 px-2.5 py-1 rounded-sm border border-amber-200">
                  {selectedCompetitor.distanceKm} {t('kmAway', 'km away')}
                </span>
              </div>

              {/* Resort Title */}
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
                {selectedCompetitor.name}
              </h3>

              {/* Geographic District Banner */}
              <div className="mb-3 px-3 py-1.5 rounded bg-teal-50/70 border border-teal-200 text-xs text-[#006D77] font-semibold flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#006D77]" />
                <span>{t('geographicSector', 'Geographic Sector:')} {activeAreaTag}</span>
              </div>

              {/* Exact Location & Address */}
              <div className="bg-[#FAF7F2] p-3.5 rounded-lg border border-[#E8DFC8] mb-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#006D77] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[11px] uppercase font-bold text-[#8C7B68] tracking-wider">{t('terrestrialAddress', 'Terrestrial Land Address')}</p>
                      <p className="text-xs font-medium text-stone-800 leading-relaxed font-mono mt-0.5">
                        {selectedCompetitor.location}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopyAddress(selectedCompetitor.name, selectedCompetitor.location, selectedCompetitor.id)}
                    className="p-1.5 rounded bg-white hover:bg-stone-100 border border-stone-300 text-stone-700 transition cursor-pointer shrink-0"
                    title={t('copyAddress', 'Copy Address')}
                  >
                    {copiedId === selectedCompetitor.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Overview & Atmosphere */}
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                {t(selectedCompetitor.description, selectedCompetitor.description)}
              </p>

              {/* Atmosphere / Vibe */}
              <div className="mb-4 text-xs text-stone-700 bg-stone-50 p-3 rounded border border-stone-200">
                <strong className="text-stone-900 block mb-0.5">{t('hospitalityAtmosphere', 'Hospitality Atmosphere:')}</strong>
                <span>{t(selectedCompetitor.atmosphere, selectedCompetitor.atmosphere)}</span>
              </div>

              {/* Highlights */}
              <div className="space-y-1.5 mb-5">
                <p className="text-[11px] uppercase font-bold text-stone-500 tracking-wider">{t('propertyHighlights', 'Property Highlights:')}</p>
                {selectedCompetitor.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-stone-700">
                    <Check className="w-3.5 h-3.5 text-[#006D77] shrink-0" />
                    <span>{t(item, item)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Comparison Edge */}
            <div className="pt-4 border-t border-stone-200">
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="text-stone-500">{t('estimatedPriceBracket', 'Estimated Price Bracket:')}</span>
                <span className="font-serif font-bold text-stone-900">{selectedCompetitor.priceRange}</span>
              </div>

              {/* Comparative Badge for Alon & Aninag */}
              <div className="bg-teal-50/70 rounded-lg p-3 border border-teal-100 flex items-start gap-2.5">
                <Award className="w-4 h-4 text-[#006D77] shrink-0 mt-0.5" />
                <div className="text-xs text-[#006D77]">
                  <strong className="block text-stone-900 font-medium">{t('whyAlonStandsApart', 'Why Alon & Aninag Stands Apart:')}</strong>
                  {t('whyAlonDesc', 'Intimate 12-room boutique setting with uncrowded sands, beachfront sunset acoustics, and exclusive Dayglow clear kayak experiences on Poblacion Beach.')}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All 5 Competitors List Cards Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                {t('directoryTitle', 'Sipalay Resort Directory & Comparative Locations')}
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                {t('directorySubtitle', 'Click "Select on Map" to automatically scroll to and move directly to that geographic area on the map.')}
              </p>
            </div>
            <span className="text-xs text-stone-500 hidden sm:inline-block">{t('competitorsAnalyzed', '5 Competitors Analyzed')}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Our Resort Card */}
            <div className="bg-[#006D77] text-white rounded-xl p-5 border border-teal-800 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest bg-white/20 text-white px-2 py-0.5 rounded-sm">
                    {t('ourResortBadge', 'Our Resort')}
                  </span>
                  <span className="text-xs font-bold text-[#83C5BE]">
                    {t('youAreHere', 'You Are Here')}
                  </span>
                </div>
                <h4 className="font-serif text-xl font-bold mb-2">
                  {ourResort.name}
                </h4>
                <p className="text-xs text-stone-200 mb-3 leading-relaxed">
                  {ourResort.category}
                </p>
                <div className="text-[11px] font-mono bg-black/20 p-2 rounded text-stone-300 mb-3 flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#83C5BE] shrink-0 mt-0.5" />
                  <span>{ourResort.location}</span>
                </div>
              </div>
              <div className="pt-3 border-t border-teal-600/50 flex items-center justify-between text-xs">
                <span className="text-stone-300">{t('rateRange', 'Rate Range:')}</span>
                <span className="font-bold text-white">{ourResort.priceRange}</span>
              </div>
            </div>

            {/* 5 Competitor Cards */}
            {COMPETITORS_DATA.map((comp, idx) => {
              const isSelected = selectedCompetitor.id === comp.id;
              const isVisible = isCompetitorVisible(comp);

              return (
                <div
                  key={comp.id}
                  onClick={() => handleSelectResort(comp, true)}
                  className={`bg-white rounded-xl p-5 border transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-xs ${
                    !isVisible ? 'opacity-40 grayscale-25' : ''
                  } ${
                    isSelected
                      ? 'border-[#006D77] ring-2 ring-[#006D77]/30 shadow-md -translate-y-0.5'
                      : 'border-stone-200 hover:border-stone-400 hover:shadow-sm'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#006D77] bg-teal-50 px-2 py-0.5 rounded-sm border border-teal-100">
                        {t('competitor', 'Competitor')} {idx + 1}
                      </span>
                      <span className="text-xs font-semibold text-stone-500">
                        {comp.distanceKm} {t('kmAway', 'km away')}
                      </span>
                    </div>

                    <h4 className="font-serif text-lg font-bold text-stone-900 mb-1">
                      {comp.name}
                    </h4>
                    <p className="text-xs text-stone-500 mb-2">
                      {t(comp.category, comp.category)}
                    </p>

                    <div className="text-[11px] font-mono bg-[#FAF7F2] p-2 rounded text-stone-700 mb-3 flex items-start justify-between gap-1 border border-stone-200">
                      <div className="flex items-start gap-1">
                        <MapPin className="w-3 h-3 text-[#006D77] shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{comp.location}</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyAddress(comp.name, comp.location, comp.id);
                        }}
                        className="p-1 hover:bg-white rounded text-stone-500 hover:text-stone-800 transition cursor-pointer shrink-0"
                        title={t('copyAddress', 'Copy Address')}
                      >
                        {copiedId === comp.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed line-clamp-2 mb-3">
                      {t(comp.description, comp.description)}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-stone-500 font-medium">{t(comp.travelTime, comp.travelTime)}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectResort(comp, true);
                      }}
                      className={`font-bold px-3 py-1.5 rounded transition cursor-pointer flex items-center gap-1.5 text-xs ${
                        isSelected 
                          ? 'bg-[#006D77] text-white shadow-xs' 
                          : 'bg-[#FAF7F2] text-[#006D77] border border-[#D0DFE2] hover:bg-[#006D77] hover:text-white'
                      }`}
                    >
                      <span>{isSelected ? t('areaFocused', 'Area Focused') : t('selectOnMap', 'Select on Map')}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export const CompetitorMap = InteractiveMap;

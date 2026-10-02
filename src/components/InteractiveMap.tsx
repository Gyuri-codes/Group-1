import React, { useState, useRef, useEffect } from 'react';
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
  Maximize2,
  Crosshair,
  Info,
  Map as MapIcon,
  Layers,
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
      setActiveAreaTag(t('puntaBalloWhiteSand', 'Punta Ballo White Sand Coast'));
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
  // Center is (300, 235). When zoomed 1.6x, we translate the board so (pin.x, pin.y) is near center
  const getMapTransform = () => {
    if (!isZoomed) return 'translate(0px, 0px) scale(1)';
    
    // SVG viewBox is 600 x 470
    const pinX = (selectedCompetitor.mapPin.leftPercent / 100) * 600;
    const pinY = (selectedCompetitor.mapPin.topPercent / 100) * 470;
    
    // Translate offset to move this exact geographic area to the center (300, 235)
    const scale = 1.65;
    const targetCenterX = 300;
    const targetCenterY = 235;
    
    const deltaX = (targetCenterX - pinX) * scale * 0.7;
    const deltaY = (targetCenterY - pinY) * scale * 0.7;

    return `translate(${deltaX}px, ${deltaY}px) scale(${scale})`;
  };

  const ourResort = {
    name: 'Alon & Aninag Boutique Beach Resort',
    location: 'Poblacion Beach (near Jazz Inn), Sipalay City, 6113 Negros Occidental, Philippines',
    category: t('boutiqueSanctuaryCategory', '12-Room Boutique Beachfront Sanctuary'),
    distanceKm: 0,
    travelTime: t('townCenterBeachfront', 'Town Center Beachfront'),
    mapPin: { leftPercent: 70, topPercent: 44, x: 420, y: 207 },
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
    svgY: (c.mapPin.topPercent / 100) * 470,
  }));

  const selectedWithCoords = competitorsWithCoordinates.find(c => c.id === selectedCompetitor.id) || competitorsWithCoordinates[0];

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
            {t('competitorsSubtitle', 'All resort properties situated accurately across Sipalay’s terrestrial landmass—from our central haven on Poblacion Beach to coastal land enclaves in North Sipalay, Campomanes Bay, Punta Ballo, and Cayhagan.')}
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
          {/* Interactive Geographic Coastline Competitor Map */}
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
              className="relative w-full h-[470px] bg-linear-to-br from-[#68AEC2] via-[#7BBECF] to-[#599FA0] rounded-xl overflow-hidden border border-[#89BFCE] select-none shadow-inner"
            >
              {/* SVG Layer that animates panning & zooming directly to the selected area */}
              <div 
                className="w-full h-full transition-transform duration-700 ease-out origin-center"
                style={{ transform: getMapTransform() }}
              >
                <svg 
                  className="w-full h-full"
                  viewBox="0 0 600 470" 
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
                    {/* Natural terrain land gradient */}
                    <linearGradient id="landGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#EAE0CA" />
                      <stop offset="50%" stopColor="#DFCDB0" />
                      <stop offset="100%" stopColor="#D4BF9D" />
                    </linearGradient>

                    {/* Mountain texture pattern */}
                    <pattern id="mountainPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 0,20 Q 10,12 20,20 T 40,20" fill="none" stroke="#BAA582" strokeWidth="0.8" opacity="0.4" />
                      <circle cx="20" cy="20" r="1.5" fill="#BAA582" opacity="0.3" />
                    </pattern>

                    {/* Soft water wave gradient */}
                    <linearGradient id="waterHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Water Base (West Philippine Sea / Sulu Sea) */}
                  <rect width="600" height="470" fill="transparent" />

                  {/* Ocean ripples on the west (left side) */}
                  <g opacity="0.35">
                    <path d="M 40,70 Q 70,60 100,70 T 160,70" fill="none" stroke="#FFFFFF" strokeWidth="1.8" />
                    <path d="M 30,160 Q 60,150 90,160 T 150,160" fill="none" stroke="#FFFFFF" strokeWidth="1.8" />
                    <path d="M 60,260 Q 90,250 120,260 T 180,260" fill="none" stroke="#FFFFFF" strokeWidth="1.8" />
                    <path d="M 40,360 Q 70,350 100,360 T 160,360" fill="none" stroke="#FFFFFF" strokeWidth="1.8" />
                  </g>

                  {/* TERRESTRIAL NEGROS ISLAND LANDMASS:
                      Coastline runs from (380,0) down to (300,470), expanding eastward to (600,0) and (600,470).
                      All resorts are positioned strictly on this dry land, NOT in the water.
                  */}
                  <path
                    d="M 600,0 
                       L 380,0 
                       Q 360,50 410,95 
                       Q 390,140 400,185 
                       Q 365,220 395,260 
                       Q 330,305 360,350 
                       Q 290,380 315,425 
                       Q 270,445 320,470 
                       L 600,470 Z"
                    fill="url(#landGradient)"
                    stroke="#BAA582"
                    strokeWidth="2.5"
                  />

                  {/* Topography hill overlay on land */}
                  <path
                    d="M 600,0 
                       L 380,0 
                       Q 360,50 410,95 
                       Q 390,140 400,185 
                       Q 365,220 395,260 
                       Q 330,305 360,350 
                       Q 290,380 315,425 
                       Q 270,445 320,470 
                       L 600,470 Z"
                    fill="url(#mountainPattern)"
                  />

                  {/* Sandy Beach Fringe & Coral Reef shallow line on the coast edge */}
                  <path
                    d="M 380,0 
                       Q 360,50 410,95 
                       Q 390,140 400,185 
                       Q 365,220 395,260 
                       Q 330,305 360,350 
                       Q 290,380 315,425 
                       Q 270,445 320,470"
                    fill="none"
                    stroke="#97DFE8"
                    strokeWidth="9"
                    opacity="0.45"
                  />

                  {/* Terrestrial Mountain Ridges (Inland Negros Occidental) */}
                  <path d="M 500,50 Q 530,110 515,180" fill="none" stroke="#A89472" strokeWidth="2.5" strokeDasharray="4 3" opacity="0.6" />
                  <path d="M 460,210 Q 500,280 480,350" fill="none" stroke="#A89472" strokeWidth="2.5" strokeDasharray="4 3" opacity="0.6" />
                  <path d="M 420,360 Q 470,415 450,460" fill="none" stroke="#A89472" strokeWidth="2.5" strokeDasharray="4 3" opacity="0.6" />

                  {/* Geographic Coastline Labels firmly on Land */}
                  <g fill="#7A6852" fontSize="9" fontWeight="bold" letterSpacing="1.2">
                    <text x="440" y="35">NORTH SIPALAY (COASTAL LAND)</text>
                    <text x="435" y="195" fill="#006D77">POBLACION BAY (TOWN CENTER)</text>
                    <text x="400" y="325">CAMPOMANES BAY COAST</text>
                    <text x="350" y="405">PUNTA BALLO PENINSULA</text>
                    <text x="480" y="450">CAYHAGAN VALLEYS</text>
                  </g>

                  {/* Sea Labels (West side) */}
                  <g fill="#FFFFFF" fontSize="9" fontWeight="bold" letterSpacing="1.5" opacity="0.8">
                    <text x="30" y="35">SULU SEA COASTAL WATERS</text>
                    <text x="40" y="240">WEST PHILIPPINE BASIN</text>
                  </g>

                  {/* Dynamic Route Line connecting Alon & Aninag on land (420, 207) to the selected competitor */}
                  <line
                    x1="420"
                    y1="207"
                    x2={selectedWithCoords.svgX}
                    y2={selectedWithCoords.svgY}
                    stroke="#E29578"
                    strokeWidth="3"
                    strokeDasharray="6 4"
                    className="animate-pulse"
                  />

                  {/* Highlighting Spotlight / Radius Circle on the selected geographic area */}
                  <circle
                    cx={selectedWithCoords.svgX}
                    cy={selectedWithCoords.svgY}
                    r="26"
                    fill="#E29578"
                    fillOpacity="0.18"
                    stroke="#E29578"
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                    className="animate-spin"
                    style={{ transformOrigin: `${selectedWithCoords.svgX}px ${selectedWithCoords.svgY}px`, animationDuration: '10s' }}
                  />

                  {/* SVG PINS:
                      All SVG circles and markers drawn directly in map coordinates so they pan and zoom accurately!
                  */}

                  {/* Pin 0: ALON & ANINAG BOUTIQUE RESORT (Our Resort - Poblacion Beach Land) */}
                  <g 
                    transform="translate(420, 207)" 
                    className="cursor-pointer"
                    onClick={() => addNotification('Alon & Aninag', 'You are viewing our 12-room boutique sanctuary on Poblacion Beach.', 'alert')}
                  >
                    <circle r="16" fill="#006D77" stroke="#FFFFFF" strokeWidth="3" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))" />
                    <text x="0" y="4" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">✨</text>
                    {/* Badge */}
                    <rect x="-65" y="22" width="130" height="18" rx="4" fill="#1A1A1A" fillOpacity="0.92" stroke="#83C5BE" strokeWidth="0.8" />
                    <text x="0" y="34" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold">Alon & Aninag (Our Resort)</text>
                  </g>

                  {/* Pins 1 to 5: Competitors (Strictly on Land) */}
                  {competitorsWithCoordinates.map((comp, idx) => {
                    const isCurrent = comp.id === selectedCompetitor.id;

                    return (
                      <g 
                        key={comp.id} 
                        transform={`translate(${comp.svgX}, ${comp.svgY})`}
                        className="cursor-pointer"
                        onClick={() => handleSelectResort(comp, false)}
                      >
                        {/* Selected halo */}
                        {isCurrent && (
                          <circle r="18" fill="none" stroke="#E29578" strokeWidth="3" className="animate-ping" opacity="0.75" />
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
                        {/* Resort label box */}
                        <rect 
                          x="-45" 
                          y={isCurrent ? "18" : "15"} 
                          width="90" 
                          height="16" 
                          rx="3" 
                          fill={isCurrent ? "#2C241D" : "#FFFFFF"} 
                          stroke={isCurrent ? "#E29578" : "#D0DFE2"} 
                          strokeWidth="1"
                          filter="drop-shadow(0 1px 2px rgba(0,0,0,0.15))"
                        />
                        <text 
                          x="0" 
                          y={isCurrent ? "29" : "26"} 
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
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs p-3 rounded-lg border border-stone-200 text-xs text-[#2C241D] shadow-xs space-y-1.5 z-10">
                <div className="font-bold text-stone-500 uppercase text-[10px] tracking-wider">{t('mapPinLegend', 'Map Pin Legend')}</div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#006D77] border border-white shrink-0" />
                  <span className="font-semibold text-stone-900">{t('ourResortTitle', 'Alon & Aninag (Our Resort)')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#2C241D] border border-[#E29578] shrink-0" />
                  <span className="text-stone-700">{t('competitorsOnLand', 'Competitors on Land (1–5)')}</span>
                </div>
              </div>

              {/* Terrestrial Land Verification Seal */}
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded text-[11px] font-medium text-stone-700 border border-stone-200 flex items-center gap-1.5 shadow-xs z-10">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>{t('terrestrialVerified', 'Terrestrial Geographic Locations Verified')}</span>
              </div>

              {/* Currently Focused Area Chip */}
              <div className="absolute bottom-3 right-3 bg-[#006D77] text-white px-3 py-1 rounded text-xs font-semibold shadow-md flex items-center gap-1.5 z-10">
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

              return (
                <div
                  key={comp.id}
                  onClick={() => handleSelectResort(comp, true)}
                  className={`bg-white rounded-xl p-5 border transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-xs ${
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
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
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

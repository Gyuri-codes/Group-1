import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { DAYGLOW_EXPERIENCE_DATA, CURRENCY_RATES, RESORT_IMAGES } from '../data/resortData';
import { 
  Sparkles, 
  Waves, 
  Sun, 
  Coffee, 
  Camera, 
  ShieldCheck, 
  Check, 
  Clock, 
  ArrowRight, 
  Heart, 
  Share2, 
  Flame, 
  Sunset, 
  Compass, 
  Award, 
  Info, 
  ChevronRight, 
  X, 
  ExternalLink,
  Users,
  Anchor,
  Droplets
} from 'lucide-react';

interface DayglowExperienceSectionProps {
  onOpenBookingModal: (guestType?: 'overnight' | 'daypass') => void;
}

export const DayglowExperienceSection: React.FC<DayglowExperienceSectionProps> = ({
  onOpenBookingModal
}) => {
  const { currency, openBookingModal, addNotification, t } = useResort();

  const [activeFeatureTab, setActiveFeatureTab] = useState<number>(0);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number>(0);
  const [isCopiedHashtag, setIsCopiedHashtag] = useState<boolean>(false);
  const [isAcademicModalOpen, setIsAcademicModalOpen] = useState<boolean>(false);

  const rate = CURRENCY_RATES[currency]?.rateToPHP || 1;
  const symbol = CURRENCY_RATES[currency]?.symbol || '₱';

  const overnightPrice = Math.round(DAYGLOW_EXPERIENCE_DATA.pricing.overnight.pricePHP * rate);
  const dayPassPrice = Math.round(DAYGLOW_EXPERIENCE_DATA.pricing.dayPass.pricePHP * rate);

  const handleCopyHashtag = () => {
    navigator.clipboard.writeText('#DayglowAtAlon');
    setIsCopiedHashtag(true);
    addNotification('Hashtag Copied!', '#DayglowAtAlon copied to clipboard. Share your photos on Instagram and TikTok!', 'promo');
    setTimeout(() => setIsCopiedHashtag(false), 3000);
  };

  return (
    <section id="dayglow" className="py-20 sm:py-24 bg-[#FAF7F2] relative overflow-hidden border-b border-stone-200">
      {/* Decorative background glow accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#83C5BE]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-[#FFDDD2]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Product Announcement Ribbon */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#006D77]/10 text-[#006D77] text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#E29578]" />
            <span>{t('newSignatureExp', 'New Signature Hospitality Experience')}</span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight leading-tight">
            {t('dayglowTitle', 'The Aninag Dayglow & Paddle Experience')}
          </h2>
          
          <p className="font-serif italic text-xl sm:text-2xl text-[#006D77] mt-3 font-normal">
            {t('dayglowTagline', '“Paddle. Relax. Capture the Glow.”')}
          </p>

          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mt-4 max-w-2xl mx-auto">
            {t('dayglowHeroDesc', 'An all-inclusive daytime lifestyle experience crafted for overnight guests, young couples, barkadas, and day-trippers (ages 20–35). Glide across calm turquoise waters in clear kayaks, indulge in a floating Negrense tea and snack tray, and unwind on your reserved shaded beachfront daybed.')}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <button
              onClick={() => onOpenBookingModal('overnight')}
              className="px-6 py-3 bg-[#006D77] hover:bg-[#00555d] text-white font-bold text-xs uppercase tracking-wider rounded-sm transition shadow-sm hover:shadow-md cursor-pointer flex items-center gap-2"
            >
              <span>{t('bookDayglow', 'Book Dayglow Experience')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#dayglow-pricing"
              className="px-5 py-3 bg-white hover:bg-stone-50 text-stone-800 font-bold text-xs uppercase tracking-wider rounded-sm border border-stone-300 transition cursor-pointer"
            >
              {t('viewPricingSlots', 'View Pricing & Time Slots')}
            </a>

            <button
              onClick={() => setIsAcademicModalOpen(true)}
              className="px-4 py-3 bg-[#83C5BE]/20 hover:bg-[#83C5BE]/30 text-[#006D77] font-semibold text-xs uppercase tracking-wider rounded-sm transition cursor-pointer flex items-center gap-1.5"
              title="View Strategic Management BSHM Concept Plan"
            >
              <Award className="w-3.5 h-3.5" />
              <span>{t('bshmStrategicPlan', 'BSHM Strategic Plan')}</span>
            </button>
          </div>
        </div>

        {/* Hero Feature Visual Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-24 bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-stone-200 shadow-sm">
          <div className="lg:col-span-7 relative rounded-2xl overflow-hidden aspect-4/3 sm:aspect-16/10 shadow-md">
            <img
              src={RESORT_IMAGES.dayglow}
              alt="The Aninag Dayglow & Paddle Experience on crystal clear water"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
            
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-[#006D77] shadow-xs">
                #DayglowAtAlon Signature
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-white">
              <p className="text-xs uppercase tracking-widest text-[#83C5BE] font-semibold">
                {t('beachfrontZone', 'Direct Beachfront Activity Zone • Poblacion Beach, Sipalay')}
              </p>
              <p className="font-serif text-lg sm:text-xl font-normal mt-0.5">
                {t('dayglowVisualTitle', 'Transparent Kayaks & Floating Negrense Tea Served on Calm Waters')}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#006D77]">
                {t('whereWavesRest', 'Where Waves Rest and Souls Glow')}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-stone-900 mt-1">
                {t('daytimeCalmTitle', 'Daytime Calm Reimagined for Young Travelers')}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed">
                {t('daytimeCalmDesc', 'While Alon & Aninag is renowned for our magical sunset bonfire nights, our shoreline now shines just as brightly by day. We designed the Dayglow Experience to give aesthetic seekers a curated, uncrowded, and deeply relaxing morning and afternoon on the water.')}
              </p>
            </div>

            {/* Inclusions summary list */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#006D77]/10 text-[#006D77] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <p className="text-xs text-stone-700">
                  <strong>{t('twoHourAccess', '2-Hour Reserved Access:')}</strong> {t('twoHourAccessDesc', 'Photogenic transparent kayaks & SUP boards directly in front of the resort.')}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#006D77]/10 text-[#006D77] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <p className="text-xs text-stone-700">
                  <strong>{t('floatingTray', 'Floating Negrense Tray:')}</strong> {t('floatingTrayDesc', 'Artisan cold-brew lemongrass-pandan tea & fresh tropical snacks.')}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#006D77]/10 text-[#006D77] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <p className="text-xs text-stone-700">
                  <strong>{t('reservedDaybed', 'Reserved Beachfront Daybed:')}</strong> {t('reservedDaybedDesc', 'Shaded woven canopy lounger with dedicated host care.')}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#006D77]/10 text-[#006D77] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <p className="text-xs text-stone-700">
                  <strong>{t('hostPhotoAssist', 'Host Photo Assistance:')}</strong> {t('hostPhotoAssistDesc', 'High-resolution photos & video reels with complimentary dry bags.')}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold block">
                  {t('overnightSpecial', 'Overnight Guest Special')}
                </span>
                <span className="font-serif text-2xl font-bold text-[#006D77]">
                  {symbol}{overnightPrice.toLocaleString()}{' '}
                  <span className="text-xs font-sans font-normal text-stone-500">{t('perPair', '/ pair (2 guests)')}</span>
                </span>
              </div>

              <button
                onClick={() => onOpenBookingModal('overnight')}
                className="px-5 py-2.5 bg-[#006D77] hover:bg-[#00555d] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition cursor-pointer"
              >
                {t('reserveSlot', 'Reserve Slot')}
              </button>
            </div>
          </div>
        </div>

        {/* 3 Signature Features Grid */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#006D77]">
              {t('signatureElements', 'Signature Elements')}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-stone-900 mt-1">
              {t('threePillars', 'Three Pillars of the Dayglow Experience')}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-2">
              {t('threePillarsDesc', 'Every detail is calibrated for effortless aesthetic enjoyment, genuine comfort, and soulful rest.')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {DAYGLOW_EXPERIENCE_DATA.features.map((feature, idx) => (
              <div 
                key={feature.id}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                    <img
                      src={feature.image}
                      alt={t(feature.title, feature.title)}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-[#006D77] text-white text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-sm shadow-xs">
                      {t(feature.badge, feature.badge)}
                    </span>
                  </div>

                  <div className="p-6">
                    <h4 className="font-serif text-xl font-normal text-stone-900 mb-1">
                      {t(feature.title, feature.title)}
                    </h4>
                    <p className="text-xs font-semibold text-[#006D77] mb-3">
                      {t(feature.subtitle, feature.subtitle)}
                    </p>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {t(feature.description, feature.description)}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#006D77]">
                    <span>{t('includedInPairBooking', 'Included in every pair booking')}</span>
                    <Check className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The Complete Coastal Journey Timeline: Dayglow -> Paddle -> Relax -> Sunset -> Bonfire */}
        <div className="mb-24 bg-gradient-to-br from-[#1A1A1A] to-stone-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#83C5BE] uppercase tracking-widest mb-2">
              <Sun className="w-4 h-4 text-[#E29578]" />
              <span>{t('coastalJourneyTitle', 'Full Day-to-Sunset Flow')}</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight">
              {t('coastalJourneyHeading', 'Dayglow → Paddle → Relax → Sunset → Bonfire')}
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed">
              {t('coastalJourneyDesc', 'At Alon & Aninag, your island escape flows harmoniously from morning calm waters to starry night firesides. Here is how your day unfolds:')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DAYGLOW_EXPERIENCE_DATA.coastalJourney.map((step, idx) => (
              <div 
                key={idx}
                className="bg-stone-800/80 backdrop-blur-sm p-6 rounded-2xl border border-stone-700/60 relative flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-[#83C5BE] tracking-widest block mb-2">
                    {t(step.phase, step.phase)}
                  </span>
                  <h4 className="font-serif text-lg font-normal text-white mb-1">
                    {t(step.title, step.title)}
                  </h4>
                  <span className="inline-block text-[11px] text-[#E29578] font-semibold mb-3">
                    {t(step.time, step.time)}
                  </span>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {t(step.desc, step.desc)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5-Step Customer Experience Process */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#006D77]">
              {t('guestExpFlow', 'Guest Experience Flow')}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-stone-900 mt-1">
              {t('fiveStepProcess', 'Your 5-Step Dayglow Experience')}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-2">
              {t('fiveStepDesc', 'Seamless, effortless, and hosted with warm local care from booking to rinse-off.')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {DAYGLOW_EXPERIENCE_DATA.processSteps.map((s) => (
              <div
                key={s.step}
                className="bg-white p-5 rounded-2xl border border-stone-200 relative shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#006D77]/10 text-[#006D77] flex items-center justify-center font-serif text-lg font-bold mb-3">
                    0{s.step}
                  </div>
                  <h4 className="font-serif text-sm font-bold text-stone-900 mb-1.5">
                    {t(s.title, s.title)}
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {t(s.desc, s.desc)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Section (Clean & High Converting) */}
        <div id="dayglow-pricing" className="mb-24 scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#006D77]">
              {t('transparentRates', 'Transparent Rates')}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-stone-900 mt-1">
              {t('dayglowPricingTitle', 'Dayglow Experience Pricing')}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-2">
              {t('dayglowPricingDesc', 'All rates are per pair (2 guests) and include 2-hour clear kayak/SUP access, floating refreshments, reserved daybed, and dedicated host assistance.')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Overnight Resort Guest Card (Highlighted) */}
            <div className="bg-white rounded-3xl p-8 border-2 border-[#006D77] shadow-lg relative flex flex-col justify-between">
              <div className="absolute -top-3.5 right-6 bg-[#006D77] text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-xs">
                {t('overnightBadge', 'Most Popular • Staying Guests')}
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#006D77] block mb-1">
                  {t('resortResidentAddon', 'Resort Resident Add-on')}
                </span>
                <h4 className="font-serif text-2xl font-normal text-stone-900">
                  {t('overnightResortGuest', 'Overnight Resort Guest')}
                </h4>
                <p className="text-xs text-stone-500 mt-1">
                  {t('exclusiveDiscountAddon', 'Exclusive discounted add-on rate for guests staying at Alon & Aninag.')}
                </p>

                <div className="my-6 pb-6 border-b border-stone-200">
                  <span className="font-serif text-4xl font-bold text-[#006D77]">
                    {symbol}{overnightPrice.toLocaleString()}
                  </span>
                  <span className="text-stone-500 text-xs font-sans ml-2">
                    {t('perPairTwoHour', '/ pair (2 guests) • 2-Hour Experience')}
                  </span>
                  <p className="text-[11px] text-emerald-600 font-bold mt-1">
                    {t('saveVsDayPass', 'Save ₱350 compared to non-staying day pass')}
                  </p>
                </div>

                <div className="space-y-2.5 text-xs text-stone-700 mb-8">
                  {DAYGLOW_EXPERIENCE_DATA.inclusions.map((inc, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#006D77] shrink-0 mt-0.5" />
                      <span>{t(inc, inc)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onOpenBookingModal('overnight')}
                className="w-full py-3.5 bg-[#006D77] hover:bg-[#00555d] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition shadow-sm hover:shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{t('bookOvernightAddon', 'Book Overnight Add-on')} ({symbol}{overnightPrice.toLocaleString()})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Day Pass Guest Card */}
            <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1">
                  {t('dayVisitorsStaycationers', 'Day Visitors & Staycationers')}
                </span>
                <h4 className="font-serif text-2xl font-normal text-stone-900">
                  {t('dayPassVisitor', 'Day Pass Visitor')}
                </h4>
                <p className="text-xs text-stone-500 mt-1">
                  {t('forVisitorsNear', 'For visitors from Bacolod, Kabankalan, Dumaguete & nearby areas.')}
                </p>

                <div className="my-6 pb-6 border-b border-stone-200">
                  <span className="font-serif text-4xl font-bold text-stone-900">
                    {symbol}{dayPassPrice.toLocaleString()}
                  </span>
                  <span className="text-stone-500 text-xs font-sans ml-2">
                    {t('perPairTwoHour', '/ pair (2 guests) • 2-Hour Experience')}
                  </span>
                  <p className="text-[11px] text-stone-500 mt-1">
                    {t('includesBeachPass', 'Includes resort beachfront pass & shower facilities')}
                  </p>
                </div>

                <div className="space-y-2.5 text-xs text-stone-700 mb-8">
                  {DAYGLOW_EXPERIENCE_DATA.inclusions.map((inc, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                      <span>{t(inc, inc)}</span>
                    </div>
                  ))}
                  <div className="flex items-start gap-2.5 text-[#006D77] font-semibold">
                    <Check className="w-4 h-4 text-[#006D77] shrink-0 mt-0.5" />
                    <span>{t('includesShowerFacilities', 'Includes fresh water beach shower & locker facilities')}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onOpenBookingModal('daypass')}
                className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold uppercase tracking-wider rounded-sm transition shadow-sm hover:shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{t('reserveDayPass', 'Reserve Day Pass')} ({symbol}{dayPassPrice.toLocaleString()})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Time Slot Schedule Banner */}
          <div className="mt-10 bg-white rounded-2xl p-6 border border-stone-200 max-w-4xl mx-auto shadow-xs">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
              <div>
                <h4 className="font-serif text-base font-bold text-stone-900">
                  {t('preScheduledSlots', 'Pre-Scheduled Daily Time Slots')}
                </h4>
                <p className="text-xs text-stone-500">
                  {t('cappedSlotsNotice', 'Strictly capped at 4 pairs per slot to prevent overcrowding and ensure flawless water photos.')}
                </p>
              </div>

              <span className="text-xs font-semibold text-[#006D77] bg-[#006D77]/10 px-3 py-1 rounded-full">
                {t('advanceReservationRec', 'Advance Reservation Recommended')}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {DAYGLOW_EXPERIENCE_DATA.timeSlots.map((slot) => (
                <div key={slot.id} className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="font-bold text-xs text-stone-900 block">{slot.label}</span>
                  <span className="text-[11px] text-[#006D77] font-medium block">{t(slot.name, slot.name)}</span>
                  <span className="text-[10px] text-stone-500 block truncate">{t(slot.vibe, slot.vibe)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Brand Differentiation & Why Alon & Aninag Stands Apart */}
        <div className="mb-24 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-sm">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#006D77]">
              {t('unmatchedDistinction', 'Unmatched Distinction')}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-stone-900">
              {t('whyDayglowDistinct', 'Why Our Dayglow Cannot Be Replicated')}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {t('differentiationIntro', 'Competitors can purchase similar kayaks or boards, but they cannot replicate our genuine Negrense hospitality culture, our 12-room quiet beachfront sanctuary, and the seamless transition into the sunset bonfire.')}
            </p>
            <div className="pt-2">
              <button
                onClick={() => openBookingModal()}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#006D77] hover:underline cursor-pointer"
              >
                <span>{t('exploreRoomsVillas', 'Explore Overnight Rooms & Villas')}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {DAYGLOW_EXPERIENCE_DATA.differentiation.map((diff, i) => (
              <div key={i} className="p-5 bg-stone-50 rounded-2xl border border-stone-200">
                <h4 className="font-serif text-sm font-bold text-stone-900 mb-1">
                  {t(diff.title, diff.title)}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {t(diff.desc, diff.desc)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Social Media Campaign: #DayglowAtAlon */}
        <div className="mb-24 bg-gradient-to-r from-[#006D77] via-[#2A7F88] to-[#83C5BE] rounded-3xl p-8 sm:p-12 text-white shadow-lg relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
                <Camera className="w-3.5 h-3.5 text-[#FFDDD2]" />
                <span>{t('socialCampaignTag', 'TikTok & Instagram Campaign')}</span>
              </div>
              
              <h3 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight">
                {t('shareYourGlow', 'Share Your Glow with #DayglowAtAlon')}
              </h3>
              
              <p className="text-xs sm:text-sm text-stone-100 leading-relaxed">
                {t('shareYourGlowDesc', 'Short-form video hooks, clear-kayak drone perspectives, and floating tea flat-lays. Tag @alon.aninag.sipalay with #DayglowAtAlon. Top featured content creators win a free 2-night stay!')}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={handleCopyHashtag}
                  className="px-4 py-2.5 bg-white text-[#006D77] rounded-full text-xs font-bold uppercase tracking-wider transition shadow-sm hover:shadow-md cursor-pointer flex items-center gap-2"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{isCopiedHashtag ? t('hashtagCopied', 'Hashtag Copied! ✨') : t('copyHashtag', 'Copy #DayglowAtAlon')}</span>
                </button>

                <a
                  href="#reviews"
                  className="px-4 py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-full text-xs font-bold uppercase tracking-wider transition cursor-pointer"
                >
                  {t('viewUgcWall', 'View Guest UGC Wall')}
                </a>
              </div>
            </div>

            {/* Micro visual cards */}
            <div className="grid grid-cols-2 gap-3 w-full lg:w-auto shrink-0">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center">
                <span className="font-serif text-2xl font-bold block">150k+</span>
                <span className="text-[11px] text-stone-200">{t('tikTokViews', 'TikTok Views')}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center">
                <span className="font-serif text-2xl font-bold block">100%</span>
                <span className="text-[11px] text-stone-200">{t('clearKayakViews', 'Clear Kayak Views')}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center">
                <span className="font-serif text-2xl font-bold block">₱850</span>
                <span className="text-[11px] text-stone-200">{t('affordableRate', 'Affordable Rate')}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center">
                <span className="font-serif text-2xl font-bold block">{t('zeroWord', 'Zero')}</span>
                <span className="text-[11px] text-stone-200">{t('overcrowding', 'Overcrowding')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Safety, Quality & Marine Care Commitment */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-stone-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#006D77]">
                {t('safetyQualityAssurance', 'Safety & Quality Assurance')}
              </span>
              <h3 className="font-serif text-2xl font-normal text-stone-900 mt-1">
                {t('waterSafetyCommitment', 'Our Water Safety & Equipment Commitment')}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{t('certifiedHostsProvided', 'Certified Local Beach Hosts & Life Jackets Provided')}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DAYGLOW_EXPERIENCE_DATA.safetyCommitment.map((safe, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-900">
                  <div className="w-2 h-2 rounded-full bg-[#006D77]" />
                  <span>{t(safe.title, safe.title)}</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed pl-4">
                  {t(safe.desc, safe.desc)}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Academic Project Presentation Modal (BSHM - 4B Group 1) */}
      {isAcademicModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 p-6 sm:p-8 relative">
            <button
              onClick={() => setIsAcademicModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#006D77]/10 text-[#006D77] text-xs font-bold uppercase tracking-wider mb-2">
              <Award className="w-3.5 h-3.5" />
              {t('academicPresentation', 'Academic Presentation')}
            </div>

            <h3 className="font-serif text-2xl font-bold text-stone-900">
              {DAYGLOW_EXPERIENCE_DATA.academicProjectInfo.title}
            </h3>

            <p className="text-xs text-stone-500 mt-1">
              {DAYGLOW_EXPERIENCE_DATA.academicProjectInfo.course} • {DAYGLOW_EXPERIENCE_DATA.academicProjectInfo.program} • {DAYGLOW_EXPERIENCE_DATA.academicProjectInfo.activityType}
            </p>

            <div className="mt-6 space-y-4 text-xs text-stone-700">
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
                <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px] mb-2">
                  {t('projectAuthors', 'Project Authors (Group 1):')}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {DAYGLOW_EXPERIENCE_DATA.academicProjectInfo.members.map((m, idx) => (
                    <div key={idx} className="p-2 bg-white rounded-lg border border-stone-200">
                      <p className="font-bold text-stone-900">{m.name}</p>
                      <p className="text-[10px] text-stone-500">{m.role}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                <h4 className="font-bold text-emerald-900 uppercase tracking-wider text-[11px] mb-1">
                  {t('strategicRationale', 'Strategic Rationale:')}
                </h4>
                <p className="text-emerald-800 leading-relaxed">
                  {DAYGLOW_EXPERIENCE_DATA.academicProjectInfo.strategicRationale}
                </p>
              </div>

              <div className="bg-[#006D77]/5 p-4 rounded-xl border border-[#006D77]/20">
                <h4 className="font-bold text-[#006D77] uppercase tracking-wider text-[11px] mb-1">
                  {t('mgmtFeasibilityDecision', 'Management Feasibility Decision:')}
                </h4>
                <p className="font-bold text-stone-900">
                  {DAYGLOW_EXPERIENCE_DATA.academicProjectInfo.managementDecision}
                </p>
                <p className="text-[11px] text-stone-600 mt-1">
                  {t('feasibilitySummary', 'Strong market alignment, capital efficiency utilizing natural beachfront assets, high ROI per guest pair, and direct synergy with the sunset bonfire brand identity.')}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setIsAcademicModalOpen(false)}
                className="px-6 py-2 bg-[#006D77] text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                {t('closeOverview', 'Close Overview')}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

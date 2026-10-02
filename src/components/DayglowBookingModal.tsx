import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { DAYGLOW_EXPERIENCE_DATA, CURRENCY_RATES } from '../data/resortData';
import { 
  X, 
  Calendar, 
  Clock, 
  Users, 
  Sparkles, 
  ShieldCheck, 
  Check, 
  Camera, 
  Coffee, 
  Waves, 
  Download, 
  QrCode,
  Share2,
  Heart,
  HelpCircle,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DayglowBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultGuestType?: 'overnight' | 'daypass';
}

export const DayglowBookingModal: React.FC<DayglowBookingModalProps> = ({
  isOpen,
  onClose,
  defaultGuestType = 'overnight'
}) => {
  const { currency, addNotification, t } = useResort();

  const [guestType, setGuestType] = useState<'overnight' | 'daypass'>(defaultGuestType);
  const [pairsCount, setPairsCount] = useState<number>(1);
  const [selectedSlotId, setSelectedSlotId] = useState<string>('morning');
  const [bookingDate, setBookingDate] = useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [equipmentPreference, setEquipmentPreference] = useState<'clear-kayak' | 'sup' | 'both'>('both');
  const [teaSelection, setTeaSelection] = useState<'Lemongrass-Pandan' | 'Hibiscus-Calamansi' | 'Wild Mint Green'>('Lemongrass-Pandan');
  const [requestPhotoHelp, setRequestPhotoHelp] = useState<boolean>(true);

  // Guest details
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [specialNotes, setSpecialNotes] = useState<string>('');

  // Step state
  const [step, setStep] = useState<'form' | 'confirmed'>('form');
  const [confirmedBookingRef, setConfirmedBookingRef] = useState<string>('');

  if (!isOpen) return null;

  const unitPricePHP = guestType === 'overnight' 
    ? DAYGLOW_EXPERIENCE_DATA.pricing.overnight.pricePHP 
    : DAYGLOW_EXPERIENCE_DATA.pricing.dayPass.pricePHP;

  const totalPricePHP = unitPricePHP * pairsCount;
  const rate = CURRENCY_RATES[currency]?.rateToPHP || 1;
  const symbol = CURRENCY_RATES[currency]?.symbol || '₱';
  const convertedTotal = Math.round(totalPricePHP * rate);

  const selectedSlot = DAYGLOW_EXPERIENCE_DATA.timeSlots.find(s => s.id === selectedSlotId) || DAYGLOW_EXPERIENCE_DATA.timeSlots[0];

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) return;

    const ref = `DAYGLOW-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedBookingRef(ref);
    setStep('confirmed');

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#006D77', '#83C5BE', '#E29578', '#FFDDD2']
      });
    } catch {
      // ignore
    }

    addNotification(
      t('dayglowReservedNotif', '✨ Dayglow Experience Reserved!'),
      `${t('dayglowReservedDesc', 'Your reservation #')}${ref} ${t('forSlot', 'for')} ${selectedSlot.name} (${selectedSlot.label}) ${t('isConfirmed', 'is confirmed!')}`,
      'booking'
    );
  };

  const handleResetAndClose = () => {
    setStep('form');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 relative my-auto">
        {/* Modal Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition cursor-pointer"
          aria-label={t('closeModal', 'Close modal')}
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <div>
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#006D77] to-[#83C5BE] text-white p-6 sm:p-8 rounded-t-3xl relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-white/10 rounded-full blur-xl pointer-events-none" />
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#FFDDD2]" />
                {t('signatureDaytimeExperience', 'Signature Daytime Experience')}
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                {t('dayglowExperienceTitle', 'The Aninag Dayglow & Paddle Experience')}
              </h3>
              <p className="text-xs sm:text-sm text-stone-100 mt-1 max-w-lg">
                {t('dayglowSubtitle', '"Paddle. Relax. Capture the Glow." Reserved 2-hour clear kayak, floating Negrense snack & tea tray, and beachfront daybed.')}
              </p>
            </div>

            {/* Form Body */}
            <form onSubmit={handleConfirm} className="p-6 sm:p-8 space-y-6">
              {/* Guest Type Selector */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  {t('selectGuestRateOption', 'Select Guest Rate Option')}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setGuestType('overnight')}
                    className={`p-4 rounded-2xl border-2 text-left transition cursor-pointer ${
                      guestType === 'overnight'
                        ? 'border-[#006D77] bg-[#006D77]/5 shadow-xs'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm text-[#006D77]">{t('overnightResortGuest', 'Overnight Resort Guest')}</span>
                      {guestType === 'overnight' && <Check className="w-4 h-4 text-[#006D77]" />}
                    </div>
                    <p className="text-xl font-bold text-stone-900">₱850 <span className="text-xs font-normal text-stone-500">/ {t('pair', 'pair')}</span></p>
                    <p className="text-[11px] text-[#006D77] font-semibold mt-1">{t('exclusiveDiscountAddon', 'Exclusive discounted add-on for staying guests')}</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setGuestType('daypass')}
                    className={`p-4 rounded-2xl border-2 text-left transition cursor-pointer ${
                      guestType === 'daypass'
                        ? 'border-[#006D77] bg-[#006D77]/5 shadow-xs'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm text-stone-900">{t('dayPassVisitor', 'Day Pass Visitor')}</span>
                      {guestType === 'daypass' && <Check className="w-4 h-4 text-[#006D77]" />}
                    </div>
                    <p className="text-xl font-bold text-stone-900">₱1,200 <span className="text-xs font-normal text-stone-500">/ {t('pair', 'pair')}</span></p>
                    <p className="text-[11px] text-stone-500 mt-1">{t('dayPassVisitorDesc', 'Includes daybed beach pass & amenities for non-staying guests')}</p>
                  </button>
                </div>
              </div>

              {/* Date & Quantity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    {t('preferredDate', 'Preferred Date')}
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full pl-10 pr-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-medium text-stone-900 focus:outline-none focus:border-[#006D77]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    {t('numberOfPairs', 'Number of Pairs (1 Pair = 2 Guests)')}
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setPairsCount(Math.max(1, pairsCount - 1))}
                      className="w-10 h-10 rounded-xl border border-stone-300 bg-stone-50 hover:bg-stone-100 flex items-center justify-center font-bold text-lg text-stone-700 cursor-pointer"
                    >
                      -
                    </button>
                    <div className="flex-1 text-center py-2 bg-stone-50 rounded-xl border border-stone-300">
                      <span className="font-bold text-stone-900 text-sm">{pairsCount} {t('pair', 'Pair')}{pairsCount > 1 ? 's' : ''} ({pairsCount * 2} {t('guests', 'Guests')})</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPairsCount(Math.min(6, pairsCount + 1))}
                      className="w-10 h-10 rounded-xl border border-stone-300 bg-stone-50 hover:bg-stone-100 flex items-center justify-center font-bold text-lg text-stone-700 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Time Slots (Pre-scheduled to prevent overcrowding) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                    {t('selectTimeSlot', 'Select Scheduled Time Slot')}
                  </label>
                  <span className="text-[11px] text-[#006D77] font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> {t('maxPairsPerSlot', 'Max 4 pairs per slot to prevent overcrowding')}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {DAYGLOW_EXPERIENCE_DATA.timeSlots.map((slot) => {
                    const isSelected = selectedSlotId === slot.id;
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => setSelectedSlotId(slot.id)}
                        className={`p-3 rounded-xl border text-left transition cursor-pointer flex items-start gap-3 ${
                          isSelected
                            ? 'border-[#006D77] bg-[#006D77]/5 ring-1 ring-[#006D77]'
                            : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isSelected ? 'bg-[#006D77] text-white' : 'bg-stone-200 text-stone-600'}`}>
                          <Clock className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-stone-900">{slot.label}</span>
                          </div>
                          <p className="text-[11px] font-medium text-[#006D77]">{t(slot.name, slot.name)}</p>
                          <p className="text-[10px] text-stone-500 truncate">{t(slot.vibe, slot.vibe)}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Preferences: Equipment & Cold-Brew Tea */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-stone-100">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    {t('watercraftPreference', 'Watercraft Preference')}
                  </label>
                  <select
                    value={equipmentPreference}
                    onChange={(e) => setEquipmentPreference(e.target.value as any)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-medium text-stone-900 focus:outline-none focus:border-[#006D77]"
                  >
                    <option value="both">{t('watercraftBoth', 'Both (1 Clear Kayak + 1 SUP Board)')}</option>
                    <option value="clear-kayak">{t('watercraftKayak', 'Clear Transparent Kayak Focus')}</option>
                    <option value="sup">{t('watercraftSup', 'Stand-Up Paddleboard Focus')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    {t('teaFlavorLabel', 'Floating Cold-Brew Tea Flavor')}
                  </label>
                  <select
                    value={teaSelection}
                    onChange={(e) => setTeaSelection(e.target.value as any)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-medium text-stone-900 focus:outline-none focus:border-[#006D77]"
                  >
                    <option value="Lemongrass-Pandan">{t('teaFlavorPandan', 'Negrense Lemongrass-Pandan Cold Brew')}</option>
                    <option value="Hibiscus-Calamansi">{t('teaFlavorHibiscus', 'Sunset Hibiscus & Calamansi Iced Tea')}</option>
                    <option value="Wild Mint Green">{t('teaFlavorMint', 'Wild Sipalay Mint & Green Tea Cooler')}</option>
                  </select>
                </div>
              </div>

              {/* Free Host Photo Assistance checkbox */}
              <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="photoAssistance"
                  checked={requestPhotoHelp}
                  onChange={(e) => setRequestPhotoHelp(e.target.checked)}
                  className="mt-0.5 rounded text-[#006D77] focus:ring-[#006D77] cursor-pointer"
                />
                <label htmlFor="photoAssistance" className="text-xs text-stone-700 cursor-pointer">
                  <strong className="text-stone-900 font-semibold flex items-center gap-1">
                    <Camera className="w-3.5 h-3.5 text-[#E29578]" /> {t('photoAssistanceTitle', 'Complimentary Host Photo & TikTok Reel Assistance')}
                  </strong>
                  {t('photoAssistanceDesc', 'Our trained local beach host will help take stunning photos and short video reels of you on the clear kayak with your phone safely stored in our dry bag!')}
                </label>
              </div>

              {/* Guest Details */}
              <div className="space-y-3 pt-2 border-t border-stone-100">
                <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider">{t('contactGuestInfo', 'Contact & Guest Information')}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-1">{t('leadGuestName', 'Lead Guest Name')}</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={t('namePlaceholder', 'e.g. Maria Santos')}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-[#006D77]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-1">{t('emailAddress', 'Email Address')}</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. maria@gmail.com"
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-[#006D77]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-1">{t('mobileGcash', 'Mobile / GCash No.')}</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0917 123 4567"
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-[#006D77]"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Total & Submit Button */}
              <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-stone-500">{t('totalExperienceAmount', 'Total Experience Amount')}:</p>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-[#006D77]">
                    {symbol}{convertedTotal.toLocaleString()}{' '}
                    <span className="text-xs font-normal text-stone-500 font-sans">
                      ({currency} • {t('forGuestsPrefix', 'for')} {pairsCount * 2} {t('guests', 'guests')})
                    </span>
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#006D77] hover:bg-[#00555d] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#FFDDD2]" />
                  <span>{t('confirmDayglowRes', 'Confirm Dayglow Reservation')}</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Screen */
          <div className="p-6 sm:p-10 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#006D77]/10 text-[#006D77] flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
                {t('bookingRefConfirmed', 'Booking Reference Confirmed')}
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                {t('bookedDayglowSuccess', "You're Booked for the Dayglow Experience!")}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-md mx-auto">
                {t('thankYouPrefix', 'Thank you,')} <strong>{fullName}</strong>! {t('dayglowSuccessDesc', 'Your scheduled 2-hour paddle and floating refreshment experience is reserved at Alon & Aninag.')}
              </p>
            </div>

            {/* Electronic Voucher Card */}
            <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 text-left max-w-md mx-auto space-y-4 shadow-xs">
              <div className="flex justify-between items-center pb-3 border-b border-stone-200">
                <div>
                  <span className="text-[10px] text-stone-400 uppercase tracking-widest block">{t('referenceCode', 'Reference Code')}</span>
                  <span className="font-mono font-bold text-lg text-[#006D77]">{confirmedBookingRef}</span>
                </div>
                <div className="w-10 h-10 bg-white border border-stone-200 rounded-lg flex items-center justify-center text-stone-700">
                  <QrCode className="w-6 h-6" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">{t('scheduledDate', 'Scheduled Date')}</span>
                  <span className="font-semibold text-stone-800">{bookingDate}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">{t('timeSlot', 'Time Slot')}</span>
                  <span className="font-semibold text-stone-800">{selectedSlot.label}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">{t('partySize', 'Party Size')}</span>
                  <span className="font-semibold text-stone-800">{pairsCount} {t('pair', 'Pair')}(s) ({pairsCount * 2} {t('guests', 'Guests')})</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">{t('selectedTea', 'Selected Tea')}</span>
                  <span className="font-semibold text-stone-800">{t(teaSelection, teaSelection)}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-between items-center text-xs">
                <span className="text-stone-500">{t('totalRate', 'Total Rate')} ({guestType === 'overnight' ? t('overnightGuest', 'Overnight Guest') : t('dayPass', 'Day Pass')}):</span>
                <span className="font-bold text-stone-900 text-sm">{symbol}{convertedTotal.toLocaleString()} {currency}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={handleResetAndClose}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#006D77] hover:bg-[#00555d] text-white text-xs sm:text-sm font-bold rounded-xl transition cursor-pointer"
              >
                {t('backToResortWebsite', 'Back to Resort Website')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { RESORT_INFO } from '../data/resortData';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  MessageCircle, 
  WifiOff, 
  Calendar, 
  Navigation, 
  Check, 
  Sparkles,
  Send,
  Compass
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { 
    openBookingModal, 
    openOfflineModal, 
    toggleChat, 
    addNotification, 
    requestUserLocation, 
    distanceToResortKm,
    t 
  } = useResort();

  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquirySubject, setInquirySubject] = useState('Room Reservation & Availability');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryEmail || !inquiryMessage) return;

    setIsSent(true);
    addNotification(
      t('inquirySentTitle', 'Message Received!'),
      t('inquirySentDesc', 'Thank you! Our front desk concierge at Poblacion Beach will reply within 30 minutes.'),
      'alert'
    );
    setInquiryName('');
    setInquiryEmail('');
    setInquiryMessage('');
    setTimeout(() => setIsSent(false), 5000);
  };

  const emergencyContacts = [
    { name: t('alonFrontDesk', 'Alon Aninag Front Desk / Reception'), phone: '+63 917 582 2566', note: '24/7 Concierge' },
    { name: t('sipalayTourismOffice', 'Sipalay City Tourism Office'), phone: '+63 920 945 8821', note: 'Official Tourism Center' },
    { name: t('coastGuardSubstation', 'Philippine Coast Guard Sipalay'), phone: '+63 917 724 1982', note: 'Wharf Substation' },
    { name: t('touristPoliceStation', 'Sipalay Tourist Police Station'), phone: '+63 998 598 6231', note: 'Poblacion Station' },
    { name: t('sipalayHealthUnit', 'Sipalay Emergency Medical Unit'), phone: '+63 34 473 0021', note: 'City Health Office' }
  ];

  return (
    <section id="contact" className="py-16 sm:py-20 bg-[#FAF7F2] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-sm bg-teal-50 text-[#006D77] border border-teal-200/60 text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#006D77]" />
            {t('contactBadge', 'Warm Negrense Hospitality')}
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 tracking-tight mb-4 font-normal">
            {t('contactHeading', 'Connect with Our Resort Concierge')}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            {t('contactSubtitle', 'Whether planning your arrival, booking our signature Dayglow kayak experience, or inquiring about custom group buyout packages, our team on Poblacion Beach is here to assist.')}
          </p>
        </div>

        {/* 3 Main Direct Touchpoints Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Card 1: Front Desk & Reception */}
          <div className="bg-white p-7 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#006D77] flex items-center justify-center mb-5">
                <Phone className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#006D77] block mb-1">
                {t('directTelephone', 'Direct Telephone & WhatsApp')}
              </span>
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
                +63 917 582 2566
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed mb-4">
                {t('phoneDeskNote', 'Available 24 hours a day, 7 days a week. For immediate airport transfers, late arrivals, or room service requests.')}
              </p>
            </div>
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {t('frontDeskOpen', 'Front Desk 24/7 Active')}
              </span>
              <a
                href="tel:+639175822566"
                className="text-xs font-bold text-[#006D77] hover:underline"
              >
                {t('callNow', 'Call Now')} →
              </a>
            </div>
          </div>

          {/* Card 2: Reservations & Inquiries */}
          <div className="bg-white p-7 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#E29578]/15 text-[#C86D51] flex items-center justify-center mb-5">
                <Mail className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#C86D51] block mb-1">
                {t('reservationsEmail', 'Reservations & Email')}
              </span>
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-2 truncate">
                stay@alonaninag-sipalay.ph
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed mb-4">
                {t('emailDeskNote', 'Average response time: within 30 minutes during operating hours. Direct booking best rate guaranteed.')}
              </p>
            </div>
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <span className="text-[11px] text-stone-500 font-medium">
                {t('instantEvouchers', 'Instant E-Voucher Confirmation')}
              </span>
              <button
                onClick={() => openBookingModal()}
                className="text-xs font-bold text-[#006D77] hover:underline cursor-pointer"
              >
                {t('bookStay', 'Book Stay')} →
              </button>
            </div>
          </div>

          {/* Card 3: Location & Concierge Chat */}
          <div className="bg-white p-7 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-5">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 block mb-1">
                {t('beachfrontLocation', 'Beachfront Address')}
              </span>
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
                Poblacion Beach, Sipalay
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed mb-4">
                {t('addressDetails', 'Directly on the golden sands of Poblacion Beach (beside Jazz Inn), Sipalay City, Negros Occidental 6113.')}
              </p>
            </div>
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <button
                onClick={() => requestUserLocation()}
                className="text-xs font-bold text-[#006D77] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5" />
                {distanceToResortKm !== null 
                  ? `${distanceToResortKm} km away` 
                  : t('findDistance', 'Calculate Distance')}
              </button>
              <button
                onClick={toggleChat}
                className="text-xs font-bold text-amber-800 hover:underline cursor-pointer flex items-center gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                {t('liveChat', 'Live Chat')} →
              </button>
            </div>
          </div>

        </div>

        {/* 2-Column: Quick Contact Form & Important Travel Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Direct In-Page Concierge Message Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-stone-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle className="w-4 h-4 text-[#006D77]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#006D77]">
                {t('quickInquiry', 'Direct Concierge Inquiry')}
              </span>
            </div>
            <h3 className="font-serif text-2xl font-normal text-stone-900 mb-2">
              {t('sendUsAMessage', 'Send a Direct Message to Front Desk')}
            </h3>
            <p className="text-xs text-stone-600 mb-6">
              {t('inquiryNote', 'Fill in your details below and our guest experience manager will respond directly to your email or WhatsApp.')}
            </p>

            {isSent ? (
              <div className="p-6 bg-teal-50 border border-teal-200 rounded-2xl text-center text-[#006D77] animate-fadeIn">
                <Check className="w-8 h-8 mx-auto mb-2 text-[#006D77]" />
                <h4 className="font-serif text-lg font-bold">{t('messageSent', 'Message Dispatched Successfully!')}</h4>
                <p className="text-xs mt-1 text-teal-800">
                  {t('messageSentDesc', 'Our reception desk has logged your request. We look forward to welcoming you to Poblacion Beach!')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                      {t('yourName', 'Full Name')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      placeholder="e.g. Maria Santos"
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-[#006D77]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                      {t('emailAddress', 'Email Address')} *
                    </label>
                    <input
                      type="email"
                      required
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      placeholder="maria@example.com"
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-[#006D77]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    {t('subjectTopic', 'Inquiry Topic')}
                  </label>
                  <select
                    value={inquirySubject}
                    onChange={(e) => setInquirySubject(e.target.value)}
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-[#006D77]"
                  >
                    <option value="Room Reservation & Availability">Room Reservation & Availability</option>
                    <option value="Aninag Dayglow & Clear Kayak Experience">Aninag Dayglow & Clear Kayak Experience</option>
                    <option value="Sunset Bonfire & Table Reservation">Sunset Bonfire & Table Reservation</option>
                    <option value="Tinagong Dagat Island Hopping Tour">Tinagong Dagat Island Hopping Tour</option>
                    <option value="Airport Van Transfer Request">Airport Van Transfer Request (Bacolod / Dumaguete)</option>
                    <option value="Resort Buyout / Special Occasion">Resort Buyout (12 Rooms) / Wedding / Event</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    {t('message', 'Message or Special Requests')} *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    placeholder="Tell us your desired dates, number of guests, or any questions about Sipalay..."
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-[#006D77]"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <span className="text-[11px] text-stone-500">
                    🔒 {t('securePrivacy', 'Your contact info is strictly confidential.')}
                  </span>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 bg-[#006D77] hover:bg-[#00555d] text-white font-bold text-xs uppercase tracking-widest rounded-sm transition shadow-sm cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{t('sendMessage', 'Send Message')}</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Practical Resort Information & Emergency Numbers */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Resort Policies & Operational Times */}
            <div className="bg-white p-7 rounded-3xl border border-stone-200 shadow-xs">
              <h4 className="font-serif text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#006D77]" />
                <span>{t('resortTimings', 'Check-In & Operation Timings')}</span>
              </h4>
              <div className="space-y-3 text-xs text-stone-600">
                <div className="flex justify-between py-1.5 border-b border-stone-100">
                  <span className="font-medium text-stone-800">{t('standardCheckIn', 'Check-In Time')}</span>
                  <span className="font-bold text-[#006D77]">2:00 PM</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-stone-100">
                  <span className="font-medium text-stone-800">{t('standardCheckOut', 'Check-Out Time')}</span>
                  <span className="font-bold text-[#006D77]">12:00 PM (Noon)</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-stone-100">
                  <span className="font-medium text-stone-800">{t('diningHours', 'Dining Pavilion Hours')}</span>
                  <span className="font-semibold text-stone-700">6:30 AM – 10:00 PM Daily</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-stone-100">
                  <span className="font-medium text-stone-800">{t('bonfireHours', 'Nightly Bonfire & Acoustics')}</span>
                  <span className="font-semibold text-amber-700">5:30 PM – 8:30 PM</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="font-medium text-stone-800">{t('quietHours', 'Quiet Sanctuary Hours')}</span>
                  <span className="font-semibold text-stone-500">10:00 PM – 6:00 AM</span>
                </div>
              </div>

              {/* Accreditation Badge */}
              <div className="mt-5 p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-teal-100 text-[#006D77] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-[11px]">
                  <p className="font-bold text-stone-900">{t('dotAccreditedFull', 'DOT Accredited Boutique Resort')}</p>
                  <p className="text-stone-500">Reg: DOT-R6-RES-2024-089 • Sipalay, Negros Occidental</p>
                </div>
              </div>
            </div>

            {/* Emergency & Municipal Contacts Box */}
            <div className="bg-white p-7 rounded-3xl border border-stone-200 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#E29578]" />
                  <span>{t('sipalayHotlines', 'Sipalay Emergency Hotlines')}</span>
                </h4>
                <button
                  onClick={openOfflineModal}
                  className="text-[11px] font-bold text-[#006D77] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <WifiOff className="w-3 h-3" />
                  <span>{t('offlineBundle', 'Offline Bundle')}</span>
                </button>
              </div>

              <div className="space-y-2.5">
                {emergencyContacts.map((contact, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-stone-900">{contact.name}</p>
                      <span className="text-[10px] text-stone-500">{contact.note}</span>
                    </div>
                    <a
                      href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                      className="font-mono text-xs font-bold text-[#006D77] hover:underline shrink-0"
                    >
                      {contact.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

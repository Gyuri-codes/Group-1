import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { MENU_ITEMS, RESORT_IMAGES } from '../data/resortData';
import { MenuItem } from '../types';
import { 
  Utensils, 
  Wine, 
  Coffee, 
  Flame, 
  Sparkles, 
  Clock, 
  Check, 
  Calendar,
  X,
  PhoneCall
} from 'lucide-react';

export const DiningSection: React.FC = () => {
  const { formatPrice, addNotification, t } = useResort();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isTableModalOpen, setIsTableModalOpen] = useState<boolean>(false);
  const [tableDate, setTableDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [tableTime, setTableTime] = useState<string>('5:30 PM (Golden Hour Sunset)');
  const [tableGuests, setTableGuests] = useState<number>(2);
  const [tableNotes, setTableNotes] = useState<string>('Sunset deck outdoor table facing Poblacion ocean');
  const [isTableBooked, setIsTableBooked] = useState<boolean>(false);

  const categories = [
    { id: 'all', label: t('allMenu', 'All Menu & Bar'), count: 40, sub: 'All 4 Categories' },
    { id: 'Breakfast', label: t('breakfastTab', 'Breakfast / Silog'), count: 10, sub: '₱100 – ₱200' },
    { id: 'Lunch', label: t('lunchTab', 'Lunch / Specials'), count: 10, sub: '₱250 – ₱500' },
    { id: 'Dinner', label: t('dinnerTab', 'Dinner / Inasal & Grill'), count: 10, sub: '₱300 – ₱600' },
    { id: 'Bar & Cocktails', label: t('barTab', 'Sunset Cocktails & Bar'), count: 10, sub: 'Signature Cocktails' }
  ];

  const categoryOrder = ['Breakfast', 'Lunch', 'Dinner', 'Bar & Cocktails'] as const;

  const categoryMeta: Record<string, { title: string; subtitle: string; priceGuide: string; icon: string }> = {
    'Breakfast': {
      title: t('breakfastTitle', 'BREAKFAST — Silog & Filipino Breakfast'),
      subtitle: t('breakfastDesc', 'Hearty morning staples served with fragrant garlic sinangag mountain rice and farm eggs.'),
      priceGuide: '₱100 – ₱200',
      icon: '🍳'
    },
    'Lunch': {
      title: t('lunchTitle', 'LUNCH — Resort Specials'),
      subtitle: t('lunchDesc', 'Filipino comforting classics and Western-inspired coastal plates for sunlit beachfront lunches.'),
      priceGuide: '₱250 – ₱500',
      icon: '🍲'
    },
    'Dinner': {
      title: t('dinnerTitle', 'DINNER — Grill, Inasal & Dinner Specials'),
      subtitle: t('dinnerDesc', 'Charcoal-fired Bacolod inasal, local fisherman catches, juicy steaks, and grand sharing platters.'),
      priceGuide: '₱300 – ₱600 (Platter ₱2,150)',
      icon: '🔥'
    },
    'Bar & Cocktails': {
      title: t('barTitle', 'SUNSET COCKTAILS & BAR'),
      subtitle: t('barDesc', 'Artisanal tropical libations crafted with Don Papa rum, native calamansi, and fresh fruit nectars.'),
      priceGuide: 'Bar Pricing',
      icon: '🍹'
    }
  };

  const filteredMenu = MENU_ITEMS.filter(
    item => activeCategory === 'all' || item.category === activeCategory
  );

  const handleBookTable = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTableBooked(true);
    addNotification(
      t('tableReservedTitle', '🍽️ Sunset Table Reserved'),
      `${t('tableReservedFor', 'Table reserved for')} ${tableGuests} ${t('guests', 'guests')} ${t('on', 'on')} ${tableDate} ${t('atTime', 'at')} ${tableTime} ${t('atSunsetDeck', 'at Alon Sunset Deck!')}`,
      'booking'
    );
    setTimeout(() => {
      setIsTableBooked(false);
      setIsTableModalOpen(false);
    }, 2000);
  };

  return (
    <section id="dining" className="py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-sm bg-teal-50 text-[#006D77] border border-teal-200/60 text-xs font-bold uppercase tracking-widest mb-3">
            <Utensils className="w-3.5 h-3.5 text-[#006D77]" />
            {t('diningSubtitle', 'Flavors of Southern Negros')}
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 tracking-tight mb-4 font-normal">
            {t('diningTitle', 'Beachfront Dining & Sunset Cocktails')}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            {t('diningDescription', 'Fresh morning catch from Poblacion fishermen, legendary Bacolod chicken inasal seared over charcoal, native batwan souring fruit, and handcrafted Don Papa rum cocktails as the golden sun dips into the ocean.')}
          </p>
        </div>

        {/* Feature Spotlight Card */}
        <div className="mb-12 bg-[#F8F5F2] rounded-lg overflow-hidden border border-stone-200 grid grid-cols-1 lg:grid-cols-12 shadow-sm">
          <div className="lg:col-span-6 relative aspect-16/10 lg:aspect-auto">
            <img
              src={RESORT_IMAGES.dining}
              alt="Negrense Feast at Alon Aninag"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1 rounded-sm font-medium uppercase tracking-wider">
              {t('dailyCatchInasal', 'Daily Catch & Authentic Inasal')}
            </div>
          </div>
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#006D77] font-bold uppercase tracking-widest mb-2">
                <Flame className="w-4 h-4 text-[#E29578]" />
                <span>{t('culinaryPhilosophy', 'The Alon Culinary Philosophy')}</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mb-3">
                {t('culinaryTitle', 'Local, Soulful & Fresh from the Sea')}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                {t('culinaryDesc', 'We believe food should nourish both the body and the soul. Our kitchen partners directly with local Poblacion fishermen and organic Negros farms. Enjoy dining with your feet in the sand or on our panoramic sunset deck.')}
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs text-stone-800 mb-6">
                <div className="bg-white p-3 rounded-sm border border-stone-200">
                  <p className="font-bold text-stone-900">🌅 {t('sunsetDeckHours', 'Sunset Deck Hours')}</p>
                  <p className="text-stone-500">6:30 AM – 10:00 PM</p>
                </div>
                <div className="bg-white p-3 rounded-sm border border-stone-200">
                  <p className="font-bold text-stone-900">🛎️ {t('roomService', 'Room Service')}</p>
                  <p className="text-stone-500">{t('allRooms247', 'All 12 rooms 24/7')}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsTableModalOpen(true)}
                className="px-6 py-3 rounded-sm bg-[#006D77] hover:bg-[#00555d] text-white text-xs font-bold uppercase tracking-wider transition shadow-sm cursor-pointer flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#83C5BE]" />
                <span>{t('reserveSunsetTable', 'Reserve Sunset Deck Table')}</span>
              </button>
              <span className="text-xs text-stone-500">{t('orDialExt', 'or dial ext. 101 from your room')}</span>
            </div>
          </div>
        </div>

        {/* Menu Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 rounded-sm text-xs sm:text-sm font-semibold tracking-wider transition cursor-pointer flex items-center gap-2 ${
                activeCategory === cat.id
                  ? 'bg-[#006D77] text-white shadow-sm'
                  : 'bg-[#F8F5F2] border border-stone-300 text-stone-700 hover:bg-stone-100'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[11px] px-1.5 py-0.5 rounded-full ${
                activeCategory === cat.id ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-700'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Organized Menu Categories */}
        <div className="space-y-16">
          {categoryOrder
            .filter(catKey => activeCategory === 'all' || activeCategory === catKey)
            .map((catKey) => {
              const meta = categoryMeta[catKey];
              const items = MENU_ITEMS.filter(i => i.category === catKey);

              return (
                <div key={catKey} className="space-y-6">
                  {/* Category Header Banner */}
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 border-b-2 border-[#006D77]/20 gap-3">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#006D77] mb-1">
                        <span className="text-base">{meta.icon}</span>
                        <span>{meta.priceGuide}</span>
                      </div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                        {meta.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
                        {meta.subtitle}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <span className="text-xs font-medium bg-stone-100 text-stone-600 px-3 py-1 rounded-full border border-stone-200">
                        {items.length} {t('curatedDishes', 'Curated Dishes')}
                      </span>
                    </div>
                  </div>

                  {/* Category Items Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-lg p-5 border border-stone-200 hover:border-[#006D77]/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between shadow-xs group"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-[#006D77] bg-teal-50 px-2 py-0.5 rounded-sm border border-teal-100">
                              {t(item.category, item.category)}
                            </span>
                            <span className="font-serif text-lg font-bold text-stone-900 group-hover:text-[#006D77] transition-colors">
                              {formatPrice(item.pricePHP)}
                            </span>
                          </div>

                          <h4 className="font-serif text-lg font-bold text-stone-900 mb-1">
                            {t(item.name, item.name)}
                          </h4>
                          {item.localName && (
                            <p className="text-xs text-stone-500 italic font-serif mb-2">
                              {item.localName}
                            </p>
                          )}

                          <p className="text-xs text-stone-600 leading-relaxed mb-4">
                            {t(item.description, item.description)}
                          </p>
                        </div>

                        {/* Tags & Action */}
                        <div className="pt-3 border-t border-stone-100 flex flex-wrap gap-2 items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {item.tags.map((tag, idx) => (
                              <span key={idx} className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded-sm border border-stone-200 font-medium">
                                {t(tag, tag)}
                              </span>
                            ))}
                          </div>
                          <button
                            onClick={() => addNotification(t('orderAdded', 'Order Added'), `${t(item.name, item.name)} added. Our kitchen team will confirm with your room shortly.`, 'alert')}
                            className="text-xs font-bold text-[#006D77] hover:text-[#00555d] uppercase tracking-wider transition cursor-pointer flex items-center gap-1"
                          >
                            <span>+ {t('orderItem', 'Order')}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Table Reservation Modal */}
      {isTableModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-lg max-w-md w-full p-6 sm:p-7 border border-stone-200 shadow-2xl relative">
            <button
              onClick={() => setIsTableModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-sm bg-[#006D77] text-white flex items-center justify-center font-bold">
                🍽️
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900">{t('sunsetTableReservation', 'Sunset Deck Reservation')}</h3>
                <p className="text-xs text-stone-500">Alon Aninag • Poblacion Beach Frontage</p>
              </div>
            </div>

            {isTableBooked ? (
              <div className="p-6 bg-teal-50 rounded-lg text-center border border-teal-200">
                <div className="w-10 h-10 rounded-full bg-[#006D77] text-white flex items-center justify-center mx-auto mb-2">
                  <Check className="w-6 h-6" />
                </div>
                <p className="font-bold text-sm text-stone-900">{t('tableReservedSuccess', 'Table Reserved Successfully!')}</p>
                <p className="text-xs text-teal-800 mt-1">{t('staffTablePrepared', 'Our staff will have your sunset table prepared.')}</p>
              </div>
            ) : (
              <form onSubmit={handleBookTable} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-stone-700 mb-1 uppercase tracking-wider text-[10px]">{t('reservationDate', 'Reservation Date')}</label>
                  <input
                    type="date"
                    value={tableDate}
                    onChange={(e) => setTableDate(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-sm font-semibold text-stone-900"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1 uppercase tracking-wider text-[10px]">{t('preferredTime', 'Preferred Time')}</label>
                  <select
                    value={tableTime}
                    onChange={(e) => setTableTime(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-sm font-semibold text-stone-900 cursor-pointer"
                  >
                    <option value="7:30 AM - 9:30 AM">7:30 AM - 9:30 AM ({t('morningBreakfast', 'Morning Ocean Breakfast')})</option>
                    <option value="12:00 PM - 2:00 PM">12:00 PM - 2:00 PM ({t('lunchSpecial', 'Lunch Special')})</option>
                    <option value="5:30 PM (Golden Hour Sunset)">5:30 PM ({t('goldenHourBonfire', 'Golden Hour Sunset & Bonfire')})</option>
                    <option value="7:00 PM - 9:00 PM">7:00 PM - 9:00 PM ({t('candlelitDinner', 'Candlelit Night Dinner')})</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1 uppercase tracking-wider text-[10px]">{t('numberOfGuests', 'Number of Guests')}</label>
                  <select
                    value={tableGuests}
                    onChange={(e) => setTableGuests(Number(e.target.value))}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-sm font-semibold text-stone-900 cursor-pointer"
                  >
                    <option value={2}>2 {t('guests', 'Guests')} ({t('coupleSetup', 'Couple setup')})</option>
                    <option value={4}>4 {t('guests', 'Guests')} ({t('barkadaTable', 'Barkada table')})</option>
                    <option value={6}>6 {t('guests', 'Guests')} ({t('familyFeast', 'Family feast')})</option>
                    <option value={8}>8+ {t('guests', 'Guests')} ({t('groupEvent', 'Group event')})</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1 uppercase tracking-wider text-[10px]">{t('specialPreferences', 'Special Table Preferences')}</label>
                  <input
                    type="text"
                    value={tableNotes}
                    onChange={(e) => setTableNotes(e.target.value)}
                    placeholder="e.g. Near bonfire pit, candlelit anniversary, high chair needed"
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-sm text-stone-900"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-sm bg-[#006D77] hover:bg-[#00555d] text-white font-bold text-xs uppercase tracking-widest shadow-md transition cursor-pointer mt-2"
                >
                  {t('confirmTableReservation', 'Confirm Table Reservation')}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

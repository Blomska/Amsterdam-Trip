import React, { useState, useEffect } from 'react';
import { 
  CloudRain, 
  Sun, 
  Wind, 
  MapPin, 
  Clock, 
  Utensils, 
  Train, 
  Home, 
  CheckSquare, 
  Square,
  Coffee,
  Ship,
  Camera,
  Info,
  Calendar,
  Compass,
  Umbrella,
  ChevronRight
} from 'lucide-react';

// --- DATEN ---

const itineraryData = [
  {
    day: "Freitag, 18.09.",
    title: "Ankunft & Amsterdam Noord",
    dateColor: "text-amber-600",
    bgColor: "bg-amber-50",
    events: [
      { time: "12:30", type: "transport", icon: <Train size={18}/>, title: "Ankunft Amsterdam Centraal", desc: "Ankunft mit dem Zug. Erste Eindrücke am prächtigen Bahnhof sammeln." },
      { time: "12:45", type: "transport", icon: <Ship size={18}/>, title: "Kostenlose Fähre (Buiksloterweg)", desc: "Geht auf die Rückseite des Bahnhofs und nehmt die F3-Fähre. Sie ist kostenlos und fährt alle paar Minuten." },
      { time: "13:00", type: "accommodation", icon: <Home size={18}/>, title: "AirBnB Check-In", desc: "Tolhuisweg! Perfekte Lage in Noord. Koffer abstellen und kurz frisch machen." },
      { time: "14:00", type: "food", icon: <Utensils size={18}/>, title: "Lunch: Café de Ceuvel", desc: "Super cooles, alternatives Café am Wasser in Noord. Entspannte Atmosphäre, alte Hausboote und faire Preise." },
      { time: "16:00", type: "activity", icon: <Ship size={18}/>, title: "Grachtenfahrt mal anders", desc: "Zurück in die City: Mietet euch ein kleines, elektrisches Boot (z.B. Mokumboot) – viel privater als die großen Touri-Dampfer!" },
      { time: "19:30", type: "food", icon: <Utensils size={18}/>, title: "Dinner: Foodhallen (Oud-West)", desc: "Ein alter Tram-Depot voller Streetfood-Stände. Für 30€ p.P. bekommt ihr hier locker tolles Essen und Drinks! Tolle Atmosphäre." },
      { time: "22:00", type: "activity", icon: <Coffee size={18}/>, title: "Drinks im Bruin Café", desc: "Absacker in einer typischen Kneipe (z.B. Café Chris im Jordaan-Viertel), bevor es mit der Nachtfähre zurück ins AirBnB geht." }
    ]
  },
  {
    day: "Samstag, 19.09.",
    title: "Coole Viertel & Industrie-Charme",
    dateColor: "text-orange-600",
    bgColor: "bg-orange-50",
    events: [
      { time: "10:00", type: "food", icon: <Coffee size={18}/>, title: "Frühstück: THT (Tolhuistuin)", desc: "Direkt bei euch um die Ecke! Tolles Café mit Blick aufs Wasser und entspanntem Vibe." },
      { time: "11:30", type: "activity", icon: <Camera size={18}/>, title: "De Negen Straatjes (Die 9 Straßen)", desc: "Mit der Fähre in die City: Bummeln durch die schönsten kleinen Grachtenstraßen voller Boutiquen und Vintage-Shops." },
      { time: "14:00", type: "food", icon: <Utensils size={18}/>, title: "Lunch: Fabel Friet & Snack", desc: "Holt euch die legendären Pommes bei Fabel Friet (günstig & extrem lecker) auf die Hand und esst sie an der Gracht." },
      { time: "15:30", type: "activity", icon: <MapPin size={18}/>, title: "NDSM-Werf erkunden", desc: "Nehmt die Fähre zur NDSM-Werf in Noord. Riesige Streetart, alte Industriehallen und ein unfassbar cooler Vibe." },
      { time: "19:00", type: "food", icon: <Utensils size={18}/>, title: "Dinner: Skatecafe (Noord)", desc: "Ein Restaurant in einer alten Lagerhalle mit einer echten Halfpipe in der Mitte! Fantastische Atmosphäre und man bleibt locker unter 30€." }
    ]
  },
  {
    day: "Sonntag, 20.09.",
    title: "Frischer Start & Heimreise",
    dateColor: "text-rose-600",
    bgColor: "bg-rose-50",
    events: [
      { time: "09:00", type: "food", icon: <Coffee size={18}/>, title: "Frühstück: Pancakes Amsterdam", desc: "Nahe des Bahnhofs (Aan 't IJ). Leckere holländische Pfannkuchen mit tollem Ausblick auf das Wasser." },
      { time: "10:30", type: "accommodation", icon: <Home size={18}/>, title: "Check-Out & Gepäck", desc: "AirBnB Check-Out am Tolhuisweg und mit der Fähre rüber zum Bahnhof." },
      { time: "11:00", type: "activity", icon: <Camera size={18}/>, title: "Letzte Souvenirs & Käse", desc: "Spaziergang am Wasser. Tipp für authentischen Käse: 'De Kaaskamer' (echtes Fachgeschäft, keine Kette)." },
      { time: "12:30", type: "transport", icon: <Train size={18}/>, title: "Rückfahrt", desc: "Der Zug fährt ab Amsterdam Centraal. Gute Heimreise!" }
    ]
  }
];

const initialPackingList = [
  { id: '1', category: 'Dokumente & Finanzen', items: [{ text: 'Personalausweis', checked: false }, { text: 'Zugtickets (Handy/Ausdruck)', checked: false }, { text: 'AirBnB Adresse & Code (Tolhuisweg)', checked: false }, { text: 'Bankkarte / Kreditkarte (Wichtig!)', checked: false }] },
  { id: '2', category: 'Kleidung (Zwiebellook)', items: [{ text: 'Regenjacke / Windbreaker', checked: false }, { text: 'Bequeme Sneaker (für viele Kilometer)', checked: false }, { text: 'Jeans / Hosen', checked: false }, { text: 'Pullover / Cardigan', checked: false }, { text: 'T-Shirts / Tops', checked: false }, { text: 'Unterwäsche & Socken', checked: false }] },
  { id: '3', category: 'Hygiene & Gesundheit', items: [{ text: 'Kulturbeutel (Zahnbürste etc.)', checked: false }, { text: 'Deo & Duschgel', checked: false }, { text: 'Pflaster (für Blasen)', checked: false }, { text: 'Kopfschmerztabletten', checked: false }] },
  { id: '4', category: 'Technik & Sonstiges', items: [{ text: 'Smartphone & Ladekabel', checked: false }, { text: 'Powerbank (sehr wichtig!)', checked: false }, { text: 'Kleine Umhängetasche / Daypack', checked: false }, { text: 'Kartenspiel für abends', checked: false }] }
];

// --- KOMPONENTEN ---

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [packingList, setPackingList] = useState(initialPackingList);

  useEffect(() => {
    const savedList = localStorage.getItem('amsterdamPackingList_v2');
    if (savedList) setPackingList(JSON.parse(savedList));
  }, []);

  useEffect(() => {
    localStorage.setItem('amsterdamPackingList_v2', JSON.stringify(packingList));
  }, [packingList]);

  const toggleItem = (categoryId, itemIndex) => {
    const newList = [...packingList];
    const categoryIndex = newList.findIndex(c => c.id === categoryId);
    newList[categoryIndex].items[itemIndex].checked = !newList[categoryIndex].items[itemIndex].checked;
    setPackingList(newList);
  };

  const calculateProgress = () => {
    let total = 0, checked = 0;
    packingList.forEach(c => c.items.forEach(i => { total++; if (i.checked) checked++; }));
    return total === 0 ? 0 : Math.round((checked / total) * 100);
  };

  const getEventStyle = (type) => {
    switch(type) {
      case 'food': return 'bg-rose-100 text-rose-600 border-rose-200';
      case 'activity': return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'transport': return 'bg-emerald-100 text-emerald-600 border-emerald-200';
      case 'accommodation': return 'bg-amber-100 text-amber-600 border-amber-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans text-slate-800 pb-12">
      
      {/* Header mit sanftem Verlauf */}
      <header className="bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 pt-8 pb-4">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-1">Amsterdam Trip 🚲</h1>
              <p className="text-orange-100 font-medium flex items-center gap-2 opacity-90 text-sm md:text-base">
                Martina, Jürgen, Sabina & Aule <span className="hidden md:inline mx-1">|</span> <span className="block md:inline">18.09. – 20.09.2026</span>
              </p>
            </div>
            <div className="hidden md:flex bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl text-sm font-semibold">
              48h Explorer
            </div>
          </div>
        </div>
        
        {/* Navigation - Modern Tabs */}
        <div className="max-w-4xl mx-auto px-4 flex gap-2 overflow-x-auto pb-4 no-scrollbar">
          {[
            { id: 'home', icon: <Compass size={18}/>, label: 'Startseite' },
            { id: 'itinerary', icon: <Calendar size={18}/>, label: 'Tages-Etappen' },
            { id: 'packing', icon: <CheckSquare size={18}/>, label: 'Packliste' }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-200 whitespace-nowrap
                ${activeTab === tab.id 
                  ? 'bg-white text-orange-600 shadow-sm' 
                  : 'bg-white/10 text-orange-50 hover:bg-white/20'}`}
            >
              {tab.icon}
              {tab.label}
              {tab.id === 'packing' && calculateProgress() === 100 && (
                <span className="w-2 h-2 rounded-full bg-green-400 ml-1"></span>
              )}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 mt-8">
        
        {/* ================= TAB 1: STARTSEITE ================= */}
        {activeTab === 'home' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Welcome / Basecamp Card */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -z-10 opacity-50"></div>
              <h2 className="text-2xl font-bold mb-3 text-slate-800">Welkom in Amsterdam! 🌷</h2>
              <p className="text-slate-600 leading-relaxed text-lg mb-6">
                Euer 48-Stunden-Trip steht an. Der Fokus: Authentische Atmosphäre, coole Viertel und leckeres Essen (Budget ~30€ p.P.).
              </p>
              
              <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 flex gap-4 items-start">
                <div className="bg-orange-100 p-3 rounded-full text-orange-600 shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-orange-900">Euer Basecamp: Tolhuisweg</h3>
                  <p className="text-orange-800/80 text-sm mt-1 leading-relaxed">
                    Ihr habt die absolute Top-Lage! Ihr seid mitten im coolen Industrie-Viertel <strong>Noord</strong> (Skatecafe, NDSM-Werf), kommt aber mit der kostenlosen, 24/7 fahrenden Fähre in nur 3 Minuten direkt zum Hauptbahnhof ins Zentrum.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Modern Weather Widget */}
              <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-3xl p-6 shadow-sm border border-sky-100">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-bold text-sky-900 text-lg">Reisewetter</h3>
                    <p className="text-sky-700/70 text-sm">Prognose für Mitte September</p>
                  </div>
                  <div className="bg-white p-2 rounded-xl shadow-sm text-sky-500">
                    <CloudRain size={24} />
                  </div>
                </div>
                
                <div className="flex items-end gap-3 mb-6">
                  <span className="text-5xl font-black text-sky-900 tracking-tighter">16°</span>
                  <span className="text-sky-700 font-medium mb-1.5">Ø Tagestemperatur</span>
                </div>
                
                <div className="space-y-3 bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm font-medium text-sky-900"><Sun size={16} className="text-amber-500"/> Sonne & Wolken</span>
                    <span className="text-sm text-sky-700">Oft im Mix</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm font-medium text-sky-900"><Wind size={16} className="text-slate-400"/> Frische Brise</span>
                    <span className="text-sm text-sky-700">Küstennähe</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm font-medium text-sky-900"><Umbrella size={16} className="text-blue-400"/> Schauer</span>
                    <span className="text-sm text-sky-700">Kurz möglich</span>
                  </div>
                </div>
              </div>

              {/* Quick Facts Grid */}
              <div className="grid grid-rows-3 gap-4">
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                  <div className="bg-rose-50 text-rose-500 p-3 rounded-xl"><Info size={20}/></div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Pin Only (Wichtig!)</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Bargeld wird in Cafés oft nicht akzeptiert. Bankkarte mitnehmen.</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                  <div className="bg-emerald-50 text-emerald-500 p-3 rounded-xl"><Clock size={20}/></div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Fahrrad-Regeln</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Rote Wege gehören den Radlern. Vor dem Überqueren gut schauen!</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                  <div className="bg-indigo-50 text-indigo-500 p-3 rounded-xl"><Train size={20}/></div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">ÖPNV Check-In</h4>
                    <p className="text-xs text-slate-500 mt-0.5">In der Tram einfach mit der Kreditkarte am Lesegerät ein/auschecken.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ================= TAB 2: TAGES-ETAPPEN (TIMELINE VIEW) ================= */}
        {activeTab === 'itinerary' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {itineraryData.map((day, dayIndex) => (
              <div key={dayIndex} className="relative">
                
                {/* Day Header */}
                <div className="sticky top-20 z-40 bg-[#f8f9fa]/90 backdrop-blur-md py-3 mb-6">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${day.bgColor} ${day.dateColor} font-bold text-sm border border-current/10`}>
                    <Calendar size={16} />
                    {day.day} — {day.title}
                  </div>
                </div>

                {/* Timeline Container */}
                <div className="ml-4 md:ml-8 border-l-2 border-slate-200 relative pb-4">
                  {day.events.map((event, eventIndex) => (
                    <div key={eventIndex} className="mb-8 relative pl-8 md:pl-10 group">
                      
                      {/* Timeline Dot/Icon */}
                      <div className={`absolute -left-[17px] top-1 w-8 h-8 rounded-full border-4 border-[#f8f9fa] flex items-center justify-center ${getEventStyle(event.type)} shadow-sm transition-transform group-hover:scale-110`}>
                        {event.icon}
                      </div>

                      {/* Event Card */}
                      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                          <h4 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                            {event.title}
                          </h4>
                          <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg text-xs font-bold w-fit">
                            <Clock size={12} /> {event.time} Uhr
                          </span>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          {event.desc}
                        </p>
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================= TAB 3: PACKLISTE ================= */}
        {activeTab === 'packing' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto">
            
            {/* Fancy Progress Bar */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 mb-8 text-center">
              <h2 className="text-xl font-bold text-slate-800 mb-2">Euer Pack-Fortschritt</h2>
              <p className="text-sm text-slate-500 mb-6">Nichts vergessen für den Kurztrip?</p>
              
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-3 uppercase rounded-full text-orange-600 bg-orange-100">
                      Status
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-black inline-block text-orange-600">
                      {calculateProgress()}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-orange-100">
                  <div 
                    style={{ width: `${calculateProgress()}%` }} 
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500 transition-all duration-700 ease-out"
                  ></div>
                </div>
              </div>
            </div>

            {/* Packing Categories */}
            <div className="space-y-6">
              {packingList.map((category) => (
                <div key={category.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                  <div className="bg-slate-50/80 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="font-bold text-slate-800">{category.category}</h3>
                    <span className="text-xs font-medium text-slate-400 bg-white px-2 py-1 rounded-md border border-slate-200">
                      {category.items.filter(i => i.checked).length} / {category.items.length}
                    </span>
                  </div>
                  <div className="p-2">
                    {category.items.map((item, itemIndex) => (
                      <button
                        key={itemIndex}
                        onClick={() => toggleItem(category.id, itemIndex)}
                        className="w-full flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors focus:outline-none group"
                      >
                        <div className={`shrink-0 flex items-center justify-center w-6 h-6 rounded-md border transition-colors
                          ${item.checked ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 bg-white group-hover:border-orange-400'}`}>
                          {item.checked && <CheckSquare size={16} className="fill-current stroke-emerald-500" />}
                        </div>
                        <span className={`text-left text-sm transition-all ${item.checked ? 'text-slate-400 line-through' : 'text-slate-700 font-medium'}`}>
                          {item.text}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        )}

      </main>
    </div>
  );
}

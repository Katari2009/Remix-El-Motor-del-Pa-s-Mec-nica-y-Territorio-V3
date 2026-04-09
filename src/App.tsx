/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GoogleGenAI, 
  GenerateContentResponse 
} from "@google/genai";
import { 
  Settings2, 
  Truck, 
  UserCheck, 
  PenTool, 
  ChevronRight, 
  Trophy, 
  CheckCircle2, 
  Lock, 
  Menu, 
  X,
  Volume2,
  VolumeX,
  LayoutDashboard,
  BookOpen,
  Award,
  Info,
  ArrowLeft,
  Sun,
  Moon,
  Search,
  Users,
  Wrench,
  MessageSquareQuote,
  Sparkles,
  FileText,
  ExternalLink,
  GraduationCap,
  Rocket,
  Target,
  Zap
} from 'lucide-react';
import { LEVELS, RANKS, BADGES, MANUALS } from './constants';
import { LevelId, UserProgress, Activity, Level, Badge, Manual } from './types';

// Gemini AI Helper
const getGeminiFeedback = async (context: string, userResponse: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Eres un experto Asesor Pedagógico en Mecánica Industrial y Ciudadanía en Chile. 
      Contexto de la actividad: ${context}
      Respuesta del estudiante: ${userResponse}
      
      Tu tarea es dar una retroalimentación breve (máximo 2 párrafos), constructiva y que fomente el pensamiento crítico. 
      Usa un tono profesional pero motivador. 
      Haz una pregunta desafiante al final para que el estudiante reflexione sobre el impacto territorial o social de su respuesta técnica.
      No des la respuesta correcta, sino que guía al estudiante a profundizar.`,
    });
    return response.text;
  } catch (error) {
    console.error("Error getting Gemini feedback:", error);
    return "Tu análisis técnico ha sido registrado. Considera cómo la ubicación geográfica de tu taller influye en la rapidez de respuesta ante emergencias industriales.";
  }
};

// Components
const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex flex-col leading-none ${className}`}>
    {/* Texto Principal */}
    <span className="font-display font-black text-lg tracking-tighter text-white italic">
      PACE-UDA
    </span>
    {/* Subtítulo Regional */}
    <span className="text-[8px] font-black tracking-[0.2em] text-blue-400 uppercase">
      ATACAMA
    </span>
  </div>
);

const DynamicBackground = ({ view, theme }: { view: string, theme: 'dark' | 'light' }) => {
  const isDark = theme === 'dark';
  const color = isDark ? '#f97316' : '#ea580c'; // Tailwind orange-500 / 600
  const baseClass = isDark ? 'bg-slate-950' : 'bg-slate-50';
  
  return (
    <div className={`fixed inset-0 overflow-hidden pointer-events-none z-0 ${baseClass}`}>
      {/* Animated Base Gradient */}
      <motion.div
        animate={{
          background: isDark 
            ? [
                `radial-gradient(circle at 0% 0%, rgba(249, 115, 22, 0.15) 0%, transparent 50%)`,
                `radial-gradient(circle at 100% 100%, rgba(249, 115, 22, 0.15) 0%, transparent 50%)`,
                `radial-gradient(circle at 0% 100%, rgba(249, 115, 22, 0.15) 0%, transparent 50%)`,
                `radial-gradient(circle at 0% 0%, rgba(249, 115, 22, 0.15) 0%, transparent 50%)`,
              ]
            : [
                `radial-gradient(circle at 0% 0%, rgba(234, 88, 12, 0.1) 0%, transparent 50%)`,
                `radial-gradient(circle at 100% 100%, rgba(234, 88, 12, 0.1) 0%, transparent 50%)`,
                `radial-gradient(circle at 0% 100%, rgba(234, 88, 12, 0.1) 0%, transparent 50%)`,
                `radial-gradient(circle at 0% 0%, rgba(234, 88, 12, 0.1) 0%, transparent 50%)`,
              ]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      />

      <AnimatePresence mode="wait">
        {view === 'dashboard' && (
          <motion.div key="bg-dash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} className="absolute -top-64 -left-64 opacity-20">
              <Settings2 size={800} color={color} />
            </motion.div>
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 80, repeat: Infinity, ease: "linear" }} className="absolute -bottom-64 -right-64 opacity-20">
              <Settings2 size={1000} color={color} />
            </motion.div>
          </motion.div>
        )}
        {view === 'levels' && (
          <motion.div key="bg-levels" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
            <motion.div 
              animate={{ backgroundPosition: ['0px 0px', '100px 100px'] }} 
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 opacity-20"
              style={{ backgroundImage: `linear-gradient(${color} 2px, transparent 2px), linear-gradient(90deg, ${color} 2px, transparent 2px)`, backgroundSize: '50px 50px' }}
            />
          </motion.div>
        )}
        {view === 'manuals' && (
          <motion.div key="bg-manuals" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
             <motion.div 
              animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0"
              style={{ backgroundImage: `radial-gradient(${color} 3px, transparent 3px)`, backgroundSize: '30px 30px' }}
            />
          </motion.div>
        )}
        {view === 'achievements' && (
          <motion.div key="bg-achievements" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: '100vh', x: `${Math.random() * 100}vw`, opacity: 0, scale: Math.random() * 2 }}
                animate={{ y: '-10vh', opacity: [0, 1, 1, 0], x: `${Math.random() * 100}vw` }}
                transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 5, ease: "easeOut" }}
                className="absolute w-2 h-12 bg-orange-500 rounded-full blur-[1px]"
              />
            ))}
          </motion.div>
        )}
        {view === 'about' && (
          <motion.div key="bg-about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
            <motion.div 
              animate={{ backgroundPosition: ['0px 0px', '100px 100px'] }} 
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 opacity-10"
              style={{ backgroundImage: `repeating-linear-gradient(45deg, ${color} 0, ${color} 10px, transparent 10px, transparent 20px)` }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Navbar = ({ progress, onOpenMenu, onToggleTheme }: { progress: UserProgress, onOpenMenu: () => void, onToggleTheme: () => void }) => (
  <nav className={`fixed top-0 left-0 lg:left-64 right-0 h-16 border-b flex items-center justify-between px-6 z-50 transition-colors ${progress.theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
    <div className="flex items-center gap-3">
      <button onClick={onOpenMenu} className={`p-2 rounded-lg lg:hidden transition-colors ${progress.theme === 'dark' ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-500'}`}>
        <Menu size={24} />
      </button>
      <div className="flex items-center gap-2 group/logo lg:hidden">
        <div className="p-3 bg-black rounded-2xl inline-block shadow-lg shadow-blue-500/20 scale-75 origin-left">
          <Logo />
        </div>
      </div>
      <span className={`font-bold hidden sm:inline transition-colors ml-2 ${progress.theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>La Industria del País</span>
    </div>
    
    <div className="flex items-center gap-4 sm:gap-6">
      <button 
        onClick={onToggleTheme}
        className={`p-2 rounded-lg transition-colors ${progress.theme === 'dark' ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-500'}`}
        title={progress.theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}
      >
        {progress.theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>
      
      <div className="flex flex-col items-end">
        <span className={`text-xs font-medium uppercase tracking-wider transition-colors ${progress.theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{progress.rank}</span>
        <div className="flex items-center gap-2">
          <Trophy size={16} className="text-orange-400" />
          <span className={`font-bold transition-colors ${progress.theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{progress.totalPoints} <span className={`text-sm font-normal transition-colors ${progress.theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>pts</span></span>
        </div>
      </div>
    </div>
  </nav>
);

const Sidebar = ({ isOpen, onClose, currentView, setView, theme }: { isOpen: boolean, onClose: () => void, currentView: string, setView: (v: string) => void, theme: 'dark' | 'light' }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'levels', label: 'Niveles', icon: BookOpen },
    { id: 'manuals', label: 'Planos y Manuales', icon: FileText },
    { id: 'achievements', label: 'Logros', icon: Award },
    { id: 'about', label: 'Acerca de', icon: Info },
  ];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[60] lg:hidden"
          />
        )}
      </AnimatePresence>
      
      <motion.aside 
        className={`fixed top-0 left-0 bottom-0 w-64 border-r z-[70] transition-all lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}
      >
        <div className={`h-24 flex items-center justify-between px-6 border-b transition-colors ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
          <div className="p-4 bg-black rounded-2xl inline-block shadow-lg shadow-blue-500/20">
            <Logo />
          </div>
          <button onClick={onClose} className={`lg:hidden transition-colors ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            <X size={24} />
          </button>
        </div>
        <div className="p-4 space-y-2">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setView(item.id); onClose(); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${currentView === item.id ? 'bg-orange-500/10 text-orange-500' : theme === 'dark' ? 'text-slate-400 hover:bg-slate-800 hover:text-white' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}
            >
              <motion.div whileHover={{ y: -3, rotate: [-10, 10, -10, 0] }} transition={{ duration: 0.3 }}>
                <item.icon size={20} />
              </motion.div>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </motion.aside>
    </>
  );
};

const BadgeUnlockModal = ({ badge, onClose, theme }: { badge: Badge, onClose: () => void, theme: 'dark' | 'light' }) => (
  <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="absolute inset-0 bg-black/90 backdrop-blur-md"
    />
    <motion.div 
      initial={{ scale: 0.5, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.5, opacity: 0, y: 50 }}
      className={`relative w-full max-w-sm p-8 rounded-3xl border text-center shadow-2xl ${
        theme === 'dark' ? 'bg-slate-900 border-orange-500/50' : 'bg-white border-orange-500/30'
      }`}
    >
      <div className="absolute -top-12 left-1/2 -translate-x-1/2">
        <div className="w-24 h-24 bg-orange-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-orange-500/50">
          {badge.icon === 'Search' && <Search size={48} className="text-white" />}
          {badge.icon === 'Users' && <Users size={48} className="text-white" />}
          {badge.icon === 'Wrench' && <Wrench size={48} className="text-white" />}
        </div>
      </div>
      
      <div className="mt-12 space-y-4">
        <div className="text-orange-500 font-black uppercase tracking-widest text-sm">¡Insignia Desbloqueada!</div>
        <h2 className={`text-3xl font-black transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{badge.name}</h2>
        <p className={`transition-colors ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{badge.description}</p>
        
        <button 
          onClick={onClose}
          className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all mt-4"
        >
          Excelente
        </button>
      </div>
    </motion.div>
  </div>
);

const ManualsView = ({ theme }: { theme: 'dark' | 'light' }) => {
  const [selectedManual, setSelectedManual] = useState<Manual | null>(null);

  return (
    <div className="space-y-8">
      <header>
        <h1 className={`text-3xl font-black tracking-tight transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Planos y Manuales Técnicos</h1>
        <p className={`transition-colors ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Consulta la documentación técnica oficial para resolver tus desafíos.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MANUALS.map((manual) => (
          <motion.div
            key={manual.id}
            whileHover={{ scale: 1.03, y: -8 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setSelectedManual(manual)}
            className={`p-4 rounded-3xl border cursor-pointer transition-all group shadow-md hover:shadow-orange-500/20 ${
              theme === 'dark' ? 'bg-slate-900 border-slate-800 hover:border-orange-500/50' : 'bg-white border-slate-200 hover:border-orange-500/50 shadow-sm'
            }`}
          >
            <div className="aspect-video rounded-2xl overflow-hidden mb-4 relative">
              <img 
                src={manual.imageUrl} 
                alt={manual.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Search className="text-white" size={32} />
              </div>
            </div>
            <div className="px-2">
              <div className="text-orange-500 font-bold text-[10px] uppercase tracking-widest mb-1">{manual.category}</div>
              <h3 className={`font-bold mb-1 transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{manual.title}</h3>
              <p className={`text-xs line-clamp-2 transition-colors ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>{manual.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedManual && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedManual(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`relative w-full max-w-5xl rounded-3xl border overflow-hidden ${
                theme === 'dark' ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
              }`}
            >
              <div className={`p-4 border-b flex items-center justify-between ${theme === 'dark' ? 'border-slate-800' : 'border-slate-100'}`}>
                <h2 className={`font-bold transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{selectedManual.title}</h2>
                <button onClick={() => setSelectedManual(null)} className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-500'}`}>
                  <X size={24} />
                </button>
              </div>
              <div className="p-4 overflow-auto max-h-[80vh]">
                <img 
                  src={selectedManual.imageUrl} 
                  alt={selectedManual.title} 
                  className="w-full h-auto rounded-xl shadow-2xl"
                  referrerPolicy="no-referrer"
                />
                <div className="mt-6 p-6 rounded-2xl bg-orange-500/5 border border-orange-500/10">
                  <h4 className="text-orange-500 font-bold mb-2">Descripción Técnica</h4>
                  <p className={`transition-colors ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{selectedManual.description}</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const LevelCard: React.FC<{ level: Level, progress: UserProgress, onSelect: () => void }> = ({ level, progress, onSelect }) => {
  const isLocked = progress.totalPoints < level.unlockedAt;
  const isCompleted = level.activities.every((a: Activity) => progress.completedActivities.includes(a.id));
  const theme = progress.theme;
  
  const Icon = {
    Settings2, Truck, UserCheck, PenTool
  }[level.icon as string] || Settings2;

  return (
    <motion.div 
      whileHover={!isLocked ? { scale: 1.05, y: -5 } : {}}
      whileTap={!isLocked ? { scale: 0.95 } : {}}
      className={`relative p-6 rounded-2xl border transition-all ${
        isLocked 
          ? theme === 'dark' ? 'bg-slate-900/50 border-slate-800 opacity-60' : 'bg-slate-50 border-slate-200 opacity-60'
          : theme === 'dark' ? 'bg-slate-900 border-slate-800 hover:border-orange-500/50 cursor-pointer' : 'bg-white border-slate-200 hover:border-orange-500/50 cursor-pointer shadow-sm'
      }`}
      onClick={() => !isLocked && onSelect()}
    >
      <div className="flex items-start justify-between mb-4">
        <motion.div 
          animate={!isLocked ? { y: [0, -5, 0], rotate: [0, 5, -5, 0] } : {}}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className={`p-3 rounded-xl transition-colors shadow-lg ${
            isLocked 
              ? theme === 'dark' ? 'bg-slate-800 text-slate-600' : 'bg-slate-200 text-slate-400'
              : 'bg-orange-500/10 text-orange-500'
          }`}
        >
          <Icon size={24} />
        </motion.div>
        {isLocked ? (
          <div className={`flex items-center gap-1 text-xs font-bold uppercase tracking-tighter transition-colors ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
            <Lock size={12} /> {level.unlockedAt} pts
          </div>
        ) : isCompleted ? (
          <CheckCircle2 className="text-green-500" size={24} />
        ) : (
          <ChevronRight className={`transition-colors ${theme === 'dark' ? 'text-slate-600' : 'text-slate-300'}`} size={24} />
        )}
      </div>
      
      <h3 className={`text-lg font-bold mb-1 transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{level.title}</h3>
      <p className={`text-sm mb-4 transition-colors ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{level.subtitle}</p>
      
      <div className={`w-full h-1.5 rounded-full overflow-hidden transition-colors ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}`}>
        <div 
          className="bg-orange-500 h-full transition-all duration-500" 
          style={{ width: `${(level.activities.filter((a: any) => progress.completedActivities.includes(a.id)).length / level.activities.length) * 100}%` }}
        />
      </div>
    </motion.div>
  );
};

const GearLoader = ({ size = 40, className = "" }: { size?: number, className?: string }) => (
  <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      className="absolute"
    >
      <Settings2 size={size} className="text-orange-500 opacity-80" />
    </motion.div>
    <motion.div
      animate={{ rotate: -360 }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      className="absolute"
      style={{ marginLeft: size * 0.6, marginTop: size * 0.4 }}
    >
      <Settings2 size={size * 0.6} className="text-orange-400 opacity-60" />
    </motion.div>
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      className="absolute"
      style={{ marginLeft: -size * 0.4, marginTop: -size * 0.5 }}
    >
      <Settings2 size={size * 0.4} className="text-orange-300 opacity-40" />
    </motion.div>
  </div>
);

const ProcessingOverlay = ({ theme }: { theme: 'dark' | 'light' }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className={`absolute inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-sm rounded-3xl overflow-hidden ${theme === 'dark' ? 'bg-slate-900/60' : 'bg-white/60'}`}
  >
    <div className="absolute inset-0 opacity-5 pointer-events-none">
      <div className="grid grid-cols-8 gap-4 p-4">
        {Array.from({ length: 32 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, ease: "linear" }}
          >
            <Settings2 size={40} />
          </motion.div>
        ))}
      </div>
    </div>
    <GearLoader size={60} className="mb-4 relative z-10" />
    <p className={`font-bold animate-pulse relative z-10 transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
      Procesando Análisis Técnico...
    </p>
  </motion.div>
);

const QuizActivity = ({ activity, onComplete, theme }: { activity: Activity, onComplete: (pts: number) => void, theme: 'dark' | 'light' }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleNext = async () => {
    if (currentQuestion < activity.content.questions.length - 1) {
      setCurrentQuestion(c => c + 1);
      setSelected(null);
    } else {
      setIsProcessing(true);
      // Simulate technical processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      onComplete(activity.points);
      setIsProcessing(false);
    }
  };

  const q = activity.content.questions[currentQuestion];

  return (
    <div className="relative space-y-6">
      <AnimatePresence>
        {isProcessing && <ProcessingOverlay theme={theme} />}
      </AnimatePresence>
      
      <div className="flex justify-between items-center">
        <span className={`text-sm font-medium transition-colors ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Pregunta {currentQuestion + 1} de {activity.content.questions.length}</span>
        <span className="px-3 py-1 bg-orange-500/10 text-orange-500 text-xs font-bold rounded-full">+{activity.points} PTS</span>
      </div>
      
      <h3 className={`text-xl font-bold transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{q.question}</h3>
      
      <div className="space-y-3">
        {q.options.map((option: string, idx: number) => (
          <button
            key={idx}
            onClick={() => setSelected(idx)}
            className={`w-full text-left p-4 rounded-xl border transition-all ${
              selected === idx 
                ? 'bg-orange-500/10 border-orange-500 text-orange-500' 
                : theme === 'dark' ? 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500' : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-400'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      
      <motion.button
        whileHover={selected !== null ? { scale: 1.02, rotate: [-1, 1, -1, 1, 0] } : {}}
        whileTap={selected !== null ? { scale: 0.98 } : {}}
        disabled={selected === null}
        onClick={handleNext}
        className="w-full py-4 bg-orange-500 hover:bg-orange-600 disabled:bg-slate-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-500/20"
      >
        {currentQuestion === activity.content.questions.length - 1 ? 'Finalizar Actividad' : 'Siguiente Pregunta'}
      </motion.button>
    </div>
  );
};

const CaseStudyActivity = ({ activity, onComplete, theme }: { activity: Activity, onComplete: (pts: number) => void, theme: 'dark' | 'light' }) => {
  const [answers, setAnswers] = useState<string[]>(['', '']);
  const [isProcessing, setIsProcessing] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const handleSpeak = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToRead = `${activity.title}. ${activity.content.situation}. Preguntas: ${activity.content.questions.join(". ")}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'es-CL';
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    const aiFeedback = await getGeminiFeedback(
      `Caso de estudio: ${activity.title}. Situación: ${activity.content.situation}`,
      answers.join(" | ")
    );
    setFeedback(aiFeedback || null);
    setIsProcessing(false);
  };

  if (feedback) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className={`p-6 rounded-3xl border relative overflow-hidden ${theme === 'dark' ? 'bg-slate-800/50 border-orange-500/30' : 'bg-orange-50/50 border-orange-200'}`}>
          <div className="flex items-center gap-2 mb-4 text-orange-500">
            <Sparkles size={20} />
            <span className="font-black uppercase text-xs tracking-widest">Retroalimentación del Asesor IA</span>
          </div>
          <div className={`prose prose-sm max-w-none transition-colors ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>
            <p className="leading-relaxed italic">"{feedback}"</p>
          </div>
          <MessageSquareQuote className="absolute -right-4 -bottom-4 text-orange-500/10" size={120} />
        </div>
        <button
          onClick={() => onComplete(activity.points)}
          className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-500/20"
        >
          Entendido, Finalizar Actividad
        </button>
      </motion.div>
    );
  }

  return (
    <div className="relative space-y-6">
      <AnimatePresence>
        {isProcessing && <ProcessingOverlay theme={theme} />}
      </AnimatePresence>
      
      <div className={`p-6 rounded-2xl border transition-colors relative ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'}`}>
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-orange-500 font-bold uppercase text-xs tracking-widest">Situación Crítica</h4>
          <button 
            onClick={handleSpeak}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              isSpeaking 
                ? 'bg-orange-500 text-white animate-pulse' 
                : theme === 'dark' ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
            title={isSpeaking ? "Detener audio" : "Escuchar contenido"}
          >
            {isSpeaking ? <VolumeX size={14} /> : <Volume2 size={14} />}
            {isSpeaking ? "Detener" : "Escuchar"}
          </button>
        </div>
        <p className={`leading-relaxed transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{activity.content.situation}</p>
      </div>
      
      <div className="space-y-6">
        {activity.content.questions.map((q: string, idx: number) => (
          <div key={idx} className="space-y-2">
            <label className={`font-medium transition-colors ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{q}</label>
            <textarea 
              className={`w-full border rounded-xl p-4 transition-all focus:border-orange-500 outline-none h-24 ${
                theme === 'dark' ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
              placeholder="Escribe tu análisis técnico..."
              value={answers[idx]}
              onChange={(e) => {
                const newAnswers = [...answers];
                newAnswers[idx] = e.target.value;
                setAnswers(newAnswers);
              }}
            />
          </div>
        ))}
      </div>
      
      <motion.button
        whileHover={!answers.some(a => a.length < 10) ? { scale: 1.02, rotate: [-1, 1, -1, 1, 0] } : {}}
        whileTap={!answers.some(a => a.length < 10) ? { scale: 0.98 } : {}}
        disabled={answers.some(a => a.length < 10)}
        onClick={handleSubmit}
        className="w-full py-4 bg-orange-500 hover:bg-orange-600 disabled:bg-slate-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-500/20"
      >
        Enviar Análisis
      </motion.button>
    </div>
  );
};

const DesignActivity = ({ activity, onComplete, theme }: { activity: Activity, onComplete: (pts: number) => void, theme: 'dark' | 'light' }) => {
  const [answers, setAnswers] = useState<string[]>(['', '', '']);
  const [isProcessing, setIsProcessing] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubmit = async () => {
    setIsProcessing(true);
    const aiFeedback = await getGeminiFeedback(
      `Proyecto de diseño: ${activity.title}. Secciones: ${activity.content.sections.join(", ")}`,
      answers.join(" | ")
    );
    setFeedback(aiFeedback || null);
    setIsProcessing(false);
  };

  if (feedback) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className={`p-6 rounded-3xl border relative overflow-hidden ${theme === 'dark' ? 'bg-slate-800/50 border-orange-500/30' : 'bg-orange-50/50 border-orange-200'}`}>
          <div className="flex items-center gap-2 mb-4 text-orange-500">
            <Sparkles size={20} />
            <span className="font-black uppercase text-xs tracking-widest">Revisión de Proyecto IA</span>
          </div>
          <div className={`prose prose-sm max-w-none transition-colors ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>
            <p className="leading-relaxed italic">"{feedback}"</p>
          </div>
          <MessageSquareQuote className="absolute -right-4 -bottom-4 text-orange-500/10" size={120} />
        </div>
        <button
          onClick={() => onComplete(activity.points)}
          className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-500/20"
        >
          Aceptar Sugerencias y Finalizar
        </button>
      </motion.div>
    );
  }

  return (
    <div className="relative space-y-6">
      <AnimatePresence>
        {isProcessing && <ProcessingOverlay theme={theme} />}
      </AnimatePresence>
      
      <div className="space-y-8">
        {activity.content.sections.map((s: string, idx: number) => (
          <div key={idx} className="space-y-3">
            <h4 className={`font-bold text-lg flex items-center gap-2 transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm text-orange-500 transition-colors ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}`}>{idx + 1}</span>
              {s}
            </h4>
            <textarea 
              className={`w-full border rounded-xl p-4 transition-all focus:border-orange-500 outline-none h-32 ${
                theme === 'dark' ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
              placeholder="Describe tu propuesta..."
              value={answers[idx]}
              onChange={(e) => {
                const newAnswers = [...answers];
                newAnswers[idx] = e.target.value;
                setAnswers(newAnswers);
              }}
            />
          </div>
        ))}
      </div>
      
      <motion.button
        whileHover={!answers.some(a => a.length < 20) ? { scale: 1.02, rotate: [-1, 1, -1, 1, 0] } : {}}
        whileTap={!answers.some(a => a.length < 20) ? { scale: 0.98 } : {}}
        disabled={answers.some(a => a.length < 20)}
        onClick={handleSubmit}
        className="w-full py-4 bg-orange-500 hover:bg-orange-600 disabled:bg-slate-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-500/20"
      >
        Finalizar Proyecto Técnico-Social
      </motion.button>
    </div>
  );
};

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedLevelId, setSelectedLevelId] = useState<LevelId | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [isLoadingLevel, setIsLoadingLevel] = useState(false);
  const [unlockedBadge, setUnlockedBadge] = useState<Badge | null>(null);
  
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('motor_pais_progress');
    return saved ? JSON.parse(saved) : {
      completedActivities: [],
      totalPoints: 0,
      currentLevel: 'diagnostico',
      rank: 'Aprendiz',
      theme: 'dark',
      unlockedBadges: []
    };
  });

  const toggleTheme = () => {
    setProgress(p => ({ ...p, theme: p.theme === 'dark' ? 'light' : 'dark' }));
  };

  useEffect(() => {
    localStorage.setItem('motor_pais_progress', JSON.stringify(progress));
    
    // Update rank
    const newRank = RANKS.reduce((acc, rank) => {
      return progress.totalPoints >= rank.min ? rank.name : acc;
    }, RANKS[0].name);
    
    if (newRank !== progress.rank) {
      setProgress(p => ({ ...p, rank: newRank }));
    }
  }, [progress.totalPoints]);

  const handleCompleteActivity = (pts: number) => {
    if (selectedActivity) {
      const isAlreadyCompleted = progress.completedActivities.includes(selectedActivity.id);
      let newUnlockedBadges = [...progress.unlockedBadges];
      let badgeToNotify: Badge | null = null;

      if (!isAlreadyCompleted) {
        // Badge Logic
        if (selectedActivity.type === 'case-study' && !newUnlockedBadges.includes('eagle-eye')) {
          newUnlockedBadges.push('eagle-eye');
          badgeToNotify = BADGES.find(b => b.id === 'eagle-eye') || null;
        }
        
        if (selectedActivity.type === 'design' && !newUnlockedBadges.includes('active-citizen')) {
          newUnlockedBadges.push('active-citizen');
          badgeToNotify = BADGES.find(b => b.id === 'active-citizen') || null;
        }

        // Master Mechanic Check
        const totalActivities = LEVELS.reduce((acc, l) => acc + l.activities.length, 0);
        if (progress.completedActivities.length + 1 === totalActivities && !newUnlockedBadges.includes('master-mechanic')) {
          newUnlockedBadges.push('master-mechanic');
          badgeToNotify = BADGES.find(b => b.id === 'master-mechanic') || null;
        }

        setProgress(p => ({
          ...p,
          totalPoints: p.totalPoints + pts,
          completedActivities: [...p.completedActivities, selectedActivity.id],
          unlockedBadges: newUnlockedBadges
        }));

        if (badgeToNotify) {
          setUnlockedBadge(badgeToNotify);
        }
      }
      setSelectedActivity(null);
    }
  };

  const handleSelectLevel = async (levelId: LevelId) => {
    setIsLoadingLevel(true);
    setSelectedLevelId(levelId);
    // Simulate loading/calibrating the level
    await new Promise(resolve => setTimeout(resolve, 800));
    setCurrentView('level-detail');
    setIsLoadingLevel(false);
  };

  const selectedLevel = LEVELS.find(l => l.id === selectedLevelId);

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 relative ${progress.theme === 'dark' ? 'text-slate-200 selection:bg-orange-500/30' : 'text-slate-800 selection:bg-orange-500/20'}`}>
      <DynamicBackground view={currentView} theme={progress.theme} />
      <div className="relative z-10">
      <AnimatePresence>
        {isLoadingLevel && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-[200] flex flex-col items-center justify-center backdrop-blur-md ${progress.theme === 'dark' ? 'bg-slate-950/80' : 'bg-slate-50/80'}`}
          >
            <GearLoader size={80} className="mb-6" />
            <p className={`text-xl font-black tracking-widest uppercase animate-pulse transition-colors ${progress.theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Calibrando Nivel...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar progress={progress} onOpenMenu={() => setIsSidebarOpen(true)} onToggleTheme={toggleTheme} />
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        currentView={currentView}
        setView={setCurrentView}
        theme={progress.theme}
      />

      <main className="pt-24 pb-16 px-6 lg:ml-64 max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          {currentView === 'dashboard' && (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <header>
                <h1 className={`text-4xl font-black mb-2 tracking-tight transition-colors ${progress.theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Bienvenido, Técnico</h1>
                <p className={`text-lg transition-colors ${progress.theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Tu maestranza es el motor de desarrollo de tu región.</p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={`col-span-1 md:col-span-2 p-8 rounded-3xl border relative overflow-hidden group transition-all ${progress.theme === 'dark' ? 'bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <div className="relative z-10">
                    <h2 className={`text-2xl font-bold mb-4 transition-colors ${progress.theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Tu progreso actual</h2>
                    <div className="flex items-center gap-4 mb-6">
                      <motion.div 
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/40"
                      >
                        <Trophy className="text-white" size={32} />
                      </motion.div>
                      <div>
                        <div className={`text-3xl font-black transition-colors ${progress.theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{progress.totalPoints} <span className={`text-lg font-normal transition-colors ${progress.theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>Puntos</span></div>
                        <div className="text-orange-500 font-bold uppercase text-xs tracking-widest">{progress.rank}</div>
                      </div>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.05, rotate: [-1, 1, -1, 1, 0] }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentView('levels')}
                      className={`px-6 py-3 font-bold rounded-xl transition-all flex items-center gap-2 shadow-xl ${progress.theme === 'dark' ? 'bg-white text-slate-900 hover:bg-orange-500 hover:text-white hover:shadow-orange-500/50' : 'bg-slate-900 text-white hover:bg-orange-500 hover:shadow-orange-500/50'}`}
                    >
                      Continuar Aprendizaje <ChevronRight size={18} />
                    </motion.button>
                  </div>
                  <Settings2 className={`absolute -right-8 -bottom-8 transition-colors ${progress.theme === 'dark' ? 'text-slate-700/20 group-hover:text-orange-500/10' : 'text-slate-100 group-hover:text-orange-500/5'}`} size={240} />
                </div>
                
                <div className={`p-8 rounded-3xl border flex flex-col justify-between transition-all ${progress.theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <div>
                    <h3 className={`text-lg font-bold mb-1 transition-colors ${progress.theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Actividades</h3>
                    <p className={`text-sm mb-6 transition-colors ${progress.theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>Completadas vs Totales</p>
                    <div className={`text-4xl font-black mb-2 transition-colors ${progress.theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      {progress.completedActivities.length} <span className={`text-xl transition-colors ${progress.theme === 'dark' ? 'text-slate-600' : 'text-slate-300'}`}>/ {LEVELS.reduce((acc, l) => acc + l.activities.length, 0)}</span>
                    </div>
                  </div>
                  <div className={`w-full h-2 rounded-full overflow-hidden transition-colors ${progress.theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}`}>
                    <div 
                      className="bg-green-500 h-full" 
                      style={{ width: `${(progress.completedActivities.length / LEVELS.reduce((acc, l) => acc + l.activities.length, 0)) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className={`text-2xl font-bold transition-colors ${progress.theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Niveles Disponibles</h2>
                  <button onClick={() => setCurrentView('levels')} className="text-orange-500 font-bold text-sm hover:underline">Ver todos</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                  {LEVELS.slice(0, 2).map((level: Level) => (
                    <LevelCard 
                      key={level.id} 
                      level={level} 
                      progress={progress} 
                      onSelect={() => handleSelectLevel(level.id)} 
                    />
                  ))}
                </div>
              </section>
            </motion.div>
          )}

          {currentView === 'levels' && (
            <motion.div 
              key="levels"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <header className="flex items-center gap-4">
                <button onClick={() => setCurrentView('dashboard')} className={`p-2 rounded-lg transition-colors ${progress.theme === 'dark' ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-200 text-slate-600'}`}>
                  <ArrowLeft size={24} />
                </button>
                <div>
                  <h1 className={`text-3xl font-black tracking-tight transition-colors ${progress.theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Ruta de Aprendizaje</h1>
                  <p className={`transition-colors ${progress.theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Completa los niveles para convertirte en un Maestro Social-Técnico.</p>
                </div>
              </header>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {LEVELS.map((level: Level) => (
                  <LevelCard 
                    key={level.id} 
                    level={level} 
                    progress={progress} 
                    onSelect={() => handleSelectLevel(level.id)} 
                  />
                ))}
              </div>
            </motion.div>
          )}

          {currentView === 'level-detail' && selectedLevel && (
            <motion.div 
              key="level-detail"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="space-y-8"
            >
              <header className="flex items-center gap-4">
                <button onClick={() => setCurrentView('levels')} className={`p-2 rounded-lg transition-colors ${progress.theme === 'dark' ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-200 text-slate-600'}`}>
                  <ArrowLeft size={24} />
                </button>
                <div>
                  <div className="text-orange-500 font-bold text-xs uppercase tracking-widest mb-1">{selectedLevel.subtitle}</div>
                  <h1 className={`text-3xl font-black tracking-tight transition-colors ${progress.theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{selectedLevel.title}</h1>
                </div>
              </header>

              <div className={`p-8 rounded-3xl border transition-all ${progress.theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <p className={`text-lg leading-relaxed mb-8 transition-colors ${progress.theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{selectedLevel.description}</p>
                
                <h3 className={`font-bold mb-4 flex items-center gap-2 transition-colors ${progress.theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  <BookOpen size={20} className="text-orange-500" />
                  Actividades del Nivel
                </h3>
                
                <div className="space-y-3">
                  {selectedLevel.activities.map((activity, idx) => {
                    const isCompleted = progress.completedActivities.includes(activity.id);
                    return (
                      <button
                        key={activity.id}
                        onClick={() => setSelectedActivity(activity)}
                        className={`w-full flex items-center justify-between p-5 rounded-2xl border transition-all ${
                          isCompleted 
                            ? progress.theme === 'dark' ? 'bg-green-500/5 border-green-500/20' : 'bg-green-50 border-green-200'
                            : progress.theme === 'dark' ? 'bg-slate-800 border-slate-700 hover:border-slate-500' : 'bg-slate-50 border-slate-200 hover:border-slate-400'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${isCompleted ? 'bg-green-500 text-white' : progress.theme === 'dark' ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-500'}`}>
                            {isCompleted ? <CheckCircle2 size={20} /> : idx + 1}
                          </div>
                          <div className="text-left">
                            <div className={`font-bold transition-colors ${progress.theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{activity.title}</div>
                            <div className={`text-sm transition-colors ${progress.theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{activity.description}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-orange-500 font-bold text-sm">+{activity.points}</span>
                          <ChevronRight size={18} className={`transition-colors ${progress.theme === 'dark' ? 'text-slate-600' : 'text-slate-300'}`} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {currentView === 'manuals' && (
            <motion.div 
              key="manuals"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ManualsView theme={progress.theme} />
            </motion.div>
          )}

          {currentView === 'achievements' && (
            <motion.div 
              key="achievements"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-12"
            >
              <section>
                <h1 className={`text-3xl font-black tracking-tight transition-colors mb-8 ${progress.theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Tus Logros</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {RANKS.map((rank, idx) => {
                    const isUnlocked = progress.totalPoints >= rank.min;
                    return (
                      <div key={idx} className={`p-6 rounded-2xl border text-center transition-all ${
                        isUnlocked 
                          ? progress.theme === 'dark' ? 'bg-slate-900 border-orange-500/50' : 'bg-white border-orange-500/30 shadow-sm'
                          : progress.theme === 'dark' ? 'bg-slate-900/50 border-slate-800 opacity-40' : 'bg-slate-50 border-slate-200 opacity-40'
                      }`}>
                        <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-colors ${isUnlocked ? 'bg-orange-500 text-white' : progress.theme === 'dark' ? 'bg-slate-800 text-slate-600' : 'bg-slate-200 text-slate-400'}`}>
                          <Award size={32} />
                        </div>
                        <h3 className={`font-bold transition-colors ${progress.theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{rank.name}</h3>
                        <p className={`text-xs mt-1 transition-colors ${progress.theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>{rank.min} PTS Requeridos</p>
                      </div>
                    );
                  })}
                </div>
              </section>

              <section>
                <h2 className={`text-2xl font-bold transition-colors mb-6 ${progress.theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Insignias de Especialista</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {BADGES.map((badge) => {
                    const isUnlocked = progress.unlockedBadges.includes(badge.id);
                    return (
                      <div key={badge.id} className={`p-6 rounded-3xl border flex items-center gap-4 transition-all ${
                        isUnlocked 
                          ? progress.theme === 'dark' ? 'bg-slate-900 border-orange-500/30' : 'bg-white border-orange-500/20 shadow-sm'
                          : progress.theme === 'dark' ? 'bg-slate-900/40 border-slate-800 opacity-50 grayscale' : 'bg-slate-50 border-slate-200 opacity-50 grayscale'
                      }`}>
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${isUnlocked ? 'bg-orange-500 text-white' : progress.theme === 'dark' ? 'bg-slate-800 text-slate-600' : 'bg-slate-200 text-slate-400'}`}>
                          {badge.icon === 'Search' && <Search size={28} />}
                          {badge.icon === 'Users' && <Users size={28} />}
                          {badge.icon === 'Wrench' && <Wrench size={28} />}
                        </div>
                        <div>
                          <h3 className={`font-bold transition-colors ${progress.theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{badge.name}</h3>
                          <p className={`text-xs transition-colors ${progress.theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{badge.description}</p>
                          {!isUnlocked && <p className="text-[10px] text-orange-500 font-bold mt-1 uppercase tracking-tighter">Criterio: {badge.criteria}</p>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </motion.div>
          )}

          {currentView === 'about' && (
            <motion.div 
              key="about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8 max-w-2xl"
            >
              <h1 className={`text-3xl font-black tracking-tight transition-colors ${progress.theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Acerca de la App</h1>
              <div className={`prose transition-colors ${progress.theme === 'dark' ? 'prose-invert' : 'prose-slate'}`}>
                <p className={`text-lg leading-relaxed transition-colors ${progress.theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                  Esta aplicación ha sido diseñada para fortalecer la formación ciudadana de los estudiantes de 4° Medio de la especialidad de Mecánica Industrial (Máquinas y Herramientas). 
                  A través de la analogía de una planta de producción, exploramos cómo la organización territorial de Chile impacta en el desarrollo industrial y el rol fundamental 
                  que cada técnico matricero y operador de máquinas desempeña en su comunidad.
                </p>
                <div className={`p-6 rounded-2xl border mt-8 transition-all ${progress.theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <h3 className={`font-bold mb-2 transition-colors ${progress.theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Objetivos Pedagógicos</h3>
                  <ul className={`space-y-2 transition-colors ${progress.theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                    <li>• Desarrollar pensamiento crítico sobre el centralismo y la descentralización.</li>
                    <li>• Fomentar la responsabilidad social e individual en el ejercicio técnico.</li>
                    <li>• Aplicar conocimientos de mecánica a problemáticas territoriales reales.</li>
                  </ul>
                </div>

                <div className={`p-6 rounded-2xl border mt-4 transition-all ${progress.theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <Sparkles className="text-orange-500" size={20} />
                    <h3 className={`font-bold transition-colors ${progress.theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Modo Offline (PWA)</h3>
                  </div>
                  <p className={`text-sm transition-colors ${progress.theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                    Esta aplicación está optimizada para zonas rurales. Puedes instalarla en tu dispositivo y usarla sin conexión a internet una vez cargada por primera vez.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                  <div className={`p-4 rounded-2xl flex flex-col items-center gap-3 transition-all ${progress.theme === 'dark' ? 'bg-slate-900/50 border border-slate-800' : 'bg-white border border-slate-200 shadow-sm'}`}>
                    <Rocket className="animate-shake text-blue-500" size={40} />
                    <span className={`text-xs font-bold uppercase tracking-wider ${progress.theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>Impulso</span>
                  </div>
                  <div className={`p-4 rounded-2xl flex flex-col items-center gap-3 transition-all ${progress.theme === 'dark' ? 'bg-slate-900/50 border border-slate-800' : 'bg-white border border-slate-200 shadow-sm'}`}>
                    <Zap className="animate-pulse-soft text-orange-500" size={40} />
                    <span className={`text-xs font-bold uppercase tracking-wider ${progress.theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>Energía</span>
                  </div>
                  <div className={`p-4 rounded-2xl flex flex-col items-center gap-3 transition-all ${progress.theme === 'dark' ? 'bg-slate-900/50 border border-slate-800' : 'bg-white border border-slate-200 shadow-sm'}`}>
                    <Target className="animate-pulse-soft text-green-500" size={40} />
                    <span className={`text-xs font-bold uppercase tracking-wider ${progress.theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>Objetivo</span>
                  </div>
                  <div className={`p-4 rounded-2xl flex flex-col items-center gap-3 transition-all ${progress.theme === 'dark' ? 'bg-slate-900/50 border border-slate-800' : 'bg-white border border-slate-200 shadow-sm'}`}>
                    <GraduationCap className="animate-shake text-purple-500" size={40} />
                    <span className={`text-xs font-bold uppercase tracking-wider ${progress.theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>Educación</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Activity Modal */}
      <AnimatePresence>
        {selectedActivity && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedActivity(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`relative w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden transition-colors ${
                progress.theme === 'dark' ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
              }`}
            >
              <div className={`p-6 border-b flex items-center justify-between transition-colors ${progress.theme === 'dark' ? 'border-slate-800' : 'border-slate-100'}`}>
                <div>
                  <h2 className={`text-xl font-bold transition-colors ${progress.theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{selectedActivity.title}</h2>
                  <p className={`text-sm transition-colors ${progress.theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{selectedActivity.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setCurrentView('manuals')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      progress.theme === 'dark' ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <FileText size={14} />
                    Consultar Manual
                  </button>
                  <button onClick={() => setSelectedActivity(null)} className={`p-2 rounded-lg transition-colors ${progress.theme === 'dark' ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-500'}`}>
                    <X size={24} />
                  </button>
                </div>
              </div>
              
              <div className="p-8 max-h-[70vh] overflow-y-auto">
                {selectedActivity.type === 'quiz' && <QuizActivity activity={selectedActivity} onComplete={handleCompleteActivity} theme={progress.theme} />}
                {selectedActivity.type === 'case-study' && <CaseStudyActivity activity={selectedActivity} onComplete={handleCompleteActivity} theme={progress.theme} />}
                {selectedActivity.type === 'design' && <DesignActivity activity={selectedActivity} onComplete={handleCompleteActivity} theme={progress.theme} />}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Badge Unlock Modal */}
      <AnimatePresence>
        {unlockedBadge && (
          <BadgeUnlockModal 
            badge={unlockedBadge} 
            onClose={() => setUnlockedBadge(null)} 
            theme={progress.theme} 
          />
        )}
      </AnimatePresence>

      <footer className={`fixed bottom-0 left-0 right-0 lg:left-64 h-12 backdrop-blur-md border-t flex items-center justify-center px-6 z-40 transition-colors ${progress.theme === 'dark' ? 'bg-slate-950/80 border-slate-900' : 'bg-slate-50/80 border-slate-200'}`}>
        <p className={`text-[10px] sm:text-xs font-medium text-center transition-colors ${progress.theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
          Creado por: <span className={`${progress.theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>Christian Núñez</span>, Asesor Pedagógico, Programa PACE-UDA, 2026.
        </p>
      </footer>
      </div>
    </div>
  );
}

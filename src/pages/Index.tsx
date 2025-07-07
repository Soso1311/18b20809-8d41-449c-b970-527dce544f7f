
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import LegalAreaSelector from "@/components/LegalAreaSelector";
import ChatInterface from "@/components/ChatInterface";
import PremiumUpgrade from "@/components/PremiumUpgrade";

const Index = () => {
  const [language, setLanguage] = useState<"en" | "es">("en");
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);

  // Check network connectivity
  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOffline(!navigator.onLine);
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    updateOnlineStatus();

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  const handleLanguageToggle = () => {
    setLanguage(prev => prev === "en" ? "es" : "en");
  };

  const handleAreaSelect = (areaId: string) => {
    // Check if user needs premium for comprehensive analysis
    if (!isPremium && !isOffline) {
      setShowUpgrade(true);
      return;
    }
    setSelectedArea(areaId);
  };

  const handleBackToSelector = () => {
    setSelectedArea(null);
  };

  const handleUpgradeToPremium = () => {
    setIsPremium(true);
    setShowUpgrade(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        language={language}
        onLanguageToggle={handleLanguageToggle}
        isOffline={isOffline}
        isPremium={isPremium}
      />
      
      <div className="flex-1 flex flex-col">
        {showUpgrade ? (
          <PremiumUpgrade
            language={language}
            onUpgrade={handleUpgradeToPremium}
            onCancel={() => setShowUpgrade(false)}
          />
        ) : selectedArea ? (
          <ChatInterface
            selectedArea={selectedArea}
            language={language}
            onBack={handleBackToSelector}
            isOffline={isOffline}
            isPremium={isPremium}
          />
        ) : (
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-7xl mx-auto">
              <LegalAreaSelector
                selectedArea={selectedArea}
                onAreaSelect={handleAreaSelect}
                language={language}
                isOffline={isOffline}
                isPremium={isPremium}
              />
            </div>
          </div>
        )}
      </div>
      
      <footer className="bg-white border-t px-4 py-3">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">
          {language === "en" 
            ? "© 2024 Statueye. AI-powered legal guidance for UK law. Not a substitute for professional legal advice."
            : "© 2024 Statueye. Orientación legal con IA para la ley del Reino Unido. No es un sustituto del asesoramiento legal profesional."}
        </div>
      </footer>
    </div>
  );
};

export default Index;

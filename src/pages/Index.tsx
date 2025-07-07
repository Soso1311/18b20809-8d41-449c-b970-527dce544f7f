
import { useState } from "react";
import Header from "@/components/Header";
import LegalAreaSelector from "@/components/LegalAreaSelector";
import ChatInterface from "@/components/ChatInterface";

const Index = () => {
  const [language, setLanguage] = useState<"en" | "es">("en");
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [isOffline] = useState(true); // Simulating offline mode

  const handleLanguageToggle = () => {
    setLanguage(prev => prev === "en" ? "es" : "en");
  };

  const handleAreaSelect = (areaId: string) => {
    setSelectedArea(areaId);
  };

  const handleBackToSelector = () => {
    setSelectedArea(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        language={language}
        onLanguageToggle={handleLanguageToggle}
        isOffline={isOffline}
      />
      
      <div className="flex-1 flex flex-col">
        {selectedArea ? (
          <ChatInterface
            selectedArea={selectedArea}
            language={language}
            onBack={handleBackToSelector}
          />
        ) : (
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-7xl mx-auto">
              <LegalAreaSelector
                selectedArea={selectedArea}
                onAreaSelect={handleAreaSelect}
                language={language}
              />
            </div>
          </div>
        )}
      </div>
      
      <footer className="bg-white border-t px-4 py-3">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">
          {language === "en" 
            ? "© 2024 Statueye. AI-powered legal guidance. Not a substitute for professional legal advice."
            : "© 2024 Statueye. Orientación legal impulsada por IA. No es un sustituto del asesoramiento legal profesional."}
        </div>
      </footer>
    </div>
  );
};

export default Index;

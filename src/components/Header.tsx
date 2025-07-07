
import { Globe, Wifi, WifiOff, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  language: "en" | "es";
  onLanguageToggle: () => void;
  isOffline: boolean;
  isPremium?: boolean;
}

const Header = ({ language, onLanguageToggle, isOffline, isPremium = false }: HeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 legal-gradient rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold text-gray-900">Statueye</h1>
              {isPremium && (
                <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                  <Crown className="w-3 h-3 mr-1" />
                  Premium
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-500">AI Legal Assistant</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            {isOffline ? (
              <WifiOff className="w-4 h-4 text-orange-600" />
            ) : (
              <Wifi className="w-4 h-4 text-green-600" />
            )}
            <span className="text-sm text-gray-600">
              {isOffline 
                ? (language === "en" ? "Offline Mode" : "Modo Sin Conexión")
                : (language === "en" ? "Online - Full Database" : "En Línea - Base Completa")
              }
            </span>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onLanguageToggle}
            className="flex items-center space-x-2"
          >
            <Globe className="w-4 h-4" />
            <span>{language === "en" ? "EN" : "ES"}</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

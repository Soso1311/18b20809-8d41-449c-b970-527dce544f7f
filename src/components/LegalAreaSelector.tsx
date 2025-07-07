import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Briefcase, 
  Car, 
  ShoppingCart, 
  AlertTriangle,
  Scale,
  Crown,
  Wifi,
  WifiOff
} from "lucide-react";

interface LegalArea {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  premiumOnly?: boolean;
}

interface LegalAreaSelectorProps {
  selectedArea: string | null;
  onAreaSelect: (areaId: string) => void;
  language: "en" | "es";
  isOffline: boolean;
  isPremium: boolean;
}

const LegalAreaSelector = ({ selectedArea, onAreaSelect, language, isOffline, isPremium }: LegalAreaSelectorProps) => {
  const legalAreas: LegalArea[] = [
    {
      id: "tenant-rights",
      name: language === "en" ? "Tenant Rights" : "Derechos del Inquilino",
      description: language === "en" ? "Housing disputes, evictions, deposits" : "Disputas de vivienda, desalojos, depósitos",
      icon: <Home className="w-6 h-6" />,
      color: "bg-blue-500"
    },
    {
      id: "employment",
      name: language === "en" ? "Employment Issues" : "Problemas Laborales",
      description: language === "en" ? "Workplace rights, discrimination, wages" : "Derechos laborales, discriminación, salarios",
      icon: <Briefcase className="w-6 h-6" />,
      color: "bg-green-500"
    },
    {
      id: "dui",
      name: language === "en" ? "DUI/DWI" : "Conducir Bajo Influencia",
      description: language === "en" ? "Drunk driving charges and penalties" : "Cargos por conducir ebrio y sanciones",
      icon: <AlertTriangle className="w-6 h-6" />,
      color: "bg-red-500",
      premiumOnly: !isOffline
    },
    {
      id: "consumer",
      name: language === "en" ? "Consumer Disputes" : "Disputas del Consumidor",
      description: language === "en" ? "Product issues, warranties, refunds" : "Problemas de productos, garantías, reembolsos",
      icon: <ShoppingCart className="w-6 h-6" />,
      color: "bg-purple-500",
      premiumOnly: !isOffline
    },
    {
      id: "traffic",
      name: language === "en" ? "Traffic Offenses" : "Infracciones de Tráfico",
      description: language === "en" ? "Speeding tickets, parking violations" : "Multas por velocidad, violaciones de estacionamiento",
      icon: <Car className="w-6 h-6" />,
      color: "bg-orange-500"
    },
    {
      id: "drugs",
      name: language === "en" ? "Drug Usage" : "Uso de Drogas",
      description: language === "en" ? "Possession charges, rehabilitation" : "Cargos por posesión, rehabilitación",
      icon: <Scale className="w-6 h-6" />,
      color: "bg-indigo-500",
      premiumOnly: !isOffline
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {language === "en" ? "Select Legal Area" : "Seleccionar Área Legal"}
            </h2>
            <p className="text-gray-600">
              {language === "en" 
                ? "Choose the area that best matches your legal concern" 
                : "Elija el área que mejor se ajuste a su problema legal"}
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            {isOffline ? (
              <WifiOff className="w-5 h-5 text-orange-600" />
            ) : (
              <Wifi className="w-5 h-5 text-green-600" />
            )}
            <Badge variant={isOffline ? "destructive" : "default"}>
              {isOffline 
                ? (language === "en" ? "Limited Database" : "Base Limitada")
                : (language === "en" ? "Full UK Database" : "Base Completa del Reino Unido")
              }
            </Badge>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {legalAreas.map((area) => {
          const isLocked = area.premiumOnly && !isPremium;
          
          return (
            <Card
              key={area.id}
              className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ${
                selectedArea === area.id 
                  ? "ring-2 ring-blue-600 bg-blue-50" 
                  : isLocked 
                    ? "opacity-60 hover:bg-gray-50" 
                    : "hover:bg-gray-50"
              }`}
              onClick={() => onAreaSelect(area.id)}
            >
              <div className="flex items-start space-x-3">
                <div className={`${area.color} text-white p-2 rounded-lg relative`}>
                  {area.icon}
                  {isLocked && (
                    <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-0.5">
                      <Crown className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {area.name}
                    </h3>
                    {area.premiumOnly && (
                      <Badge className="bg-yellow-100 text-yellow-800 text-xs ml-2">
                        {language === "en" ? "Premium" : "Premium"}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {area.description}
                  </p>
                  {selectedArea === area.id && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      {language === "en" ? "Selected" : "Seleccionado"}
                    </Badge>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default LegalAreaSelector;

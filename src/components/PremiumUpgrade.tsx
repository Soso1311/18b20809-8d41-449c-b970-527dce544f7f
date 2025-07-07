
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Check, Database, Zap, Shield, X } from "lucide-react";

interface PremiumUpgradeProps {
  language: "en" | "es";
  onUpgrade: () => void;
  onCancel: () => void;
}

const PremiumUpgrade = ({ language, onUpgrade, onCancel }: PremiumUpgradeProps) => {
  const features = [
    {
      icon: <Database className="w-5 h-5" />,
      title: language === "en" ? "Complete UK Law Database" : "Base de Datos Completa de Leyes del Reino Unido",
      description: language === "en" ? "Access to entire UK legal database with real-time updates" : "Acceso a toda la base de datos legal del Reino Unido con actualizaciones en tiempo real"
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: language === "en" ? "Advanced AI Analysis" : "Análisis Avanzado de IA",
      description: language === "en" ? "Comprehensive legal situation analysis with multiple violation detection" : "Análisis integral de situaciones legales con detección de múltiples violaciones"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: language === "en" ? "Priority Support" : "Soporte Prioritario",
      description: language === "en" ? "24/7 legal guidance with expert-reviewed recommendations" : "Orientación legal 24/7 con recomendaciones revisadas por expertos"
    }
  ];

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <Card className="max-w-2xl w-full p-8">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 legal-gold-gradient rounded-full flex items-center justify-center">
              <Crown className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {language === "en" ? "Upgrade to Premium" : "Actualizar a Premium"}
          </h2>
          
          <p className="text-gray-600 mb-4">
            {language === "en" 
              ? "Unlock comprehensive legal analysis with our complete UK law database"
              : "Desbloquea análisis legal integral con nuestra base de datos completa de leyes del Reino Unido"}
          </p>
          
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Badge className="bg-red-100 text-red-800 line-through">£29.99/month</Badge>
            <Badge className="bg-green-100 text-green-800 text-lg px-3 py-1">£19.99/month</Badge>
            <Badge variant="secondary">Limited Time</Badge>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
              <div className="text-blue-600 mt-1">
                {feature.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
              <Check className="w-5 h-5 text-green-600 mt-1" />
            </div>
          ))}
        </div>

        <div className="flex space-x-4 justify-center">
          <Button
            variant="outline"
            onClick={onCancel}
            className="flex items-center space-x-2"
          >
            <X className="w-4 h-4" />
            <span>{language === "en" ? "Maybe Later" : "Tal Vez Después"}</span>
          </Button>
          
          <Button
            onClick={onUpgrade}
            size="lg"
            className="legal-gold-gradient text-white flex items-center space-x-2 px-8"
          >
            <Crown className="w-4 h-4" />
            <span>{language === "en" ? "Upgrade Now" : "Actualizar Ahora"}</span>
          </Button>
        </div>
        
        <p className="text-xs text-gray-500 text-center mt-4">
          {language === "en" 
            ? "7-day free trial • Cancel anytime • Secure payment"
            : "Prueba gratuita de 7 días • Cancela en cualquier momento • Pago seguro"}
        </p>
      </Card>
    </div>
  );
};

export default PremiumUpgrade;

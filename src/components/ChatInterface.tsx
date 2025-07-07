
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Download, ArrowLeft, AlertCircle, Scale, FileText } from "lucide-react";

interface ChatMessage {
  type: "user" | "assistant";
  content: string;
}

interface LegalResult {
  law: string;
  description: string;
  penalty: string;
  nextSteps: string[];
  confidence: number;
}

interface ChatInterfaceProps {
  selectedArea: string;
  language: "en" | "es";
  onBack: () => void;
}

const ChatInterface = ({ selectedArea, language, onBack }: ChatInterfaceProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [legalResults, setLegalResults] = useState<LegalResult[]>([]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message;
    setMessage("");
    setMessages(prev => [...prev, { type: "user", content: userMessage }]);
    setIsAnalyzing(true);

    // Simulate AI analysis
    setTimeout(() => {
      const mockResults: LegalResult[] = [
        {
          law: "Housing Act 1988 - Section 8",
          description: "Landlord's grounds for possession of property let on assured tenancy",
          penalty: "Potential eviction if grounds are proven valid",
          nextSteps: [
            "Review your tenancy agreement",
            "Gather evidence of any landlord violations",
            "Contact local housing authority",
            "Consider legal representation if proceedings begin"
          ],
          confidence: 92
        },
        {
          law: "Landlord and Tenant Act 1985 - Section 11",
          description: "Landlord's repairing obligations in short leases",
          penalty: "Landlord may face enforcement action",
          nextSteps: [
            "Document all maintenance issues with photos",
            "Send formal written notice to landlord",
            "Contact environmental health if issues persist"
          ],
          confidence: 87
        }
      ];

      setLegalResults(mockResults);
      setMessages(prev => [...prev, { 
        type: "assistant", 
        content: `I've analyzed your ${selectedArea} concern and found ${mockResults.length} potentially relevant legal provisions. Here are the key findings:` 
      }]);
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleDownloadReport = () => {
    // Mock download functionality
    const report = `Statueye Legal Analysis Report\n\nQuery: ${messages.find(m => m.type === "user")?.content}\n\nResults: ${legalResults.length} provisions found\n\n${legalResults.map(r => `${r.law}: ${r.description}`).join('\n\n')}`;
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'statueye-legal-report.txt';
    a.click();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-b bg-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === "en" ? "Back" : "Atrás"}
          </Button>
          <div>
            <h2 className="font-semibold text-gray-900">
              {language === "en" ? "Legal Analysis" : "Análisis Legal"}
            </h2>
            <p className="text-sm text-gray-500 capitalize">{selectedArea.replace('-', ' ')}</p>
          </div>
        </div>
        
        {legalResults.length > 0 && (
          <Button onClick={handleDownloadReport} className="flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>{language === "en" ? "Download Report" : "Descargar Informe"}</span>
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <Card className="p-6 bg-blue-50 border-blue-200">
            <div className="flex items-start space-x-3">
              <Scale className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">
                  {language === "en" ? "Describe Your Legal Situation" : "Describe Su Situación Legal"}
                </h3>
                <p className="text-blue-700 text-sm">
                  {language === "en" 
                    ? "Tell me about your legal concern in your own words. I'll analyze it against relevant UK and EU legislation to identify potential violations and next steps."
                    : "Cuénteme sobre su problema legal en sus propias palabras. Lo analizaré contra la legislación relevante del Reino Unido y la UE para identificar posibles violaciones y próximos pasos."}
                </p>
              </div>
            </div>
          </Card>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
          >
            <Card className={`max-w-[80%] p-4 ${
              msg.type === "user" 
                ? "bg-blue-600 text-white" 
                : "bg-white border-gray-200"
            }`}>
              <p className="text-sm">{msg.content}</p>
            </Card>
          </div>
        ))}

        {isAnalyzing && (
          <Card className="p-4 bg-gray-50">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              <p className="text-sm text-gray-600">
                {language === "en" 
                  ? "Analyzing legislation database..." 
                  : "Analizando base de datos de legislación..."}
              </p>
            </div>
          </Card>
        )}

        {legalResults.map((result, index) => (
          <Card key={index} className="p-6 border-l-4 border-l-blue-600">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{result.law}</h3>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {result.confidence}% {language === "en" ? "Match" : "Coincidencia"}
                </Badge>
              </div>
              <FileText className="w-5 h-5 text-gray-400" />
            </div>
            
            <p className="text-gray-700 mb-4">{result.description}</p>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-red-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-red-900 mb-1">
                    {language === "en" ? "Potential Penalty" : "Sanción Potencial"}
                  </h4>
                  <p className="text-red-700 text-sm">{result.penalty}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                {language === "en" ? "Recommended Next Steps:" : "Próximos Pasos Recomendados:"}
              </h4>
              <ul className="space-y-1">
                {result.nextSteps.map((step, stepIndex) => (
                  <li key={stepIndex} className="flex items-start space-x-2 text-sm text-gray-700">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>

      <div className="border-t bg-white p-4">
        <div className="flex space-x-3">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={language === "en" 
              ? "Describe your legal situation in detail..." 
              : "Describe su situación legal en detalle..."}
            className="flex-1 min-h-[60px] resize-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!message.trim() || isAnalyzing}
            className="px-6 legal-gradient"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;

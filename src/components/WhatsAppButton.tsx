import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "+221772283684"; // WhatsApp Business Number

const WhatsAppButton = () => {
  const message = encodeURIComponent("Bonjour KEYNA, je souhaite avoir plus d'informations sur vos produits.");
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactez-nous sur WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-accent text-accent-foreground shadow-lg hover:scale-105 transition-transform duration-200"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
};

export default WhatsAppButton;

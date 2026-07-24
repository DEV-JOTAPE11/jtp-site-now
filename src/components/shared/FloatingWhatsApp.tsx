"use client";

import Image from "next/image";
import { WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MESSAGE } from "@/lib/constants";

export function FloatingWhatsApp() {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float fixed z-50 group"
      style={{ bottom: "1.5rem", right: "1.5rem" }}
      aria-label="Fale conosco no WhatsApp"
    >
      <span
        className="absolute inset-0 rounded-full animate-ping"
        style={{ background: "rgba(34, 197, 94, 0.3)" }}
      />
      <span
        className="absolute rounded-full blur-md group-hover:bg-green-500/40 transition-all duration-300"
        style={{ inset: "-0.25rem", background: "rgba(34, 197, 94, 0.2)" }}
      />
      <Image
        src="/img/wpp-botaoflutuante.svg"
        alt="WhatsApp"
        width={64}
        height={64}
        className="relative w-16 h-16 object-contain drop-shadow-whatsapp"
        loading="lazy"
        unoptimized
      />
    </a>
  );
}

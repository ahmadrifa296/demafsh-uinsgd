"use client";

import { useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";

interface ShareButtonsProps {
  title: string;
}

export default function ShareButtons({ title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const getCurrentUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.href;
    }
    return "";
  };

  const handleShareWhatsApp = () => {
    const url = getCurrentUrl();
    const text = encodeURIComponent(`${title}\n\nBaca selengkapnya di Portal DEMA FSH UIN SGD:\n${url}`);
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const handleCopyLink = async () => {
    const url = getCurrentUrl();
    if (!url) return;

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback ignored if clipboard permissions are restricted
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={handleShareWhatsApp}
        className="inline-flex items-center gap-2 rounded-lg bg-[#1B6B3A] px-4 py-2 text-xs font-semibold text-[#F8F5F2] transition-colors hover:bg-[#1B6B3A]/85"
      >
        <Share2 className="h-4 w-4" />
        <span>Bagikan ke WhatsApp</span>
      </button>

      <button
        type="button"
        onClick={handleCopyLink}
        className="inline-flex items-center gap-2 rounded-lg border border-[#E7C45B]/35 bg-[#2A050E] px-4 py-2 text-xs font-semibold text-[#E7C45B] transition-colors hover:border-[#E7C45B] hover:bg-[#4A0B1B]"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 text-emerald-400" />
            <span>Tautan Disalin!</span>
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" />
            <span>Salin Tautan</span>
          </>
        )}
      </button>
    </div>
  );
}

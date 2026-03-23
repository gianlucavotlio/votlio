import { Info, X } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { getGlossaryTerm } from "@/lib/glossary";

interface GlossaryTermProps {
  termId: string;
  children?: React.ReactNode;
  pluralEnding?: string;
}

export function GlossaryTerm({ termId, children, pluralEnding = "" }: GlossaryTermProps) {
  const term = getGlossaryTerm(termId);
  const [isOpen, setIsOpen] = useState(false);

  if (!term) {
    return <span>{children || termId}{pluralEnding}</span>;
  }

  // Combine the term text with plural ending for display
  const displayText = `${children || term.term}${pluralEnding}`;

  return (
    <span className="inline-relative group">
      <span className="inline-flex items-center gap-1 relative">
        <span className="font-semibold text-foreground">{displayText}</span>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          onMouseEnter={() => setIsOpen(true)}
          className="inline-flex items-center justify-center p-0.5 rounded cursor-pointer"
          aria-label={`Definition: ${term.term}`}
          title={term.definition}
        >
          <Info className="w-4 h-4 text-primary opacity-60 hover:opacity-100 transition-opacity" />
        </button>
      </span>

      {/* Tooltip rendered via Portal to avoid DOM nesting issues */}
      {isOpen &&
        createPortal(
          <div
            className="fixed bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-3 py-2 rounded-md shadow-xl text-sm max-w-xs z-50 pointer-events-auto break-words"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            onMouseLeave={() => setIsOpen(false)}
          >
            <div className="flex items-start justify-between gap-2">
              <span>{term.definition}</span>
              <button
                onClick={() => setIsOpen(false)}
                className="flex-shrink-0 mt-0.5"
                aria-label="Close"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>,
          document.body
        )}
    </span>
  );
}

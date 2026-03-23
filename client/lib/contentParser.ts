import React from "react";
import { GlossaryTerm } from "@/components/GlossaryTerm";
import { getGlossaryTerm } from "@/lib/glossary";

/**
 * Parse learning card content and inject GlossaryTerm components.
 * Syntax: Use {termId} to mark a term that should have info icon.
 * Example: "Das {grundgesetz} ist die {verfassung} Deutschlands."
 *
 * Returns an array of React nodes that can be rendered.
 */
export function parseContentWithTerms(
  content: string
): (string | React.ReactElement)[] {
  const parts: (string | React.ReactElement)[] = [];
  const regex = /\{([a-z_]+)\}([a-z]*)/g; // Also capture potential plural ending after closing brace
  let lastIndex = 0;
  let match;
  let termCount = 0; // Counter to make keys unique even for same term

  while ((match = regex.exec(content)) !== null) {
    const termId = match[1];
    const pluralEnding = match[2]; // Capture any letters after the closing brace (e.g., 'en', 'e', 's')
    const term = getGlossaryTerm(termId);

    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(content.substring(lastIndex, match.index));
    }

    // Add the GlossaryTerm component if term exists
    if (term) {
      // Pass the plural ending as a prop so the icon comes after the complete word
      parts.push(
        React.createElement(GlossaryTerm, {
          key: `term-${termId}-${termCount}`,
          termId,
          pluralEnding // Include plural ending so icon appears after complete word
        })
      );
      termCount++;
    } else {
      // If term not found, just add the text as-is
      parts.push(match[0] + pluralEnding);
    }

    lastIndex = regex.lastIndex;
  }

  // Add remaining text after last match
  if (lastIndex < content.length) {
    parts.push(content.substring(lastIndex));
  }

  return parts.length > 0 ? parts : [content];
}

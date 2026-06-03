import { useEffect, useRef, useState } from "react";
import type { Place } from "../types/location";

type SuggestionsListProps = {
  suggestions: Place[];
  onSelect: (suggestion: Place) => void;
};

function splitPlaceName(name: string): { title: string; subtitle: string | null } {
  const parts = name.split(",").map((part) => part.trim()).filter(Boolean);
  if (parts.length <= 1) {
    return { title: name, subtitle: null };
  }
  return {
    title: parts[0],
    subtitle: parts.slice(1).join(", "),
  };
}

function SuggestionsList({ suggestions, onSelect }: SuggestionsListProps) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setActiveIndex(-1);
  }, [suggestions]);

  if (suggestions.length === 0) {
    return null;
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) =>
        index < suggestions.length - 1 ? index + 1 : 0,
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) =>
        index > 0 ? index - 1 : suggestions.length - 1,
      );
    } else if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      onSelect(suggestions[activeIndex]);
    } else if (event.key === "Escape") {
      setActiveIndex(-1);
    }
  };

  return (
    <ul
      ref={listRef}
      className="absolute left-0 top-full z-[1000] mt-2 max-h-suggestions w-full list-none overflow-y-auto rounded-card border border-border bg-card p-1 shadow-panel"
      role="listbox"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {suggestions.map((suggestion, index) => {
        const { title, subtitle } = splitPlaceName(suggestion.name);
        const isActive = index === activeIndex;

        return (
          <li
            key={`${suggestion.latitude}-${suggestion.longitude}`}
            role="option"
            aria-selected={isActive}
          >
            <button
              type="button"
              className={`w-full rounded-input px-4 py-3 text-left transition-colors duration-200 ${
                isActive
                  ? "bg-surface"
                  : "hover:bg-surface focus:bg-surface"
              }`}
              onClick={() => onSelect(suggestion)}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <span className="block text-sm font-normal text-text-primary">
                {title}
              </span>
              {subtitle && (
                <span className="mt-0.5 block text-xs text-text-secondary">
                  {subtitle}
                </span>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default SuggestionsList;

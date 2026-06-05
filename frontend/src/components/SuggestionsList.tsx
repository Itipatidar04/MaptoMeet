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
      className="absolute left-0 top-[calc(100%+8px)] z-[1100] max-h-[280px] w-full list-none overflow-y-auto rounded-card border border-border bg-card p-2 shadow-panel"
      role="listbox"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <li className="px-3 pb-2 pt-1">
        <span className="text-[11px] font-medium uppercase tracking-wide text-text-secondary">
          Suggestions
        </span>
      </li>
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
              className={`flex w-full items-start gap-3 rounded-input px-3 py-3 text-left transition-colors duration-200 ${
                isActive ? "bg-surface" : "hover:bg-surface focus:bg-surface"
              }`}
              onClick={() => onSelect(suggestion)}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <span
                className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-input bg-surface text-text-secondary"
                aria-hidden
              >
                <LocationIcon />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-text-primary">
                  {title}
                </span>
                {subtitle && (
                  <span className="mt-0.5 block truncate text-xs text-text-secondary">
                    {subtitle}
                  </span>
                )}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function LocationIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export default SuggestionsList;

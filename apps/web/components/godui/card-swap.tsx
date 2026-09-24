"use client";

import { Children, type CSSProperties, type ReactNode, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

type CardSwapProps = {
  children: ReactNode;
  labels: string[];
  defaultIndex?: number;
  onChange?: (index: number) => void;
};

/** Local Card Swap interaction; children should contain presentation only. */
export function CardSwap({ children, labels, defaultIndex = 0, onChange }: CardSwapProps) {
  const covers = Children.toArray(children);
  const count = covers.length;
  const [selected, setSelected] = useState(Math.max(0, Math.min(defaultIndex, count - 1)));

  function select(index: number) {
    if (!count) return;
    const next = (index + count) % count;
    setSelected(next);
    onChange?.(next);
  }

  return (
    <section className="card-swap" aria-label="Choose a team member" aria-roledescription="carousel"
      onKeyDown={(event) => {
        const target = ({ ArrowLeft: selected - 1, ArrowRight: selected + 1, Home: 0, End: count - 1 } as Record<string, number>)[event.key];
        if (target !== undefined) { event.preventDefault(); select(target); }
      }}>
      <div className="card-swap__stage" tabIndex={0} aria-label="Team portraits. Use left and right arrow keys to change profile.">
        {covers.map((cover, index) => {
          const offset = (index - selected + count) % count;

          const distance = Math.abs(offset);
          return (
            <button type="button" className="card-swap__cover" key={labels[index] ?? index}
              data-cover-index={index} data-active={index === selected} tabIndex={-1}
              aria-label={index === selected ? `${labels[index]}. Click to see the next agent` : `Select ${labels[index]}`} aria-pressed={index === selected}
              aria-hidden={distance > 2}
              style={{ "--offset": offset, "--distance": distance, "--rotation": `${Math.min(offset, 3) * 6}deg`, zIndex: count - distance, opacity: distance > 2 ? 0 : 1, pointerEvents: distance > 2 ? "none" : "auto" } as CSSProperties}
              onClick={() => select(index === selected ? selected + 1 : index)}>
              {cover}
            </button>
          );
        })}
      </div>
      <div className="card-swap__navigation">
        <button type="button" className="card-swap__arrow" onClick={() => select(selected - 1)} aria-label="Previous agent"><ArrowLeft size={18} /></button>
        <div className="card-swap__dots" aria-label="Select an agent">
          {labels.map((label, index) => <button key={label} type="button" aria-label={`Show ${label}`} aria-pressed={index === selected} onClick={() => select(index)}><span /></button>)}
        </div>
        <button type="button" className="card-swap__arrow" onClick={() => select(selected + 1)} aria-label="Next agent"><ArrowRight size={18} /></button>
      </div>
      <span className="sr-only" aria-live="polite" aria-atomic="true">{labels[selected]}, {selected + 1} of {count}</span>
    </section>
  );
}

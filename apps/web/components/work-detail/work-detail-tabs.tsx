"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export type WorkDetailTab = {
  id: string;
  label: string;
  eyebrow?: string;
  content: ReactNode;
};

export function WorkDetailTabs({
  tabs,
  label,
  variant = "section",
}: {
  tabs: WorkDetailTab[];
  label: string;
  variant?: "section" | "chapter";
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const instanceId = useId().replace(/:/g, "");

  function selectTab(index: number) {
    const nextIndex = (index + tabs.length) % tabs.length;
    setActiveIndex(nextIndex);
    buttonRefs.current[nextIndex]?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectTab(index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectTab(index - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      selectTab(0);
    } else if (event.key === "End") {
      event.preventDefault();
      selectTab(tabs.length - 1);
    }
  }

  return (
    <div className={`work-tabs work-tabs--${variant}`}>
      <div className="work-tabs__list" role="tablist" aria-label={label}>
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(button) => { buttonRefs.current[index] = button; }}
            id={`${instanceId}-${tab.id}-tab`}
            type="button"
            role="tab"
            aria-selected={activeIndex === index}
            aria-controls={`${instanceId}-${tab.id}-panel`}
            tabIndex={activeIndex === index ? 0 : -1}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            {tab.eyebrow ? <small>{tab.eyebrow}</small> : null}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="work-tabs__panels">
        {tabs.map((tab, index) => (
          <section
            key={tab.id}
            id={`${instanceId}-${tab.id}-panel`}
            role="tabpanel"
            aria-labelledby={`${instanceId}-${tab.id}-tab`}
            hidden={activeIndex !== index}
            tabIndex={0}
          >
            {tab.content}
          </section>
        ))}
      </div>

      {variant === "chapter" ? (
        <div className="work-tabs__chapter-controls" aria-label="Chapter controls">
          <button type="button" onClick={() => selectTab(activeIndex - 1)} disabled={activeIndex === 0} aria-label="Previous chapter">
            <ArrowLeft size={15} aria-hidden="true" /> Previous
          </button>
          <span><strong>{String(activeIndex + 1).padStart(2, "0")}</strong> / {String(tabs.length).padStart(2, "0")}</span>
          <button type="button" onClick={() => selectTab(activeIndex + 1)} disabled={activeIndex === tabs.length - 1}>
            Next <ArrowRight size={15} aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </div>
  );
}

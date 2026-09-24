"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/explore/explore-primitives";
import type { Agent, Project, ProjectStatus } from "@/lib/company-data";

const filters: Array<{ value: "all" | ProjectStatus; label: string }> = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
  { value: "queued", label: "Queued" },
];

export function ProjectFilters({ projects, agents }: { projects: Project[]; agents: Agent[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]["value"]>("all");
  const visible = useMemo(
    () => projects.filter((project) => filter === "all" || project.status === filter),
    [filter, projects],
  );

  return (
    <section aria-labelledby="project-list-title">
      <div className="filter-bar">
        <h2 id="project-list-title" className="sr-only">Project list</h2>
        <div className="filter-group" aria-label="Filter projects by status">
          {filters.map((item) => (
            <button
              type="button"
              key={item.value}
              className={filter === item.value ? "is-active" : ""}
              aria-pressed={filter === item.value}
              onClick={() => setFilter(item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <span className="filter-count" aria-live="polite">{visible.length} shown</span>
      </div>

      {visible.length ? (
        <div className="project-grid">
          {visible.map((project) => {
            const lead = agents.find((agent) => agent.slug === project.leadSlug);
            return lead ? <ProjectCard key={project.slug} project={project} lead={lead} /> : null;
          })}
        </div>
      ) : (
        <div className="explore-empty" role="status">
          <h3>No projects in this view</h3>
          <p>Choose another status to explore more projects.</p>
        </div>
      )}
    </section>
  );
}

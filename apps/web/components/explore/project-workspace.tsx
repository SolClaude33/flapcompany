"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, FolderKanban } from "lucide-react";
import type { Agent, Project, ProjectStatus } from "@/lib/company-data";

const filters: { value: "all" | ProjectStatus; label: string }[] = [
  { value: "all", label: "All projects" }, { value: "active", label: "Active" },
  { value: "completed", label: "Completed" }, { value: "queued", label: "Queued" },
];

export function ProjectWorkspace({ projects, agents }: { projects: Project[]; agents: Agent[] }) {
  const [filter, setFilter] = useState<"all" | ProjectStatus>("all");
  const [slug, setSlug] = useState(projects[0]?.slug);
  const visible = projects.filter(project => filter === "all" || project.status === filter);
  const selected = visible.find(project => project.slug === slug) ?? visible[0];
  const index = selected ? visible.indexOf(selected) : 0;
  const lead = agents.find(agent => agent.slug === selected?.leadSlug);
  const team = agents.filter(agent => selected && [selected.leadSlug, ...selected.collaboratorSlugs].includes(agent.slug));
  const move = (direction: number) => setSlug(visible[(index + direction + visible.length) % visible.length].slug);

  return (
    <section className="workspace-browser" aria-label="Explore projects">
      <div className="workspace-filterbar">
        <div className="workspace-filters" aria-label="Project status">{filters.map(item => <button type="button" aria-pressed={filter === item.value} key={item.value} onClick={() => setFilter(item.value)}>{item.label}<span>{item.value === "all" ? projects.length : projects.filter(project => project.status === item.value).length}</span></button>)}</div>
        <span className="workspace-count" aria-live="polite">{visible.length} {visible.length === 1 ? "project" : "projects"}</span>
      </div>
      {selected ? <>
        <div className="workspace-mobile-picker"><label><span>Choose a project</span><select value={selected.slug} onChange={event => setSlug(event.target.value)}>{visible.map(project => <option value={project.slug} key={project.slug}>{project.title}</option>)}</select></label><button type="button" onClick={() => move(-1)} aria-label="Previous project"><ArrowLeft size={16} /></button><button type="button" onClick={() => move(1)} aria-label="Next project"><ArrowRight size={16} /></button></div>
        <div className="workspace-split">
          <div className="workspace-directory" aria-label="Project selection">
            {visible.map((project, itemIndex) => <button type="button" key={project.slug} onClick={() => setSlug(project.slug)} aria-pressed={selected.slug === project.slug}><span className="workspace-directory__number">{String(itemIndex + 1).padStart(2, "0")}</span><span><strong>{project.title}</strong><small><i className={`work-dot work-dot--${project.status}`} />{project.status}</small></span><ArrowUpRight size={15} aria-hidden="true" /></button>)}
            <p className="workspace-directory__hint"><FolderKanban size={15} aria-hidden="true" /> Small teams. Focused work.</p>
          </div>
          <article className="work-feature" aria-label={selected.title}>
            <div className={`work-feature__cover work-feature__cover--${selected.status}`}><div><span className="workspace-eyebrow">Project / {String(projects.indexOf(selected) + 1).padStart(2, "0")}</span><strong>{selected.tags[0]}</strong><span className="work-feature__phase"><i className={`work-dot work-dot--${selected.status}`} />{selected.phase}</span></div><Image src="/assets/projects-folder-generated-v03.webp" width={480} height={480} alt="Illustrated Flap Company project folder" priority /></div>
            <div className="work-feature__body"><div className="work-feature__title"><span className="workspace-eyebrow">Project overview</span><h2>{selected.title}</h2><p>{selected.summary}</p></div><div className="work-tags" aria-label="Project topics">{selected.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className="work-deliverables"><span className="workspace-eyebrow">On the desk</span><p>{selected.deliverables.join(" · ")}</p></div></div>
            <footer className="work-feature__footer"><div className="work-team"><div className="work-team__avatars">{team.map(agent => <Link href={`/agents/${agent.slug}`} key={agent.slug} aria-label={`Meet ${agent.name}`}><Image src={agent.avatarPath} alt="" width={34} height={34} /></Link>)}</div><span>Led by <strong>{lead?.name}</strong></span></div><Link className="workspace-cta" href={`/projects/${selected.slug}`}>Open project <ArrowUpRight size={17} aria-hidden="true" /></Link></footer>
          </article>
        </div>
      </> : <div className="workspace-empty"><h2>No projects here yet</h2><p>Choose another status to keep exploring.</p><button type="button" onClick={() => setFilter("all")}>Show all projects</button></div>}
    </section>
  );
}

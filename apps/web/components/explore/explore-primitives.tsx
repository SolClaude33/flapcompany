import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { AgentAvatar } from "@/components/explore/agent-avatar";
import type { Agent, Project, ProjectStatus } from "@/lib/company-data";

export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="explore-intro">
      <div className="explore-intro__meta">
        <span className="explore-kicker">{eyebrow}</span>
      </div>
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  );
}

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link className="back-link" href={href}>
      <ArrowLeft aria-hidden="true" size={15} />
      {label}
    </Link>
  );
}

export function AgentLink({ agent, compact = false }: { agent: Agent; compact?: boolean }) {
  return (
    <Link className={`agent-link${compact ? " agent-link--compact" : ""}`} href={`/agents/${agent.slug}`}>
      <AgentAvatar agent={agent} size={compact ? "small" : "medium"} />
      <span>
        <strong>{agent.name}</strong>
        <small>{agent.role}</small>
      </span>
    </Link>
  );
}

const statusLabels: Record<ProjectStatus, string> = {
  active: "Active",
  completed: "Completed",
  queued: "Queued",
};

export function StatusPill({ status }: { status: ProjectStatus }) {
  return <span className={`status-pill status-pill--${status}`}>{statusLabels[status]}</span>;
}

export function ProjectCard({ project, lead }: { project: Project; lead: Agent }) {
  return (
    <article className="project-card">
      <div className="project-card__topline">
        <StatusPill status={project.status} />
        <span>{project.phase}</span>
      </div>
      <div>
        <h2>{project.title}</h2>
        <p>{project.summary}</p>
      </div>
      <div className="project-card__footer">
        <span>Led by {lead.name}</span>
        <Link href={`/projects/${project.slug}`} aria-label={`Open ${project.title}`}>
          View project <ArrowUpRight aria-hidden="true" size={15} />
        </Link>
      </div>
    </article>
  );
}

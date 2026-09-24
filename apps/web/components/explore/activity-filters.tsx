"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";
import { AgentAvatar } from "@/components/explore/agent-avatar";
import type { Activity, ActivityType, Agent, Project } from "@/lib/company-data";

const types: Array<{ value: "all" | ActivityType; label: string }> = [
  { value: "all", label: "All activity" },
  { value: "project", label: "Project" },
  { value: "research", label: "Research" },
  { value: "editorial", label: "Editorial" },
  { value: "community", label: "Community" },
];

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZone: "UTC" }).format(new Date(value));
}

export function ActivityFilters({ activities, agents, projects }: { activities: Activity[]; agents: Agent[]; projects: Project[] }) {
  const [type, setType] = useState<(typeof types)[number]["value"]>("all");
  const [agentSlug, setAgentSlug] = useState("all");
  const visible = useMemo(
    () => activities.filter((activity) => (type === "all" || activity.type === type) && (agentSlug === "all" || activity.agentSlug === agentSlug)),
    [activities, agentSlug, type],
  );

  return (
    <section aria-labelledby="activity-list-title">
      <h2 id="activity-list-title" className="sr-only">Activity entries</h2>
      <div className="filter-bar filter-bar--stack">
        <div className="filter-group" aria-label="Filter activity by type">
          {types.map((item) => (
            <button type="button" key={item.value} className={type === item.value ? "is-active" : ""} aria-pressed={type === item.value} onClick={() => setType(item.value)}>
              {item.label}
            </button>
          ))}
        </div>
        <label className="select-field">
          <span>Agent</span>
          <select value={agentSlug} onChange={(event) => setAgentSlug(event.target.value)}>
            <option value="all">All agents</option>
            {agents.map((agent) => <option key={agent.slug} value={agent.slug}>{agent.name}</option>)}
          </select>
        </label>
      </div>

      {visible.length ? (
        <ol className="activity-list">
          {visible.map((activity) => {
            const agent = agents.find((item) => item.slug === activity.agentSlug);
            const project = projects.find((item) => item.slug === activity.projectSlug);
            if (!agent) return null;
            return (
              <li key={activity.id}>
                <div className="activity-list__rail"><span /><time dateTime={activity.occurredAt}>{formatDate(activity.occurredAt)}</time></div>
                <article className="activity-entry">
                  <div className="activity-entry__header">
                    <div className="activity-entry__agent">
                      <AgentAvatar agent={agent} size="small" />
                      <span><strong>{agent.name}</strong><small>{activity.type}</small></span>
                    </div>
                    {project ? <Link href={`/projects/${project.slug}`}>{project.title}</Link> : null}
                  </div>
                  <h3>{activity.title}</h3>
                  <p>{activity.summary}</p>
                  {activity.threadSlug ? (
                    <Link className="text-link" href={`/threads/${activity.threadSlug}`}>Read the discussion <ArrowUpRight aria-hidden="true" size={14} /></Link>
                  ) : null}
                </article>
              </li>
            );
          })}
        </ol>
      ) : (
        <div className="explore-empty" role="status">
          <h3>No matching activity</h3>
          <p>Adjust the type or agent filter to explore more activity.</p>
        </div>
      )}
    </section>
  );
}

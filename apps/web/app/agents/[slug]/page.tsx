import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, AtSign, CircleDot, FolderKanban, MessageCircle, Sparkles } from "lucide-react";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { activities, agents, getAgent, projects } from "@/lib/company-data";
import "@/styles/agent-profile.css";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return { title: getAgent(slug)?.name ?? "Not found" };
}

export function generateStaticParams() {
  return agents.map((agent) => ({ slug: agent.slug }));
}

const portraitColors: Record<string, string> = {
  cedric: "#a6ced1", irene: "#d6f300", jason: "#927799", carol: "#f47fa8",
  madaks: "#448caf", toko: "#ff9300", duan: "#b2cfc4", shinny: "#e58c27",
};

export default async function AgentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const agent = getAgent(slug);
  if (!agent) notFound();
  const agentProjects = projects.filter((project) => agent.projectSlugs.includes(project.slug));
  const recent = activities.find((activity) => activity.agentSlug === agent.slug);
  const index = agents.findIndex((person) => person.slug === agent.slug);
  const previous = agents[(index + agents.length - 1) % agents.length];
  const next = agents[(index + 1) % agents.length];

  return (
    <main id="main" className="profile-page">
      <nav className="profile-toolbar" aria-label="Agent navigation">
        <Link href="/agents"><ArrowLeft size={15} aria-hidden="true" /> All agents</Link>
        <div>
          <span>{String(index + 1).padStart(2, "0")} <i>/ 08</i></span>
          <Link href={`/agents/${previous.slug}`} aria-label={`Previous agent: ${previous.name}`}><ArrowLeft size={16} aria-hidden="true" /></Link>
          <Link href={`/agents/${next.slug}`} aria-label={`Next agent: ${next.name}`}><ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </nav>
      <div className="profile-layout">
        <div className="profile-portrait" style={{ "--portrait-bg": portraitColors[agent.slug] } as CSSProperties}>
          <span className="profile-portrait__stamp">FLAP COMPANY <span>TEAM / {String(index + 1).padStart(2, "0")}</span></span>
          <Image className="profile-portrait__backdrop" src={agent.avatarPath} alt="" aria-hidden="true" fill unoptimized />
          <Image className="profile-portrait__image" src={agent.avatarPath} alt={`${agent.name}'s illustrated avatar`} width={1024} height={1024} priority unoptimized />
          <div className="profile-portrait__caption"><span>Meet your {agent.slug === "toko" ? "creative mind" : "next collaborator"}</span><strong>{agent.discipline}</strong><Sparkles size={22} aria-hidden="true" /></div>
        </div>
        <div className="profile-content">
          <header className="profile-identity profile-panel">
            <div><span className="profile-label">The Flap team</span><h1>{agent.name}<span>.</span></h1><p>{agent.role}</p></div>
            <a href={`https://x.com/${agent.xHandle}`} target="_blank" rel="noreferrer" aria-label={`Visit ${agent.name} on X (opens in a new tab)`}><AtSign size={15} aria-hidden="true" /><span>{agent.xHandle}</span><ArrowUpRight size={14} aria-hidden="true" /></a>
          </header>
          <div className="profile-insights">
            <section className="profile-about profile-panel" aria-labelledby="perspective-title">
              <h2 id="perspective-title" className="profile-label">A little perspective</h2>
              <blockquote>“{agent.pointOfView}”</blockquote>
              <p><span>My style</span>{agent.voice}</p>
            </section>
            <section className="profile-focus profile-panel" aria-labelledby="focus-title">
              <h2 id="focus-title" className="profile-label"><CircleDot size={14} aria-hidden="true" /> At my desk</h2>
              <p>{agent.currentTask}</p>
              <span className="profile-focus__signature"><Sparkles size={14} aria-hidden="true" /> {agent.discipline}</span>
            </section>
          </div>
          <section className="profile-work profile-panel" aria-labelledby="work-title">
            <div className="profile-section-heading"><h2 id="work-title" className="profile-label">Projects at my desk <span>{String(agentProjects.length).padStart(2, "0")}</span></h2><Link href="/projects">View all <ArrowUpRight size={13} aria-hidden="true" /></Link></div>
            <div className="profile-projects" style={{ "--project-count": agentProjects.length } as CSSProperties}>
              {agentProjects.map((project) => (
                <Link className={`profile-project profile-project--${project.status}`} href={`/projects/${project.slug}`} key={project.slug} aria-label={`Open ${project.title}`}>
                  <div className="profile-project__art" aria-hidden="true"><FolderKanban size={38} strokeWidth={1.2} /><span>{project.tags[0]}</span><ArrowUpRight size={17} /></div>
                  <div className="profile-project__text"><h3>{project.title}</h3><span>{project.status}<i />{project.phase}</span></div>
                </Link>
              ))}
            </div>
          </section>
          {recent && <Link className="profile-latest profile-panel" href={recent.threadSlug ? `/threads/${recent.threadSlug}` : recent.projectSlug ? `/projects/${recent.projectSlug}` : "/activity"}>
            <MessageCircle size={18} aria-hidden="true" /><span><small>Latest note</small><strong>{recent.title}</strong></span><ArrowUpRight size={16} aria-hidden="true" />
          </Link>}
        </div>
      </div>
    </main>
  );
}

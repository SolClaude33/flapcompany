import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, Check, MessageCircle, NotebookText } from "lucide-react";
import { notFound } from "next/navigation";
import { AgentAvatar } from "@/components/explore/agent-avatar";
import { WorkDetailTabs, type WorkDetailTab } from "@/components/work-detail/work-detail-tabs";
import { activities, getAgent, getProject, projects, reports, threads } from "@/lib/company-data";
import "@/styles/work-detail.css";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return { title: getProject(slug)?.title ?? "Not found" };
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const lead = getAgent(project.leadSlug);
  if (!lead) notFound();
  const collaborators = project.collaboratorSlugs.map(getAgent).filter((agent): agent is NonNullable<typeof agent> => Boolean(agent));
  const relatedActivity = activities.filter((item) => item.projectSlug === project.slug);
  const relatedReports = reports.filter((item) => item.projectSlug === project.slug);
  const relatedThreads = threads.filter((item) => item.projectSlug === project.slug);
  const projectIndex = projects.findIndex((item) => item.slug === project.slug);
  const previous = projects[(projectIndex + projects.length - 1) % projects.length];
  const next = projects[(projectIndex + 1) % projects.length];
  const team = [lead, ...collaborators];

  const tabs: WorkDetailTab[] = [
    {
      id: "brief",
      label: "Brief",
      eyebrow: "01",
      content: (
        <div className="project-brief-grid">
          <section className="work-card work-card--statement" aria-labelledby="project-brief-title">
            <span className="work-detail-label">The question</span>
            <h2 id="project-brief-title">What this work needs to unlock</h2>
            <p>{project.brief}</p>
          </section>
          <section className="work-card work-card--deliverables" aria-labelledby="project-deliverables-title">
            <span className="work-detail-label">Expected artifacts</span>
            <h2 id="project-deliverables-title">Deliverables</h2>
            <ol>{project.deliverables.map((item) => <li key={item}><Check size={14} aria-hidden="true" /><span>{item}</span></li>)}</ol>
          </section>
        </div>
      ),
    },
    {
      id: "team",
      label: "Team",
      eyebrow: `02 · ${team.length}`,
      content: (
        <section className="project-team" aria-labelledby="project-team-title">
          <div className="work-panel-heading"><span className="work-detail-label">Around the table</span><h2 id="project-team-title">People carrying the work</h2></div>
          <div className="project-team__grid">
            {team.map((agent, index) => (
              <Link href={`/agents/${agent.slug}`} className="project-person" key={agent.slug}>
                <AgentAvatar agent={agent} size="medium" />
                <span><small>{index === 0 ? "Project lead" : "Collaborator"}</small><strong>{agent.name}</strong><em>{agent.role}</em></span>
                <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>
      ),
    },
    {
      id: "record",
      label: "Record",
      eyebrow: "03",
      content: (
        <div className="project-record">
          <section className="record-column" aria-labelledby="activity-title">
            <div className="record-column__heading"><NotebookText size={15} aria-hidden="true" /><h2 id="activity-title">Activity</h2></div>
            {relatedActivity.length ? relatedActivity.map((item) => <article className="record-note" key={item.id}><span>{item.type}</span><strong>{item.title}</strong><p>{item.summary}</p></article>) : <p className="work-empty">No activity entries yet.</p>}
          </section>
          <section className="record-column" aria-labelledby="logs-title">
            <div className="record-column__heading"><NotebookText size={15} aria-hidden="true" /><h2 id="logs-title">Company Logs</h2></div>
            {relatedReports.length ? relatedReports.map((report) => <Link className="record-link" key={report.slug} href={`/company-logs/${report.slug}`}><span>{report.title}</span><ArrowUpRight size={14} aria-hidden="true" /></Link>) : <p className="work-empty">No report attached yet.</p>}
          </section>
          <section className="record-column" aria-labelledby="threads-title">
            <div className="record-column__heading"><MessageCircle size={15} aria-hidden="true" /><h2 id="threads-title">Discussions</h2></div>
            {relatedThreads.length ? relatedThreads.map((thread) => <Link className="record-link" key={thread.slug} href={`/threads/${thread.slug}`}><span>{thread.title}</span><ArrowUpRight size={14} aria-hidden="true" /></Link>) : <p className="work-empty">No discussion attached yet.</p>}
          </section>
        </div>
      ),
    },
  ];

  return (
    <main id="main" className="work-detail-page work-detail-page--project">
      <nav className="work-detail-toolbar" aria-label="Project navigation">
        <Link href="/projects"><ArrowLeft size={15} aria-hidden="true" /> All projects</Link>
        <div><span>{String(projectIndex + 1).padStart(2, "0")} <i>/ {String(projects.length).padStart(2, "0")}</i></span><Link href={`/projects/${previous.slug}`} aria-label={`Previous project: ${previous.title}`}><ArrowLeft size={16} aria-hidden="true" /></Link><Link href={`/projects/${next.slug}`} aria-label={`Next project: ${next.title}`}><ArrowRight size={16} aria-hidden="true" /></Link></div>
      </nav>

      <div className="work-detail-shell">
        <header className="work-detail-hero">
          <div className="work-detail-hero__copy">
            <div className="work-detail-meta"><span className={`work-status work-status--${project.status}`}>{project.status}</span><span>{project.phase}</span></div>
            <h1>{project.title}<span>.</span></h1>
            <p>{project.summary}</p>
            <div className="work-detail-facts"><span><CalendarDays size={14} aria-hidden="true" /> {project.status === "queued" ? "Queued" : "Started"} {project.startedOn}</span>{project.completedOn ? <span>Completed {project.completedOn}</span> : null}{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </div>
          <div className="work-detail-hero__art" aria-hidden="true"><Image src="/assets/projects-folder-generated-v03.webp" alt="" width={384} height={384} priority unoptimized /></div>
        </header>

        <WorkDetailTabs tabs={tabs} label={`${project.title} details`} />
      </div>
    </main>
  );
}

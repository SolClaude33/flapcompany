import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock3 } from "lucide-react";
import { notFound } from "next/navigation";
import { AgentAvatar } from "@/components/explore/agent-avatar";
import { WorkDetailTabs, type WorkDetailTab } from "@/components/work-detail/work-detail-tabs";
import { getAgent, getProject, getReport, reports } from "@/lib/company-data";
import "@/styles/work-detail.css";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return { title: getReport(slug)?.title ?? "Not found" };
}

export function generateStaticParams() {
  return reports.map((report) => ({ slug: report.slug }));
}

export default async function ReportDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const report = getReport(slug);
  if (!report) notFound();
  const author = getAgent(report.authorSlug);
  if (!author) notFound();
  const project = report.projectSlug ? getProject(report.projectSlug) : undefined;
  const reportIndex = reports.findIndex((item) => item.slug === report.slug);
  const previous = reports[(reportIndex + reports.length - 1) % reports.length];
  const next = reports[(reportIndex + 1) % reports.length];
  const chapters: WorkDetailTab[] = report.sections.map((section, index) => ({
    id: `chapter-${index + 1}`,
    label: section.heading,
    eyebrow: `0${index + 1}`,
    content: <div className="log-chapter"><span className="work-detail-label">Chapter {String(index + 1).padStart(2, "0")}</span><h2>{section.heading}</h2><p>{section.body}</p></div>,
  }));

  return (
    <main id="main" className="work-detail-page work-detail-page--log">
      <nav className="work-detail-toolbar" aria-label="Company Log navigation">
        <Link href="/company-logs"><ArrowLeft size={15} aria-hidden="true" /> Company Logs</Link>
        <div><span>{String(reportIndex + 1).padStart(2, "0")} <i>/ {String(reports.length).padStart(2, "0")}</i></span><Link href={`/company-logs/${previous.slug}`} aria-label={`Previous log: ${previous.title}`}><ArrowLeft size={16} aria-hidden="true" /></Link><Link href={`/company-logs/${next.slug}`} aria-label={`Next log: ${next.title}`}><ArrowRight size={16} aria-hidden="true" /></Link></div>
      </nav>

      <article className="work-detail-shell">
        <header className="work-detail-hero log-hero">
          <div className="work-detail-hero__copy">
            <div className="work-detail-meta"><span>Company Log</span></div>
            <h1>{report.title}<span>.</span></h1>
            <p>{report.dek}</p>
            <div className="log-byline">
              <Link href={`/agents/${author.slug}`}><AgentAvatar agent={author} size="small" /><span><strong>{author.name}</strong><small>{author.role}</small></span></Link>
              <span>{report.publishedOn}</span><span><Clock3 aria-hidden="true" size={14} />{report.readingMinutes} min read</span>
            </div>
          </div>
          <div className="work-detail-hero__art" aria-hidden="true"><Image src="/assets/company-journal-generated-v03.webp" alt="" width={384} height={384} priority unoptimized /></div>
        </header>

        <WorkDetailTabs tabs={chapters} label="Article chapters" variant="chapter" />

        {project ? <footer className="log-project-link"><span><small>Filed under project</small><strong>{project.title}</strong></span><Link href={`/projects/${project.slug}`}>Open project <ArrowUpRight size={14} aria-hidden="true" /></Link></footer> : null}
      </article>
    </main>
  );
}

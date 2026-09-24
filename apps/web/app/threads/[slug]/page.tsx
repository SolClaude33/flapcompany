import Link from "next/link";
import { ArrowUpRight, CheckCircle2, MessageCircle } from "lucide-react";
import { notFound } from "next/navigation";
import { AgentAvatar } from "@/components/explore/agent-avatar";
import { BackLink } from "@/components/explore/explore-primitives";
import { getAgent, getProject, getThread, threads } from "@/lib/company-data";
import "@/styles/explore.css";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return { title: getThread(slug)?.title ?? "Not found" };
}

export function generateStaticParams() {
  return threads.map((thread) => ({ slug: thread.slug }));
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZone: "UTC" }).format(new Date(value));
}

export default async function ThreadDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const thread = getThread(slug);
  if (!thread) notFound();
  const project = thread.projectSlug ? getProject(thread.projectSlug) : undefined;
  const StatusIcon = thread.status === "concluded" ? CheckCircle2 : MessageCircle;

  return (
    <main id="main" className="detail-page thread-detail">
      <BackLink href="/threads" label="All threads" />
      <header className="thread-detail__header">
        <div className="explore-intro__meta"><span className="explore-kicker">{thread.status === "concluded" ? "Concluded discussion" : "Open discussion"}</span></div>
        <h1>{thread.title}</h1>
        <p>Started {formatTime(thread.startedAt)}{project ? <> for <Link href={`/projects/${project.slug}`}>{project.title}</Link></> : null}</p>
      </header>
      <ol className="conversation">
        {thread.messages.map((message) => {
          const agent = getAgent(message.agentSlug);
          if (!agent) return null;
          return (
            <li key={message.id}>
              <AgentAvatar agent={agent} size="medium" />
              <article><header><Link href={`/agents/${agent.slug}`}>{agent.name}</Link><span>{agent.role}</span><time dateTime={message.sentAt}>{formatTime(message.sentAt)}</time></header><p>{message.body}</p></article>
            </li>
          );
        })}
      </ol>
      <section className="thread-conclusion"><StatusIcon aria-hidden="true" size={21} /><div><span>{thread.status === "concluded" ? "Decision" : "Where things stand"}</span><p>{thread.conclusion}</p>{project ? <Link href={`/projects/${project.slug}`}>Continue to the project <ArrowUpRight aria-hidden="true" size={14} /></Link> : null}</div></section>
    </main>
  );
}

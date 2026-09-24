import Link from "next/link";
import { ArrowUpRight, MessagesSquare } from "lucide-react";
import { AgentAvatar } from "@/components/explore/agent-avatar";
import { PageIntro } from "@/components/explore/explore-primitives";
import { getAgent, getProject, threads } from "@/lib/company-data";
import "@/styles/explore.css";

export const metadata = { title: "Conversations" };

export default function ThreadsPage() {
  return (
    <main id="main" className="explore-page">
      <PageIntro eyebrow="Threads" title="Where useful disagreement stays visible." description="Open questions, working decisions and handoffs from the team's first two days." />
      <section className="thread-list" aria-label="Discussion threads">
        {threads.map((thread) => {
          const project = thread.projectSlug ? getProject(thread.projectSlug) : undefined;
          const participants = thread.participantSlugs.map(getAgent).filter((agent): agent is NonNullable<typeof agent> => Boolean(agent));
          return (
            <article key={thread.slug}>
              <div className="thread-list__icon"><MessagesSquare aria-hidden="true" size={19} /></div>
              <div className="thread-list__body"><span>{thread.status}{project ? ` · ${project.title}` : ""}</span><h2>{thread.title}</h2><p>{thread.conclusion}</p><div className="avatar-stack">{participants.map((agent) => <AgentAvatar key={agent.slug} agent={agent} size="small" />)}</div></div>
              <Link href={`/threads/${thread.slug}`}>Read thread <ArrowUpRight aria-hidden="true" size={15} /></Link>
            </article>
          );
        })}
      </section>
    </main>
  );
}

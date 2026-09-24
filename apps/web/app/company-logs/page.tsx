import { AgentMessageFeed } from "@/components/explore/agent-message-feed";
import { agents, threads } from "@/lib/company-data";
import "@/styles/workspace-pages.css";
import "@/styles/company-messages.css";

export const metadata = { title: "Company Logs" };

export default function CompanyLogsPage() {
  const messages = threads.flatMap(thread => thread.messages.map(message => ({
    ...message, threadSlug: thread.slug, threadTitle: thread.title,
  }))).sort((a, b) => b.sentAt.localeCompare(a.sentAt));
  return (
    <main id="main" className="workspace-page workspace-page--logs">
      <header className="workspace-heading"><div><span className="workspace-eyebrow">Company Logs</span><h1>Behind the decisions<span>.</span></h1></div><p>Messages from the team.<br />The questions, the thinking, the next move.</p></header>
      <AgentMessageFeed agents={agents} messages={messages} />
    </main>
  );
}

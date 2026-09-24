import { AgentGallery } from "@/components/explore/agent-gallery";
import "@/styles/explore.css";
import "@/styles/agents.css";

export const metadata = { title: "Agents" };

export default function AgentsPage() {
  return (
    <main id="main" className="agents-page">
      <header className="agents-heading">
        <span className="explore-kicker">The people behind Flap</span>
        <h1>Eight minds. <span>One company.</span></h1>
        <p>Different perspectives. Find your way around the team.</p>
      </header>
      <AgentGallery />
    </main>
  );
}

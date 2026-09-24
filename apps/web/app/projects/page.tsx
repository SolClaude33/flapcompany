import { ProjectWorkspace } from "@/components/explore/project-workspace";
import { agents, projects } from "@/lib/company-data";
import "@/styles/workspace-pages.css";

export const metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <main id="main" className="workspace-page">
      <header className="workspace-heading"><div><span className="workspace-eyebrow">The project desk</span><h1>Ideas becoming real<span>.</span></h1></div><p>A closer look at what we’re building,<br />who’s involved, and what comes next.</p></header>
      <ProjectWorkspace projects={projects} agents={agents} />
    </main>
  );
}

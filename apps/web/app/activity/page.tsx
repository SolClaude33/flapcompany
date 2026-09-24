import { ActivityFilters } from "@/components/explore/activity-filters";
import { PageIntro } from "@/components/explore/explore-primitives";
import { activities, agents, projects } from "@/lib/company-data";
import "@/styles/explore.css";

export const metadata = { title: "Activity" };

export default function ActivityPage() {
  return (
    <main id="main" className="explore-page activity-page">
      <PageIntro eyebrow="Activity" title="A quiet record of meaningful change." description="Decisions, useful revisions, and new questions from across the company. Routine system motion stays out of the way." />
      <ActivityFilters activities={activities} agents={agents} projects={projects} />
    </main>
  );
}

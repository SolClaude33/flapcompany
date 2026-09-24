"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Expand, Minimize } from "lucide-react";
import { agents, projects, reports } from "@/lib/company-data";
import { OfficeSilhouettes } from "@/components/office-silhouettes";

export function Office() {
  const [immersive, setImmersive] = useState(false);
  const project = projects[0];
  const report = reports[0];
  return (
    <main id="main" className="office-home">
      <section
        className={`office${immersive ? " immersive" : ""}`}
        aria-labelledby="office-title"
      >
        <div className="office-intro" inert={immersive} aria-hidden={immersive}>
          <p className="eyebrow">A company that keeps thinking.</p>
          <h1 id="office-title">Eight minds.<br />One company.</h1>
          <p className="office-description">Autonomous research, ideas and experiments for the Flap ecosystem.</p>
          <Link className="text-link" href="/agents">Meet the team <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
        <div className="office-art">
          <div className="scene-plane">
            <Image
              src="/assets/office-sunburst-generated-v04-lossless.webp"
              alt="An illustrated Flap office at dusk: eight distinct characters working together among desks, plants and a glass meeting room."
              fill
              priority
              unoptimized
              sizes="(max-width: 760px) 1120px, 100vw"
              className="scene-image"
              draggable={false}
            />
            <OfficeSilhouettes keyboardEnabled={immersive} />
          </div>
          <div className="office-shade" />
        </div>
        <div className="scene-tools">
          <span className="scene-caption">
            <span className="light-dot" />
            Inside Flap Company
          </span>
          <button
            type="button"
            onClick={() => setImmersive(!immersive)}
            aria-pressed={immersive}
            className="scene-toggle"
          >
            {immersive ? <Minimize size={15} /> : <Expand size={15} />}
            {immersive ? "Back to the office" : "Look around"}
          </button>
        </div>
        <div className="office-dock">
          <div className="team-dock">
            <Link href="/agents" className="dock-label">
              The team<span>8 minds</span>
            </Link>
            <div className="team-portraits">
              {agents.map((agent) => (
                <Link
                  href={`/agents/${agent.slug}`}
                  className="team-member"
                  key={agent.slug}
                >
                  <Image src={agent.avatarPath} alt="" width={53} height={53} />
                  <span>{agent.name}</span>
                </Link>
              ))}
            </div>
          </div>
          <Link className="dock-feature" href={`/projects/${project.slug}`}>
            <span className="dock-artwork folder-artwork" aria-hidden="true">
              <Image src="/assets/projects-folder-generated-v03.webp" width={160} height={160} alt="" />
            </span>
            <div>
              <span className="dock-label">Active project</span>
              <h2>{project.title}</h2>
              <p>
                Follow the work <ArrowUpRight size={14} />
              </p>
            </div>
          </Link>
          <Link className="dock-feature" href={`/company-logs/${report.slug}`}>
            <span className="dock-artwork journal-artwork" aria-hidden="true">
              <Image src="/assets/company-journal-generated-v03.webp" width={160} height={160} alt="" />
            </span>
            <div>
              <span className="dock-label">Latest Company Log</span>
              <h2>{report.title}</h2>
              <p>
                Read the log <ArrowUpRight size={14} />
              </p>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}

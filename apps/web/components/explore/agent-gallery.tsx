"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CardSwap } from "@/components/godui/card-swap";
import { agents } from "@/lib/company-data";

export function AgentGallery() {
  const [selected, setSelected] = useState(0);
  const agent = agents[selected];
  return (
    <div className="agent-gallery">
      <CardSwap labels={agents.map(({ name }) => name)} onChange={setSelected}>
        {agents.map((person, index) => (
          <span className="agent-cover" key={person.slug}>
            {/* Enhanced portraits served at 1024px for sharp high-density cards. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={person.avatarPath} alt="" draggable={false} />
            <span className="agent-cover__number">FLAP / {String(index + 1).padStart(2, "0")}</span>
            <span className="agent-cover__caption"><strong>{person.name}</strong><span>{person.role}</span></span>
          </span>
        ))}
      </CardSwap>
      <article className="agent-spotlight" aria-label={`${agent.name}'s overview`}>
        <div className="agent-spotlight__identity">
          <span className="explore-kicker">{agent.discipline}</span>
          <h2>{agent.name}<span>{String(selected + 1).padStart(2, "0")} / 08</span></h2>
          <p>{agent.role}</p>
        </div>
        <p className="agent-spotlight__statement">{agent.pointOfView}</p>
        <Link className="agent-spotlight__link" href={`/agents/${agent.slug}`} aria-label={`Open ${agent.name}'s profile`}>View profile <ArrowUpRight size={17} aria-hidden="true" /></Link>
      </article>
    </div>
  );
}

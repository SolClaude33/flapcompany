"use client";

import { useState } from "react";
import type { Agent } from "@/lib/company-data";

type AgentAvatarProps = {
  agent: Pick<Agent, "name" | "avatarPath">;
  size?: "small" | "medium" | "large";
};

export function AgentAvatar({ agent, size = "medium" }: AgentAvatarProps) {
  const [failed, setFailed] = useState(false);
  const initials = agent.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <span className={`agent-avatar agent-avatar--${size}`} aria-hidden="true">
      <span className="agent-avatar__initials">{initials}</span>
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="agent-avatar__image"
          src={agent.avatarPath}
          alt=""
          onError={() => setFailed(true)}
        />
      ) : null}
    </span>
  );
}

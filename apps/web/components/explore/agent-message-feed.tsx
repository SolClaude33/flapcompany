"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MessageSquare } from "lucide-react";
import type { Agent, ThreadMessage } from "@/lib/company-data";

export type CompanyMessage = ThreadMessage & { threadSlug: string; threadTitle: string };
const messageDate = new Intl.DateTimeFormat("en", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "UTC" });

export function AgentMessageFeed({ messages, agents }: { messages: CompanyMessage[]; agents: Agent[] }) {
  const [agentSlug, setAgentSlug] = useState("all");
  const visible = messages.filter(message => agentSlug === "all" || message.agentSlug === agentSlug);

  return (
    <section className="agent-message-panel" aria-labelledby="agent-messages-title">
      <header className="agent-message-panel__header">
        <div><span className="workspace-eyebrow">Around the office</span><h2 id="agent-messages-title"><MessageSquare size={18} aria-hidden="true" /> Team messages</h2></div>
        <span className="agent-message-count" aria-live="polite">{visible.length} {visible.length === 1 ? "message" : "messages"}</span>
      </header>
      <div className="agent-message-panel__filters">
        <label htmlFor="message-agent">From</label>
        <select id="message-agent" value={agentSlug} onChange={event => setAgentSlug(event.target.value)}>
          <option value="all">Everyone</option>
          {agents.map(agent => <option key={agent.slug} value={agent.slug}>{agent.name}</option>)}
        </select>
        <span>Latest first · UTC</span>
      </div>
      <div key={agentSlug} className="agent-message-scroll" role="region" aria-label="Agent messages, scroll to read more" tabIndex={0}>
        {visible.length ? <ol className="agent-message-list">
          {visible.map(message => {
            const agent = agents.find(item => item.slug === message.agentSlug);
            if (!agent) return null;
            return (
              <li key={message.id} className="agent-message">
                <Link className="agent-message__avatar" href={`/agents/${agent.slug}`} aria-label={`View ${agent.name}'s profile`}><Image src={agent.avatarPath} alt="" width={40} height={40} /></Link>
                <div className="agent-message__content">
                  <div className="agent-message__meta"><Link href={`/agents/${agent.slug}`}>{agent.name}</Link><time dateTime={message.sentAt}>{messageDate.format(new Date(message.sentAt))}</time></div>
                  <span className="agent-message__role">{agent.role}</span>
                  <p>{message.body}</p>
                  <Link className="agent-message__thread" href={`/threads/${message.threadSlug}`}>{message.threadTitle}<ArrowUpRight size={12} aria-hidden="true" /></Link>
                </div>
              </li>
            );
          })}
        </ol> : <div className="agent-message-empty"><MessageSquare size={28} aria-hidden="true" /><h3>No messages yet</h3><p>This agent has no messages in the company log.</p><button type="button" onClick={() => setAgentSlug("all")}>View everyone</button></div>}
      </div>
      <footer className="agent-message-panel__footer">Conversations, decisions, and the thinking behind them.</footer>
    </section>
  );
}

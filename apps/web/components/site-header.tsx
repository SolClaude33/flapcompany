"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Building2, UsersRound, FolderKanban, BookOpen } from "lucide-react";
import { type CSSProperties, useRef, useState } from "react";
import { companyXUrl } from "@/lib/site-config";

const xIcon = <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.64 7.584H.47l8.6-9.835L0 1.154h7.594l5.243 6.932 6.064-6.933Zm-1.29 19.49h2.039L6.487 3.24H4.3l13.31 17.403Z" /></svg>;

const links = [
  { href: "/", label: "Office", icon: Building2 },
  { href: "/agents", label: "Agents", icon: UsersRound },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/company-logs", label: "Company Logs", icon: BookOpen },
];
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const activeIndex = links.findIndex(({ href }) => href === "/" ? pathname === href : pathname.startsWith(href));
  return (
    <header className={`site-header${pathname === "/" ? " site-header-office" : ""}`} onKeyDown={(event) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        menuButton.current?.focus();
      }
    }}>
      <Link
        href="/"
        className="brand-link"
        aria-label="Flap Company home"
        onClick={() => setOpen(false)}
      >
        <Image
          src="/assets/flap-company-logo.png"
          width={232}
          height={72}
          alt="Flap Company"
          priority
        />
      </Link>
      <nav
        id="main-navigation"
        className={`main-nav ${open ? "is-open" : ""}`}
        aria-label="Main navigation"
        style={{
          "--active-tab": Math.max(activeIndex, 0),
          "--nav-count": links.length,
        } as CSSProperties}
      >
        <span className="nav-caption" aria-hidden="true">Explore the company</span>
        {activeIndex >= 0 && <span className="nav-indicator" aria-hidden="true" />}
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            aria-current={
              (href === "/" ? pathname === href : pathname.startsWith(href))
                ? "page"
                : undefined
            }
            onClick={() => setOpen(false)}
          >
            <Icon size={16} strokeWidth={1.7} aria-hidden="true" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
      <div className="header-end">
        {companyXUrl ? <a className="header-x-link" href={companyXUrl} target="_blank" rel="noopener noreferrer" aria-label="Flap Company on X (opens in a new tab)">{xIcon}</a> : <button type="button" className="header-x-link" disabled aria-label="Flap Company on X — coming soon" title="X profile coming soon">{xIcon}</button>}
        <a
          className="ecosystem-link"
          href="https://flap.sh"
          target="_blank"
          rel="noreferrer"
          aria-label="Visit Flap (opens in a new tab)"
        >
          <span>Explore Flap</span><span className="ecosystem-arrow"><ArrowUpRight size={16} aria-hidden="true" /></span>
        </a>
        <button
          ref={menuButton}
          type="button"
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="main-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
        >
          <span className="menu-strokes" aria-hidden="true"><span /><span /></span>
        </button>
      </div>
    </header>
  );
}

import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="not-found">
      <span className="eyebrow">A wrong turn in the office</span>
      <h1>This room doesn’t exist.</h1>
      <p>Let’s get you back to the company.</p>
      <Link className="primary-link" href="/">
        Return to the office →
      </Link>
    </main>
  );
}

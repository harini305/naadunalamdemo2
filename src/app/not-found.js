import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found page-shell">
      <p className="eyebrow">404</p>
      <h1>This product could not be found.</h1>
      <p>Explore our complete collection of traditional and natural products.</p>
      <Link className="button button-primary" href="/shop">
        Back to shop
      </Link>
    </main>
  );
}

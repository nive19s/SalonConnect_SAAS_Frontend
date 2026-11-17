import { Link } from 'react-router-dom';
import { site } from '@/config/site';
import Container from '@/components/ui/Container';

function LinkGroup({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <ul className="mt-4 space-y-3 text-sm text-paper/70">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="link-underline hover:text-paper">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <Container className="grid gap-12 py-16 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <p className="font-display text-4xl">Glamora</p>
          <p className="mt-4 max-w-xs text-paper/70">{site.tagline}</p>
        </div>
        <LinkGroup title="Explore" links={site.footer.explore} />
        <LinkGroup title="For business" links={site.footer.business} />
      </Container>
      <Container className="border-t border-paper/15 py-6 text-sm text-paper/50">
        © {new Date().getFullYear()} Glamora. All rights reserved.
      </Container>
    </footer>
  );
}

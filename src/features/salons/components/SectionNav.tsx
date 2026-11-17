const items = [
  { id: 'services', label: 'Services' },
  { id: 'team', label: 'Team' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'about', label: 'About' },
];

export default function SectionNav() {
  return (
    <nav aria-label="Salon sections" className="sticky top-16 z-30 -mx-5 border-b border-line bg-paper/95 px-5 backdrop-blur md:top-20 md:mx-0 md:px-0">
      <ul className="flex gap-8 overflow-x-auto">
        {items.map((i) => (
          <li key={i.id}>
            <a href={`#${i.id}`} className="block py-4 text-sm font-medium hover:underline underline-offset-8">{i.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

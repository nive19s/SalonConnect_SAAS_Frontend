import { cn } from '@/lib/cn';

interface Props {
  title: string;
  text?: string;
  className?: string;
  tone?: 'light' | 'dark';
}

export default function SectionHeading({ title, text, className, tone = 'light' }: Props) {
  return (
    <header className={cn('max-w-2xl', className)}>
      <h2 className="font-display text-display">{title}</h2>
      {text && <p className={cn('mt-5 text-lg leading-relaxed', tone === 'dark' ? 'text-paper/70' : 'text-ash')}>{text}</p>}
    </header>
  );
}

import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';

export default function NotFoundPage() {
  useDocumentTitle('Page not found');
  return (
    <Container className="py-32 text-center">
      <p className="font-display text-hero">404</p>
      <p className="mt-6 text-lg text-ash">We could not find that page. It may have moved.</p>
      <Button to="/" className="mt-10">Back to home</Button>
    </Container>
  );
}

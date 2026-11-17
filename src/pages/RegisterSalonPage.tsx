import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import Container from '@/components/ui/Container';
import RegisterSalonWizard from '@/features/salon-registration/RegisterSalonWizard';

export default function RegisterSalonPage() {
  useDocumentTitle('List your salon');
  return <Container className="py-12 md:py-20"><RegisterSalonWizard /></Container>;
}

import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import SalonDirectory from '@/features/salons/SalonDirectory';

export default function SalonsPage() {
  useDocumentTitle('Find a salon');
  return <SalonDirectory />;
}

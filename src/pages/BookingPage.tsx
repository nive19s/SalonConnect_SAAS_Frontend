import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import BookingFlow from '@/features/booking/BookingFlow';

export default function BookingPage() {
  useDocumentTitle('Book an appointment');
  return <BookingFlow />;
}

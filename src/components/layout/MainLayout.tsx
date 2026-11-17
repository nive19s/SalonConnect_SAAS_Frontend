import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ScrollManager from './ScrollManager';
import Spinner from '@/components/ui/Spinner';
import Container from '@/components/ui/Container';

export default function MainLayout() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">
        Skip to content
      </a>
      <ScrollManager />
      <Header />
      <main id="main" className="min-h-[70vh]">
        <Suspense fallback={<Container><Spinner /></Container>}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

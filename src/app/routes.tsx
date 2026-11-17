import { lazy, Suspense, type ComponentType } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import Spinner from '@/components/ui/Spinner';
import { RequireAuth, RequirePlatformRole, RequireSalonMember } from '@/features/auth/guards';
import HomePage from '@/pages/HomePage';

// Home is in the main bundle (first paint). Every other area is its own chunk.
const named = <T extends Record<string, ComponentType>>(load: () => Promise<T>, key: keyof T) =>
  lazy(() => load().then((m) => ({ default: m[key] })));

const SalonsPage = lazy(() => import('@/pages/SalonsPage'));
const SalonDetailPage = lazy(() => import('@/pages/SalonDetailPage'));
const BookingPage = lazy(() => import('@/pages/BookingPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/RegisterPage'));
const PasswordPage = lazy(() => import('@/pages/PasswordPage'));
const RegisterSalonPage = lazy(() => import('@/pages/RegisterSalonPage'));

const accountPages = () => import('@/pages/AccountPages');
const AccountLayout = named(accountPages, 'AccountLayout');
const ProfilePage = named(accountPages, 'ProfilePage');
const AppointmentsPage = named(accountPages, 'AppointmentsPage');
const AppointmentDetailPage = named(accountPages, 'AppointmentDetailPage');

const SalonAdminLayout = lazy(() => import('@/features/salon-admin/SalonAdminLayout'));
const DashboardPage = lazy(() => import('@/features/salon-admin/DashboardPage'));
const BranchesPage = lazy(() => import('@/features/salon-admin/BranchesPage'));
const SettingsPage = lazy(() => import('@/features/salon-admin/SettingsPage'));
const adminPlaceholders = () => import('@/features/salon-admin/placeholders');
const CalendarPage = named(adminPlaceholders, 'CalendarPage');
const AppointmentsAdminPage = named(adminPlaceholders, 'AppointmentsAdminPage');
const BeauticiansPage = named(adminPlaceholders, 'BeauticiansPage');
const ServicesPage = named(adminPlaceholders, 'ServicesPage');
const SchedulePage = named(adminPlaceholders, 'SchedulePage');

const beauticianPages = () => import('@/features/salon-admin/BeauticianPages');
const BeauticianLayout = named(beauticianPages, 'BeauticianLayout');
const BeauticianToday = named(beauticianPages, 'BeauticianToday');
const BeauticianSchedule = named(beauticianPages, 'BeauticianSchedule');

const platformPages = () => import('@/features/platform/PlatformPages');
const PlatformLayout = named(platformPages, 'PlatformLayout');
const PlatformOverview = named(platformPages, 'PlatformOverview');
const PlatformSalons = named(platformPages, 'PlatformSalons');
const PlatformCustomers = named(platformPages, 'PlatformCustomers');
const PlatformReports = named(platformPages, 'PlatformReports');

export default function AppRoutes() {
  return (
    <Suspense fallback={<div className="p-8"><Spinner label="Loading" /></div>}>
      <Routes>
        {/* Public site and customer account */}
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="salons" element={<SalonsPage />} />
          <Route path="salons/:salonId" element={<SalonDetailPage />} />
          <Route path="salons/:salonId/book" element={<BookingPage />} />
          <Route path="book" element={<Navigate to="/salons" replace />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<PasswordPage mode="forgot" />} />
          <Route path="reset-password" element={<PasswordPage mode="reset" />} />
          <Route path="register-salon" element={<RegisterSalonPage />} />
          <Route path="account" element={<RequireAuth><AccountLayout /></RequireAuth>}>
            <Route index element={<ProfilePage />} />
            <Route path="appointments" element={<AppointmentsPage />} />
            <Route path="appointments/:bookingId" element={<AppointmentDetailPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Salon team */}
        <Route path="salon-admin" element={<RequireSalonMember><SalonAdminLayout /></RequireSalonMember>}>
          <Route index element={<DashboardPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="appointments" element={<AppointmentsAdminPage />} />
          <Route path="beauticians" element={<BeauticiansPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="schedule" element={<SchedulePage />} />
          <Route path="branches" element={<BranchesPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="beautician" element={<RequireSalonMember roles={['STAFF']}><BeauticianLayout /></RequireSalonMember>}>
          <Route index element={<BeauticianToday />} />
          <Route path="schedule" element={<BeauticianSchedule />} />
        </Route>

        {/* Glamora staff */}
        <Route path="platform" element={<RequirePlatformRole><PlatformLayout /></RequirePlatformRole>}>
          <Route index element={<PlatformOverview />} />
          <Route path="salons" element={<PlatformSalons />} />
          <Route path="customers" element={<PlatformCustomers />} />
          <Route path="reports" element={<PlatformReports />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

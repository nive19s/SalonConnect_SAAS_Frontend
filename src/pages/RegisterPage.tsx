import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import AuthLayout from '@/features/auth/AuthLayout';
import RegisterForm from '@/features/auth/RegisterForm';
import { useAuth } from '@/features/auth/AuthProvider';

export default function RegisterPage() {
  useDocumentTitle('Create account');
  const { status } = useAuth();
  const navigate = useNavigate();
  const from = (useLocation().state as { from?: { pathname: string; search?: string } } | null)?.from;
  const target = from ? `${from.pathname}${from.search ?? ''}` : '/';

  if (status === 'authenticated') return <Navigate to={target} replace />;

  return (
    <AuthLayout title="Create your account" subtitle="Book faster and keep all your appointments in one place.">
      <RegisterForm onSuccess={() => navigate(target, { replace: true })} />
      <p className="mt-10 text-sm text-ash">
        Already have an account? <Link to="/login" state={{ from }} className="link-underline text-ink">Log in</Link>
      </p>
    </AuthLayout>
  );
}

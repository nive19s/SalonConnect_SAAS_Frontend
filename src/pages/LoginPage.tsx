import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import AuthLayout from '@/features/auth/AuthLayout';
import LoginForm from '@/features/auth/LoginForm';
import { useAuth } from '@/features/auth/AuthProvider';

export default function LoginPage() {
  useDocumentTitle('Log in');
  const { status } = useAuth();
  const navigate = useNavigate();
  const from = (useLocation().state as { from?: { pathname: string; search?: string } } | null)?.from;
  const target = from ? `${from.pathname}${from.search ?? ''}` : '/';

  if (status === 'authenticated') return <Navigate to={target} replace />;

  return (
    <AuthLayout title="Welcome back" subtitle="Log in to manage your appointments or your salon.">
      <LoginForm onSuccess={() => navigate(target, { replace: true })} />
      <p className="mt-10 text-sm text-ash">
        New to Glamora? <Link to="/register" state={{ from }} className="link-underline text-ink">Create an account</Link>
      </p>
    </AuthLayout>
  );
}

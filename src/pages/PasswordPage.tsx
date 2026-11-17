import { Link } from 'react-router-dom';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { features } from '@/config/features';
import AuthLayout from '@/features/auth/AuthLayout';
import { Notice } from '@/components/ui/Form';
import Button from '@/components/ui/Button';

/** Shared by /forgot-password and /reset-password until the backend supports password reset. */
export default function PasswordPage({ mode }: { mode: 'forgot' | 'reset' }) {
  useDocumentTitle(mode === 'forgot' ? 'Forgot password' : 'Reset password');

  return (
    <AuthLayout title={mode === 'forgot' ? 'Forgot your password?' : 'Reset your password'}>
      {features.passwordReset ? (
        <Notice tone="info">Password reset form goes here once the API is available.</Notice>
      ) : (
        <div className="space-y-6">
          <Notice tone="info">
            Password reset is not available yet. If you cannot log in, please contact Glamora support and we will help you.
          </Notice>
          <Button to="/login" variant="outline">Back to log in</Button>
          <p className="text-sm text-ash">
            No account yet? <Link to="/register" className="link-underline text-ink">Create one</Link>
          </p>
        </div>
      )}
    </AuthLayout>
  );
}

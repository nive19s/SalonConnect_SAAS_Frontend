import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { features } from '@/config/features';
import Button from '@/components/ui/Button';
import { Notice } from '@/components/ui/Form';
import { useAuth } from '@/features/auth/AuthProvider';

export default function ProfilePage() {
  useDocumentTitle('My profile');
  const { me, logout } = useAuth();
  if (!me) return null;

  const rows: [string, string][] = [
    ['Name', me.fullName],
    ['Email', me.email],
    ['Mobile', me.phone ?? 'Not added'],
    ['Language', me.preferredLanguage.toUpperCase()],
  ];

  return (
    <div className="max-w-2xl space-y-8">
      {!me.emailVerified && (
        <Notice tone="info">
          Your email is not verified.{!features.emailVerification && ' Email verification is not available yet.'}
        </Notice>
      )}
      <dl className="divide-y divide-line border-y border-line">
        {rows.map(([k, v]) => (
          <div key={k} className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr]">
            <dt className="text-sm text-ash">{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
      <div className="flex flex-wrap gap-3">
        {me.memberships.length > 0 ? (
          <Button to="/salon-admin">Open salon admin</Button>
        ) : (
          <Button to="/register-salon" variant="outline">List your salon</Button>
        )}
        <Button variant="outline" onClick={() => void logout()}>Log out</Button>
      </div>
    </div>
  );
}

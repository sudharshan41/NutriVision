
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/layout/page-header';
import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container mx-auto flex h-screen flex-col items-center justify-center text-center">
      <PageHeader
        title="404 - Page Not Found"
        description="Oops! The page you're looking for doesn't exist."
      />
      <div className="mt-8">
        <Button asChild>
          <Link href="/dashboard">
            <Home className="mr-2 h-4 w-4" />
            Go to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
}

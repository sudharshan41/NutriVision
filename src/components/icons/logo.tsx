import { Leaf } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2 font-headline text-xl font-bold text-primary-foreground">
      <div className="rounded-lg bg-primary p-2">
        <Leaf className="h-6 w-6 text-primary-foreground" />
      </div>
      <span className="text-foreground group-data-[state=collapsed]:hidden">NutriVision</span>
    </div>
  );
}

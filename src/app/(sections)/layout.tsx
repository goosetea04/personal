import { BackButton } from '@/components/BackButton';

export default function SectionsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full relative overflow-y-auto">
      {children}
      <BackButton />
    </div>
  );
}

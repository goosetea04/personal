import type { Metadata } from 'next';
import { HomeSection } from '@/components/sections/HomeSection';

export const metadata: Metadata = {
  // No title here — falls back to the root layout's `title.default`,
  // which is the full "Gusti Rais — Software Engineer & Data Scientist".
  description:
    'Portfolio of Gusti Rais, a Software Engineer and Data Scientist specializing in high-performance systems and predictive modeling.',
};

export default function Home() {
  return <HomeSection />;
}

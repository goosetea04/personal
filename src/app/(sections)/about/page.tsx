import type { Metadata } from 'next';
import { AboutSection } from '@/components/sections/AboutSection';

export const metadata: Metadata = {
  title: 'About',
  description: 'Software Engineer and Data Scientist specializing in high-performance systems and predictive modeling.',
};

export default function AboutPage() {
  return <AboutSection />;
}

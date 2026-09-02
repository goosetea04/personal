import type { Metadata } from 'next';
import { ProjectsSection } from '@/components/sections/ProjectsSection';

export const metadata: Metadata = {
  title: 'Projects — Gusti Rais',
  description: "A look at Gusti Rais's software and data science projects.",
};

export default function ProjectsPage() {
  return <ProjectsSection />;
}

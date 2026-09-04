import type { Metadata } from 'next';
import { ResumeSection } from '@/components/sections/ResumeSection';

export const metadata: Metadata = {
  title: 'Resume',
  description: "Gusti Rais's work history and downloadable CV.",
};

export default function ResumePage() {
  return <ResumeSection />;
}

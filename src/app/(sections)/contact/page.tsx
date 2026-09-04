import type { Metadata } from 'next';
import { ContactSection } from '@/components/sections/ContactSection';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Gusti Rais.',
};

export default function ContactPage() {
  return <ContactSection />;
}

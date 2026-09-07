import { User, FileText, Code, Mail, Newspaper } from "lucide-react";
export const MENU_ITEMS = [
    { id: 'ABOUT', label: 'ABOUT', icon: User, offset: 'md:translate-x-0' },
    { id: 'RESUME', label: 'RESUME', icon: FileText, offset: 'md:translate-x-6' },
    { id: 'PROJECTS', label: 'PROJECTS', icon: Code, offset: 'md:translate-x-8' },
    { id: 'BLOG', label: 'BLOG', icon: Newspaper, offset: 'md:translate-x-10' },
    { id: 'CONTACT', label: 'GET IN TOUCH', icon: Mail, offset: 'md:translate-x-4' },
  ];
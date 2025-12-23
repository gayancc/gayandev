'use client';

import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Experience } from '@/components/Experience';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { PageTransition } from '@/components/PageTransition';
import { FullPage } from '@/components/FullPage';

export default function Home() {
  const sections = [
    { id: 'hero', label: 'Home', node: <Hero /> },
    { id: 'about', label: 'About', node: <About /> },
    { id: 'skills', label: 'Skills', node: <Skills /> },
    { id: 'experience', label: 'Experience', node: <Experience /> },
    { id: 'contact', label: 'Contact', node: (<><Contact /><Footer /></>) },
  ];

  return (
    <PageTransition>
      <main className="relative">
        <FullPage sections={sections} />
      </main>
    </PageTransition>
  );
}

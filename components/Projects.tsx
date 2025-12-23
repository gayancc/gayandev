'use client';

import { SectionHeading } from './SectionHeading';
import { ProjectCard } from './ProjectCard';
import { placeholderProject } from '@/data/content';

export function Projects() {
  const placeholders = [
    placeholderProject,
    {
      title: 'Case Study Slot',
      description: 'Use this space to highlight a project with measurable impact.',
      tags: ['Product', 'Engineering', 'UX'],
    },
    {
      title: 'Launch Highlight',
      description: 'Showcase the most visually compelling product launch here.',
      tags: ['SaaS', 'Leadership', 'Delivery'],
    },
  ];

  return (
    <section id="projects" className="section-shell">
      <div className="relative mx-auto w-[92%] max-w-6xl">
        <SectionHeading title="Projects Portfolio" subtitle="Selected Work" />

        <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-fg/50">
          <span>Swipe / Scroll</span>
          <span>3D Flip Cards</span>
        </div>

        <div className="mt-6 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 scrollbar-hide">
          {placeholders.map((project) => (
            <div key={project.title} className="min-w-[280px] snap-center md:min-w-[360px]">
              <ProjectCard
                title={project.title}
                description={project.description}
                tags={project.tags}
                isPlaceholder
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

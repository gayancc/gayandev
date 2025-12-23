'use client';

import { usePreferences } from './PreferencesProvider';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  isPlaceholder?: boolean;
}

export function ProjectCard({ title, description, tags, isPlaceholder }: ProjectCardProps) {
  const { playClick } = usePreferences();

  return (
    <div className="group relative h-full [perspective:1200px]">
      <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-br from-accent/20 via-transparent to-accent2/30 opacity-0 blur transition group-hover:opacity-100" />
      <div className="relative h-full rounded-[32px] transition-transform duration-700 group-hover:-translate-y-2 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div className="glass absolute inset-0 flex flex-col justify-between rounded-[32px] p-6 [backface-visibility:hidden]">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-fg/60">Featured</p>
            <h3 className="mt-3 font-display text-2xl">{title}</h3>
            <p className="mt-3 text-sm text-fg/70">{description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs text-fg/70">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="glass absolute inset-0 flex flex-col items-center justify-center rounded-[32px] p-6 text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <p className="text-sm text-fg/70">
            {isPlaceholder
              ? 'Replace this card with your real project case study, outcomes, and links.'
              : 'View the live site or repository for details.'}
          </p>
          <button
            type="button"
            onClick={playClick}
            className="mt-4 rounded-full border border-accent/60 px-4 py-2 text-xs uppercase tracking-[0.3em] text-accent"
          >
            Explore
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';

import { FaFacebookF, FaLinkedinIn, FaTwitter, FaGithub, FaStackOverflow } from 'react-icons/fa';
import { profile } from '@/data/content';
import { usePreferences } from './PreferencesProvider';

const iconMap = {
  facebook: FaFacebookF,
  linkedin: FaLinkedinIn,
  twitter: FaTwitter,
  github: FaGithub,
  stackoverflow: FaStackOverflow,
};

export function SocialLinks() {
  const { playClick } = usePreferences();

  return (
    <div className="flex flex-wrap items-center gap-3">
      {profile.socials.map((social) => {
        const Icon = iconMap[social.icon];
        return (
          <a
            key={social.label}
            href={social.url}
            target="_blank"
            rel="noreferrer"
            aria-label={social.label}
            onClick={playClick}
            className="neo group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-card/60 text-fg/70 transition hover:-translate-y-1 hover:text-accent"
          >
            <Icon className="text-sm" />
          </a>
        );
      })}
    </div>
  );
}

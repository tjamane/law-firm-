'use client';

import Link from 'next/link';
import { Scale } from 'lucide-react';

// Footer links
const footerLinks = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Security', href: '#security' },
    { label: 'Integrations', href: '#integrations' },
  ],
  Company: [
    { label: 'About Us', href: '#about' },
    { label: 'Careers', href: '#careers' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contact', href: '#contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#privacy' },
    { label: 'Terms of Service', href: '#terms' },
    { label: 'Cookie Policy', href: '#cookies' },
    { label: 'GDPR', href: '#gdpr' },
  ],
  Support: [
    { label: 'Help Center', href: '#help' },
    { label: 'Documentation', href: '#docs' },
    { label: 'API Reference', href: '#api' },
    { label: 'Status', href: '#status' },
  ],
};

export function LandingFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
                <Scale className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="text-xl font-bold">LegalPractice</span>
            </Link>
            <p className="text-primary-foreground/70 text-sm max-w-xs">
              The modern legal practice management system trusted by law firms
              worldwide.
            </p>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/70">
            &copy; {new Date().getFullYear()} LegalPractice. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#twitter"
              className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              Twitter
            </a>
            <a
              href="#linkedin"
              className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="#github"
              className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

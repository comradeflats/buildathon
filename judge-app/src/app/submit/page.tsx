'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { GitHubSubmissionForm } from '@/components/submit/GitHubSubmissionForm';

export default function SubmitPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6"
      >
        <ArrowLeft size={20} />
        Back to Projects
      </Link>

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Submit Project</h1>
        <p className="text-zinc-400">
          Add your project to the competition by entering your GitHub repository URL.
        </p>
      </header>

      <GitHubSubmissionForm />
    </div>
  );
}

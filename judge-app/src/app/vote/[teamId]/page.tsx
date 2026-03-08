'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { VotingForm } from '@/components/voting/VotingForm';
import { useVoting } from '@/context/VotingContext';

export default function VotePage() {
  const params = useParams();
  const teamId = params.teamId as string;
  const { getTeamById, isLoading } = useVoting();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  const team = getTeamById(teamId);

  if (!team) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <h1 className="text-2xl font-bold text-white mb-4">Team Not Found</h1>
        <p className="text-zinc-400 mb-6">
          The team you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-accent hover:text-accent-hover transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Projects
        </Link>
      </div>
    );
  }

  return <VotingForm team={team} />;
}

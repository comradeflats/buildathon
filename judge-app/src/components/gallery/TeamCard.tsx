'use client';

import Link from 'next/link';
import { ChevronRight, Users, Code, Github } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { DeleteButton } from '@/components/admin/DeleteButton';
import { Team } from '@/lib/types';
import { useVoting } from '@/context/VotingContext';

interface TeamCardProps {
  team: Team;
}

export function TeamCard({ team }: TeamCardProps) {
  const { hasVotedFor, getThemeById, deleteTeam, showToast } = useVoting();
  const voted = hasVotedFor(team.id);
  const theme = getThemeById(team.themeId);

  const handleDelete = () => {
    deleteTeam(team.id);
    showToast(`${team.projectName} has been removed`, 'success');
  };

  return (
    <Link href={`/vote/${team.id}`}>
      <Card hover className="p-5 h-full flex flex-col relative">
        <DeleteButton onDelete={handleDelete} itemName={team.projectName} />
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-1">
              {team.projectName}
            </h3>
            <p className="text-sm text-zinc-400">{team.name}</p>
          </div>
          {voted && (
            <Badge variant="success">Voted</Badge>
          )}
        </div>

        {/* Theme Badge */}
        {theme && (
          <div className="flex items-center gap-1.5 mb-3">
            <span className="text-lg">{theme.emoji}</span>
            <span className="text-xs text-zinc-400">{theme.name}</span>
          </div>
        )}

        <p className="text-sm text-zinc-300 mb-4 flex-1 line-clamp-2">
          {team.description}
        </p>

        <div className="space-y-2 mb-4">
          {team.members.length > 0 && (
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <Users size={14} />
              <span>{team.members.join(', ')}</span>
            </div>
          )}
          {team.techStack.length > 0 && (
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <Code size={14} />
              <span>{team.techStack.join(', ')}</span>
            </div>
          )}
          {team.githubUrl && (
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <Github size={14} />
              <span className="truncate">{team.githubData?.fullName || 'GitHub'}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end text-accent text-sm font-medium">
          {voted ? 'View Details' : 'Rate Project'}
          <ChevronRight size={16} className="ml-1" />
        </div>
      </Card>
    </Link>
  );
}

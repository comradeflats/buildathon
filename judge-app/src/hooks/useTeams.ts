'use client';

import { useState, useEffect, useCallback } from 'react';
import { Team } from '@/lib/types';
import { getStoredTeams, addTeam as storeTeam, saveTeams, removeTeam as removeStoredTeam } from '@/lib/storage';
import { EVENT_NAME } from '@/lib/constants';

export function useTeams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    function loadTeams() {
      try {
        // Load only from localStorage (submitted via /submit)
        const storedTeams = getStoredTeams();
        setTeams(storedTeams);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    }

    loadTeams();
  }, []);

  const getTeamById = useCallback(
    (id: string): Team | undefined => {
      return teams.find((team) => team.id === id);
    },
    [teams]
  );

  const addTeam = useCallback((team: Team): void => {
    // Add to localStorage
    storeTeam(team);
    // Update local state
    setTeams((prev) => [...prev, team]);
  }, []);

  const removeTeam = useCallback((teamId: string): void => {
    // Remove from localStorage
    removeStoredTeam(teamId);
    // Update local state
    setTeams((prev) => prev.filter((t) => t.id !== teamId));
  }, []);

  const refreshTeams = useCallback(() => {
    const storedTeams = getStoredTeams();
    setTeams(storedTeams);
  }, []);

  // Event name is now a constant
  const eventName = EVENT_NAME;

  return { teams, eventName, isLoading, error, getTeamById, addTeam, removeTeam, refreshTeams };
}

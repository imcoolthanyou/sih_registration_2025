import type { Database } from '@/types/supabase';
import { useSupabase } from './supabase-context';

type Team = Database['public']['Tables']['teams']['Row'];
type Individual = Database['public']['Tables']['individuals']['Row'];

export function useApi() {
  const supabase = useSupabase();
  
  async function getTeams(): Promise<Team[]> {
    console.log('Fetching teams...');
    try {
      const { data, error } = await supabase
        .from('teams')
        .select(`
          id,
          created_at,
          teamName,
          leaderName,
          leaderYear,
          leaderBranch,
          leaderSkills,
          members
        `)
        .order('created_at', { ascending: false });

      console.log('Teams response:', { data, error });

      if (error) {
        console.error('Error fetching teams:', error);
        throw error;
      }
      return data || [];
    } catch (e) {
      console.error('Exception in getTeams:', e);
      throw e;
    }
  }

  async function getIndividuals(): Promise<Individual[]> {
    console.log('Fetching individuals...');
    try {
      const { data, error } = await supabase
        .from('individuals')
        .select(`
          id,
          created_at,
          name,
          year,
          branch,
          skills,
          github,
          discord,
          hasDeployedSoftware
        `)
        .order('created_at', { ascending: false });

      console.log('Individuals response:', { data, error });

      if (error) {
        console.error('Error fetching individuals:', error);
        throw error;
      }
      return data || [];
    } catch (e) {
      console.error('Exception in getIndividuals:', e);
      throw e;
    }
  }

  async function searchParticipants(query: string, skillFilter: string, branchFilter: string): Promise<Individual[]> {
    console.log('Searching participants with filters:', { query, skillFilter, branchFilter });
    try {
      let filter = supabase
        .from('individuals')
        .select(`
          id,
          created_at,
          name,
          year,
          branch,
          skills,
          github,
          discord,
          hasDeployedSoftware
        `);
    
      // Apply filters
      if (query) {
        filter = filter.ilike('name', `%${query}%`);
      }
      
      if (skillFilter && skillFilter !== 'all') {
        filter = filter.contains('skills', [skillFilter]);
      }
      
      if (branchFilter && branchFilter !== 'all') {
        filter = filter.eq('branch', branchFilter);
      }

      const { data, error } = await filter.order('created_at', { ascending: false });

      if (error) {
        console.error('Error searching participants:', error);
        throw error;
      }
      return data || [];
    } catch (e) {
      console.error('Exception in searchParticipants:', e);
      throw e;
    }
  }

  return {
    getTeams,
    getIndividuals,
    searchParticipants
  };
}

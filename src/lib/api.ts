import type { Database } from '@/types/supabase';
import { useSupabase } from './supabase-context';

type Team = Database['public']['Tables']['teams']['Row'];
type Individual = Database['public']['Tables']['individuals']['Row'];
type DbRegistrationSettings = Database['public']['Tables']['registration_settings'];
type RegistrationSettings = {
  registrationDeadline: string;
  isRegistrationEnabled: boolean;
};

export function useApi() {
  const supabase = useSupabase();

  async function getRegistrationSettings(): Promise<RegistrationSettings> {
    try {
      const { data, error } = await supabase
        .from('registration_settings')
        .select('registration_deadline, is_registration_enabled')
        .eq('id', 1)
        .single();

      if (error) throw error;

      if (!data) {
        // Default to 30 days from now at 11:59 PM
        const defaultDeadline = new Date();
        defaultDeadline.setDate(defaultDeadline.getDate() + 30);
        defaultDeadline.setHours(23, 59, 59, 999);

        return {
          registrationDeadline: defaultDeadline.toISOString(),
          isRegistrationEnabled: true
        };
      }

      return {
        registrationDeadline: new Date(data.registration_deadline).toISOString(),
        isRegistrationEnabled: data.is_registration_enabled
      };
    } catch (e) {
      console.error('Error getting registration settings:', e);
      throw e;
    }
  }

  async function updateRegistrationSettings(settings: RegistrationSettings) {
    try {
      console.log('Updating settings with:', settings);

      // Validate the date format
      const deadline = new Date(settings.registrationDeadline);
      if (isNaN(deadline.getTime())) {
        throw new Error('Invalid date format');
      }

      const now = new Date().toISOString();
      
      // Use a single upsert operation with properly typed data
      const updateData = {
        id: 1,
        registration_deadline: deadline.toISOString(),
        is_registration_enabled: settings.isRegistrationEnabled,
        updated_at: now,
        created_at: now
      } as DbRegistrationSettings['Insert'];

      console.log('Upserting settings with:', updateData);
      
      const { error } = await supabase
        .from('registration_settings')
        .upsert(updateData)
        .select()
        .single();

      if (error) {
        console.error('Error updating settings:', error);
        throw error;
      }

      console.log('Settings updated successfully');
      return true;
    } catch (e) {
      console.error('Error updating registration settings:', e);
      throw e;
    }
  }

  async function clearAllData() {
    console.log('Clearing all data...');
    try {
      // Clear teams table
      const { error: teamsError } = await supabase
        .from('teams')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // This ensures we delete all rows

      if (teamsError) {
        console.error('Error clearing teams:', teamsError);
        throw teamsError;
      }

      // Clear individuals table
      const { error: individualsError } = await supabase
        .from('individuals')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // This ensures we delete all rows

      if (individualsError) {
        console.error('Error clearing individuals:', individualsError);
        throw individualsError;
      }

      console.log('All data cleared successfully');
      return true;
    } catch (error) {
      console.error('Error in clearAllData:', error);
      throw error;
    }
  }
  
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
    searchParticipants,
    clearAllData,
    getRegistrationSettings,
    updateRegistrationSettings
  };
}

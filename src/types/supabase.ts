export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      teams: {
        Row: {
          id: string
          created_at: string
          teamName: string
          leaderName: string
          leaderYear: string
          leaderBranch: string
          leaderSkills: string[]
          members: {
            name: string
            year: string
            branch: string
            skills: string[]
          }[]
        }
        Insert: {
          id?: string
          created_at?: string
          teamName: string
          leaderName: string
          leaderYear: string
          leaderBranch: string
          leaderSkills?: string[]
          members?: {
            name: string
            year: string
            branch: string
            skills: string[]
          }[]
        }
        Update: {
          id?: string
          created_at?: string
          teamName?: string
          leaderName?: string
          leaderYear?: string
          leaderBranch?: string
          leaderSkills?: string[]
          members?: {
            name: string
            year: string
            branch: string
            skills: string[]
          }[]
        }
      }
      individuals: {
        Row: {
          id: string
          created_at: string
          name: string
          year: string
          branch: string
          skills: string[]
          github?: string
          discord?: string
          hasDeployedSoftware: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          year: string
          branch: string
          skills?: string[]
          github?: string
          discord?: string
          hasDeployedSoftware?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          year?: string
          branch?: string
          skills?: string[]
          github?: string
          discord?: string
          hasDeployedSoftware?: boolean
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

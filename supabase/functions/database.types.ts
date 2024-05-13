export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      Events: {
        Row: {
          CategoryName: string
          ContextName: string
          DisplayName: string
          EndDate: string
          Id: string
          Location: string
          RaceName: string
          RoundNumber: number
          StartDate: string
          Year: number
        }
        Insert: {
          CategoryName: string
          ContextName: string
          DisplayName: string
          EndDate: string
          Id: string
          Location: string
          RaceName: string
          RoundNumber: number
          StartDate: string
          Year: number
        }
        Update: {
          CategoryName?: string
          ContextName?: string
          DisplayName?: string
          EndDate?: string
          Id?: string
          Location?: string
          RaceName?: string
          RoundNumber?: number
          StartDate?: string
          Year?: number
        }
        Relationships: []
      }
      Riders: {
        Row: {
          BirthDate: string | null
          CategoryCode: string | null
          Confirmed: boolean
          FamilyName: string
          FullName: string
          GivenName: string
          Id: number
          Injury: boolean | null
          IntEliteNr: boolean | null
          Nation: string | null
          Outfit: string | null
          PrintName: string | null
          Protected: boolean | null
          RaceNr: number
          Rso: boolean | null
          ScoreboardName: string | null
          SecondaryRank: number | null
          StartOrder: number | null
          StartTime: number | null
          Substitute: boolean | null
          UciCode: string | null
          UciRank: number | null
          UciRiderId: string
          UciTeamCode: string | null
          UciTeamId: string | null
          UciTeamName: string | null
          WorldCupRank: number | null
        }
        Insert: {
          BirthDate?: string | null
          CategoryCode?: string | null
          Confirmed: boolean
          FamilyName: string
          FullName: string
          GivenName: string
          Id: number
          Injury?: boolean | null
          IntEliteNr?: boolean | null
          Nation?: string | null
          Outfit?: string | null
          PrintName?: string | null
          Protected?: boolean | null
          RaceNr: number
          Rso?: boolean | null
          ScoreboardName?: string | null
          SecondaryRank?: number | null
          StartOrder?: number | null
          StartTime?: number | null
          Substitute?: boolean | null
          UciCode?: string | null
          UciRank?: number | null
          UciRiderId: string
          UciTeamCode?: string | null
          UciTeamId?: string | null
          UciTeamName?: string | null
          WorldCupRank?: number | null
        }
        Update: {
          BirthDate?: string | null
          CategoryCode?: string | null
          Confirmed?: boolean
          FamilyName?: string
          FullName?: string
          GivenName?: string
          Id?: number
          Injury?: boolean | null
          IntEliteNr?: boolean | null
          Nation?: string | null
          Outfit?: string | null
          PrintName?: string | null
          Protected?: boolean | null
          RaceNr?: number
          Rso?: boolean | null
          ScoreboardName?: string | null
          SecondaryRank?: number | null
          StartOrder?: number | null
          StartTime?: number | null
          Substitute?: boolean | null
          UciCode?: string | null
          UciRank?: number | null
          UciRiderId?: string
          UciTeamCode?: string | null
          UciTeamId?: string | null
          UciTeamName?: string | null
          WorldCupRank?: number | null
        }
        Relationships: []
      }
      SplitTimes: {
        Row: {
          CompletedDistance: number | null
          EventId: string
          ExpectedStartTime: number | null
          Id: string
          InResult: boolean | null
          LastPoint: string | null
          Position: number | null
          RaceNr: number | null
          RaceTime: number | null
          Run: number | null
          SortOrder: number | null
          Speed: number | null
          Status: string | null
          StatusTime: number | null
          UciRiderId: string
        }
        Insert: {
          CompletedDistance?: number | null
          EventId: string
          ExpectedStartTime?: number | null
          Id: string
          InResult?: boolean | null
          LastPoint?: string | null
          Position?: number | null
          RaceNr?: number | null
          RaceTime?: number | null
          Run?: number | null
          SortOrder?: number | null
          Speed?: number | null
          Status?: string | null
          StatusTime?: number | null
          UciRiderId: string
        }
        Update: {
          CompletedDistance?: number | null
          EventId?: string
          ExpectedStartTime?: number | null
          Id?: string
          InResult?: boolean | null
          LastPoint?: string | null
          Position?: number | null
          RaceNr?: number | null
          RaceTime?: number | null
          Run?: number | null
          SortOrder?: number | null
          Speed?: number | null
          Status?: string | null
          StatusTime?: number | null
          UciRiderId?: string
        }
        Relationships: [
          {
            foreignKeyName: "SplitTimes_EventId_fkey"
            columns: ["EventId"]
            isOneToOne: false
            referencedRelation: "Events"
            referencedColumns: ["Id"]
          },
          {
            foreignKeyName: "SplitTimes_UciRiderId_fkey"
            columns: ["UciRiderId"]
            isOneToOne: false
            referencedRelation: "Riders"
            referencedColumns: ["UciRiderId"]
          },
        ]
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

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
      artworks: {
        Row: {
          id: string
          title: string
          description: string | null
          category: string
          image_url: string
          price_eur: number
          price_nft: number | null
          nft_status: 'available' | 'minted' | 'sold' | null
          width: number | null
          height: number | null
          medium: string | null
          year: number | null
          is_available: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          category: string
          image_url: string
          price_eur: number
          price_nft?: number | null
          nft_status?: 'available' | 'minted' | 'sold' | null
          width?: number | null
          height?: number | null
          medium?: string | null
          year?: number | null
          is_available?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          category?: string
          image_url?: string
          price_eur?: number
          price_nft?: number | null
          nft_status?: 'available' | 'minted' | 'sold' | null
          width?: number | null
          height?: number | null
          medium?: string | null
          year?: number | null
          is_available?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          artwork_id: string
          status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
          payment_id: string | null
          payment_status: 'pending' | 'completed' | 'failed' | 'refunded'
          total_amount: number
          includes_nft: boolean
          nft_minted: boolean
          shipping_address: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          artwork_id: string
          status?: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
          payment_id?: string | null
          payment_status?: 'pending' | 'completed' | 'failed' | 'refunded'
          total_amount: number
          includes_nft?: boolean
          nft_minted?: boolean
          shipping_address?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          artwork_id?: string
          status?: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
          payment_id?: string | null
          payment_status?: 'pending' | 'completed' | 'failed' | 'refunded'
          total_amount?: number
          includes_nft?: boolean
          nft_minted?: boolean
          shipping_address?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      nft_metadata: {
        Row: {
          id: string
          artwork_id: string
          token_id: string | null
          blockchain_url: string | null
          owner_id: string
          transaction_hash: string | null
          metadata_uri: string | null
          minted_at: string
          created_at: string
        }
        Insert: {
          id?: string
          artwork_id: string
          token_id?: string | null
          blockchain_url?: string | null
          owner_id: string
          transaction_hash?: string | null
          metadata_uri?: string | null
          minted_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          artwork_id?: string
          token_id?: string | null
          blockchain_url?: string | null
          owner_id?: string
          transaction_hash?: string | null
          metadata_uri?: string | null
          minted_at?: string
          created_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
          name: string | null
          wallet_address: string | null
          is_admin: boolean
          shipping_address: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name?: string | null
          wallet_address?: string | null
          is_admin?: boolean
          shipping_address?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          wallet_address?: string | null
          is_admin?: boolean
          shipping_address?: Json | null
          created_at?: string
          updated_at?: string
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Helper types
export type Artwork = Database['public']['Tables']['artworks']['Row']
export type Category = Database['public']['Tables']['categories']['Row']
export type Order = Database['public']['Tables']['orders']['Row']
export type NFTMetadata = Database['public']['Tables']['nft_metadata']['Row']
export type Profile = Database['public']['Tables']['profiles']['Row']

export type NewArtwork = Database['public']['Tables']['artworks']['Insert']
export type NewCategory = Database['public']['Tables']['categories']['Insert']
export type NewOrder = Database['public']['Tables']['orders']['Insert']
export type NewNFTMetadata = Database['public']['Tables']['nft_metadata']['Insert']
export type NewProfile = Database['public']['Tables']['profiles']['Insert']
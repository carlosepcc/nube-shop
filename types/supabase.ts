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
      product: {
        Row: {
          created_at: string
          description: string | null
          id: number
          title: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          title?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          title?: string | null
        }
        Relationships: []
      }
      product_image: {
        Row: {
          id: number
          image_url: string
          product_id: number
        }
        Insert: {
          id?: number
          image_url: string
          product_id: number
        }
        Update: {
          id?: number
          image_url?: string
          product_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_product"
            columns: ["product_id"]
            referencedRelation: "product"
            referencedColumns: ["id"]
          }
        ]
      }
      product_price: {
        Row: {
          currency_code: string
          id: number
          price: number
          product_id: number
        }
        Insert: {
          currency_code: string
          id?: number
          price: number
          product_id: number
        }
        Update: {
          currency_code?: string
          id?: number
          price?: number
          product_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_product"
            columns: ["product_id"]
            referencedRelation: "product"
            referencedColumns: ["id"]
          }
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

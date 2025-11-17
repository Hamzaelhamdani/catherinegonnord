-- Migration: Ajouter support multi-médias pour les œuvres
-- Description: Permet d'ajouter 2 médias supplémentaires (photos ou vidéos) en plus de l'image principale
-- Date: 2024-11-17

-- Ajouter les colonnes pour les médias supplémentaires
ALTER TABLE artworks 
ADD COLUMN IF NOT EXISTS media_2 TEXT,
ADD COLUMN IF NOT EXISTS media_2_type VARCHAR(10) CHECK (media_2_type IN ('image', 'video')),
ADD COLUMN IF NOT EXISTS media_3 TEXT,
ADD COLUMN IF NOT EXISTS media_3_type VARCHAR(10) CHECK (media_3_type IN ('image', 'video'));

-- Ajouter des commentaires pour documentation
COMMENT ON COLUMN artworks.media_2 IS 'URL du deuxième média (photo ou vidéo uploadée dans Supabase Storage)';
COMMENT ON COLUMN artworks.media_2_type IS 'Type du deuxième média: image ou video';
COMMENT ON COLUMN artworks.media_3 IS 'URL du troisième média (photo ou vidéo uploadée dans Supabase Storage)';
COMMENT ON COLUMN artworks.media_3_type IS 'Type du troisième média: image ou video';

-- Index pour améliorer les performances de recherche
CREATE INDEX IF NOT EXISTS idx_artworks_media_2_type ON artworks(media_2_type);
CREATE INDEX IF NOT EXISTS idx_artworks_media_3_type ON artworks(media_3_type);

-- Vérification de la migration
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'artworks' 
AND column_name IN ('media_2', 'media_2_type', 'media_3', 'media_3_type')
ORDER BY column_name;

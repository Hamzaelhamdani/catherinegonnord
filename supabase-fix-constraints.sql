-- Fix: Supprimer les anciennes contraintes qui bloquent l'enregistrement
-- Date: 2024-11-17

-- Supprimer l'ancienne contrainte sur la technique
ALTER TABLE artworks DROP CONSTRAINT IF EXISTS artworks_tech_check;

-- Supprimer l'ancienne contrainte sur la catégorie si elle existe
ALTER TABLE artworks DROP CONSTRAINT IF EXISTS artworks_category_check;

-- Vérification: Lister toutes les contraintes restantes
SELECT
    conname AS constraint_name,
    contype AS constraint_type,
    pg_get_constraintdef(oid) AS constraint_definition
FROM pg_constraint
WHERE conrelid = 'artworks'::regclass
ORDER BY conname;

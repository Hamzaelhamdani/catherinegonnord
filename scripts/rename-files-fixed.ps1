# Script de renommage des fichiers d'art pour le web
$sourceDir = "H:\Cathpainting\Paintings"
$targetDir = "H:\Cathpainting\devcath\catpainting\public\artworks"

# Créer le dossier de destination s'il n'existe pas
if (-not (Test-Path $targetDir)) {
    New-Item -Path $targetDir -ItemType Directory -Force
    Write-Host "Dossier de destination créé: $targetDir" -ForegroundColor Green
}

# Mapping des noms de fichiers
$fileMapping = @{
    "#bassinarcachon #bassindarcachon #bassin #pins #mer #couleurs #blue #painting #paint #couleurs #yellow #peinture #artiste #femmeartiste #peintrefemme #galerie.jpg" = "bassin-arcachon-01.jpg"
    "#bassinarcachon #bassindarcachon #bassin #pins #mer #couleurs #blue #painting #paint #couleurs #yellow #peinture #artiste #femmeartiste #peintrefemme #galerie2.jpg" = "bassin-arcachon-02.jpg"
    "#bassinarcachon #bassindarcachon #bassin #pins #mer #couleurs #blue #painting #paint #couleurs #yellow #peinture #artiste #femmeartiste #peintrefemme #galerie3.jpg" = "bassin-arcachon-03.jpg"
    "#bassinarcachon #bassindarcachon #bassin #pins #mer #couleurs #blue #painting #paint #couleurs #yellow #peinture #artiste #femmeartiste #peintrefemme #galerie4.jpg" = "bassin-arcachon-04.jpg"
    "#bassinarcachon #bassindarcachon #bassin #pins #mer #couleurs #blue #painting #paint #couleurs #yellow #peinture #artiste #femmeartiste #peintrefemme #galerie5.jpg" = "bassin-arcachon-05.jpg"
    "#bassinarcachon #bassindarcachon #bassin #pins #mer #couleurs #blue #painting #paint #couleurs #yellow #peinture #artiste #femmeartiste #peintrefemme #galerie6.jpg" = "bassin-arcachon-06.jpg"
    "#bassinarcachon #bassindarcachon #bassin #pins #mer #couleurs #blue #painting #paint #couleurs #yellow #peinture #artiste #femmeartiste #peintrefemme #galerie7.jpg" = "bassin-arcachon-07.jpg"
    "#bordeaux #rouge #vin #peinture #artiste #painting #red #wine #bordeaux #couleurs #vignes #vignoble #femmeartiste #peintrefemme #galerie.jpg" = "bordeaux-01.jpg"
    "#bordeaux #rouge #vin #peinture #artiste #painting #red #wine #bordeaux #couleurs #vignes #vignoble #femmeartiste #peintrefemme #galerie2.jpg" = "bordeaux-02.jpg"
    "#bordeaux #rouge #vin #peinture #artiste #painting #red #wine #bordeaux #couleurs #vignes #vignoble #femmeartiste #peintrefemme #galerie3.jpg" = "bordeaux-03.jpg"
    "#bordeaux #rouge #vin #peinture #artiste #painting #red #wine #bordeaux #couleurs #vignes #vignoble #femmeartiste #peintrefemme #galerie4.jpg" = "bordeaux-04.jpg"
    "#bordeaux #rouge #vin #peinture #artiste #painting #red #wine #bordeaux #couleurs #vignes #vignoble #femmeartiste #peintrefemme #galerie5.jpg" = "bordeaux-05.jpg"
    "#bordeaux #rouge #vin #peinture #artiste #painting #red #wine #bordeaux #couleurs #vignes #vignoble #femmeartiste #peintrefemme #galerie6.jpg" = "bordeaux-06.jpg"
    "#giverny #monet #nymphéas #étang #water #painting #art #peinture #impressionnisme #couleurs #artiste #femmeartiste #peintrefemme #galerie.jpg" = "giverny-01.jpg"
    "#giverny #monet #nymphéas #étang #water #painting #art #peinture #impressionnisme #couleurs #artiste #femmeartiste #peintrefemme #galerie2.jpg" = "giverny-02.jpg"
    "#giverny #monet #nymphéas #étang #water #painting #art #peinture #impressionnisme #couleurs #artiste #femmeartiste #peintrefemme #galerie3.jpg" = "giverny-03.jpg"
    "#giverny #monet #nymphéas #étang #water #painting #art #peinture #impressionnisme #couleurs #artiste #femmeartiste #peintrefemme #galerie4.jpg" = "giverny-04.jpg"
    "#giverny #monet #nymphéas #étang #water #painting #art #peinture #impressionnisme #couleurs #artiste #femmeartiste #peintrefemme #galerie5.jpg" = "giverny-05.jpg"
    "#giverny #monet #nymphéas #étang #water #painting #art #peinture #impressionnisme #couleurs #artiste #femmeartiste #peintrefemme #galerie6.jpg" = "giverny-06.jpg"
    "#giverny #monet #nymphéas #étang #water #painting #art #peinture #impressionnisme #couleurs #artiste #femmeartiste #peintrefemme #galerie7.jpg" = "giverny-07.jpg"
    "#provence #lavandes #lavender #purple #violet #painting #art #peinture #couleurs #champs #artiste #femmeartiste #peintrefemme #galerie.jpg" = "provence-01.jpg"
    "#provence #lavandes #lavender #purple #violet #painting #art #peinture #couleurs #champs #artiste #femmeartiste #peintrefemme #galerie2.jpg" = "provence-02.jpg"
    "#provence #lavandes #lavender #purple #violet #painting #art #peinture #couleurs #champs #artiste #femmeartiste #peintrefemme #galerie3.jpg" = "provence-03.jpg"
    "#provence #lavandes #lavender #purple #violet #painting #art #peinture #couleurs #champs #artiste #femmeartiste #peintrefemme #galerie4.jpg" = "provence-04.jpg"
    "#provence #lavandes #lavender #purple #violet #painting #art #peinture #couleurs #champs #artiste #femmeartiste #peintrefemme #galerie5.jpg" = "provence-05.jpg"
    "#provence #lavandes #lavender #purple #violet #painting #art #peinture #couleurs #champs #artiste #femmeartiste #peintrefemme #galerie6.jpg" = "provence-06.jpg"
    "#provence #lavandes #lavender #purple #violet #painting #art #peinture #couleurs #champs #artiste #femmeartiste #peintrefemme #galerie7.jpg" = "provence-07.jpg"
    "#provence #lavandes #lavender #purple #violet #painting #art #peinture #couleurs #champs #artiste #femmeartiste #peintrefemme #galerie8.jpg" = "provence-08.jpg"
    "#provence #lavandes #lavender #purple #violet #painting #art #peinture #couleurs #champs #artiste #femmeartiste #peintrefemme #galerie9.jpg" = "provence-09.jpg"
    "#saintes maries #camargue #flamants #pink #rose #painting #art #peinture #couleurs #mer #artiste #femmeartiste #peintrefemme #galerie.jpg" = "saintes-maries-01.jpg"
    "#saintes maries #camargue #flamants #pink #rose #painting #art #peinture #couleurs #mer #artiste #femmeartiste #peintrefemme #galerie2.jpg" = "saintes-maries-02.jpg"
    "#saintes maries #camargue #flamants #pink #rose #painting #art #peinture #couleurs #mer #artiste #femmeartiste #peintrefemme #galerie3.jpg" = "saintes-maries-03.jpg"
    "#saintes maries #camargue #flamants #pink #rose #painting #art #peinture #couleurs #mer #artiste #femmeartiste #peintrefemme #galerie4.jpg" = "saintes-maries-04.jpg"
    "#saintes maries #camargue #flamants #pink #rose #painting #art #peinture #couleurs #mer #artiste #femmeartiste #peintrefemme #galerie5.jpg" = "saintes-maries-05.jpg"
    "#saintes maries #camargue #flamants #pink #rose #painting #art #peinture #couleurs #mer #artiste #femmeartiste #peintrefemme #galerie6.jpg" = "saintes-maries-06.jpg"
    "2024-12-21_13-31-29.jpg" = "catherine-portrait-01.jpg"
    "2024-12-21_13-31-42.jpg" = "catherine-portrait-02.jpg"
    "2024-12-21_13-31-53.jpg" = "catherine-portrait-03.jpg"
    "2024-12-21_13-31-59.jpg" = "catherine-portrait-04.jpg"
    "2024-12-21_13-32-07.jpg" = "catherine-portrait-05.jpg"
    "2024-12-21_13-32-14.jpg" = "catherine-portrait-06.jpg"
    "2024-12-21_13-32-20.jpg" = "catherine-portrait-07.jpg"
    "2024-12-21_13-32-25.jpg" = "catherine-portrait-08.jpg"
    "2024-12-21_13-32-30.jpg" = "catherine-portrait-09.jpg"
    "2024-12-21_13-32-34.jpg" = "catherine-portrait-10.jpg"
}

Write-Host "Début de la copie et du renommage des fichiers..." -ForegroundColor Yellow

foreach ($originalName in $fileMapping.Keys) {
    $sourcePath = Join-Path $sourceDir $originalName
    $newName = $fileMapping[$originalName]
    $targetPath = Join-Path $targetDir $newName
    
    if (Test-Path $sourcePath) {
        try {
            Copy-Item $sourcePath $targetPath -Force
            Write-Host "Copié: $originalName -> $newName" -ForegroundColor Green
        }
        catch {
            Write-Host "Erreur lors de la copie de $originalName : $($_.Exception.Message)" -ForegroundColor Red
        }
    }
    else {
        Write-Host "Fichier non trouvé: $originalName" -ForegroundColor Red
    }
}

Write-Host "`nCopie terminée. Vérification du dossier de destination..." -ForegroundColor Cyan
$copiedFiles = Get-ChildItem $targetDir | Measure-Object
Write-Host "Nombre de fichiers copiés: $($copiedFiles.Count)" -ForegroundColor Cyan
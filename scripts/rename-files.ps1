# Script PowerShell pour renommer les fichiers avec des noms simplifiés

$sourceDir = "H:\Cathpainting\devcath\catpainting\public\paintings"
$targetDir = "H:\Cathpainting\devcath\catpainting\public\artworks"

# Créer le dossier de destination
if (!(Test-Path $targetDir)) {
    New-Item -ItemType Directory -Path $targetDir -Force
}

# Mapping des fichiers originaux vers les nouveaux noms
$fileMapping = @{
    "#abstraining #acrylique#acryliquepainting#bleu#catpainting1983#colors#peinture#.jpg" = "abstraction-01.jpg"
    "#balades#marche#été#vignes#montagne  #région Aquitaine#aquarelle#watercolour#acuarella#2022 #catpainting1983.jpg" = "balades-02.jpg"
    "#Balconi #aquarelle #2021#watercolour #acuarella #colonnade.jpg" = "balconi-03.jpg"
    "#bassinarcachon #bassindarcachon #bassin #pins #mer #bleu #aquarelle #watercolorlovers #acuerella #catpainting1983.jpg" = "bassin-arcachon-04.jpg"
    "#bibliotheque #maisondefamille #aquarelle #watercolour #skeatchup #acuarella # 2022.jpg" = "bibliotheque-05.jpg"
    "#campagne #europe #été #maisondevacances #aquarelle #2021 #watercolor #watercolour #acuarella.jpg" = "campagne-europe-06.jpg"
    "#canoë #canoecayak #rivières #naturelover #aquarelle #watercolours #acuerella #catpainting1983 #ascension #weekend.jpg" = "canoe-07.jpg"
    "#ciel #nuages #aquarelle #acuarella #watercolor #watercolour #été #2021.jpg" = "ciel-nuages-08.jpg"
    "#clairobscur #cuisine #cuisinechateau #ambiance #rustic #aquarelle #watercolour #watercolor #acuarella #catpainting1983 #2022.jpg" = "cuisine-chateau-09.jpg"
    "#courbes#ronds#vagues#droites#acrylique.  #catpainting1983.jpg" = "courbes-vagues-10.jpg"
    "#douceurdeleau #findété #clapotis #harmonie #calme #serenite.jpg" = "douceur-eau-11.jpg"
    "#enlace#cercles#oval#bleu#infini#acrylique#medium#catpainting1983.jpg" = "cercles-infini-12.jpg"
    "#escalier #series #vuededessus #aquarelle #watercolour #watercolor #acuarella #acquerello.jpg" = "escalier-dessus-13.jpg"
    "#evasion #bleuturquoise #abstrait #aquarelle #watercolour #acuarella #catpainting1983.com.jpg" = "evasion-turquoise-14.jpg"
    "#interieur #interior #lumiere #ambiance #cosy #aquarelle #watercolor #watercolour #acuerella #2022.jpg" = "interieur-cosy-15.jpg"
    "#interiors#aquarelle #watercolors#acuarella  #catpainting1983.jpg" = "interiors-16.jpg"
    "#jets#courbes#enlaces#bleu#acrylique#catpainting1983.jpg" = "jets-courbes-17.jpg"
    "#lacitalien #été #aquarelle #watercolour #watercolor #acuarella #2021.jpg" = "lac-italien-18.jpg"
    "#mer#mediterranee#portcros  #porquerolles #acrylique #acrylic  #catpainting1983 #.jpg" = "mediterranee-portcros-19.jpg"
    "#mer#mediterranee#portcros  #porquerolles#aquarelle #watercolour #acuerella  #catpainting1983.jpg" = "porquerolles-20.jpg"
    "#mondefile #mode #aquarelles #watercolours #acuerela #catpainting1983#noiretblanc(1).jpg" = "mode-nb-21.jpg"
    "#mondefile #mode #aquarelles #watercolours #acuerela #catpainting1983#noiretblanc.jpg" = "mode-nb-22.jpg"
    "#mondefile #noiretblanc #aquarelle  #watercolorpainting #catpainting1983  #acuerela #mode.jpg" = "mode-nb-23.jpg"
    "#mondefile #noiretblanc #aquarelle 1#catpainting1983 #watercolours #acuerela.jpg" = "mode-nb-24.jpg"
    "#mondefile #noiretblanc #mode #aquarelle #watercolours #acuerela #catpainting1983 #2023.jpg" = "mode-nb-25.jpg"
    "#neige #chalet #ski #fevrier #vacances #aquarelles #watercolour #watercolors #acuarella #catpainting1983.com.jpg" = "chalet-neige-26.jpg"
    "#noiretblanc #patinaglace #mondefile #aquarelle #watercolours #watercoloursketch #acuerela #catpainting1983.jpg" = "patinage-nb-27.jpg"
    "#paris#parisfrance#toureiffel#toureiffelparis#seine#pontdeseine#automne#aquarelle#watercolour#watercolor #acuarella#catpainting1983#2022.jpg" = "paris-tour-eiffel-28.jpg"
    "#Regard #amour #contemplation #aquarelle #2021 #watercolour #watercolor #acuarella.jpg" = "regard-contemplation-29.jpg"
    "#sketch #aquarelle #été#2022 #bleu #mer #voiles.jpg" = "sketch-mer-30.jpg"
    "#série #escalier #descente #aquarelle #2021 #watercolour #watercolor #acuarella #acquerello.jpg" = "escalier-descente-31.jpg"
    "#série #escalier #perspective #vuecontreplongée #aquarelle #2021 #watercolours #watercolor #acuarella #acquerello.jpg" = "escalier-perspective-32.jpg"
    "#série#escalier#été#aquarelle#architecture#bois#watercolour#watercolor#acquerello #acuarella.jpg" = "escalier-ete-33.jpg"
    "#unpetitcoinducanada #neige #fraicheur#foret#aquarelle #watercolours #acuerella.jpg" = "canada-neige-34.jpg"
    "#variations #ciel #mer #été #aquarelle #retrouvailles #watercolours #acuarella#sept 2022.jpg" = "variations-ciel-mer-35.jpg"
    "#voyage #chypre #chaleur #couleurschaudes #poteries #lumiere #reflet #aquarelle #acuarella #watercolour  #catpainting1983.com.jpg" = "voyage-chypre-36.jpg"
    "403927559_900086681108855_9176842909912894114_n.jpg" = "social-01-37.jpg"
    "403970114_733552025334602_9200026880001164228_n.jpg" = "social-02-38.jpg"
    "404656282_1144631123168518_717207211613806263_n.jpg" = "social-03-39.jpg"
    "405198314_1020930425865017_7956051203904148392_n.jpg" = "social-04-40.jpg"
    "432681550_733229578950664_8837673648910571803_n.jpg" = "social-05-41.jpg"
    "433773075_1085914612671109_4821964835253529550_n.jpg" = "social-06-42.jpg"
    "Copy of #abstraining #acrylique#acryliquepainting#bleu#catpainting1983#colors#peinture#.jpg" = "abstraction-copy-43.jpg"
    "Pilat #dune#plage#.jpg" = "dune-pilat-44.jpg"
}

Write-Host "Début de la copie et du renommage des fichiers..." -ForegroundColor Green

foreach ($originalName in $fileMapping.Keys) {
    $newName = $fileMapping[$originalName]
    $sourcePath = Join-Path $sourceDir $originalName
    $targetPath = Join-Path $targetDir $newName
    
    if (Test-Path $sourcePath) {
        try {
            Copy-Item $sourcePath $targetPath -Force
            Write-Host "✓ $originalName -> $newName" -ForegroundColor Green
        } catch {
            Write-Host "✗ Erreur avec $originalName : $($_.Exception.Message)" -ForegroundColor Red
        }
    } else {
        Write-Host "✗ Fichier non trouvé: $originalName" -ForegroundColor Yellow
    }
}

Write-Host "`nCopie terminée. Vérification du dossier de destination..." -ForegroundColor Cyan
$copiedFiles = Get-ChildItem $targetDir | Measure-Object
Write-Host "Nombre de fichiers copiés: $($copiedFiles.Count)" -ForegroundColor Cyan
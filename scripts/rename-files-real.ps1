# Script de renommage des fichiers d'art pour le web - avec les vrais noms
$sourceDir = "H:\Cathpainting\Paintings"
$targetDir = "H:\Cathpainting\devcath\catpainting\public\artworks"

# Créer le dossier de destination s'il n'existe pas
if (-not (Test-Path $targetDir)) {
    New-Item -Path $targetDir -ItemType Directory -Force
    Write-Host "Dossier de destination créé: $targetDir" -ForegroundColor Green
}

# Mapping des noms de fichiers réels
$fileMapping = @{
    "#abstraining #acrylique#acryliquepainting#bleu#catpainting1983#colors#peinture#.jpg" = "abstrait-01.jpg"
    "#balades#marche#été#vignes#montagne  #région Aquitaine#aquarelle#watercolour#acuarella#2022 #catpainting1983.jpg" = "balades-vignes-01.jpg"
    "#Balconi #aquarelle #2021#watercolour #acuarella #colonnade.jpg" = "balcon-01.jpg"
    "#bassinarcachon #bassindarcachon #bassin #pins #mer #bleu #aquarelle #watercolorlovers #acuerella #catpainting1983.jpg" = "bassin-arcachon-01.jpg"
    "#bibliotheque #maisondefamille #aquarelle #watercolour #skeatchup #acuarella # 2022.jpg" = "bibliotheque-01.jpg"
    "#campagne #europe #été #maisondevacances #aquarelle #2021 #watercolor #watercolour #acuarella.jpg" = "campagne-01.jpg"
    "#canoë #canoecayak #rivières #naturelover #aquarelle #watercolours #acuerella #catpainting1983 #ascension #weekend.jpg" = "canoe-01.jpg"
    "#ciel #nuages #aquarelle #acuarella #watercolor #watercolour #été #2021.jpg" = "ciel-nuages-01.jpg"
    "#clairobscur #cuisine #cuisinechateau #ambiance #rustic #aquarelle #watercolour #watercolor #acuarella #catpainting1983 #2022.jpg" = "cuisine-chateau-01.jpg"
    "#courbes#ronds#vagues#droites#acrylique.  #catpainting1983.jpg" = "courbes-01.jpg"
    "#douceurdeleau #findété #clapotis #harmonie #calme #serenite.jpg" = "douceur-eau-01.jpg"
    "#enlace#cercles#oval#bleu#infini#acrylique#medium#catpainting1983.jpg" = "cercles-bleu-01.jpg"
    "#escalier #series #vuededessus #aquarelle #watercolour #watercolor #acuarella #acquerello.jpg" = "escalier-dessus-01.jpg"
    "#evasion #bleuturquoise #abstrait #aquarelle #watercolour #acuarella #catpainting1983.com.jpg" = "evasion-turquoise-01.jpg"
    "#interieur #interior #lumiere #ambiance #cosy #aquarelle #watercolor #watercolour #acuerella #2022.jpg" = "interieur-01.jpg"
    "#interiors#aquarelle #watercolors#acuarella  #catpainting1983.jpg" = "interieur-02.jpg"
    "#jets#courbes#enlaces#bleu#acrylique#catpainting1983.jpg" = "jets-courbes-01.jpg"
    "#lacitalien #été #aquarelle #watercolour #watercolor #acuarella #2021.jpg" = "lac-italien-01.jpg"
    "#mer#mediterranee#portcros  #porquerolles #acrylique #acrylic  #catpainting1983 #.jpg" = "mer-mediterranee-01.jpg"
    "#mer#mediterranee#portcros  #porquerolles#aquarelle #watercolour #acuerella  #catpainting1983.jpg" = "mer-mediterranee-02.jpg"
    "#mondefile #mode #aquarelles #watercolours #acuerela #catpainting1983#noiretblanc(1).jpg" = "mode-nb-01.jpg"
    "#mondefile #mode #aquarelles #watercolours #acuerela #catpainting1983#noiretblanc.jpg" = "mode-nb-02.jpg"
    "#mondefile #noiretblanc #aquarelle  #watercolorpainting #catpainting1983  #acuerela #mode.jpg" = "mode-nb-03.jpg"
    "#mondefile #noiretblanc #aquarelle 1#catpainting1983 #watercolours #acuerela.jpg" = "mode-nb-04.jpg"
    "#mondefile #noiretblanc #mode #aquarelle #watercolours #acuerela #catpainting1983 #2023.jpg" = "mode-nb-05.jpg"
    "#neige #chalet #ski #fevrier #vacances #aquarelles #watercolour #watercolors #acuarella #catpainting1983.com.jpg" = "neige-chalet-01.jpg"
    "#noiretblanc #patinaglace #mondefile #aquarelle #watercolours #watercoloursketch #acuerela #catpainting1983.jpg" = "patinage-nb-01.jpg"
    "#paris#parisfrance#toureiffel#toureiffelparis#seine#pontdeseine#automne#aquarelle#watercolour#watercolor #acuarella#catpainting1983#2022.jpg" = "paris-automne-01.jpg"
    "#Regard #amour #contemplation #aquarelle #2021 #watercolour #watercolor #acuarella.jpg" = "regard-amour-01.jpg"
    "#sketch #aquarelle #été#2022 #bleu #mer #voiles.jpg" = "sketch-mer-01.jpg"
    "#série #escalier #descente #aquarelle #2021 #watercolour #watercolor #acuarella #acquerello.jpg" = "escalier-descente-01.jpg"
    "#série #escalier #perspective #vuecontreplongée #aquarelle #2021 #watercolours #watercolor #acuarella #acquerello.jpg" = "escalier-perspective-01.jpg"
    "#série#escalier#été#aquarelle#architecture#bois#watercolour#watercolor#acquerello #acuarella.jpg" = "escalier-bois-01.jpg"
    "#unpetitcoinducanada #neige #fraicheur#foret#aquarelle #watercolours #acuerella.jpg" = "canada-foret-01.jpg"
    "#variations #ciel #mer #été #aquarelle #retrouvailles #watercolours #acuarella#sept 2022.jpg" = "variations-ciel-01.jpg"
    "#voyage #chypre #chaleur #couleurschaudes #poteries #lumiere #reflet #aquarelle #acuarella #watercolour  #catpainting1983.com.jpg" = "chypre-poteries-01.jpg"
    "403927559_900086681108855_9176842909912894114_n.jpg" = "oeuvre-01.jpg"
    "403970114_733552025334602_9200026880001164228_n.jpg" = "oeuvre-02.jpg"
    "404656282_1144631123168518_717207211613806263_n.jpg" = "oeuvre-03.jpg"
    "405198314_1020930425865017_7956051203904148392_n.jpg" = "oeuvre-04.jpg"
    "432681550_733229578950664_8837673648910571803_n.jpg" = "oeuvre-05.jpg"
    "433773075_1085914612671109_4821964835253529550_n.jpg" = "oeuvre-06.jpg"
    "Copy of #abstraining #acrylique#acryliquepainting#bleu#catpainting1983#colors#peinture#.jpg" = "abstrait-02.jpg"
}

Write-Host "Début de la copie et du renommage des fichiers..." -ForegroundColor Yellow

foreach ($originalName in $fileMapping.Keys) {
    $sourcePath = Join-Path $sourceDir $originalName
    $newName = $fileMapping[$originalName]
    $targetPath = Join-Path $targetDir $newName
    
    if (Test-Path $sourcePath) {
        try {
            Copy-Item $sourcePath $targetPath -Force
            Write-Host "Copié: $newName" -ForegroundColor Green
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
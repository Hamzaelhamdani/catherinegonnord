// Script pour créer des données avec des chemins d'images simplifiés
// et générer une correspondance entre les noms originaux et les nouveaux noms

const originalFilenames = [
  "#abstraining #acrylique#acryliquepainting#bleu#catpainting1983#colors#peinture#.jpg",
  "#balades#marche#été#vignes#montagne  #région Aquitaine#aquarelle#watercolour#acuarella#2022 #catpainting1983.jpg",
  "#Balconi #aquarelle #2021#watercolour #acuarella #colonnade.jpg",
  "#bassinarcachon #bassindarcachon #bassin #pins #mer #bleu #aquarelle #watercolorlovers #acuerella #catpainting1983.jpg",
  "#bibliotheque #maisondefamille #aquarelle #watercolour #skeatchup #acuarella # 2022.jpg",
  "#campagne #europe #été #maisondevacances #aquarelle #2021 #watercolor #watercolour #acuarella.jpg",
  "#canoë #canoecayak #rivières #naturelover #aquarelle #watercolours #acuerella #catpainting1983 #ascension #weekend.jpg",
  "#ciel #nuages #aquarelle #acuarella #watercolor #watercolour #été #2021.jpg",
  "#clairobscur #cuisine #cuisinechateau #ambiance #rustic #aquarelle #watercolour #watercolor #acuarella #catpainting1983 #2022.jpg",
  "#courbes#ronds#vagues#droites#acrylique.  #catpainting1983.jpg",
  "#douceurdeleau #findété #clapotis #harmonie #calme #serenite.jpg",
  "#enlace#cercles#oval#bleu#infini#acrylique#medium#catpainting1983.jpg",
  "#escalier #series #vuededessus #aquarelle #watercolour #watercolor #acuarella #acquerello.jpg",
  "#evasion #bleuturquoise #abstrait #aquarelle #watercolour #acuarella #catpainting1983.com.jpg",
  "#interieur #interior #lumiere #ambiance #cosy #aquarelle #watercolor #watercolour #acuerella #2022.jpg",
  "#interiors#aquarelle #watercolors#acuarella  #catpainting1983.jpg",
  "#jets#courbes#enlaces#bleu#acrylique#catpainting1983.jpg",
  "#lacitalien #été #aquarelle #watercolour #watercolor #acuarella #2021.jpg",
  "#mer#mediterranee#portcros  #porquerolles #acrylique #acrylic  #catpainting1983 #.jpg",
  "#mer#mediterranee#portcros  #porquerolles#aquarelle #watercolour #acuerella  #catpainting1983.jpg",
  "#mondefile #mode #aquarelles #watercolours #acuerela #catpainting1983#noiretblanc(1).jpg",
  "#mondefile #mode #aquarelles #watercolours #acuerela #catpainting1983#noiretblanc.jpg",
  "#mondefile #noiretblanc #aquarelle  #watercolorpainting #catpainting1983  #acuerela #mode.jpg",
  "#mondefile #noiretblanc #aquarelle 1#catpainting1983 #watercolours #acuerela.jpg",
  "#mondefile #noiretblanc #mode #aquarelle #watercolours #acuerela #catpainting1983 #2023.jpg",
  "#neige #chalet #ski #fevrier #vacances #aquarelles #watercolour #watercolors #acuarella #catpainting1983.com.jpg",
  "#noiretblanc #patinaglace #mondefile #aquarelle #watercolours #watercoloursketch #acuerela #catpainting1983.jpg",
  "#paris#parisfrance#toureiffel#toureiffelparis#seine#pontdeseine#automne#aquarelle#watercolour#watercolor #acuarella#catpainting1983#2022.jpg",
  "#Regard #amour #contemplation #aquarelle #2021 #watercolour #watercolor #acuarella.jpg",
  "#sketch #aquarelle #été#2022 #bleu #mer #voiles.jpg",
  "#série #escalier #descente #aquarelle #2021 #watercolour #watercolor #acuarella #acquerello.jpg",
  "#série #escalier #perspective #vuecontreplongée #aquarelle #2021 #watercolours #watercolor #acuarella #acquerello.jpg",
  "#série#escalier#été#aquarelle#architecture#bois#watercolour#watercolor#acquerello #acuarella.jpg",
  "#unpetitcoinducanada #neige #fraicheur#foret#aquarelle #watercolours #acuerella.jpg",
  "#variations #ciel #mer #été #aquarelle #retrouvailles #watercolours #acuarella#sept 2022.jpg",
  "#voyage #chypre #chaleur #couleurschaudes #poteries #lumiere #reflet #aquarelle #acuarella #watercolour  #catpainting1983.com.jpg",
  "403927559_900086681108855_9176842909912894114_n.jpg",
  "403970114_733552025334602_9200026880001164228_n.jpg",
  "404656282_1144631123168518_717207211613806263_n.jpg",
  "405198314_1020930425865017_7956051203904148392_n.jpg",
  "432681550_733229578950664_8837673648910571803_n.jpg",
  "433773075_1085914612671109_4821964835253529550_n.jpg",
  "Copy of #abstraining #acrylique#acryliquepainting#bleu#catpainting1983#colors#peinture#.jpg",
  "Pilat #dune#plage#.jpg"
];

// Créer des noms simplifiés
const createSimplifiedMapping = () => {
  const mapping = [];
  
  originalFilenames.forEach((filename, index) => {
    const id = index + 1;
    const simpleName = `artwork-${id.toString().padStart(2, '0')}.jpg`;
    
    // Extraire quelques mots clés pour un nom plus descriptif
    let descriptiveName = filename
      .toLowerCase()
      .replace(/#/g, '')
      .replace(/catpainting1983/g, '')
      .replace(/watercolour|watercolor|acuarella|acquerello/g, '')
      .replace(/aquarelle/g, 'aquarelle')
      .replace(/acrylique|acrylic/g, 'acrylique')
      .trim();
    
    // Extraire le premier mot significatif
    const words = descriptiveName.split(/[\s#]+/).filter(word => 
      word.length > 2 && 
      !['com', 'jpg', '2021', '2022', '2023', '2024'].includes(word)
    );
    
    const mainWord = words[0] || 'artwork';
    const finalName = `${mainWord}-${id.toString().padStart(2, '0')}.jpg`;
    
    mapping.push({
      id,
      originalName: filename,
      simpleName: finalName,
      webPath: `/paintings/${finalName}`
    });
  });
  
  return mapping;
};

const fileMapping = createSimplifiedMapping();

console.log('Mapping des fichiers créé :');
console.log(JSON.stringify(fileMapping, null, 2));

// Exporter le mapping
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { fileMapping };
}
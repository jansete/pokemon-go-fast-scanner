function getMasillas() {
  return [
    { id: 10, name: 'Caterpie'},
    { id: 13, name: 'Weedle'},
    { id: 16, name: 'Pidgey'},
    { id: 19, name: 'Rattata'},
    { id: 21, name: 'Spearow'},
    { id: 23, name: 'Ekans'},
    { id: 27, name: 'Sandshrew'},
    { id: 39, name: 'Jigglypuff'},
    { id: 41, name: 'Zubat'},
    { id: 46, name: 'Paras'},
    { id: 48, name: 'Venonat'},
    { id: 50, name: 'Diglett'},
    { id: 52, name: 'Meowth'},
    { id: 54, name: 'Psyduck'},
    { id: 56, name: 'Mankey'},
    { id: 58, name: 'Growlithe'},
    { id: 63, name: 'Abra'},
    { id: 72, name: 'Tentacool'},
    { id: 74, name: 'Geodude'},
    { id: 77, name: 'Ponyta'},
    { id: 79, name: 'Slowpoke'},
    { id: 81, name: 'Magnemite'},
    { id: 90, name: 'Shellder'},
    { id: 92, name: 'Gastly'},
    { id: 98, name: 'Krabby'},
    { id: 100, name: 'Voltorb'},
    { id: 104, name: 'Cubone'},
    { id: 111, name: 'Rhyhorn'},
    { id: 118, name: 'Goldeen'},
    { id: 120, name: 'Staryu'},
    { id: 133, name: 'Eevee'},
    { id: 138, name: 'Omanyte'},
    { id: 140, name: 'Kabuto'}
  ];
}

function setMasillas() {
  var masillas = getMasillas();
  $(masillas).each(function() {
    $("input#filter-" + this.id).prop("checked", true);
  })
}

function applyFilterMasillas() {
  setMasillas();
  $('#applyfilter').click();
}

applyFilterMasillas();
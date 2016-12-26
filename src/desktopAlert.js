setInterval(function(){
  $('.filteritem input:checkbox:not(:checked)').each(function() {
    var pokeid = $(this).prop('name');
    if (
        $('.displaypokemon[data-pokeid=' + pokeid + ']').length &&
        $(this).data('pokecheck') != true
    ) {
      $(this).data('pokecheck', true);
      alert(pokemonNames[pokeid]);
    }
  })
},5000);
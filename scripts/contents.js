$.ajax({
    url: 'https://cors-anywhere.herokuapp.com/https://www.cronista.com/MercadosOnline/moneda.html?id=ARSB',
    success: function(data) {
      var buyValue = parseFloat($(data).find('.buy-value').text());
      
      $.ajax({
        url: 'https://cors-anywhere.herokuapp.com/https://listado.mercadolibre.com.ar/aire-acondicionado#D[A:aire%20acondicionado]',
        success: function(data) {
          $(data).find('.price-tag-fraction').each(function() {
            var priceTagValue = parseFloat($(this).text());
            var newValue = priceTagValue / buyValue;
            $(this).text(newValue.toFixed(2));
          });
        }
      });
    }
  });
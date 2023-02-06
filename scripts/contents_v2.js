// Get the innerText of ".buy-value" from the cronista.com website,
// parse it as a float, and then divide it by every "price-tag-fraction".
async function processPrices() {
    try {
      // Get the HTML content from cronista.com
      const cronistaResponse = await fetch("https://www.cronista.com/MercadosOnline/moneda.html?id=ARSB");
      const cronistaHTML = await cronistaResponse.text();
    
      // Parse the HTML content to a DOM using the DOMParser API
      const parser = new DOMParser();
      const cronistaDOM = parser.parseFromString(cronistaHTML, "text/html");
    
      // Get the innerText of ".buy-value" and parse it as a float
      const buyValue = parseFloat(cronistaDOM.querySelector(".buy-value").innerText.trim());
    
      // Get the HTML content from mercadolibre.com
      const mercadolibreResponse = await fetch("https://listado.mercadolibre.com.ar/aire-acondicionado#D[A:aire%20acondicionado]");
      const mercadolibreHTML = await mercadolibreResponse.text();
    
      // Parse the HTML content to a DOM using the DOMParser API
      const mercadolibreDOM = parser.parseFromString(mercadolibreHTML, "text/html");
    
      // Find all elements with the "price-tag-fraction" class
      const priceTags = mercadolibreDOM.querySelectorAll(".price-tag-fraction");
    
      // Loop through each element and divide it by the buyValue
      for (const priceTag of priceTags) {
        const price = parseFloat(priceTag.innerText.trim());
        const result = price / buyValue;
        // Replace the innerText with the result
        priceTag.innerText = result.toFixed(2);
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  // Call the function when the extension is loaded
  processPrices();
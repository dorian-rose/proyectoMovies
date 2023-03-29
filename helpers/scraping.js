const puppeteer = require('puppeteer');

const getReviews=async(movieTitle) =>{
  let reviews = [];

  // Crea una instancia de Puppeteer
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    // Navega a la página de búsqueda de Filmaffinity
    await page.goto(`https://www.filmaffinity.com/es/search.php?stext=${movieTitle}&stype=title`);

    // Espera a que la página cargue y busca el primer resultado
    await page.waitForSelector('.movie-card-1');
    const resultLink = await page.$('.movie-card-1 a');

    // Si no se encuentra ningún resultado, devuelve un array vacío
    if (!resultLink) {
      return reviews;
    }

    // Navega al enlace del resultado y espera a que la página cargue
    const resultUrl = await resultLink.evaluate(link => link.href);
    await page.goto(resultUrl);
    await page.waitForSelector('.pro-review[itemprop="review"]');

    // Extrae el contenido de todos los divs con la clase "pro-review" e itemprop="review"
    const reviewDivs = await page.$$('.pro-review[itemprop="review"]');
    for (const reviewDiv of reviewDivs) {
      const review = await page.evaluate(div => div.innerText.trim(), reviewDiv);
      reviews.push(review);
    }
  } catch (err) {
    console.error(err);
  } finally {
    // Cierra la instancia de Puppeteer
    await browser.close();
  }

  // Devuelve el array de reseñas
  console.log(reviews.join('\n---\n'));
}


module.exports={
  getReviews
}

// Ejemplo de uso
//getReviews('avatar')




// const puppeteer = require('puppeteer');

// async function getReviews(movieTitle) {
//   let reviews = [];

//   // Crea una instancia de Puppeteer
//   const browser = await puppeteer.launch({ headless: true });
//   const page = await browser.newPage();

//   try {
//     // Navega al sitio web y acepta las cookies
//     await page.goto('https://www.ecartelera.com/');
//     await page.click('button[data-testid="cookie-policy-accept-button"]');

//     // Ingresa el título de la película en el campo de búsqueda y espera a que aparezcan los resultados
//     await page.type('#search-box', movieTitle);
//     await page.click('#search-button');
//     await page.waitForSelector('.search-list a');

//     // Hace clic en el primer resultado de búsqueda y espera a que cargue la página de la película
//     const resultLink = await page.$('.search-list a');
//     await resultLink.click();
//     await page.waitForSelector('.movie-title');

//     // Navega a la sección de reseñas y espera a que se carguen
//     await page.click('a[href="#criticas"]');
//     await page.waitForSelector('.critica');

//     // Extrae el contenido de los elementos <p> con la clase "cuerpo"
//     const reviewDivs = await page.$$('.critica .cuerpo');
//     for (const reviewDiv of reviewDivs) {
//       const review = await page.evaluate(div => div.innerText.trim(), reviewDiv);
//       reviews.push(review);
//     }
//   } catch (err) {
//     console.error(err);
//   } finally {
//     // Cierra la instancia de Puppeteer
//     await browser.close();
//   }

//   // Si no se encontraron reseñas, devuelve un mensaje
//   if (reviews.length === 0) {
//     console.log('No se han encontrado reseñas.');
//   } else {
//     // Devuelve el array de reseñas
//     console.log(reviews.join('\n---\n'));
//   }
// }

// // Ejemplo de uso
// getReviews('El Padrino');

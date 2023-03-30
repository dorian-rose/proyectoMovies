const puppeteer = require('puppeteer');

const getReviews = async (movieTitle) => {
  let reviews = [];
  let reviewCount = 0;

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
    for (let i = 0; i < 2; i++) {
      const reviewDiv = reviewDivs[i];
      const review = await page.evaluate(div => div.innerText.trim(), reviewDiv);
      reviews.push(review);


    }
  } catch (err) {
    console.error(err);
  } finally {
    // Cierra la instancia de Puppeteer
    await browser.close();
  }

  return reviews
  // Devuelve el array de reseñas
  //console.log(reviews.join('\n---\n'));
}


module.exports = { getReviews };

// Ejemplo de uso
//getReviews('dory')



































// const puppeteer = require('puppeteer');

// const getReviews=async(movieTitle) =>{
//   let reviews = [];

//   // Crea una instancia de Puppeteer
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   try {
//     // Navega a la página de búsqueda de Filmaffinity
//     await page.goto(`https://www.filmaffinity.com/es/search.php?stext=${movieTitle}&stype=title`);

//     // Espera a que la página cargue y busca el primer resultado
//     await page.waitForSelector('.movie-card-1');
//     const resultLink = await page.$('.movie-card-1 a');

//     // Si no se encuentra ningún resultado, devuelve un array vacío
//     if (!resultLink) {
//       return reviews;
//     }

//     // Navega al enlace del resultado y espera a que la página cargue
//     const resultUrl = await resultLink.evaluate(link => link.href);
//     await page.goto(resultUrl);
//     await page.waitForSelector('.pro-review[itemprop="review"]');

//     // Extrae el contenido de todos los divs con la clase "pro-review" e itemprop="review"
//     const reviewDivs = await page.$$('.pro-review[itemprop="review"]');
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

//   // Devuelve el array de reseñas
//   console.log(reviews.join('\n---\n'));
// }

// // Ejemplo de uso
// // getReviews('dory')

// module.exports={getReviews}



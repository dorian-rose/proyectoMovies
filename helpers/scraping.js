const puppeteer = require('puppeteer');

const scrapeMovieReviews = async (movieTitle) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // Navega a la página de la película en IMDb
    const url = `https://www.imdb.com/find?q=${movieTitle}&s=tt&ttype=ft&ref_=fn_ft`;
    await page.goto(url, { waitUntil: 'networkidle0' }); // 'networkidle0'hace que espere hasta que termina de cargar la páina

    // Obtiene el enlace de la película
    const link = await page.evaluate(() => {
      const result = document.querySelector('.findResult .result_text a');
      return result ? result.href : null;
    });

    if (!link) {
      throw new Error(`No se pudo encontrar el enlace de IMDb para la película ${movieTitle}`);
    }

    // Navega a la página de reseñas de la película en IMDb
    await page.goto(`${link}reviews`, { waitUntil: 'networkidle0' });

    // Espera a que carguen todas las reseñas
    await page.waitForTimeout(5000); // Espera 5 segundos

    // Extrae las reseñas
    const reviews = await page.evaluate(() => {
      const reviewList = document.querySelectorAll('.lister-item-content');
      const reviewsArray = [];
      for (let i = 0; i < reviewList.length; i++) {
        const review = reviewList[i];
        const title = review.querySelector('.title').innerText;
        const rating = review.querySelector('.rating-other-user-rating span:first-child').innerText;
        const content = review.querySelector('.content .text').innerText;
        reviewsArray.push({ title, rating, content });
      }
      return reviewsArray;
    });

    return reviews;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await browser.close();
  }
};

module.exports = {
  scrapeMovieReviews,
};

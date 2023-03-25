const puppeteer = require('puppeteer');

const scrapeMovieReviews = async (movieId) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navega a la página de la película
  await page.goto(`https://www.imdb.com/title/${movieId}/reviews`, { waitUntil: 'networkidle0' });

  // Haz clic en "Load More" varias veces para cargar más reseñas
  let loadMoreVisible = true;
  while (loadMoreVisible) {
    try {
      await page.waitForSelector('#load-more-trigger');
      await page.click('#load-more-trigger');
      await page.waitForSelector('#load-more-trigger', { hidden: true, timeout: 5000 });
    } catch (err) {
      loadMoreVisible = false;
    }
  }

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

  await browser.close();

  return reviews;
};

module.exports = {
  scrapeMovieReviews,
};

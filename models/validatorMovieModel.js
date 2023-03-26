const createEditMovieSchema = {
    Title: {
      in: ['body'],
      isString: true,
      notEmpty: true,
      errorMessage: 'El título es requerido'
    },
    Year: {
      in: ['body'],
      isInt: true,
      notEmpty: true,
      custom: {
        options: (value, { req }) => {
          const currentYear = new Date().getFullYear();
          if (value < 1936 || value > currentYear) {
            throw new Error('El año debe ser mínimo 1936 y máximo la fecha actual');
          }
          return true;
        }
      }
    },
    Runtime: {
      in: ['body'],
      custom: {
        options: (value, { req }) => {
          const minutes = parseInt(value, 10);
          if (isNaN(minutes) || minutes <= 1) {
            throw new Error('La duración en minutos es requerida');
          }
          req.body.Runtime = minutes;
          return true;
        }
      }
    },
    Genre: {
      in: ['body'],
      isString: true,
      notEmpty: true,
      errorMessage: 'El género es requerido'
    },
    Director: {
      in: ['body'],
      isString: true,
      notEmpty: true,
      errorMessage: 'El director es requerido'
    },
    Poster: {
      in: ['body'],
      isString: true,
      //isURL: true,
      notEmpty: true,
      errorMessage: 'La imagen debe ser una URL'
    }
  };

module.exports = createEditMovieSchema;
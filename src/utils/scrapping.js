const axios = require('axios');
const cheerio = require('cheerio');
const ProductModel = require('../models/Product');

const insertNew = async (doc) => {
  try {
    const result = await ProductModel.findOne({ name: doc.name });
    if (!result) {
      const newProduct = new ProductModel(doc);
      await newProduct.save();
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

const webscraper = async (url, done) => {
  try {
    if (url) {
      const html = await axios(url);
      const $ = cheerio.load(html.data);
      const expression = new RegExp('w-product__wrapper', 'gmi');
      $('div.w-products-list__wrapper')
        .html()
        .split(expression)
        .map(async (product, i) => {
          const $$ = cheerio.load(product);

          if ($$('.w-product-price__main').text() !== '') {
            const newProduct = {
              name: $$('.w-product__title').text(),
              price:
                $$('.w-product-price__main').text() +
                ',' +
                $$('.w-product-price__dec').text() +
                '€',
              url: 'https://www.worten.es' + $$('.w-product__url').attr('href'),
            };
           
            await insertNew(newProduct);
          }
        });
    }
    return await ProductModel.findOne().sort({ price: 1 }).limit(1);
  } catch (error) {
    return error;
  }
};

module.exports = webscraper;

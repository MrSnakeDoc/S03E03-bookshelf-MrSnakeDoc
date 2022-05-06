const dayjs = require("dayjs");
const advancedFormat = require("dayjs/plugin/advancedFormat");
const relativeTime = require("dayjs/plugin/relativeTime");
const data = require("./data");
const locale_fr = require("dayjs/locale/fr");
const locale_de = require("dayjs/locale/de");
dayjs.extend(advancedFormat);
dayjs.extend(relativeTime);
const shelf = {
  processingTable(dateFormat, lang) {
    let table = "";
    let books = data.ordonner();
    books.forEach((element) => {
      table += `<tr><td class="left">${element.title}</td><td>${
        element.language
      }</td><td>${element.country}</td><td>${element.author}</td><td>${dayjs(
        element.date
      )
        .locale(lang)
        .format(dateFormat)}</td><td class="right">${dayjs(element.date)
        .locale(lang)
        .fromNow()}</td></tr>`;
    });
    return table;
  },
  createTable(dateFormat, lang) {
    const fullTable = `<table class="table is-striped">${shelf.processingTable(
      dateFormat,
      lang
    )}</table>`;
    return fullTable;
  },
  cssization(dateFormat, lang) {
    const fullHTML = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
        <link rel="stylesheet" href="styles.css">
        <title>Book Shelf</title>
        
    </head>
    <body>
    <nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbar">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>
  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a class="button is-primary" href="/">
            <strong>EN</strong>
          </a>
          <a class="button is-primary" href="/fr">
            <strong>FR</strong>
          </a>
          <a class="button is-primary" href="/de">
            <strong>DE</strong>
          </a>
        </div>
      </div>
    </div>
  </div>
</nav>
    <div class="container center">
    ${shelf.createTable(dateFormat, lang)}
    </div>
    </body>
    </html>`;
    return fullHTML;
  },
};

module.exports = shelf;

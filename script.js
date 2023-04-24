const newsData = require('/Users/sahilshukla/DemoProject/data.json')

const newsContainer = document.querySelector('/Users/sahilshukla/DemoProject/index.html');

const renderNewsItem = function (newsItem) {
    const newsElement = document.createElement('div');
    const newsLink = document.createElement('a');
    newsLink.href = newsItem.url;
    newsLink.textContent = newsItem.heading;
    newsElement.appendChild(newsLink);
    return newsElement;
};

for (let i = 0; i < newsData.length; i++) {
    const newsItem = newsData[i];
    const newsElement = renderNewsItem(newsItem);
    newsContainer.appendChild(newsElement);
  }

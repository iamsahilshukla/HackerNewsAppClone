const baseUrl = "https://hacker-news.firebaseio.com/v0";
const topStoriesUrl = `${baseUrl}/topstories.json`;
const bestStoriesUrl = `${baseUrl}/beststories.json`;

const renderNewsItem = (story) => {
    const newsElement = document.createElement('div');
    newsElement.className = 'news-item';
    const newsLink = document.createElement('a');
    newsLink.href = story.url;
    newsLink.textContent = story.title;
    newsElement.appendChild(newsLink);
    return newsElement;
};

const newsContainer = document.querySelector('#news-container');

let random = (max) => {
    return Math.floor(Math.random() * max);
}

let notVisitAgain = 0;

fetch(topStoriesUrl)
    .then(response => response.json())
    .then(topStories => {
        for (let i = 0; i < 30; i++) {
            notVisitAgain = topStories[i];
            fetch(`${baseUrl}/item/${topStories[i]}.json`)
                .then(response => response.json())
                .then(story => {
                    const newsElement = renderNewsItem(story);
                    newsContainer.appendChild(newsElement);
                })
                .catch(err => {
                    console.log(err)
                });
        }
    });

fetch(bestStoriesUrl)
    .then(response => response.json())
    .then(bestStories => {
        for (let i = 0; i < 30; i++) {
            if (notVisitAgain == bestStories[i]) {
                console.log(bestStories[i]);
                continue;
            }
            fetch(`${baseUrl}/item/${bestStories[i]}.json`)
                .then(response => response.json())
                .then(story => {
                    const newsElement = renderNewsItem(story);
                    newsContainer.appendChild(newsElement);
                })
                .catch(err => {
                    console.log(err)
                });
        }
    });
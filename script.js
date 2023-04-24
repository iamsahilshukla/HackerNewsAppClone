const baseUrl = "https://hacker-news.firebaseio.com/v0";
const topStoriesUrl = `${baseUrl}/topstories.json`;
const bestStoriesUrl = `${baseUrl}/beststories.json`;
const newStoriesUrl = `${baseUrl}/newstories.json`;

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

const addNewsItem = (() => {
    const addedNewsIds = {};     //storing unique ids
    return (story) => {
        if (!addedNewsIds[story.id]) {
            addedNewsIds[story.id] = true;  // marking ids for stoping redundancy
            const newsElement = renderNewsItem(story);
            newsContainer.appendChild(newsElement);
        }
        else{
            console.log("injin");
        }
    }
})();

fetch(topStoriesUrl)
    .then(response => response.json())
    .then(topStories => {
        for (let i = 0; i < 30; i++) {
            fetch(`${baseUrl}/item/${topStories[i]}.json`)
                .then(response => response.json())
                .then(story => {
                    addNewsItem(story);
                })
                .catch(err => {
                    console.error(err);
                });
        }
    });

fetch(bestStoriesUrl)
    .then(response => response.json())
    .then(bestStories => {
        for (let i = 0; i < 30; i++) {
            fetch(`${baseUrl}/item/${bestStories[i]}.json`)
                .then(response => response.json())
                .then(story => {
                    addNewsItem(story);
                })
                .catch(err => {
                    console.error(err);
                });
        }
    });

fetch(newStoriesUrl)
.then(response => response.json())
.then(newStories => {
    for (let i = 0; i < 30; i++) {
        fetch(`${baseUrl}/item/${newStories[i]}.json`)
            .then(response => response.json())
            .then(story => {
                addNewsItem(story);
            })
            .catch(err => {
                console.error(err);
            });
    }
});
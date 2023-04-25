const baseUrl = "https://hacker-news.firebaseio.com/v0";
const topStoriesUrl = `${baseUrl}/topstories.json`;
const bestStoriesUrl = `${baseUrl}/beststories.json`;
const newStoriesUrl = `${baseUrl}/newstories.json`;
const batchSize = 10;
let loadedItemsCount = 1;
let isLoading = false;

const renderNewsItem = (story) => {
    const newsElement = document.createElement("div");
    newsElement.className = "news-item";
    const newsLink = document.createElement("a");
    newsLink.href = story.url;
    newsLink.textContent = loadedItemsCount + '. ' + story.title;
    newsElement.appendChild(newsLink);
    return newsElement;
};

const newsContainer = document.querySelector("#news-container");

const addNewsItem = (() => {
    const addedNewsIds = {};     //storing unique ids
    return (story) => {
        if (!addedNewsIds[story.id]) {
            addedNewsIds[story.id] = true;  // marking ids for stoping redundancy
            const newsElement = renderNewsItem(story);
            newsContainer.appendChild(newsElement);
        }
        else {
            console.error("ERR001-news-already-present");
        }
    }
})();

const loadNewsItems = (stories, startIndex) => {
    console.log("sahil")
    isLoading = true;
    for (let i = startIndex; i < startIndex + batchSize; i++) {
        if (i >= 50) {
            isLoading=false;
            break;
        }
        fetch(`${baseUrl}/item/${stories[i]}.json`)
            .then((response) => response.json())
            .then((story) => {
                addNewsItem(story);
                loadedItemsCount++;
                console.log(loadedItemsCount,stories.length)
                if (loadedItemsCount >=50) {       // stories.length is 500 , i.e i make default 50
                    isLoading = false;
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }
};

window.addEventListener("scroll", () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    console.log(scrollTop,clientHeight,scrollHeight,isLoading)
    if (scrollTop + clientHeight >= scrollHeight - 5 && isLoading) {
        if (newsContainer.children.length === 0) {
            loadNewsItems(topStories, 0);
        } else {
            const lastItemIndex = newsContainer.children.length;
            if (!isNaN(lastItemIndex)) {
                const nextIndex = lastItemIndex + 1;
                loadNewsItems(topStories, nextIndex);
            }
        }
    }
    else {
        console.error("maxSizeError")   // when maxSizeError encounters
    }
});

let topStories = [];  // currently topstories is storing
// let bestStories = [];
// let newStories = [];

fetch(topStoriesUrl)
    .then((response) => response.json())
    .then((stories) => {
        topStories = stories;
        loadNewsItems(topStories, 0);
    });

// fetch(bestStoriesUrl)            // we can use it one section where all news can be seen this for that case
//     .then((response) => response.json())
//     .then((stories) => {
//         bestStories = stories;
//     });

// fetch(newStoriesUrl)
//     .then((response) => response.json())
//     .then((stories) => {
//         newStories = stories;
//     });

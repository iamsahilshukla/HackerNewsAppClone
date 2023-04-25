const baseUrl = "https://hacker-news.firebaseio.com/v0";
const newStoriesUrl = `${baseUrl}/newstories.json`;
const batchSize = 10;
let loadedItemsCount = 0;
let isLoading = false;

const renderNewsItem = (story) => {
    const newsElement = document.createElement("div");
    newsElement.className = "news-item";
    const newsLink = document.createElement("a");
    newsLink.href = story.url;
    newsLink.textContent = story.title;
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
            console.log("injin");
        }
    }
})();

const loadNewsItems = (stories, startIndex) => {
    console.log("sahil")
    isLoading = true;
    for (let i = startIndex; i < startIndex + batchSize; i++) {
        if (i >= stories.length) {
            console.log("sahil")
            break;
        }
        fetch(`${baseUrl}/item/${stories[i]}.json`)
            .then((response) => response.json())
            .then((story) => {
                console.log("sahil")
                addNewsItem(story);
                loadedItemsCount++;
                console.log(loadedItemsCount,stories.length)
                if (loadedItemsCount === 50) {       // stories.length is 500 , i.e i make default 50
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
            loadNewsItems(newStories, 0);
        } else {
            const lastItemIndex = newsContainer.children.length;
            if (!isNaN(lastItemIndex)) {
                const nextIndex = lastItemIndex + 1;
                loadNewsItems(newStories, nextIndex);
            }
        }
    }
    else {
        console.error("maxSizeError")   // when maxSizeError encounters
    }
});

let newStories = [];

fetch(newStoriesUrl)
    .then((response) => response.json())
    .then((stories) => {
        newStories = stories;
        loadNewsItems(newStories, 0);
    });

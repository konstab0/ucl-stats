// this is a simple caching mechanism for API requests, to avoid hitting the API:s free-tier limits

// stored cache for API responses
const cache = {};

export async function fetchWithCache(URL, options) {
    // if theres already a cache with this URL it returns that instead of fetching again
    if (cache[URL]) {
        return cache[URL];
    }
    // if not, it fetches the data from the API and stores it in the cache
    const response = await fetch(URL, options);
    if (!response.ok) throw new Error("API error: " + response.status);
    const data = await response.json();
    cache[URL] = data;
    return data;
}
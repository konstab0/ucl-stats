// this is a caching mechanism for API requests, to avoid hitting the API:s free-tier limits

// we use a proxy to avoid CORS issues
const API_BASE = "https://ucl-proxy.konstab.workers.dev";
// stored cache for API responses
const cache = {};

export async function fetchWithCache(path) {
    // if theres already a cache with this URL it returns that instead of fetching again
    if (cache[path]) {
        return cache[path];
    }
    // if not, it fetches the data from the API and stores it in the cache
    const response = await fetch(API_BASE + path);
    if (!response.ok) throw new Error("API error: " + response.status);
    const data = await response.json();
    cache[path] = data;
    return data;
}
const cache = {};
const CACHE_TTL = 60000; // Time to live in milliseconds (e.g., 60 seconds)

// Dọn dẹp cache
const cleanupCache = () => {
    const now = Date.now();
    for (const key in cache) {
        if (now - cache[key].timestamp >= CACHE_TTL) {
            delete cache[key]; // Xóa mục hết hạn
        }
    }
};

// Lên lịch dọn dẹp định kỳ
setInterval(cleanupCache, CACHE_TTL);

const cacheMiddleware = (req, res, next) => {
    const key = req.originalUrl; // Use the request URL as the cache key
    console.log("key: ", key);

    // Check if the data is already cached and not expired
    if (cache[key] && (Date.now() - cache[key].timestamp < CACHE_TTL)) {
        console.log(`Cache hit for ${key}`);
        return res.json(cache[key].data); // Return cached data
    }

    // Store the response in the response object for later use
    res.sendResponse = res.json;
    res.json = (body) => {
        console.log("new");
        cache[key] = {
            data: body,
            timestamp: Date.now() // Store the current timestamp
        }; // Cache the response with timestamp
        res.sendResponse(body); // Send the response
    };

    next(); // Proceed to the next middleware or route handler
};

module.exports = cacheMiddleware;

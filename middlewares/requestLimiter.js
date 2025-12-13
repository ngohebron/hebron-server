import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";

export const globalLimiter = rateLimit({
    windowMs: 60 * 1000,        // 60 seconds
  max: 60,                   // 60 requests per IP
  standardHeaders: true,     // RateLimit-* headers
  legacyHeaders: false,      // Disable X-RateLimit-* headers
  message: {
    success: false,
    message: "Too many requests. Please try again after 1 minute.",
  }, // max requests per IP
});



export const globalThrottle = slowDown({
  windowMs: 10 * 60 * 1000,
  delayAfter: 5,
  delayMs: 1000, // add 1s delay after 5ed requests的情況
});
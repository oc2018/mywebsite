import rateLimit from 'express-rate-limit';

export const ApiRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50, 
    message: 'Too many login attempts from this Ip Address, please try again later.'
});
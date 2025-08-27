import aj from '../config/arcjet.js';
// ARCJET MIDDLEWARE
const arcjetMiddleware = async (req, res, next) => {
    try {
        // Protect the request and get a decision
        const decision = await aj.protect(req, { requested: 1 });
        // If decision is denied
        if(decision.isDenied()){
            // Check if it exceeded the limit
            if (decision.reason.isRateLimit())  return res.status(429).json({ error: "Rate limit exceeded"});
            // Bot protection
            if(decision.reason.isBot())  return res.status(403).json({error: 'Bot detected'});
            // If not one of above
            return res.status(403).json({error: "Access denied"});
        }
        // if decision approved
        next();
    } catch (error) {
        console.log(`Arcjet Middleware Error: ${error}`);
        next(error);
    }
}
export default arcjetMiddleware;
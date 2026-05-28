


export const logger = (req, res, next) => {
  
  console.log(`[${req.method}] - ${req.originalUrl} - ${JSON.stringify(req.body || {})}`);
  next(); 
};
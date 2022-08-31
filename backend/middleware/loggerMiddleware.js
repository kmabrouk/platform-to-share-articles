const logger = async (req, res, next) => {

    console.log (`${new Date().toLocaleTimeString()} -- ${req.path}`);
    next();
}

export { logger };
//in case end-point doesn't match
const routerError = (req, res, next) => {
    res.status(400).send("page not found")
    next();
}

module.exports = routerError
const moment = require("moment");

const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get("host")}${req.originalUrl}`);
    console.log(`Protocol : ${req.protocol}`);
    console.log(`Host : ${req.get("host")}`);
    console.log(`Url : ${req.originalUrl}`);
    console.log(`moment : ${moment().format()}`);
    next();
};

module.exports = logger
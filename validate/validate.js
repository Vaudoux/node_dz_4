function checkParams(data) {
    return (req, res, next) => {
        const validationResult = data.validate(req.params);
        if (validationResult.error) {
        return res.status(400).send(validationResult.error.details);
        }
        next();
    };
}

function checkBody(data) {
    return (req, res, next) => {
        const validationResult = data.validate(req.body);
        if (validationResult.error) {
        return res.status(400).send(validationResult.error.details);
        }
        next();
    };
}

module.exports = { checkParams, checkBody };
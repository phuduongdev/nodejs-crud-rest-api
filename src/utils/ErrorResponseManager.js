exports.getErrorResponse = (response, httpStatusCode, message) =>
    response.status(httpStatusCode).send({
        message: message
    });

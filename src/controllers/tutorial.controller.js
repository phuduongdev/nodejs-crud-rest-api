const dbContext = require('../models/mongooseDb');
const ErrorResponse = require('../utils/ErrorResponseManager');

const Tutorial = dbContext.tutorial;

// Mongoose model support all CRUD functions:

exports.create = (request, response) => {
    const title = request.body.title;
    if (!title) {
        return getErrorResponse(response, 400, 'Content cannot be empty.');
    }

    const newTutorial = new Tutorial({
        title: request.body.title,
        description: request.body.description,
        published: request.body.published || false
    });

    // create a new object: save() function
    newTutorial
        .save(newTutorial)
        .then(data => {
            response.send(data);
        })
        .catch(function createTutorialError(error) {
            return getErrorResponse(
                response,
                500,
                error.message ||
                    'Some error occurred while creating a New Tutorial.'
            );
        });
};

exports.findAll = (request, response) => {
    // get query string like http://example.com/tutorial?title="value"
    const title = request.query.title;
    let condition = title
        ? {
              title: { $regex: new RegExp(title), $option: 'i' }
          }
        : {};

    // retrieve all by a column: find( {column: { $regex: new RegExp(column), $option: "i" }} )
    Tutorial.find(condition)
        .then(data => {
            response.send(data);
        })
        .catch(function findAllTutorialsError(error) {
            return ErrorResponse.getErrorResponse(
                response,
                500,
                error.message || 'Some error occurred while creating Tutorial.'
            );
        });
};

exports.findById = (request, response) => {
    const id = request.params.id;

    // find a object by id: findById(id)
    Tutorial.findById(id)
        .then(data => {
            if (!data) {
                return getErrorResponse(
                    response,
                    404,
                    'Tutorial not found with this id ' + id
                );
            }
            response.send(data);
        })
        .catch(function findTutorialByIdError(error) {
            return getErrorResponse(
                response,
                500,
                error.message || 'Error retreiving Tutorial with id::' + id
            );
        });
};

exports.update = (request, response) => {
    const editTutorial = request.body;
    if (!editTutorial) {
        return ErrorResponse(response, 400, 'Data to update cannot be empty.');
    }

    // update a object: findByIdAndUpdate(id, data)
    const id = request.params.id;
    Tutorial.findByIdAndUpdate(id, editTutorial, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                return getErrorResponse(
                    response,
                    404,
                    `Update failed, cannot found Tutorial with id::${id}`
                );
            }
            return response.send({
                message: 'Tutorial was updated successfully.'
            });
        })
        .catch(function updateTutorialError(error) {
            return getErrorResponse(
                response,
                500,
                `Some error on Updating Tutorial with id::${id}`
            );
        });
};
exports.delete = (request, response) => {
    const id = request.params.id;

    // remove a object: findByIdAndRemove(id)
    Tutorial.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                return getErrorResponse(
                    response,
                    404,
                    `Delete failed, cannot found Tutorial with id::${id}`
                );
            }

            return response.send({
                message: 'Tutorial was deleted succcessfully.'
            });
        })
        .catch(function deleteTutorialError(error) {
            return getErrorResponse(
                response,
                500,
                `Some error on Deleting Tutorial with id::${id}`
            );
        });
};

exports.deleteMulti = (request, response) => {
    // remove all: deleteMany()
    Tutorial.deleteMany({})
        .then(data => {
            response.send({
                message: `${data.deletedCount} Tutorials were deleted sucessfully.`
            });
        })
        .catch(function deleteMultiTutorialError(error) {
            return getErrorResponse(
                response,
                500,
                error.message ||
                    'Some error occurred while removing all tutorials.'
            );
        });
};

exports.findAllPublished = (request, response) => {
    Tutorial.find({ published: true })
        .then(data => {
            response.send(data);
        })
        .catch(function tutorialFindAllPublisedError(error) {
            return getErrorResponse(
                response,
                500,
                error.message ||
                    'Some error occurred while retrieving all tutorials.'
            );
        });
};

const getErrorResponse = (response, httpStatusCode, message) =>
    response.status(httpStatusCode).send({
        message: message
    });

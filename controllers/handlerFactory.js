const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

const nameModel = (Model) => Model.modelName.toLowerCase();

exports.deleteOne = (Model, idField) =>
  catchAsync(async (req, res, next) => {
    if (idField && req.user.role === 'user') {
      const doc = await Model.findOneAndDelete({
        _id: req.params.id,
        [idField]: req.user.id,
      });

      if (!doc)
        return next(
          new AppError(`Invalid ${nameModel(Model)} ID / forbidden`, 403)
        );

      res.status(204).json({
        status: 'success',
        data: null,
      });
      return;
    }

    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(
        new AppError(`No ${nameModel(Model)} found with that ID`, 404)
      );
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.updateOne = (Model, idField) =>
  catchAsync(async (req, res, next) => {
    if (idField && req.user.role === 'user') {
      const doc = await Model.findOneAndUpdate(
        {
          _id: req.params.id,
          [idField]: req.user.id,
        },
        req.body,
        {
          returnDocument: 'after',
          runValidators: true,
        }
      );

      if (!doc)
        return next(
          new AppError(`Invalid ${nameModel(Model)} ID / forbidden`, 403)
        );

      res.status(200).json({
        status: 'success',
        data: {
          [`${nameModel(Model)}`]: doc,
        },
      });
      return;
    }

    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(
        new AppError(`No ${nameModel(Model)} found with that ID`, 404)
      );
    }

    res.status(200).json({
      status: 'success',
      data: {
        [`${nameModel(Model)}`]: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        [`${nameModel(Model)}`]: doc,
      },
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(
        new AppError(`No ${nameModel(Model)} found with that ID`, 404)
      );
    }

    res.status(200).json({
      status: 'success',
      data: {
        [`${nameModel(Model)}`]: doc,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // to allow for nested GET reviews on tour (hack)
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const doc = await features.query;

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        [`${nameModel(Model)}s`]: doc,
      },
    });
  });

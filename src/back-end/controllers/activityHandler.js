const catchAsync = require('./../utils/asyncCatch');
const AppError = require('./../utils/appError');

exports.createOne = Model =>
    catchAsync( async (req, res, next) => {
        const result = await Model.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                data: result
            }
        });
    });

exports.getAll = Model =>
    catchAsync( async (req, res, next) =>{
        const result = await Model.find();

        res.status(200).json({
            status: 'success',
            results: result.length,
            data: {
                data: result
            }
        });
    });

exports.deleteOne = Model =>
    catchAsync( async (req, res, next) => {
        const result = await Model.findByIdAndDelete(req.params.id);

        if(!result){
            console.log(req.params)
            return next(new AppError('No such document found with given ID', 404));
        }

        res.status(204).json({
            status: 'success',
            data: null
        });
    });
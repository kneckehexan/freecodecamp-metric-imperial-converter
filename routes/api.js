'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  app.route('/api/convert').get((req, res) => {
    const input = req.query.input
    const number = convertHandler.getNum(input);
    const unit = convertHandler.getUnit(input);
    if(number == undefined && unit === undefined){
      res.json('invalid number and unit');
      return;
    }
    if(number === undefined){
      res.json('invalid number');
      return;
    }
    if(unit === undefined){
      res.json('invalid unit');
      return;
    }
    const convertedUnit = convertHandler.getReturnUnit(unit);
    const convertedNumber = convertHandler.convert(number, unit);
    res.json({
      initNum: number,
      initUnit: unit,
      returnNum: convertedNumber,
      returnUnit: convertedUnit,
      string: convertHandler.getString(number, unit, convertedNumber, convertedUnit)
    });
  });
};

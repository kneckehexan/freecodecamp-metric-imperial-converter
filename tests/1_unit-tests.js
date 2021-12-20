const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  this.timeout(5000);
  test('Test reading a whole number input', () => {
    assert.equal(convertHandler.getNum('1'), 1, 'convertHandler should correctly read a whole number input.');
  });
  test('Test reading a decimal number input', () => {
    assert.equal(convertHandler.getNum('1.2'), 1.2, 'convertHandler should correctly read a decimal number input.')
  });
  test('Test reading a fractional input', () => {
    assert.equal(convertHandler.getNum('1/2'), 0.5, 'convertHandler should correctly read a fractional input');
  });
  test('Test reading a fractional input with a decimal', () => {
    assert.equal(convertHandler.getNum('3/1.5'), 2, 'convertHandler should correctly read a fractional input with a decimal.');
  });
  test('Test error return on double fraction (i.e. 3/2/3)', () => {
    assert.equal(convertHandler.getNum('3/2/3'), undefined, 'convertHandler shoud correctly return an error on a double-fraction.');
  })
  test('Test default value when no number is given', () => {
    assert.equal(convertHandler.getNum(''), 1, 'convertHandler should correctly return a numerical input of 1 when no numerical input is provided.');
  })
  test('Test reading each valid input unit', () => {
    assert.equal(convertHandler.getUnit('gal'), 'gal', 'convertHandler should return correct initUnit');
    assert.equal(convertHandler.getUnit('L'), 'L', 'convertHandler should return correct initUnit');
    assert.equal(convertHandler.getUnit('mi'), 'mi', 'convertHandler should return correct initUnit');
    assert.equal(convertHandler.getUnit('km'), 'km', 'convertHandler should return correct initUnit');
    assert.equal(convertHandler.getUnit('lbs'), 'lbs', 'convertHandler should return correct initUnit');
    assert.equal(convertHandler.getUnit('kg'), 'kg', 'convertHandler should return correct initUnit');
  });
  test('Test if an error is returned for an invalid unit', () => {
    assert.equal(convertHandler.getUnit('m'), undefined, 'convertHandler should correctly return an error if an invalid input unit is entered.');
  });
  test('Test the return unit of each valid input unit', () => {
    assert.equal(convertHandler.getReturnUnit('gal'), 'L', 'convertHandler should return L for gal');
    assert.equal(convertHandler.getReturnUnit('L'), 'gal', 'convertHandler should return gal for L');
    assert.equal(convertHandler.getReturnUnit('mi'), 'km', 'convertHandler should return km for mi');
    assert.equal(convertHandler.getReturnUnit('km'), 'mi', 'convertHandler should return mi for km');
    assert.equal(convertHandler.getReturnUnit('lbs'), 'kg', 'convertHandler should return kg for lbs');
    assert.equal(convertHandler.getReturnUnit('kg'), 'lbs', 'convertHandler should return lbs for kg');
  });
  test('Test the spelled-out string return', () => {
    assert.equal(convertHandler.spellOutUnit('gal'), 'gallons', 'gal should spell out as gallons');
    assert.equal(convertHandler.spellOutUnit('L'), 'liters', 'L should spell out as liters');
    assert.equal(convertHandler.spellOutUnit('mi'), 'miles', 'mi should spell out as miles');
    assert.equal(convertHandler.spellOutUnit('km'), 'kilometers', 'km should spell out as kilometers');
    assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds', 'lbs should spell out as pounds');
    assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms', 'kg should spell out as kilograms');
  });
  test('Test the conversion of gal to L', () => {
    assert.equal(convertHandler.convert(1, 'gal'), 3.78541, 'convertHandler should correctly covert gal to L');
  });
  test('Test the conversion of L to gal', () => {
    assert.equal(convertHandler.convert(1, 'L'), 0.26417, 'convertHandler should correctly covert L to gal');
  });
  test('Test the conversion of mi to km', () => {
    assert.equal(convertHandler.convert(1, 'mi'), 1.60934, 'convertHandler should correctly covert mi to km');
  });
  test('Test the conversion of km to mi', () => {
    assert.equal(convertHandler.convert(1, 'km'), 0.62137, 'convertHandler should correctly covert km to mi');
  });
  test('Test the conversion of lbs to kg', () => {
    assert.equal(convertHandler.convert(1, 'lbs'), 0.45359, 'convertHandler should correctly covert lbs to kg');
  });
  test('Test the conversion of kg to lbs', () => {
    assert.equal(convertHandler.convert(1, 'kg'), 2.20462, 'convertHandler should correctly covert kg to lbs');
  });
});
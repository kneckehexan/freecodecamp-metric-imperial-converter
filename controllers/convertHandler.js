function ConvertHandler() {
  
  const units = {
    gal: ['L', 'gallons', 3.78541],
    L: ['gal', 'liters', 0.264172],
    mi: ['km', 'miles', 1.60934],
    km: ['mi', 'kilometers', 0.621373],
    kg: ['lbs', 'kilograms', 2.2046244],
    lbs: ['kg', 'pounds', 0.453592]
  }

  const formatter = new Intl.NumberFormat('en-US', {minimumFractionDigits: 5, maximumFractionDigits: 5});

  this.getNum = function(input) {
    var arr = input.match(/\d*\.?\d+(\/\d*\.?\d+)?/g);
    if(arr === null){
      return 1;
    } else if(arr.length > 1){
      return undefined;
    } else {
      var num = arr[0];
    }
    if(num.match(/\//g)){
      let digits = num.split('/');
      num = digits[0]/digits[1];
    }
    return Number(num);
  };
  
  this.getUnit = function(input) {
    var uni = input.replace(/[^\p{Letter}]+/gui,"").toLowerCase();
    if(uni === 'l'){
      uni = 'L';
    }
    if(units[uni] === undefined){
      return undefined;
    }
    return uni;
  };
  
  this.getReturnUnit = function(initUnit) {
    let returnUnit = units[initUnit];
    return returnUnit === undefined ? undefined : returnUnit[0];
  };

  this.spellOutUnit = function(unit) {
    return units[unit][1];
  };
  
  this.convert = function(initNum, initUnit) {
    return Number(formatter.format(initNum * units[initUnit][2]));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum.toFixed(5)} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;

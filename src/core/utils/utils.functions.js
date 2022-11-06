const checkAmountValidity = (amount) => {
  if (Number.isInteger(amount)) {
    return parseFloat(amount);
  }
  if (amount.toString().split('.')[1].length <= 4) {
    return parseFloat(amount);
  } else {
    throw new Error('Please enter amount upto 4 decimal values');
  }
};

module.exports = { checkAmountValidity };

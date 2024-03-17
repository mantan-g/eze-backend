const { BuyRequest } = require('../Schema/buyRequest');
const { SellRequest } = require('../Schema/sellRequest');
const { BUY_REQ_TYPE, SELL_REQ_TYPE } = require('../constant');

const deleteMany = async (entity) => {
  try {
    if (entity === BUY_REQ_TYPE) {
      await BuyRequest.deleteMany({});
      return true;
    }

    if (entity === SELL_REQ_TYPE) {
      await SellRequest.deleteMany({});
      return true;
    }

    if (entity === 'both') {
      await BuyRequest.deleteMany({});
      await SellRequest.deleteMany({});
      return true;
    }

    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = {
  deleteMany,
};

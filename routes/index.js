const {Router} = require('express');
const {BUY_REQ_TYPE, SELL_REQ_TYPE} = require('../constant');
const addDataToDBFromExcel = require('../scripts');
const {deleteMany} = require('../service');
const {BuyRequest} = require('../Schema/buyRequest');
const {SellRequest} = require('../Schema/sellRequest');

const router = Router();

router.post('/fetch/products', async (req, res) => {
  try {
    let pageNumber = 1;
    let pageSize = 10;
    let reqType = '';

    if (!req.body.reqType) {
      return res.status(400).json({
        success: false,
        message: 'Request type is missing',
      });
    }

    reqType = req.body.reqType;

    if (req.body.pageNumber) {
      pageNumber = req.body.pageNumber;
    }

    if (req.body.pageSize) {
      pageSize = req.body.pageSize;
    }

    const skip = (pageNumber - 1) * pageSize;

    if (reqType === BUY_REQ_TYPE) {
      const buy = await BuyRequest.find({}).skip(skip).limit(pageSize).exec();
      return res.status(200).json({
        success: true,
        message: 'List fetched successfully for BUY request type',
        result: buy,
      });
    }

    if (reqType === SELL_REQ_TYPE) {
      const sell = await SellRequest.find({}).skip(skip).limit(pageSize).exec();
      return res.status(200).json({
        success: true,
        message: 'List fetched successfully for SELL request type',
        result: sell,
      });
    }

    return res.status(400).json({
      success: false,
      message: 'Request type is incorrect',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
});

router.get('/sync/products', async (req, res) => {
  try {
    const isSuccess = await addDataToDBFromExcel();
    if (isSuccess) {
      return res.status(200).json({
        success: true,
        message: 'List synced successfully',
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "List syncing failed",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

router.delete("/sync/products/delete", async (req, res) => {
  try {
    const isSuccess = await deleteMany("both");
    if (isSuccess) {
      return res.status(200).json({
        success: true,
        message: "Delete successful",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Delete failed",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

module.exports = router;

const xlsx = require("xlsx");
const { indexMapping } = require("../constant");
const { BuyRequest } = require("../Schema/buyRequest");
const { SellRequest } = require("../Schema/sellRequest");

async function addDataToDBFromExcel() {
  try {
    const workbook = xlsx.readFile("excel_eze.xlsx");
    const sheetName = workbook.SheetNames[1];
    const sheet = workbook.Sheets[sheetName];

    const data = xlsx.utils.sheet_to_json(sheet);
    let cleanedData = [];

    // Clean data
    for (let i = 0; i < data.length; i++) {
      let arr = [];
      for (const key in data[i]) {
        if (data[i][key] !== "Unlocked") {
          arr.push(data[i][key]);
        }
      }
      cleanedData.push(arr);
    }

    let deviceName = "";
    let buy = [];
    let sell = [];

    // Organize data for insertion
    for (let i = 0; i < cleanedData.length; i++) {
      if (cleanedData[i].length === 2) {
        deviceName = cleanedData[i][0];
        i++; // Skip next iteration as it contains device name
        continue;
      } else {
        let storage = cleanedData[i][0];

        // Prepare buy and sell objects
        for (let j = 1; j < 9; j++) {
          let obj = {
            deviceName: deviceName,
            capacity: storage,
            condition: indexMapping[j],
            cost: cleanedData[i][j],
            currency: "$",
          };
          buy.push(obj);
        }

        for (let j = 10; j < 18; j++) {
          let obj = {
            deviceName: deviceName,
            capacity: storage,
            condition: indexMapping[j],
            cost: cleanedData[i][j],
            currency: "$",
          };
          sell.push(obj);
        }
      }
    }

    // Insert into database
    if (buy.length > 0) await BuyRequest.insertMany(buy);
    if (sell.length > 0) await SellRequest.insertMany(sell);

    return true; // Success
  } catch (error) {
    console.error(error);
    return false; // Failure
  }
}

module.exports = addDataToDBFromExcel;

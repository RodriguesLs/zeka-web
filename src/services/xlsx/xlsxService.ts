import { read, utils } from 'xlsx';

export const parseExcelToJSON = (file: any) => {
  const reader = new FileReader();
  reader.readAsBinaryString(file);
  return new Promise((resolve, reject) => {
    reader.onload = () => {
      const data = reader.result;
      const workbook = read(data, { type: 'binary' });
      try {
        workbook.SheetNames.forEach(function (sheetName: any) {
          const xlRowObj = utils.sheet_to_json(workbook.Sheets[sheetName]);
          resolve(xlRowObj);
        });
      } catch (err) {
        reject(err);
      }
    };
  });
};

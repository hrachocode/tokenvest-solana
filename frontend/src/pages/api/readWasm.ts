import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const fs = require("fs");

  const directories = __dirname.split("/");

  let newDir = [];

  for (let i = 0; i < directories.length; i++) {
    if (directories[i][0] === ".") {
      break;
    }
    newDir.push(directories[i]);
  }
    
  const currentDir = newDir.join("/");

  fs.readFile(`${currentDir}/contract/investment_smart_contract.wasm`, "utf8", (err: any, data: any) => {
    if (err) {
      console.error(err);
      return;
    }
    res.json(data);
  });

};

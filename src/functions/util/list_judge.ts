import path from "path";
import fs from 'fs'

export function judgeList() {
    // 定義 server_list.json 檔案路徑
    const serverListPath = path.join(__dirname.split(path.sep).slice(0, -3).join(path.sep), 'server-data.json');
    
    // 檢查並加載 server_list.json 檔案
    return new Promise(resolve => {
      if (fs.existsSync(serverListPath)) {
        resolve(true);
      } else {
        // 檔案不存在則創建 JSON 數組
        const serverList = [];
        fs.writeFileSync(serverListPath, JSON.stringify(serverList, null, 2));
        resolve(true);
      }
    });
  }

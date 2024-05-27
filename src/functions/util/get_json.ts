import fs from 'fs'
import path from 'path';

export function getJson(){
  let server_list
  const serverListPath = path.join(__dirname.split(path.sep).slice(0, -3).join(path.sep), 'server-data.json');
  const data = fs.readFileSync(serverListPath, 'utf-8');
  return server_list = JSON.parse(data);
}
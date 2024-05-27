import { Context } from 'koishi'
import fs from 'fs';
import path from 'path';
import { judgeList } from './util/list_judge'
import { easy_ping } from './ping-server';

export const name = 'addServer'


// 添加伺服器
export function addServer(ctx:Context){
    ctx.command("mc.add <serverString> [description]", { checkArgCount: true})
      .action(async ({session}, serverString, description) => {

        // 基本校驗規則
      if (!serverString || serverString === 'mc.list') {
        return session.send("输入服务器参数有误");
      }

      // 判斷並加載現有伺服器列表
      const serverListPath = path.join(__dirname.split(path.sep).slice(0, -2).join(path.sep), 'server-data.json');
      let server_list = [];
      await judgeList()
      const data = fs.readFileSync(serverListPath, 'utf-8');
      server_list = JSON.parse(data);

      if (server_list.some(server => server.ip === serverString)) {
        return session.send(`服务器 "${serverString}" 已存在。`);
      }
      

      // 檢查伺服器是否可訪
      if (!easy_ping(serverString)) {
        return session.send("服务器添加失败");
      }

      // 更新數組
      const new_server = { ip: serverString, description: description || '无' };
      server_list.push(new_server);
      fs.writeFileSync(serverListPath, JSON.stringify(server_list, null, 2));

      session.send("服务器已添加完毕:" + '\n' +
        "IP:" + serverString + '\n' +
        "描述:" + (description || "无"));

      })
  }
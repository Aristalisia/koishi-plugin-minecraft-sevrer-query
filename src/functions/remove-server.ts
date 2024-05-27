import { Context } from 'koishi'
import fs from 'fs'
import { getJson } from './util/get_json'
import path from 'path'
import { judgeList } from './util/list_judge'

export const name = 'removeServer'

// 删除伺服器
  export function removeServer(ctx: Context) {
    ctx.command("mc.remove <serverString> [description]", { checkArgCount: true })
      .action(async ({ session }, serverString, description) => {
      await judgeList()
      let server_list = getJson();

      const index = server_list.findIndex(server => server.ip === serverString);
      if (index === -1) {
        return session.send("输入服务器参数有误");
      }

      server_list.splice(index, 1);

      const serverListPath = path.join(__dirname.split(path.sep).slice(0, -2).join(path.sep), 'server-data.json');
      fs.writeFileSync(serverListPath, JSON.stringify(server_list, null, 2));

      session.send("已移除IP为:" + serverString + "的服务器");
      })
  }
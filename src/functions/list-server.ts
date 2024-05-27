import { Context } from 'koishi'
import { judgeList } from './util/list_judge'
import { getJson } from './util/get_json'

export const name = 'listServer'


export function listServer(ctx: Context) {
    ctx.on('message', (session) => {
        if (session.content === 'mc.list') {
          if(judgeList()){
            const server_list = getJson()
            if(server_list.length == 0){
              session.send("当前服务器列表为空，使用mc.add添加服务器")
            }
            else{
              session.send("当前服务器列表如下:" +  '\n' + 
                          '------------' + '\n' + 
                           list_traversal(server_list))
            }
          }else{
            session.send("当前服务器列表为空，使用mc.add添加服务器")
          }
          
          
        }
      })

      // 數組遍歷
    function list_traversal(array) {
      let result = "";
      for(let i=0; i < array.length; i++){
        const temp_data = array[i]
        result += "IP: " + temp_data.ip + "\n";
          if (temp_data.description) {
            result += "描述: " + temp_data.description + "\n";
          }
          result += '------------' + '\n'
        }
        return result;
        


      }

}




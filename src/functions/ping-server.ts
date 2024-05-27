import { Context, h } from 'koishi'
import fs from 'fs';
import path from 'path';
import { url } from 'inspector';
import { ipSlice } from './util/ip_slice'
import mc from '@ahdg/minecraftstatuspinger'

export const name = 'pingServer'



// ping用戶控制方法
export function pingServer(ctx:Context){
    ctx.command("mc.ping <serverString>", { checkArgCount: true })
      .action(async ({session}, serverString) => {
        if(typeof serverString === 'undefined'){
          session.send("输入参数有误,请检查") 
        }
        else{
          if(easy_ping(serverString)){
            const result = await ping_request(serverString)
            
            session.send(
            '\n' +`===${result.status.description}===` + 
            '\n' + `版本：${result.status.version.name}` +
            '\n' + `延迟：${result.latency}ms` +
            '\n' + `当前在线玩家：${result.status.players.online}/${result.status.players.max}` 
           )
           console.log(url)
          }
        }
      })


  // ping封裝方法
  async function ping_request(server_ip){
    let server_data   
    let sliced_ip = ipSlice(server_ip)
    let host = sliced_ip.host
    let port = sliced_ip.port
    console.log(host)
    console.log(port)
    // 伺服器請求檢測
    try{
      server_data = await mc.lookup({
      host:host,
      port:port
      })
      console.log(server_data)
      server_data.status.description = detectName(server_data)
      return server_data
    }catch(e) {
      if(e.message == ('getaddrinfo ENOTFOUND ' + `${server_ip}`)){
        return e = "服务器地址不存在"
      }
      else{
        return "出现错误,原因:" + e.message
      }
    }

  // 考慮到部分麥塊伺服器可能不規範存儲description，因此進行二次篩查
  function detectName(server_data){
    if(typeof server_data.status.description.text === 'undefined'){
      return server_data.status.description
    }else{
      return server_data.status.description.text
    }
  }

  // // 檢測伺服器圖標
  // function detectFavicon(server_data){
  //   const outputDir = path.join(__dirname.split(path.sep).slice(0, -2).join(path.sep),'server-icons')
  //   const base64String = server_data.status.favicon
  //     if(typeof base64String !== 'undefined'){
  //       // base64轉二進制
  //       const base64Data = base64String.replace(/^data:image\/png;base64,/, '');
  //       const binaryData = Buffer.from(base64Data, 'base64')
  
  
  //       // 下載文件
  //       const outputFile = host + '.png'
  //       const outputPath = path.join(outputDir, outputFile)
  //       // 如果文件夾不存在，則創建一個
  //       if (!fs.existsSync(outputDir)) {
  //         fs.mkdirSync(outputDir, { recursive: true })
  //         fs.writeFileSync(outputPath, binaryData)
  //       }else{
  //         fs.writeFileSync(outputPath, binaryData)
  //       }
  //       console.log('图片下载成功') 
  //       console.log(typeof server_data.status.description.text)
  //       console.log('路径为:' + outputDir)
  //       return server_ip
  //     }
  //     else{
  //       console.log('图片不存在或者异常')
  //       return '#'
  //     }
  // }

  }

}





export async function easy_ping(server_ip){
  let server_data   
  let sliced_ip = ipSlice(server_ip)
  let host = sliced_ip.host
  let port = sliced_ip.port
  // 伺服器請求檢測
  try{
    server_data = await mc.lookup({
    host:host,
    port:port
    })
    console.log(server_data)
    return true
  }catch(e) {
    console.log(e.message)
    return false
  }
}

  
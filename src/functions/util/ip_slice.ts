export function ipSlice(server_ip){
    if(typeof server_ip !== 'string'){
        server_ip += ''
      }
      let [host, port] = server_ip.split(":" || "：")
      if(typeof port === "undefined"){
        port = 25565
      }
      port = parseInt(port)
      return {host,port}
}
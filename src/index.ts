import { Context, Schema, Session } from 'koishi'
import { listServer } from './functions/list-server'
import { addServer } from './functions/add-server'
import { removeServer } from './functions/remove-server'
import { pingServer } from './functions/ping-server'

export const name = 'minecraft-server-query'

export interface Config {}
export const Config: Schema<Config> = Schema.object({})

export function apply(ctx: Context) {

  // write your plugin here
  setTimeout(() => {
    ctx.plugin(listServer)
    ctx.plugin(addServer)
    ctx.plugin(removeServer)
    ctx.plugin(pingServer)

  }, 1000)

  
}






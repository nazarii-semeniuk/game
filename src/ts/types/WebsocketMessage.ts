import { PlayerInfo } from "./PlayerInfo"

export type WebsocketMessage = {
    type: 'playerJoin' | 'playerLeave' | 'playerMove' | 'playerInit',
    player: PlayerInfo,
    playersOnline?: PlayerInfo[]
}
import {TickerClass} from "./tickerClass";

export interface ITicker {
    uid?:string | number
    title?: string
    reactComponent?:any
    reactComponentSmallTIcker?:any
    isVisible?:boolean
}


export enum ETickerEvents {
    Updated="onTickerUpdated",
    onTickerPairUpdate="onTickerPairUpdate",
    onVisible="onVisible",
    onOnline="onOnline"
}

// export interface IOnTickerEvents {
//     onTickerUpdated?:()=>void
//     onTickerPairUpdate?:()=>void
//     onVisible?:()=>void
// }

export interface ITickersStack {
    [key:string]:TickerClass
}


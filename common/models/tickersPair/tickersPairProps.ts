import {ITicker} from "../ticker/tickerProps";
import {TickerClass} from "../ticker/tickerClass";
import {TickersPairClass} from "./tickersPairClass";

export interface ITickerPair {
    // uid?:number,
    // title?:string,
    // from?:TickerClass,
    // to?: TickerClass,
    key?:string
    last?: number,
    lowestAsk?: number,
    highestBid?: number,
    percentChange?: number,
    baseVolume?: number,
    quoteVolume?: number,
    isFrozen?: number,
    high24hr?: number,
    low24hr?: number,
}

export interface IToPair {
    inverse:boolean,
    pair:TickersPairClass
}

export interface IPairsStack {
    [key:string]:TickersPairClass
}

export interface IToPairsStack {
    [key:string]:IToPair
}

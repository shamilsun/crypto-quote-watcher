import {TickerClass} from "../ticker/tickerClass";
import {TickersPairClass} from "../tickersPair/tickersPairClass";

export enum ESceneEvents  {
    TickersLoaded="onTickersLoaded",
    NewTickersAdded="NewTickersAdded",
    onScenePairsMatched="onScenePairsMatched",
    onSceneChangedToPair="onSceneChangedToPair",
    onError="onError"
}

export interface IEventsPool {
    onTickersLoaded?:(arr:TickerClass)=>void
    newTickersAdded?:(newTickers:TickerClass)=>void
    onScenePairsMatched?:()=>void
    onSceneChangedToPair?:()=>void
    onError?:()=>void
}


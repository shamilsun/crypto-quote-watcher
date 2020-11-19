import {IPoloniexPublicPairData} from "./poloniexProps";
import {TickerClass} from "../../models/ticker/tickerClass";
import {BackendClass} from "../../models/backend/backendClass";
import {TickersPairClass} from "../../models/tickersPair/tickersPairClass";

export class PoloniexClass {

    static _poloniexData:IPoloniexPublicPairData
    static _poloniexDataRequest: any


    public static getTickersFromPubPairsData(v:IPoloniexPublicPairData=this._poloniexData):TickerClass[] {
        let r:TickerClass[]=[];
        let existsNames : string[] = [];
        Object.keys(v).forEach(k=>{

            k.split('_').forEach(t=>{
                if (existsNames.indexOf(t)==-1) {
                    existsNames.push(t);
                    r.push(new TickerClass({title:t}))
                }
            })
        })
        return r;
    }

    public static getTickersPairsFromPubPairsData(v:IPoloniexPublicPairData=this._poloniexData):TickersPairClass[] {
        let r:TickersPairClass[]=[];
        Object.keys(v).forEach(k=>{
            r.push(new TickersPairClass({
                key:k,
                last: +v[k].last,
                lowestAsk: +v[k].lowestAsk,
                highestBid: +v[k].highestBid,
                percentChange: +v[k].percentChange,
                baseVolume: +v[k].baseVolume,
                quoteVolume: +v[k].quoteVolume,
                isFrozen: +v[k].isFrozen,
                high24hr: +v[k].high24hr,
                low24hr: +v[k].low24hr,
            }));
        })
        console.log('onTickerPairUpdate r=',r.length,)
        return r;
    }


     public static async loadFromPoloniex():Promise<IPoloniexPublicPairData> {

        if (this._poloniexDataRequest) {
            return this._poloniexDataRequest
        }

        this._poloniexDataRequest = BackendClass.getPoloniexTickers().then(v=>{
            this._poloniexData = v;
            this._poloniexDataRequest = null
            return v;
        }).catch(()=>{
            this._poloniexDataRequest = null
        })

        return this._poloniexDataRequest

    }

}
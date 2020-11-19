import {PoloniexClass} from "../../integration/poloniex/poloniexClass";
import {TickerClass} from "../ticker/tickerClass";
import {ESceneEvents, IEventsPool,} from "./dataPoolProps";
import {TickersPairClass} from "../tickersPair/tickersPairClass";
import {ETickerEvents, ITickersStack} from "../ticker/tickerProps";
import {HelpersClass} from "../helpers/helpersClass";
import {IPairsStack} from "../tickersPair/tickersPairProps";
import {SceneClass} from "../scene/sceneClass";

export class DataPoolClass {

    private static _isRunning: boolean = false
    private static readonly POLONIEX_WATCH_DELAY = 200

    private static tickers: ITickersStack

    private static pairs: IPairsStack

    private static eventsPool:IEventsPool = {}

    static getTickers() {
        return this.tickers
    }
    static getTickerPairs() {
        return this.pairs
    }
    static isHaveTickersForShow(v = this.tickers): boolean {
        return !HelpersClass.isEmpty(v)
    }

    static startWatching() {
        console.log('x84 start')
        if (this.isRunning()) {
            return
        }
        this._isRunning = true;

        this.watchPoloniex()
    }

    static stopWatching() {
        console.log('x84 off stop1')
        this._isRunning = false;
    }

    static isRunning(): boolean {
        return this._isRunning
    }


    static touchEventsPool(v:ESceneEvents, ...arr:any) {
        if (!this.eventsPool) {
            console.log('events pool not found')
            return
        }
        let event = this.eventsPool[v] as any;
        if (event) {
            event(arr)
        }
    }

    static setTouchEvent(v:ESceneEvents,f:any) {
        this.eventsPool[v] = f
    }
    static watchPoloniex() {

        if (!this.isRunning()) {
            return
        }

        if (!this.tickers) {
            this.tickers = {}
        }

        if (!this.pairs) {
            this.pairs = {}
        }

        PoloniexClass.loadFromPoloniex().then(v => {
            if (!v) {
                throw "no data"
            }
            let before = this.tickers;

            let poloniexTickers = PoloniexClass.getTickersFromPubPairsData(v)
            let newTickers = poloniexTickers.filter(t=>{
                return !TickerClass.isHaveTickerInStackByTickerName(t.getTickerName(),this.tickers)
            }).forEach(t=>{
                this.tickers[t.getTickerName()] = t
            });

            poloniexTickers.forEach(t=>{
                let stackedRow = this.tickers[t.getTickerName()]
                if (!stackedRow) {
                    return
                }
                stackedRow.touchEvents(ETickerEvents.onOnline)
            })

            if (!this.isHaveTickersForShow(before)) {
                this.touchEventsPool(ESceneEvents.TickersLoaded, this.tickers);
            } else {
                this.touchEventsPool(ESceneEvents.NewTickersAdded, newTickers);
            }

            let poloniexPairs = PoloniexClass.getTickersPairsFromPubPairsData(v);

            poloniexPairs.forEach(row=>{
                let key = row.getTickerPairName();
                if (!TickersPairClass.isHavePairInStackByPairName(key, this.pairs)) {
                    this.pairs[key] = row
                } else {
                    this.pairs[key].updatePair(row.getState(),this.pairs[key])
                }

            })

            SceneClass.touchEventsPool(ESceneEvents.onError,`Данные обновлены в ${HelpersClass.formatAMPM(new Date())}`);
            setTimeout(this.watchPoloniex.bind(this), this.POLONIEX_WATCH_DELAY)

        }).catch(()=>{
            SceneClass.touchEventsPool(ESceneEvents.onError,"Ошибка loadFromPoloniex")
            setTimeout(this.watchPoloniex.bind(this), this.POLONIEX_WATCH_DELAY)
        })
    }


}
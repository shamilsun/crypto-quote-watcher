import {IPairsStack, ITickerPair} from "./tickersPairProps";
import {TickerClass} from "../ticker/tickerClass";
import {ETickerEvents} from "../ticker/tickerProps";
import {HelpersClass} from "../helpers/helpersClass";
import {DataPoolClass} from "../dataPool/dataPoolClass";

export class TickersPairClass {

    private state: ITickerPair;

    constructor(v: ITickerPair) {
        this.state = v;
        this.updatePair = this.updatePair.bind(this)
    }

    public getTickerPairName(): string {
        return `${this.state.key}`
    }

    public getState(): ITickerPair {
        return this.state
    }

    public updatePair(newState: ITickerPair, self: TickersPairClass) {

        this.state = newState;

        let pairSymbols = this.getTickerPairName().split('_');
        let fromTicker = TickerClass.getTickerFromStackByTickerName(pairSymbols[0], DataPoolClass.getTickers())
        let toTicker = TickerClass.getTickerFromStackByTickerName(pairSymbols[1], DataPoolClass.getTickers())

        fromTicker.updatePairTo(toTicker, {
            inverse: false,
            pair: self
        })

        toTicker.updatePairTo(fromTicker, {
            inverse: true,
            pair: self
        })
    }

    static getPairFromStackByPairName(v: string, stack: IPairsStack): TickersPairClass {
        if (HelpersClass.isEmpty(stack)) {
            return null
        }
        return stack[v]
    }

    static isHavePairInStackByPairName(v: string, stack: IPairsStack): boolean {
        return !!this.getPairFromStackByPairName(v, stack)
    }
}
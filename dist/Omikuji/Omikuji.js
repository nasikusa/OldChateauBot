"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Omikuji {
    constructor(msgObject) {
        this.count = 1;
        this.targetMsg = 'おみくじ';
        this.msg = msgObject;
        this.results = ['大凶', '凶', '末吉', '小吉', '中吉', '吉', '大吉'];
    }
    setCount(count) {
        this.count = count;
    }
    setTargetMsg(targetMsg) {
        this.targetMsg = targetMsg;
    }
    doOmikuji() {
        if (this.msg.content === this.targetMsg) {
            const randomNumber = Math.random();
            const omikujiResultLength = this.results.length;
            for (const [index, omikujiResult] of this.results.entries()) {
                if (randomNumber < (1 * (index + 1)) / omikujiResultLength) {
                    this.msg.channel
                        .send(`あなたの運勢は、${omikujiResult}です～`)
                        .catch((err) => {
                        console.log(err);
                    });
                    break;
                }
            }
        }
    }
    doMultipleOmikuji(count = this.count) {
        for (let i = 0; i < count; i++) {
            this.doOmikuji();
        }
    }
}
exports.default = Omikuji;

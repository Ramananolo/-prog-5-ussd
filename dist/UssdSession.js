"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UssdSession = void 0;
class UssdSession {
    constructor() {
        this.currentStep = 'main';
    }
    getStep() {
        return this.currentStep;
    }
    setStep(step) {
        this.currentStep = step;
    }
}
exports.UssdSession = UssdSession;

export class UssdSession {
    currentStep;
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

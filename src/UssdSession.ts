export class UssdSession {
  private currentStep: string;

  constructor() {
    this.currentStep = 'main';
  }

  public getStep(): string {
    return this.currentStep;
  }

  public setStep(step: string): void {
    this.currentStep = step;
  }
}

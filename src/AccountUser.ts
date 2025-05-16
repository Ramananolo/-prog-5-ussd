export class AccountUser {
  private solde: number;
  private codeSecret: string;

  constructor(solde: number, codeSecret: string) {
    this.solde = solde;
    this.codeSecret = codeSecret;
  }

  public verifierCode(code: string): boolean {
    return this.codeSecret === code;
  }

  public debiter(montant: number): boolean {
    if (this.solde >= montant) {
      this.solde -= montant;
      return true;
    }
    return false;
  }

  public getSolde(): number {
    return this.solde;
  }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountUser = void 0;
class AccountUser {
    constructor(solde, codeSecret) {
        this.solde = solde;
        this.codeSecret = codeSecret;
    }
    verifierCode(code) {
        return this.codeSecret === code;
    }
    debiter(montant) {
        if (this.solde >= montant) {
            this.solde -= montant;
            return true;
        }
        return false;
    }
    getSolde() {
        return this.solde;
    }
}
exports.AccountUser = AccountUser;

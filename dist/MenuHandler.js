"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuHandler = void 0;
const AccountUser_1 = require("./AccountUser");
class MenuHandler {
    static async handleMainMenu(input, rl) {
        switch (input) {
            case "1":
                await this.showMvolaMenu(rl);
                break;
            default:
                console.log("Choix invalide.");
        }
        console.log("\n--- Retour au menu principal ---");
    }
    static async showMvolaMenu(rl) {
        console.log("\n--- Menu Mvola ---");
        console.log("1- Acheter Crédit ou Offre YAS");
        console.log("2- Transfer argent (Vers Toute destination)");
        console.log("3- Mvola crédit ou Epargne");
        console.log("4- Retrait d'argent");
        rl.question("\n> ", async (input) => {
            switch (input.trim()) {
                case "1":
                    await this.showCreditOfferMenu(rl);
                    break;
                case "2":
                case "3":
                case "4":
                    console.log("Fonctionnalité en cours de développement.");
                    rl.close();
                    break;
                default:
                    console.log("Choix invalide.");
                    rl.close();
            }
        });
    }
    static async showCreditOfferMenu(rl) {
        console.log("\n--- Acheter crédit ou Offre YAS ---");
        console.log("1- Crédit pour mon numéro");
        console.log("2- Crédit pour autre numéro");
        console.log("3- Offre pour mon numéro");
        console.log("4- Offre pour autre numéro");
        console.log("0- Retour");
        rl.question("\n> ", async (input) => {
            switch (input.trim()) {
                case "1":
                    await this.acheterCreditPourMoi(rl);
                    break;
                case "2":
                    await this.acheterCreditPourAutreNumero(rl);
                    break;
                case "3":
                case "4":
                    console.log("Fonctionnalité en développement.");
                    rl.close();
                    break;
                case "0":
                    rl.close();
                    break;
                default:
                    console.log("Choix invalide.");
                    rl.close();
            }
        });
    }
    static async acheterCreditPourMoi(rl) {
        rl.question("Entrez le montant du crédit à acheter (en Ariary) : ", (montantStr) => {
            const montant = parseInt(montantStr.trim());
            if (isNaN(montant) || montant <= 0) {
                console.log("Montant invalide.");
                rl.close();
                return;
            }
            rl.question("Entrez votre code secret : ", (code) => {
                if (!this.user.verifierCode(code.trim())) {
                    console.log("Code secret incorrect !");
                }
                else if (this.user.debiter(montant)) {
                    console.log("Crédit acheté avec succès !");
                    console.log("Nouveau solde : " + this.user.getSolde() + " Ar");
                }
                else {
                    console.log("Solde insuffisant !");
                }
                rl.close();
            });
        });
    }
    static async acheterCreditPourAutreNumero(rl) {
        rl.question("Entrez le numéro du destinataire : ", (numero) => {
            rl.question("Entrez le montant du crédit à envoyer (en Ariary) : ", (montantStr) => {
                const montant = parseInt(montantStr.trim());
                if (isNaN(montant) || montant <= 0) {
                    console.log("Montant invalide.");
                    rl.close();
                    return;
                }
                rl.question("Entrez votre code secret : ", (code) => {
                    if (!this.user.verifierCode(code.trim())) {
                        console.log("Code secret incorrect !");
                    }
                    else if (this.user.debiter(montant)) {
                        console.log(`Crédit de ${montant} Ar envoyé à ${numero.trim()} !`);
                        console.log("Nouveau solde : " + this.user.getSolde() + " Ar");
                    }
                    else {
                        console.log("Solde insuffisant !");
                    }
                    rl.close();
                });
            });
        });
    }
}
exports.MenuHandler = MenuHandler;
MenuHandler.user = new AccountUser_1.AccountUser(10000, '1234');

import { AccountUser } from './AccountUser';
export class MenuHandler {
    static async handleMainMenu(input, rl) {
        switch (input) {
            case "1":
                await this.showMvolaMenu(rl);
                break;
            default:
                console.log("Choix invalide.");
        }
        console.log("\n--- Retour au menu principal ---");
        rl.question("\n1- Accéder au menu Mvola\n> ", async (newInput) => {
            await this.handleMainMenu(newInput.trim(), rl);
        });
    }
    static async showMvolaMenu(rl) {
        let currentPage = 1;
        const showPage = () => {
            console.log("\n--- Menu Mvola ---");
            if (currentPage === 1) {
                console.log("1- Acheter Crédit ou Offre YAS");
                console.log("2- Transfer argent (Vers Toute destination)");
                console.log("3- Mvola crédit ou Epargne");
                console.log("4- Retrait d'argent");
                console.log("N- Page suivante");
            }
            else if (currentPage === 2) {
                console.log("5- Consulter solde");
                console.log("P- Page précédente");
                console.log("0- Retour menu principal");
            }
        };
        const handleInput = async () => {
            showPage();
            rl.question("\n> ", async (input) => {
                const choice = input.trim().toUpperCase();
                if (currentPage === 1) {
                    switch (choice) {
                        case "1":
                            await this.showCreditOfferMenu(rl);
                            return;
                        case "2":
                        case "3":
                        case "4":
                            console.log("Fonctionnalité en cours de développement.");
                            await this.showMvolaMenu(rl);
                            return;
                        case "N":
                            currentPage = 2;
                            await handleInput();
                            return;
                        default:
                            console.log("Choix invalide.");
                            await handleInput();
                            return;
                    }
                }
                else if (currentPage === 2) {
                    switch (choice) {
                        case "5":
                            console.log(`Votre solde est : ${this.user.getSolde()} Ar`);
                            await this.showMvolaMenu(rl);
                            return;
                        case "P":
                            currentPage = 1;
                            await handleInput();
                            return;
                        case "0":
                            await this.handleMainMenu("1", rl);
                            return;
                        default:
                            console.log("Choix invalide.");
                            await handleInput();
                            return;
                    }
                }
            });
        };
        rl.question("\n> ", async (input) => {
            switch (input.trim()) {
                case "1":
                    await this.showCreditOfferMenu(rl);
                    break;
                case "2":
                    await this.transferVersDestination(rl);
                    break;
                case "3":
                    console.log("Fonctionnalité en cours de développement.");
                    return this.showMvolaMenu(rl);
                case "4":
                    await this.retraitArgent(rl);
                    break;
                default:
                    console.log("Choix invalide.");
                    return this.showMvolaMenu(rl);
            }
        });
        await handleInput();
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
                    await this.showCreditOfferMenu(rl);
                    break;
                case "0":
                    await this.showMvolaMenu(rl);
                    break;
                default:
                    console.log("Choix invalide.");
                    await this.showCreditOfferMenu(rl);
            }
        });
    }
    static async retraitArgent(rl) {
        rl.question("Entrez le montant à retirer (en Ariary) : ", (montantStr) => {
            const montant = parseInt(montantStr.trim());
            if (isNaN(montant) || montant <= 0) {
                console.log("Montant invalide.");
                return this.showMvolaMenu(rl);
            }
            let timeoutReached = false;
            const timer = setTimeout(() => {
                timeoutReached = true;
                console.log("Temps écoulé. Opération annulée.");
                return this.showMvolaMenu(rl);
            }, 17000);
            rl.question("Entrez votre code secret : ", (code) => {
                if (timeoutReached)
                    return;
                clearTimeout(timer);
                if (!this.user.verifierCode(code.trim())) {
                    console.log("Code secret incorrect !");
                }
                else if (this.user.debiter(montant)) {
                    console.log(`Retrait de ${montant} Ar effectué avec succès.`);
                    console.log("Nouveau solde : " + this.user.getSolde() + " Ar");
                }
                else {
                    console.log("Solde insuffisant !");
                }
                return this.showMvolaMenu(rl);
            });
        });
    }
    static async acheterCreditPourMoi(rl) {
        rl.question("Entrez le montant du crédit à acheter (en Ariary) : ", (montantStr) => {
            const montant = parseInt(montantStr.trim());
            if (isNaN(montant) || montant <= 0) {
                console.log("Montant invalide.");
                this.showMvolaMenu(rl);
                return;
            }
            const timer = setTimeout(() => {
                console.log("Temps écoulé. Opération annulée.");
                this.showMvolaMenu(rl);
            }, 17000);
            rl.question("Entrez votre code secret : ", (code) => {
                clearTimeout(timer);
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
                this.showMvolaMenu(rl);
            });
        });
    }
    static async transferVersDestination(rl) {
        rl.question("Entrez le numéro du destinataire : ", (numero) => {
            rl.question("Entrez le montant à transférer (en Ariary) : ", (montantStr) => {
                const montant = parseInt(montantStr.trim());
                if (isNaN(montant) || montant <= 0) {
                    console.log("Montant invalide.");
                    return this.showMvolaMenu(rl);
                }
                let timeoutReached = false;
                const timer = setTimeout(() => {
                    timeoutReached = true;
                    console.log("Temps écoulé. Opération annulée.");
                    return this.showMvolaMenu(rl);
                }, 17000);
                rl.question("Entrez votre code secret : ", (code) => {
                    if (timeoutReached)
                        return;
                    clearTimeout(timer);
                    if (!this.user.verifierCode(code.trim())) {
                        console.log("Code secret incorrect !");
                    }
                    else if (this.user.debiter(montant)) {
                        console.log(`Transfert de ${montant} Ar vers ${numero.trim()} effectué avec succès.`);
                        console.log("Nouveau solde : " + this.user.getSolde() + " Ar");
                    }
                    else {
                        console.log("Solde insuffisant !");
                    }
                    return this.showMvolaMenu(rl);
                });
            });
        });
    }
    static async acheterCreditPourAutreNumero(rl) {
        rl.question("Entrez le numéro du destinataire : ", (numero) => {
            rl.question("Entrez le montant du crédit à envoyer (en Ariary) : ", (montantStr) => {
                const montant = parseInt(montantStr.trim());
                if (isNaN(montant) || montant <= 0) {
                    console.log("Montant invalide.");
                    this.showMvolaMenu(rl);
                    return;
                }
                const timer = setTimeout(() => {
                    console.log("\n⏰ Temps écoulé. Opération annulée.");
                    this.showMvolaMenu(rl);
                }, 17000);
                rl.question("Entrez votre code secret : ", (code) => {
                    clearTimeout(timer);
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
                    this.showMvolaMenu(rl);
                });
            });
        });
    }
}
MenuHandler.user = new AccountUser(1000000, '1234');

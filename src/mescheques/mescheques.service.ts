/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/class-name-casing */
import { Injectable, Get, NotFoundException } from "@nestjs/common";
import { Cheque } from "./mescheques.model";

@Injectable()
export class meschequesservice {
    private mescheques: Cheque[] = [];

    insertcheque(chequencheque: string, chequenfacture: string, chequencarnet: string, chequenombp: string, chequedateEch: string, chequedateCre: string,
        chequeMt: number, chequeEmis: string, chequepEmettrice: string, chequeDest: string, chequeppReceptrice: string, chequeLieucre: string, chequeLieupai: string) {



        const chequeid = new Date().toString();
        const newcheque = new Cheque(
            chequeid,
            chequencheque,
            chequenfacture,
             chequencarnet,
             chequenombp,
             chequedateEch,
             chequedateCre,
             chequeMt,
             chequeEmis,
             chequepEmettrice,
             chequeDest,
            chequeppReceptrice,
            chequeLieucre,
            chequeLieupai);
        this.mescheques.push(newcheque);
        return newcheque;
    }
    getcheques() {
        return [...this.mescheques];
    }
    getUncheque(chequeid: string) {
        const cheque = this.findcheque(chequeid)[0];
        return { ...cheque };
    }

    getUncheq(chequencheque: string) {
        const cheque = this.mescheques.find(cheq => cheq.id === chequencheque);
        if (!cheque) {
            throw new NotFoundException("erreur!!");
        }
        return { ...cheque };
    }

    getUnch(chequenfacture: string) {
        const cheque = this.mescheques.find(cheq => cheq.nfacture === chequenfacture);
        if (!cheque) {
            throw new NotFoundException("erreur!!");
        }
        return { ...cheque };
    }

    getUnchq(chequencarnet: string) {
        const cheque = this.mescheques.find(cheq => cheq.ncarnet === chequencarnet);
        if (!cheque) {
            throw new NotFoundException("erreur!!");
        }
        return { ...cheque };
    }

    getCheques(chequenombp: string) {
        const cheque = this.mescheques.find(cheq => cheq.nombp === chequenombp);
        if (!cheque) {
            throw new NotFoundException("erreur!!");
        }
        return { ...cheque };
    }

    getdeschequeS(chequedateEch: string) {
        const cheque = this.mescheques.find(cheq => cheq.dateEch === chequedateEch);
        if (!cheque) {
            throw new NotFoundException("erreur!!");
        }
        return { ...cheque };
    }

    getleschEques(chequedateCre: string) {
        const cheque = this.mescheques.find(cheq => cheq.dateCre === chequedateCre);
        if (!cheque) {
            throw new NotFoundException("erreur!!");
        }
        return { ...cheque };
    }

    getmeschequeS(chequeMt: number) {
        const cheque = this.mescheques.find(cheq => cheq.mt === chequeMt);
        if (!cheque) {
            throw new NotFoundException("erreur!!");
        }
        return { ...cheque };
    }

    getMeschequeS(chequeEmis: string) {
        const cheque = this.mescheques.find(cheq => cheq.emis === chequeEmis);
        if (!cheque) {
            throw new NotFoundException("erreur!!");
        }
        return { ...cheque };
    }

    getmesChequE(chequepEmettrice: string) {
        const cheque = this.mescheques.find(cheq => cheq.pEmettrice === chequepEmettrice);
        if (!cheque) {
            throw new NotFoundException("erreur!!");
        }
        return { ...cheque };
    }

    getMesCheQue(chequeDest: string) {
        const cheque = this.mescheques.find(cheq => cheq.dest === chequeDest);
        if (!cheque) {
            throw new NotFoundException("erreur!!");
        }
        return { ...cheque };
    }

    getLeschequeS(chequepReceptrice: string) {
        const cheque = this.mescheques.find(cheq => cheq.pReceptrice === chequepReceptrice);
        if (!cheque) {
            throw new NotFoundException("erreur!!");
        }
        return { ...cheque };
    }

    getlesChequeS(chequeLieucre: string) {
        const cheque = this.mescheques.find(cheq => cheq.lieucre === chequeLieucre);
        if (!cheque) {
            throw new NotFoundException("erreur!!");
        }
        return { ...cheque };
    }

    getLesChequeS(chequeLieupai: string) {
        const cheque = this.mescheques.find(cheq => cheq.lieupai === chequeLieupai);
        if (!cheque) {
            throw new NotFoundException("erreur!!");
        }
        return { ...cheque };
    }

    updatecheque(
        chequeid: string,
        ncheque: string,
        nfacture: string,
        ncarnet: string,
        nombp: string,
        dateEch: string,
        dateCre: string,
        // elle est mt en bas ??
        mt: number,
        emis: string,
        pEmettrice: string,
        dest: string,
        pReceptrice: string,
        lieucre: string,
        lieupai: string) {
        const [cheque, index] = this.findcheque(chequeid);
        const updatecheque = { ...cheque };
        if (ncheque) {
            updatecheque.ncheque = ncheque;
        }
        if (nfacture) {
            updatecheque.nfacture = nfacture;
        }
        if (ncarnet) {
            updatecheque.ncarnet = ncarnet;
        }
        if (nombp) {
            updatecheque.nombp = nombp;
        }
        if (dateEch) {
            updatecheque.dateEch = dateEch;
        }
        if (dateCre) {
            updatecheque.dateCre = dateCre;
        }
        if (emis) {
            updatecheque.emis = emis;
        }
        if (pEmettrice) {
            updatecheque.pEmettrice = pEmettrice;
        }
        if (dest) {
            updatecheque.dest = dest;
        }
        if (pReceptrice) {
            updatecheque.pReceptrice = pReceptrice;
        }
        if (lieucre) {
            updatecheque.lieucre = lieucre;
        }
        if (lieupai) {
            updatecheque.lieupai = lieupai;
        }

        this.mescheques[index] = updatecheque;
    }

    deletecheque(chequeid: string) {
        const [cheque, index] = this.findcheque(chequeid);
        this.mescheques.splice(index);
    }




    private findcheque(id: string): [Cheque, number] {
        const chequeIndex = this.mescheques.findIndex(cheq => cheq.id === id);
        const cheque = this.mescheques[chequeIndex];
        if (!cheque) {
            throw new NotFoundException("erreur!!");
        }
        return [cheque, chequeIndex];
    }
}






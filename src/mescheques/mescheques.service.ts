/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/class-name-casing */
import { Injectable, Get, NotFoundException } from "@nestjs/common";
import {cheque} from "./mescheques.model";
import { get } from "http";

@Injectable()
export class meschequesservice {
    insertcheque(chequeNcheque: string, chequeNfacture: string, chequeNcarnet: string, chequeNombp: string, chequeDateech: string, chequeDatecre: string, chequeMt: number, chequeEmis: string, chequepEmettrice: string, chequeDest: string, chequeppReceptrice: string, chequeLieucre: string, chequeLieupai: string) {
        throw new Error("Method not implemented.");
    }

      private mescheques: cheque [] = [] ;
     Insertcheque ( 
        id: string,
        Ncheque: string,
        Nfacture: string,
        Ncarnet: string,
        Nombp: string, 
        Dateech: string,
        Datecre: string,
        Mt: number,
        Emis:string,
        pEmettrice:string,
        Dest: string,
        pReceptrice: string, 
        Lieucre:string, 
        Lieupai: string ) { 

const chequeid =Math.random.toString();
        const newcheque = new cheque (
        chequeid,
        Ncheque, 
        Nfacture, 
        Ncarnet, 
        Nombp, 
        Dateech, 
        Datecre, 
        Mt, 
        Emis, 
        pEmettrice, 
        Dest, 
        pReceptrice, 
        Lieucre, 
        Lieupai );
        this.mescheques.push(newcheque);
        return chequeid; 
        }
        getcheques(){
        return [...this.mescheques];
    }
    getUncheque(chequeid: string){
       const cheque = this.findcheque(chequeid)[0];
        return {...cheque};
    }

    getUncheq(chequeNcheque: string){
        const cheque = this.mescheques.find(cheq=> cheq.id===chequeNcheque);
        if(!cheque){
            throw new NotFoundException("erreur!!");
        }
        return {...cheque};
    }
    
    getUnch(chequeNfacture: string){
        const cheque = this.mescheques.find(cheq=> cheq.Nfacture===chequeNfacture);
        if(!cheque){
            throw new NotFoundException("erreur!!");
        }
        return {...cheque};
    }
    
    getUnchq(chequeNcarnet: string){
        const cheque = this.mescheques.find(cheq=> cheq.Ncarnet===chequeNcarnet);
        if(!cheque){
            throw new NotFoundException("erreur!!");
        }
        return {...cheque};
    }
    
    getCheques(chequeNombp: string){
        const cheque = this.mescheques.find(cheq=> cheq.Nombp===chequeNombp);
        if(!cheque){
            throw new NotFoundException("erreur!!");
        }
        return {...cheque};
    }
    
    getdeschequeS(chequeDateech: string){
        const cheque = this.mescheques.find(cheq=> cheq.Dateech===chequeDateech);
        if(!cheque){
            throw new NotFoundException("erreur!!");
        }
        return {...cheque};
    }
    
    getleschEques(chequeDatecre: string){
        const cheque = this.mescheques.find(cheq=> cheq.Datecre===chequeDatecre);
        if(!cheque){
            throw new NotFoundException("erreur!!");
        }
        return {...cheque};
    }
    
    getmeschequeS(chequeMt: number){
        const cheque = this.mescheques.find(cheq=> cheq.Mt===chequeMt);
        if(!cheque){
            throw new NotFoundException("erreur!!");
        }
        return {...cheque};
    }
    
    getMeschequeS(chequeEmis: string){
        const cheque = this.mescheques.find(cheq=> cheq.Emis===chequeEmis);
        if(!cheque){
            throw new NotFoundException("erreur!!");
        }
        return {...cheque};
    }
    
    getmesChequE(chequepEmettrice: string){
        const cheque = this.mescheques.find(cheq=> cheq.pEmettrice===chequepEmettrice);
        if(!cheque){
            throw new NotFoundException("erreur!!");
        }
        return {...cheque};
    }
    
    getMesCheQue(chequeDest: string){
        const cheque = this.mescheques.find(cheq=> cheq.Dest===chequeDest);
        if(!cheque){
            throw new NotFoundException("erreur!!");
        }
        return {...cheque};
    }
    
    getLeschequeS(chequepReceptrice: string){
        const cheque = this.mescheques.find(cheq=> cheq.pReceptrice===chequepReceptrice);
        if(!cheque){
            throw new NotFoundException("erreur!!");
        }
        return {...cheque};
    }
    
    getlesChequeS(chequeLieucre: string){
        const cheque = this.mescheques.find(cheq=> cheq.Lieucre===chequeLieucre);
        if(!cheque){
            throw new NotFoundException("erreur!!");
        }
        return {...cheque};
    }
    
    getLesChequeS(chequeLieupai: string){
        const cheque = this.mescheques.find(cheq=> cheq.Lieupai===chequeLieupai);
        if(!cheque){
            throw new NotFoundException("erreur!!");
        }
        return {...cheque};
    }

    updatecheque(
    chequeid:string,
    Ncheque:string, 
    Nfacture:string, 
    Ncarnet:string, 
    Nombp:string, 
    Dateech:string, 
    Datecre:string, 
    Mt:number, 
    Emis:string, 
    pEmettrice:string, 
    Dest:string, 
    pReceptrice:string, 
    Lieucre:string, 
    Lieupai:string )
    {
    const [cheque, index] = this.findcheque(chequeid);
    const updatecheque = {...cheque};
    if (Ncheque) {
        updatecheque.Ncheque=Ncheque;
    }
    if (Nfacture) {
        updatecheque.Nfacture=Nfacture;
    }
    if (Ncarnet) {
        updatecheque.Ncarnet=Ncarnet;
    }
    if (Nombp) {
        updatecheque.Nombp=Nombp;
    }
    if (Dateech) {
        updatecheque.Dateech=Dateech;
    }
    if (Datecre) {
        updatecheque.Datecre=Datecre;
    }
    if (Emis) {
        updatecheque.Emis=Emis;
    }
    if (pEmettrice) {
        updatecheque.pEmettrice=pEmettrice;
    }
    if (Dest) {
        updatecheque.Dest=Dest;
    }
    if (pReceptrice) {
        updatecheque.pReceptrice=pReceptrice;
    }
    if (Lieucre) {
        updatecheque.Lieucre=Lieucre;
    }
    if (Lieupai) {
        updatecheque.Lieupai=Lieupai;
    }
   
    this.mescheques[index] = updatecheque;
    }

    deletecheque(chequeid: string){ 
        const [cheque, index] = this.findcheque(chequeid);
        this.mescheques.splice(index, );  
    }




    private findcheque (id:string): [cheque, number]{
    const chequeIndex = this.mescheques.findIndex(cheq=> cheq.id===id);
    const cheque = this.mescheques[chequeIndex];
        if(!cheque){
            throw new NotFoundException("erreur!!");
        }
        return [cheque, chequeIndex];
    }
}




    

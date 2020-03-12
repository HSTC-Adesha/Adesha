/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/class-name-casing */
import { Controller, Post, Get, Param, Patch, Delete, Body } from "@nestjs/common";
import { meschequesservice } from "./mescheques.service";
import { cheque } from "./mescheques.model";


@Controller('mescheques')
export class meschequescontroller {
    constructor ( private readonly meschequeservice: meschequesservice) {

    }
    @Post()
    addcheque(
    @Body('Ncheque') chequeNcheque : string,
    @Body('Nfacture') chequeNfacture :string,
    @Body ('Ncarnet') chequeNcarnet :string, 
    @Body ('Nombp') chequeNombp :string,
    @Body ('Dateech') chequeDateech :string,
    @Body ('Datecre') chequeDatecre :string, 
    @Body ('Mt') chequeMt :number, 
    @Body ('Emis') chequeEmis :string, 
    @Body ('pEmettrice') chequepEmettrice :string, 
    @Body ('Dest') chequeDest :string, 
    @Body ('pReceptrice') chequepReceptrice :string, 
    @Body ('Lieucre') chequeLieucre :string, 
    @Body ('Lieupai') chequeLieupai:string) {
     const generateid = this.meschequeservice.insertcheque (
            chequeNcheque, 
            chequeNfacture, 
            chequeNcarnet, 
            chequeNombp, 
            chequeDateech,
            chequeDatecre, 
            chequeMt,
            chequeEmis,
            chequepEmettrice,
            chequeDest,
            chequepReceptrice,
            chequeLieucre,
            chequeLieupai );
    console.log(generateid);
            return {id: generateid}; 
    }
    @Get()
    getAllcheques(){
        return this.meschequeservice.getcheques();
    }  

    @Get(':id')
    getuncheque(@Param('id') chequeid:string,){
        return this.meschequeservice. getUncheque(chequeid);
    }

    @Get(':Ncheque')
    getuncheq(@Param('Ncheque') chequeNcheque:string,){
        return this.meschequeservice.getUncheq(chequeNcheque);
    }
    @Get(': Nfacture')
    getunch(@Param(' Nfacture') chequeNfacture:string,){
        return this.meschequeservice. getUnch(chequeNfacture);
    }
    @Get(':Ncarnet')
    getunchq(@Param('Ncarnet') chequeNcarnet:string,){
        return this.meschequeservice.getUnchq(chequeNcarnet);
    }
    @Get(':Nombp')
    getcheques(@Param('Nombp') chequeNombp:string,){
        return this.meschequeservice. getCheques(chequeNombp);
    }
    @Get(':Dateech')
    getdescheques(@Param('Dateech') chequeDateech:string,){
        return this.meschequeservice.getdeschequeS(chequeDateech);
    }
    @Get(':Datecre')
    getlescheques(@Param('Datecre') chequeDatecre:string,){
        return this.meschequeservice.getleschEques(chequeDatecre);
    }
    @Get(':Mt')
    getmescheques(@Param('Mt') chequeMt:number,){
        return this.meschequeservice. getmeschequeS(chequeMt);
    }
    @Get(':Emis')
    getMescheques(@Param('Emis') chequeEmis:string,){
        return this.meschequeservice.getMeschequeS(chequeEmis);
    }
    @Get(':pEmettrice')
    getmesCheque(@Param('pEmettrice') chequepEmettrice:string,){
        return this.meschequeservice.getmesChequE(chequepEmettrice);
    }
    @Get(':Dest')
    getMesCheque(@Param('Dest') chequeDest:string,){
        return this.meschequeservice.getMesCheQue(chequeDest);
    }
    @Get(':pReceptrice')
    getLescheques(@Param('pReceptrice') chequepReceptrice:string,){
        return this.meschequeservice. getLeschequeS(chequepReceptrice);
    }
    @Get(':Lieucre')
    getlesCheques(@Param('Lieucre') chequeLieucre:string,){
        return this.meschequeservice.getlesChequeS(chequeLieucre);
    }
    @Get(':Lieupai')
    getLesCheques(@Param('Lieupai') chequeLieupai:string,){
        return this.meschequeservice. getLesChequeS(chequeLieupai);
    }

    @Patch(':id')

    updatecheque(
     @Param('id') chequeid: string,
     @Body('Ncheque') chequeNcheque: string,
     @Body('Nfacture') chequeNfacture: string,
     @Body('Ncarnet') chequeNcarnet: string,
     @Body('Nombp') chequeNombp: string,
     @Body('Dateech') chequeDateech: string,
     @Body('Datecre') chequeDatecre: string,
     @Body('Mt') chequeMt: number,
     @Body('Emis') chequeEmis: string,
     @Body('pEmettrice') chequepEmettrice: string,
     @Body('Dest') chequeDest: string,
     @Body('pReceptrice') chequepReceptrice: string,
     @Body('lieupai') chequeLieupai: string,
     @Body('lieucre') chequeLieucre: string,)
     {
         this.meschequeservice.updatecheque(
        chequeid,
        chequeNcheque, 
        chequeNfacture, 
        chequeNcarnet, 
        chequeNombp, 
        chequeDateech,
        chequeDatecre, 
        chequeMt,
        chequeEmis,
        chequepEmettrice,
        chequeDest,
        chequepReceptrice,
        chequeLieucre,
        chequeLieupai);
        return null;
     }

     @Delete(':id')
     removecheque( @Param('id') chequeid: string,){
         this.meschequeservice.deletecheque(chequeid);
         return null; 
     }
    }

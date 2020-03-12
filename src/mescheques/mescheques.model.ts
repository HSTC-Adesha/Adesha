/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/class-name-casing */
export class Cheque {
 constructor (
    public id: string,
    public ncheque: string, 
    public nfacture: string, 
    public ncarnet: string, 
    public nombp: string, 
    public dateEch: string, 
    public dateCre: string, 
    public mt: number, 
    public emis:string, 
    public pEmettrice: string, 
    public dest: string, 
    public pReceptrice: string, 
    public lieucre: string, 
    public lieupai: string 
) {} 
}

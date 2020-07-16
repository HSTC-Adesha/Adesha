import { Controller, Post, Get, Param, Patch, Delete, Body, UseFilters } from '@nestjs/common';
import { CompanyService } from './company.service';
import { ApiUseTags } from '@nestjs/swagger';
@ApiUseTags('Company')
@Controller('company')
export class CompanyController {
    constructor(private readonly companiesService: CompanyService) {
    }
    @Post()
    async  addcompany(
        @Body('name') companyname: string,
        @Body('city') companycountryAndCity: string,
        @Body('address') companyaddress: string,
        @Body('type') companytype: string,
        @Body('comment') companycomment: string, ) {
        return await this.companiesService.insertcompany(
            companyname,
            companycountryAndCity,
            companyaddress,
            companytype,
            companycomment);
    }
    @Get()
    async getAllcompanies() {
        return await this.companiesService.getAllcompanies();
    }
    @Get('id/:companyid')
    getCompanyById(@Param('companyid') companyid: string) {
        return this.companiesService.getCompanyById(companyid);
    }
    @Get('name/:name')
    getCompanyByName(@Param('name') companyname: string) {
        return this.companiesService.getCompanyByName(companyname);
    }
    @Get('city/:city')
    getCompanyByCity(@Param('city') companycountryAndCity: string) {
        return this.companiesService.getCompanyByCity(companycountryAndCity);
    }
    @Get('address/:address')
    getCompanyByAdress(@Param('address') companyaddress: string) {
        return this.companiesService.getCompanyByAdress(companyaddress);
    }
    @Get('type/:type')
    getCompanyByType(@Param('type') companytype: string) {
        return this.companiesService.getCompanyByType(companytype);
    }
    @Get('employees/:employees')
    getCompanyemployee(@Param('employees') companyemployees: string) {
        return this.companiesService.getCompanyemployee(companyemployees);
    }
    @Get('bankaccount/:bankaccount')
    getCompanyBybankaccount(@Param('bankaccount') companybankAccounts: string) {
        return this.companiesService.getCompanyBybankaccount(companybankAccounts);
    }
    @Get('bank/:bank')
    getCompanyBybank(@Param('bank') companybanks: string) {
        return this.companiesService.getCompanyBybank(companybanks);
    }
    @Get('bill/:bill')
    getCompanyBybill(@Param('bill') companybills: string) {
        return this.companiesService.getCompanyBybill(companybills);
    }

    @Post('employee/:companyid')
    addEmployee(@Param('companyid') companyid: string,
        @Body('employee') employee: string
    ) {
        return this.companiesService.addEmployeeToCompany(companyid, employee);
    }
    @Post('bank/:companyid')
    addBank(@Param('companyid') companyid: string,
        @Body('bank') bank: string
    ) {
        return this.companiesService.addBankToCompany(companyid, bank);
    }
    @Post('bankAccount/:companyid')
    addBankAccount(@Param('companyid') companyid: string,
        @Body('bankAccount') bankAccount: string
    ) {
        return this.companiesService.addBankAccountToCompany(companyid, bankAccount);
    }
    @Post('bill/:companyid')
    addBill(@Param('companyid') companyid: string,
        @Body('bill') bill: string
    ) {
        return this.companiesService.addBillToCompany(companyid, bill);
    }
    @Patch('employee/:companyid')
    removeEmployee(@Param('companyid') companyid: string,
        @Body('employee') employee: string
    ) {
        return this.companiesService.removeEmployeeFromCompany(companyid, employee);
    }
    @Patch('bank/:companyid')
    removeBank(@Param('companyid') companyid: string,
        @Body('bank') bank: string
    ) {
        return this.companiesService.removeBankFromCompany(companyid, bank);
    }
    @Patch('bankAccount/:companyid')
    removeBankAccount(@Param('companyid') companyid: string,
        @Body('bankAccount') bankAccount: string
    ) {
        return this.companiesService.removeBankAccountFromCompany(companyid, bankAccount);
    }
    @Patch('bill/:companyid')
    removeBill(@Param('companyid') companyid: string,
        @Body('bill') bill: string
    ) {
        return this.companiesService.removeBillFromCompany(companyid, bill);
    }
  

    @Patch(':id')
    async updatecompany(
        @Param('id') companyid: string,
        @Body('name') companyname: string,
        @Body('countryAndCity') companycountryAndCity: string,
        @Body('address') companyaddress: string,
        @Body('type') companytype: string,
        @Body('comment') companycomment: string, ) {
        return await this.companiesService.updateCompany(
            companyid,
            companyname,
            companycountryAndCity,
            companyaddress,
            companytype,
            companycomment);

    }
    @Delete(':id')
    async removecompany(@Param('id') companyid: string, ) {
        await this.companiesService.deleteCompany(companyid);
        return { "success": true };
    }
}


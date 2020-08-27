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
    @Get('employeesofcompany/:companyid')
    getEmpById(@Param('companyid') companyid: string) {
        return this.companiesService.getEmployeesByCompany(companyid);
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
        @Body('city') companycountryAndCity: string,
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
    @Patch('delete/:id')
    async removecompany(@Param('id') companyid: string, ) {
        await this.companiesService.deleteCompany(companyid);
        return { "success": true };
    }
}


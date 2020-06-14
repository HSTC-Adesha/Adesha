import { Controller, Post, Get, Param, Patch, Delete, Body, HttpException, HttpStatus, UseFilters} from '@nestjs/common';
import {HttpExceptionFilter} from '../filters/http-exception.filter';
import { CompanyService } from './company.service';

@Controller('company')
@UseFilters(HttpExceptionFilter)

export class CompanyController {
    constructor ( private readonly companiesService: CompanyService) {
    }
    @Post()
    async  addcompany(
    @Body('name') companyname :string,
    @Body('countryAndCity') companycountryAndCity :string,
    @Body ('address') companyaddress :string,
    @Body ('type') companytype :string,
    @Body ('comment') companycomment :string,) {
     const generateid = await this.companiesService.insertcompany (
        companyname,
        companycountryAndCity,
        companyaddress,
        companytype,
        companycomment);
            return {id: generateid};
    }
    @Get()
    async getAllcompanies(){
        const companies = await this.companiesService.getcompanies();
        return companies;
    }
    @Get('id/:companyid')
    getCOMPANY(@Param('companyid') companyid: string){
        return this.companiesService.getCOMPANY(companyid);
    }
    @Get('Name/:Name')
    getthecompany(@Param('name') companyname: string){
        return this.companiesService.getthecompany(companyname);
    }
    @Get('country and city/:country and city')
    getTheCompany(@Param('country and city') companycountryAndCity: string){
        return this.companiesService.getTheCompany(companycountryAndCity);
    }
    @Get('address/:address')
    getcompany(@Param('address') companyaddress: string){
        return this.companiesService.getcompany(companyaddress);
    }
    @Get('type/:type')
    getThecompany(@Param('type') companytype: string){
        return this.companiesService.getThecompany(companytype);
    }
   
    @Get('comment/:comment')
    gettheCompany(@Param('comment') companycomment:string,){
        return this.companiesService. gettheCompany(companycomment);
    }
    @Patch(':id')
    async updatecompany(
     @Param('id') companyid: string,
     @Body('name') companyname: string,
     @Body('countryAndCity') companycountryAndCity: string,
     @Body('address') companyaddress: string,
     @Body('type') companytype: string,
     @Body('comment') companycomment: string,)
     {
        await this.companiesService.updatecompany(
        companyid,
        companyname,
        companycountryAndCity,
        companyaddress,
        companytype,
        companycomment);
        return null;
     }
     @Delete(':id')
     async removecompany( @Param('id') companyid: string,){
        await this.companiesService.deletecompany(companyid);
         return null;
     }
    }


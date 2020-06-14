import { Injectable, NotFoundException } from '@nestjs/common';
import { Company } from './company.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class CompanyService {

    private mybanks: Company[] = [];
    constructor(@InjectModel('Company') private readonly companyModel: Model<Company>) { }
    async insertcompany (companyname: string, companycountryAndCity: string,
        companyaddress: string, companytype: string,
        companycomment: string) {
        this.addcompany(companyname, companycountryAndCity, 
         companyaddress, companytype, companycomment)
    }
    async addcompany(
        name: string,
        countryAndCity: string,
        address: string,
        type: string,
        comment: string) {
        const newcompany = new this.companyModel({
            name,
            countryAndCity,
            address,
            type,
            comment,
        });
        const result = await newcompany.save();
        return result.id as string;
    }
    async getcompanies() {
        const companies = await this.companyModel.find().exec()
        return companies.map(company => ({
            id: company.id,
            name: company.name,
            countryAndCity: company.countryAndCity,
            address: company.address,
            type: company.type,
            comment:company.comment,
        }));
    }

    async getCOMPANY(companyid: string) {
        const company = await this.findcompany(companyid);
        return {
            id: company.id,
            name: company.name,
            countryAndCity: company.countryAndCity,
            address: company.address,
            type: company.type,
            comment:company.comment,
        };
    }

    async getthecompany(companyname: string) {
        const company = await this.findname(companyname);
        return {
            id: company.id,
            name: company.name,
            countryAndCity: company.countryAndCity,
            address: company.address,
            type: company.type,
            comment:company.comment,
        };
    }

    async getTheCompany( companycountryAndCity: string) {
        const company = await this.findcompany (companycountryAndCity);
        return {
            id: company.id,
            name: company.name,
            countryAndCity: company.countryAndCity,
            address: company.address,
            type: company.type,
            comment:company.comment,
        };
    }


    async getcompany(companyaddress: string) {
        const company = await this.findaddress(companyaddress);
        return {
            id: company.id,
            name: company.name,
            countryAndCity: company.countryAndCity,
            address: company.address,
            type: company.type,
            comment:company.comment,
        };
    }

    async getThecompany(companytype: string) {
        const company = await this.findcompany(companytype);
        return {
            id: company.id,
            name: company.name,
            countryAndCity: company.countryAndCity,
            address: company.address,
            type: company.type,
            comment:company.comment,
        };
    }

    async gettheCompany(companycomment: string) {
        const company = await this.findcomment(companycomment);
        return {
            id: company.id,
            name: company.name,
            countryAndCity: company.countryAndCity,
            address: company.address,
            type: company.type,
            comment:company.comment,
        };
    }

    async updatecompany(
        companyid: string,
        name: string,
        countryAndCity: string,
        address: string,
        type: string,
        comment: string) {
        const updatecompany = await this.findcompany(companyid);
        if (name) {
            updatecompany.name= name;
        }
        if (countryAndCity) {
            updatecompany.countryAndCity= countryAndCity;
        }
        if (address) {
            updatecompany.address= address;
        }

        if (type) {
            updatecompany.type= type;
        }
        if (comment) {
            updatecompany.comment= comment;
        }
    
        const result = await updatecompany.save();
        return result;
    }

    async deletecompany(companyid: string) {
        await this.companyModel.findByIdAndDelete(companyid);

    }

    private async findcompany (id: string): Promise<Company> {
        let company;
        try {
            company = await this.companyModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!company) {
            throw new NotFoundException('erreur!!');
        }

        return company;
    }
    private async findname(name: string): Promise<Company> {
        let company;
        try {

            company = await this.companyModel.find({ name });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!company) {
            throw new NotFoundException('erreur!!');
        }

        return company;
    }
    private async findcountryAndCity (countryAndCity: string): Promise<Company> {
        let company;
        try {

            company = await this.companyModel.find({ countryAndCity });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!company) {
            throw new NotFoundException('erreur!!');
        }

        return company;
    }
   
    private async findaddress(address: string): Promise<Company> {
        let company ;
        try {

            company = await this.companyModel.find({ address });
        } catch (error) {
            throw new NotFoundException(' not found!');
        }
        if (!company) {
            throw new NotFoundException(' not found!');
        }

        return company;
    }

    private async findtype (type: string): Promise<Company> {
        let company;
        try {

            company = await this.companyModel.find({ company });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!company) {
            throw new NotFoundException('erreur!!');
        }

        return company;
    }

    private async findcomment(comment: string): Promise<Company> {
        let company;
        try {

            company = await this.companyModel.find({ comment });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!company) {
            throw new NotFoundException('erreur!!');
        }
        return company;
    }
}
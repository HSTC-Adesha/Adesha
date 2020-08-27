import { Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import {Employee } from './employee.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company } from './../company/company.model';



@Injectable()
export class EmployeeService {
    constructor(
        @InjectModel('Employee') private readonly employeeModel: Model<Employee>,
        @InjectModel('Company') private readonly companyModel: Model<Company>,

    ) { }
    async insertemployee (firstname: string, lastname: string,
        role: string, company:string, comment: string) {
       return this.addemployee(firstname, lastname, role,company,comment)
    }
    async addemployee(
        firstName: string,
        lastName: string,
        role: string,
        company:string,
        comment: string) {
        let companyObj = await this.findCompanyById(company);
        console.log("1",companyObj);
        const newemployee = new this.employeeModel({
            firstName,
            lastName,
            company,
            role,
            comment,
        });
        
        const rslt = await newemployee.save();
        const rs = companyObj.employees.push(newemployee);
        console.log("2",rslt);

        const rss = await companyObj.save();
        console.log("3",rss);

        return rslt;
    }
    async getAllemployees() {
        return await this.employeeModel.find().populate('company').exec()
       
    }

    async getEmployeeById(employeeid: string) {
        return await this.findEmployeeById(employeeid);

    }

    async getEmployeeByFirstName(employeefirstName: string) {
        return await this.findEmployeeByFirstName(employeefirstName);
        
    }

    async getEmployeeByLastName( employeelastName : string) {
        return await this.findEmployeeByLastName (employeelastName);
     
    }
    async getEmployeeByAddress( employeeaddress: string){
        return await this.findEmployeeByAddress (employeeaddress);
    
}


    async getEmployeeByRole(employeerole: string) {
        return await this.findEmployeeByRole(employeerole);
        
    }
    async getEmployeeByCompany( employeecompany: string){
        return await this.findEmployeeByCompany(employeecompany);
      
}
    async getEmployeeByComment(employeecomment: string) {
    return await this.findEmployeeByComment(employeecomment);
      
    }

    async updateemployee(
        employeeid: string,
        firstName: string,
        lastName: string,
        role: string,
        company: string,
        comment: string) {
            let updateemployee = await this.findEmployeeById(employeeid);

        if (firstName) {
            updateemployee.firstName= firstName;
        }
        if (lastName) {
            updateemployee.lastName= lastName;
        }
        if (role) {
            updateemployee.role= role;
        }
   
        if (comment) {
            updateemployee.comment= comment;
        }
        let result = await updateemployee.save();

        let updateemploye = await this.findEmployeeById(employeeid);
        let theCompany = await this.findCompanyById(company);

        if(updateemploye.company !==company)
        {
            await this.removeEmployeeFromCompany(updateemploye.company ,updateemploye._id)
            console.log('this',updateemploye.company)
            console.log('company',company)

            updateemploye.company=company;


           let resut = await updateemploye.save();
           console.log('that',resut)

           theCompany.employees.push(resut);
           console.log(resut)

           await theCompany.save();
           return resut;
        }
        return result;
    }

   
    

    async deleteemployee(employeeid: string) {
        console.log(employeeid)
        let employ = await this.findEmployeeById(employeeid);
        console.log(employeeid)
        let company = await this.findCompanyById(employ.company)
        console.log(employeeid)

      await this.removeEmployeeFromCompany(company._id,employeeid)
      console.log(employeeid)

      return  await this.employeeModel.findByIdAndDelete(employeeid);

    }
    async removeEmployeeFromCompany(
        companyid: string,
        employee: string,
        ) {
        let updatecompany :Company = await this.findCompanyById(companyid);
        let theEmployee:Employee = await this.getEmployeeById(employee);
        if (theEmployee && updatecompany) {
            for ( let i = 0; i < updatecompany.employees.length; i++) {
                if ( updatecompany.employees[i] === theEmployee.id) {
                    updatecompany.employees.splice(i, 1);
                }
             }
            updatecompany.save();
        }
        return updatecompany;
    }
    async findCompanyById (id: string) {
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
    private async findEmployeeById (id: string): Promise<Employee> {
        let employee;
        try {
            employee = await this.employeeModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!employee) {
            throw new NotFoundException('erreur!!');
        }

        return employee;
    }
    private async findEmployeeByFirstName (firstName: string): Promise<Employee> {
        let employee;
        try {

            employee = await this.employeeModel.find({ firstName });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!employee) {
            throw new NotFoundException('erreur!!');
        }

        return employee;
    }
    private async findEmployeeByLastName (lastName: string): Promise<Employee> {
        let employee;
        try {

            employee = await this.employeeModel.find({ lastName });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!employee) {
            throw new NotFoundException('erreur!!');
        }

        return employee;
    }

     private async findEmployeeByAddress (address: string): Promise<Employee> {
        let employee ;
        try {

            employee = await this.employeeModel.find({ address });
        } catch (error) {
            throw new NotFoundException(' not found!');
        }
        if (!employee) {
            throw new NotFoundException(' not found!');
        }

        return employee;
    }
   
    private async findEmployeeByRole (role: string): Promise<Employee> {
        let employee ;
        try {

            employee = await this.employeeModel.find({ role });
        } catch (error) {
            throw new NotFoundException(' not found!');
        }
        if (!employee) {
            throw new NotFoundException(' not found!');
        }
        return employee;
    }

    private async findEmployeeByCompany(company: string): Promise<Employee> {
        let employee ;
        try {

            employee = await this.employeeModel.find({ company });
        } catch (error) {
            throw new NotFoundException(' not found!');
        }
        if (!employee) {
            throw new NotFoundException(' not found!');
        }

        return employee;
    }
    private async findEmployeeByComment(comment: string): Promise<Employee> {
        let employee;
        try {

            employee = await this.employeeModel.find({ comment });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!employee) {
            throw new NotFoundException('erreur!!');
        }
        return employee;
    }
}






import { Module } from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import { mycheckscontroller} from "./myChecks.controller";
import { mychecksservice } from "./myChecks.service";
import { checkshema } from "./myChecks.model";
@Module({
    imports:[MongooseModule.forFeature([{name:'check', schema: checkshema}])],
    controllers: [mycheckscontroller],
    providers: [mychecksservice],
})
export class mychecksmodule {}

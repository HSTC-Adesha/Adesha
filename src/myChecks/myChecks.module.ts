import { Module } from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import { Mycheckscontroller} from "./myChecks.controller";
import { Mychecksservice } from "./myChecks.service";
import { checkshema } from "./myChecks.model";
@Module({
    imports:[MongooseModule.forFeature([{name:'check', schema: checkshema}])],
    controllers: [Mycheckscontroller],
    providers: [Mychecksservice],
})

export class Mychecksmodule {}

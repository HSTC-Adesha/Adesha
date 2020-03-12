/* eslint-disable @typescript-eslint/class-name-casing */
import { Module } from "@nestjs/common";
import { meschequescontroller } from "./mescheques.controller";
import { meschequesservice } from "./mescheques.service";
@Module({
    controllers: [meschequescontroller],
    providers: [meschequesservice],
})
export class meschequesmodule {}

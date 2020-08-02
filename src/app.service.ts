import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { ChequeService } from './cheque/cheque.service';
@Injectable()
export class AppService {
  constructor(
  @Inject(forwardRef(() => ChequeService ))
  private readonly ChequeService:ChequeService,
   ) {}

   
  getHello(): string {
    return 'Hello World!';
  }
}

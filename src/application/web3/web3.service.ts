import { Injectable, Logger } from '@nestjs/common';
import Web3 from 'web3';
import { AppConfiguration, InjectAppConfig } from '../../config/configuration';


@Injectable()
export class Web3Service {
  private web3: Web3;
  constructor(@InjectAppConfig() private appConfig: AppConfiguration) {
    this.init();
  }

  init() {
    this.web3 = new Web3(this.appConfig.web3.httpUrl);
  }

  async getWeb3() {
    return this.web3;
  }

  isValidAddress(address: string): boolean {
    return this.web3.utils.isAddress(address);
  }

}

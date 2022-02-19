import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { BLOCKCHAIN_URL } from '@/config';

@Injectable()
export class BlockchainService {
  private readonly provider: ethers.providers.JsonRpcProvider;

  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider({
      url: BLOCKCHAIN_URL,
    });
  }

  public async getTransaction(txHash: string): Promise<ethers.providers.TransactionResponse | null> {
    return await this.provider.getTransaction(txHash) ?? null;
  }
}

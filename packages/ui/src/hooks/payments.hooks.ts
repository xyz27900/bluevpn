import { ethers } from 'ethers';
import { useState } from 'react';

type TransferFn = (wallet: string, amount: string) => Promise<string | null>;
type PaymentStatus = {
  isProcessing: boolean;
}

type UsePaymentsHook = [TransferFn, PaymentStatus];

export const usePayments = (): UsePaymentsHook => {
  const [isProcessing, setIsProcessing] = useState(false);

  const transfer = async (wallet: string, amount: string): Promise<string | null> => {
    try {
      setIsProcessing(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      const transaction = await signer.sendTransaction({
        to: wallet,
        value: ethers.utils.parseEther(amount),
      });
      const res = await transaction.wait();
      setIsProcessing(false);
      return res.transactionHash;
    } catch (e) {
      setIsProcessing(false);
      return null;
    }
  };

  return [transfer, { isProcessing }];
};

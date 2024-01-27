import { getTargetNetwork } from "~~/utils/scaffold-eth";
import { readContract } from '@wagmi/core';
import {
  AbiFunctionReturnType,
  ContractAbi,
  contracts,
} from '~~/utils/scaffold-eth/contract';
import scaffoldConfig from '~~/scaffold.config';

type LottoAndNFTCeremonyAbi = ContractAbi<'LottoAndNFTCeremony'>;

type ceremoniesReturnType = AbiFunctionReturnType<LottoAndNFTCeremonyAbi, 'ceremonies'>;

type ceremonyCountReturnType = AbiFunctionReturnType<LottoAndNFTCeremonyAbi, 'ceremonyCount'>;

const deployedContract = contracts?.[scaffoldConfig.targetNetwork.id]?.[0]?.contracts?.['LottoAndNFTCeremony'];

export async function FetchCeremony(index: bigint) {
  if (deployedContract?.address !== undefined && deployedContract?.abi !== undefined) {
    const data = await readContract({
      chainId: getTargetNetwork().id,
      address: deployedContract?.address,
      abi: deployedContract?.abi,
      functionName: 'ceremonies',
      args: [index]
    });
    return data as ceremoniesReturnType;
  }
}

export default async function getAllCeremonies() {
  const allCeremonies = [];
  if (deployedContract?.address !== undefined && deployedContract?.abi !== undefined) {
    try {
      const result = await readContract({
        chainId: getTargetNetwork().id,
        address: deployedContract?.address,
        abi: deployedContract?.abi,
        functionName: 'ceremonyCount',
      });

      const ceremonyCount = result as ceremonyCountReturnType;

      if (ceremonyCount !== undefined && typeof ceremonyCount === 'bigint') {
        for (let i = 0n; i < ceremonyCount; i++) {
          const ceremonyData = await FetchCeremony(i);
          allCeremonies.push(ceremonyData);
        }
        return allCeremonies;
      }
    } catch (error) {
      console.error("Error reading ceremonyCount", error);
    }
  }
}
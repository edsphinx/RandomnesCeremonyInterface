import { ContractName } from '~~/utils/scaffold-eth/contract';
import { useScaffoldContractRead } from '../scaffold-eth';

export default function FetchCeremony(contractName: ContractName, index: bigint) {
  const { data: ceremony } = useScaffoldContractRead({
    contractName,
    functionName: 'ceremonies',
    args: [index],
  });

  return ceremony;
}
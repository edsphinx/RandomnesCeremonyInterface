import { Abi, ExtractAbiFunctionNames } from "abitype";
import { parseEther } from "viem";
import { useContractWrite, useNetwork } from "wagmi";
import { getParsedError } from "~~/components/scaffold-eth";
import { useDeployedContractInfo, useTransactor } from "~~/hooks/scaffold-eth";
import { getTargetNetwork, notification } from "~~/utils/scaffold-eth";
import { ContractAbi, ContractName, UseScaffoldWriteConfig } from "~~/utils/scaffold-eth/contract";

type UpdatedArgs = Parameters<ReturnType<typeof useContractWrite<Abi, string, undefined>>["writeAsync"]>[0];

interface ContractOperation {
  writeAsync: (args?: UpdatedArgs) => Promise<void>;
  isLoading: boolean;
}

/**
 * @dev Wrapper for wagmi's useContractWrite hook (with config prepared by usePrepareContractWrite hook) which loads in deployed contract ABI and address automatically.
 * @param config - The config settings, including extra wagmi configuration.
 * @param config.contractName - Deployed contract name.
 * @param config.functionName - Name of the function to be called.
 * @param config.args - Arguments for the function.
 * @param config.value - Value in ETH that will be sent with the transaction.
 * @param config.onBlockConfirmation - Callback function for block confirmation.
 */
export const useContractFunction = <
  TContractName extends ContractName,
  TFunctionName extends ExtractAbiFunctionNames<ContractAbi<TContractName>, "nonpayable" | "payable">,
>({
  contractName,
  functionName,
  args,
  value,
  onBlockConfirmation,
  blockConfirmations,
  ...writeConfig
}: UseScaffoldWriteConfig<TContractName, TFunctionName>): ContractOperation => {
  const { data: deployedContractData } = useDeployedContractInfo(contractName);
  const { chain } = useNetwork();
  const writeTx = useTransactor();
  const configuredNetwork = getTargetNetwork();

  const wagmiContractWrite = useContractWrite({
    chainId: configuredNetwork.id,
    address: deployedContractData?.address,
    abi: deployedContractData?.abi as Abi,
    functionName: functionName as any,
    args: args as unknown[],
    value: value ? parseEther(value) : undefined,
    ...writeConfig,
  });

  const sendContractWriteTx = async (newArgs?: UpdatedArgs, newValue?: string) => {
    if (!deployedContractData) {
      notification.error("Target Contract is not deployed, did you forget to run `yarn deploy`?");
      return;
    }
    if (!chain?.id) {
      notification.error("Please connect your wallet");
      return;
    }
    if (chain?.id !== configuredNetwork.id) {
      notification.error("You are on the wrong network");
      return;
    }

    if (wagmiContractWrite.writeAsync) {
      try {
        wagmiContractWrite.isLoading = true;
        await writeTx(
          () =>
            wagmiContractWrite.writeAsync({
              args: newArgs ?? args,
              value: newValue ? parseEther(newValue) : value && parseEther(value),
            }),
          { onBlockConfirmation, blockConfirmations },
        );
      } catch (e: any) {
        const message = getParsedError(e);
        notification.error(message);
      } finally {
        wagmiContractWrite.isLoading = false;
      }
    } else {
      notification.error("Contract writer error. Try again.");
      return;
    }
  };

  return {
    writeAsync: sendContractWriteTx,
    isLoading: wagmiContractWrite.isLoading,
  };
};

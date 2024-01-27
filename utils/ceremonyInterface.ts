export interface CeremonyData {
  randomnessCeremonyId: string;//0
  isNFTClaimed: boolean;//1
  isETHClaimed: boolean;//2
  isNFTCreatorETHClaimed: boolean;//3
  isProtocolETHClaimed: boolean;//4
  ticketCount: string;//5
  ticketPrice: bigint;//6
  stakeAmount: bigint;//7
  nftID: string;//8
  nftContractAddress: string;//9
  nftCreatorAddress: string;//10
  address: string;//11
  protocolAddress: {
    lottoETHPercentage: bigint;
    nftCreatorETHPercentage: bigint;
    protocolETHPercentage: bigint;
  };
}
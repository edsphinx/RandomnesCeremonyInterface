import { CeremonyData } from './ceremonyInterface';

export function transformCeremoniesData(data: any[]): CeremonyData[] {
  const validData = data.filter((item) => Array.isArray(item) && item.length === 13);

  const transformedData = validData.map((values) => {
    const transformedData = {
      randomnessCeremonyId: values[0],
      isNFTClaimed: Boolean(values[1]),
      isETHClaimed: Boolean(values[2]),
      isNFTCreatorETHClaimed: Boolean(values[3]),
      isProtocolETHClaimed: Boolean(values[4]),
      ticketCount: values[5],
      ticketPrice: BigInt(values[6] || '0'),
      stakeAmount: BigInt(values[7] || '0'),
      nftID: values[8],
      nftContractAddress: values[9],
      nftCreatorAddress: values[10],
      address: values[11],
      protocolAddress: {
        lottoETHPercentage: BigInt(values[12]?.lottoETHPercentage || '0'),
        nftCreatorETHPercentage: BigInt(values[12]?.nftCreatorETHPercentage || '0'),
        protocolETHPercentage: BigInt(values[12]?.protocolETHPercentage || '0'),
      },
    };

    return transformedData;
  });

  return transformedData;
}


export function transformCeremoniesDataDebug(data: any[]): CeremonyData[] {
  // console.log("Control Data (Debug):", data);

  const validData = data.filter((item) => {
    const isValidArray = Array.isArray(item) && item.length === 13;

    if (!isValidArray) {
      console.log('Invalid Data (Debug):', item);
    }

    return isValidArray;
  });

  console.log("Valid Data (Debug):", validData);

  const transformedData = validData.map((values) => {
    console.log('Values (Debug):', values);

    const transformedData = {
      randomnessCeremonyId: values[0],
      isNFTClaimed: Boolean(values[1]),
      isETHClaimed: Boolean(values[2]),
      isNFTCreatorETHClaimed: Boolean(values[3]),
      isProtocolETHClaimed: Boolean(values[4]),
      ticketCount: values[5],
      ticketPrice: BigInt(values[6] || '0'),
      stakeAmount: BigInt(values[7] || '0'),
      nftID: values[8],
      nftContractAddress: values[9],
      nftCreatorAddress: values[10],
      address: values[11],
      protocolAddress: {
        lottoETHPercentage: BigInt(values[12]?.lottoETHPercentage || '0'), // Access property within object
        nftCreatorETHPercentage: BigInt(values[12]?.nftCreatorETHPercentage || '0'), // Access property within object
        protocolETHPercentage: BigInt(values[12]?.protocolETHPercentage || '0'), // Access property within object
      },
    };

    console.log('Transformed Data (Debug):', transformedData);

    return transformedData;
  });

  return transformedData;
}
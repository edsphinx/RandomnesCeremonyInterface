const contracts = {
  10: [
    {
      chainId: "10",
      name: "optimism",
      contracts: {
        LottoAndNFTCeremony: {
          address: "0x10445fff1600AD3e38276EE3ec7CF7625D852687",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "randomnessCeremonyAddress",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "x",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "domain",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "seed",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "rounds",
                  type: "uint256",
                },
              ],
              name: "InvalidInputs",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "previousOwner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnershipTransferred",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "ceremonyId",
                  type: "uint256",
                },
              ],
              name: "ceremonies",
              outputs: [
                {
                  internalType: "uint256",
                  name: "randomnessCeremonyId",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "isNFTClaimed",
                  type: "bool",
                },
                {
                  internalType: "bool",
                  name: "isETHClaimed",
                  type: "bool",
                },
                {
                  internalType: "bool",
                  name: "isNFTCreatorETHClaimed",
                  type: "bool",
                },
                {
                  internalType: "bool",
                  name: "isProtocolETHClaimed",
                  type: "bool",
                },
                {
                  internalType: "uint256",
                  name: "ticketCount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "ticketPrice",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "stakeAmount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "nftID",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "nftContractAddress",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "nftCreatorAddress",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "protocolAddress",
                  type: "address",
                },
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "lottoETHPercentage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "nftCreatorETHPercentage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "protocolETHPercentage",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct LottoAndNFTCeremony.Percentages",
                  name: "percentages",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "ceremonyCount",
              outputs: [
                {
                  internalType: "uint256",
                  name: "_value",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "ceremonyId",
                  type: "uint256",
                },
              ],
              name: "claimETH",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "ceremonyId",
                  type: "uint256",
                },
              ],
              name: "claimNFT",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "ceremonyId",
                  type: "uint256",
                },
              ],
              name: "claimNFTCreatorETH",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "ceremonyId",
                  type: "uint256",
                },
              ],
              name: "claimProtocolETH",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "randomnessCeremonyId",
                  type: "uint256",
                },
                {
                  internalType: "bytes32",
                  name: "hashedValue",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
              ],
              name: "claimSlashedETH",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "commiter",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "ceremonyId",
                  type: "uint256",
                },
                {
                  internalType: "bytes32",
                  name: "hashedValue",
                  type: "bytes32",
                },
              ],
              name: "commit",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "commitmentDeadline",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "revealDeadline",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "ticketPrice",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "stakeAmount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "nftID",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "nftContractAddress",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "nftCreatorAddress",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "protocolAddress",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "nftCreatorETHPercentage",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "protocolETHPercentage",
                  type: "uint256",
                },
              ],
              name: "createCeremony",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "feistelRounds",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "ceremonyId",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
              ],
              name: "forceClaim",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "ceremonyId",
                  type: "uint256",
                },
              ],
              name: "getRandomness",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "ceremonyId",
                  type: "uint256",
                },
                {
                  internalType: "enum LottoAndNFTCeremony.WinnerType",
                  name: "winnerType",
                  type: "uint8",
                },
              ],
              name: "getWinner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "randomnessCeremony",
              outputs: [
                {
                  internalType: "contract RandomnessCeremony",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "renounceOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "ceremonyId",
                  type: "uint256",
                },
                {
                  internalType: "bytes32",
                  name: "hashedValue",
                  type: "bytes32",
                },
                {
                  internalType: "bytes32",
                  name: "secretValue",
                  type: "bytes32",
                },
              ],
              name: "reveal",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "ceremonyId",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "ticketId",
                  type: "uint256",
                },
              ],
              name: "tickets",
              outputs: [
                {
                  internalType: "address",
                  name: "ticketOwner",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
        RandomnessCeremony: {
          address: "0x440897cb529c6DEc3C0a53d630e72f667624694d",
          abi: [
            {
              inputs: [],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "randomnessId",
                  type: "uint256",
                },
                {
                  internalType: "bytes32",
                  name: "hashedValue",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
              ],
              name: "claimSlashedETH",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "committer",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "randomnessId",
                  type: "uint256",
                },
                {
                  internalType: "bytes32",
                  name: "hashedValue",
                  type: "bytes32",
                },
              ],
              name: "commit",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "randomnessId",
                  type: "uint256",
                },
                {
                  internalType: "bytes32",
                  name: "hashedValue",
                  type: "bytes32",
                },
              ],
              name: "commitments",
              outputs: [
                {
                  internalType: "address",
                  name: "committer",
                  type: "address",
                },
                {
                  internalType: "enum RandomnessCeremony.CommitmentState",
                  name: "state",
                  type: "uint8",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "commitmentDeadline",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "revealDeadline",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "stakeAmount",
                  type: "uint256",
                },
              ],
              name: "generateRandomness",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "randomnessId",
                  type: "uint256",
                },
              ],
              name: "getRandomness",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "randomnessId",
                  type: "uint256",
                },
              ],
              name: "randomness",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "randomBytes",
                  type: "bytes32",
                },
                {
                  internalType: "uint256",
                  name: "commitmentDeadline",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "revealDeadline",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "rewardIsClaimed",
                  type: "bool",
                },
                {
                  internalType: "uint256",
                  name: "stakeAmount",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "creator",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "randomnessIds",
              outputs: [
                {
                  internalType: "uint256",
                  name: "_value",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "randomnessId",
                  type: "uint256",
                },
                {
                  internalType: "bytes32",
                  name: "hashedValue",
                  type: "bytes32",
                },
                {
                  internalType: "bytes32",
                  name: "secretValue",
                  type: "bytes32",
                },
              ],
              name: "reveal",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
      },
    },
  ],
  420: [
    {
      chainId: "420",
      name: "optimismGoerli",
      contracts: {
        FeistelShuffleOptimised: {
          address: "0x3876BfD13FcA3d1317d255A39b7b6977EC0b1Db5",
          abi: [
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "x",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "domain",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "seed",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "rounds",
                  type: "uint256",
                },
              ],
              name: "InvalidInputs",
              type: "error",
            },
          ],
        },
        LottoAndNFTCeremony: {
          address: "0x87DFa5646f097F52448A93f273AB835974d72643",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "randomnessCeremonyAddress",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "x",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "domain",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "seed",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "rounds",
                  type: "uint256",
                },
              ],
              name: "InvalidInputs",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "previousOwner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnershipTransferred",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "ceremonyId",
                  type: "uint256",
                },
              ],
              name: "ceremonies",
              outputs: [
                {
                  internalType: "uint256",
                  name: "randomnessCeremonyId",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "isNFTClaimed",
                  type: "bool",
                },
                {
                  internalType: "bool",
                  name: "isETHClaimed",
                  type: "bool",
                },
                {
                  internalType: "bool",
                  name: "isNFTCreatorETHClaimed",
                  type: "bool",
                },
                {
                  internalType: "bool",
                  name: "isProtocolETHClaimed",
                  type: "bool",
                },
                {
                  internalType: "uint256",
                  name: "ticketCount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "ticketPrice",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "stakeAmount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "nftID",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "nftContractAddress",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "nftCreatorAddress",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "protocolAddress",
                  type: "address",
                },
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "lottoETHPercentage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "nftCreatorETHPercentage",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "protocolETHPercentage",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct LottoAndNFTCeremony.Percentages",
                  name: "percentages",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "ceremonyCount",
              outputs: [
                {
                  internalType: "uint256",
                  name: "_value",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "ceremonyId",
                  type: "uint256",
                },
              ],
              name: "claimETH",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "ceremonyId",
                  type: "uint256",
                },
              ],
              name: "claimNFT",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "ceremonyId",
                  type: "uint256",
                },
              ],
              name: "claimNFTCreatorETH",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "ceremonyId",
                  type: "uint256",
                },
              ],
              name: "claimProtocolETH",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "randomnessCeremonyId",
                  type: "uint256",
                },
                {
                  internalType: "bytes32",
                  name: "hashedValue",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
              ],
              name: "claimSlashedETH",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "commiter",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "ceremonyId",
                  type: "uint256",
                },
                {
                  internalType: "bytes32",
                  name: "hashedValue",
                  type: "bytes32",
                },
              ],
              name: "commit",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "commitmentDeadline",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "revealDeadline",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "ticketPrice",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "stakeAmount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "nftID",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "nftContractAddress",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "nftCreatorAddress",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "protocolAddress",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "nftCreatorETHPercentage",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "protocolETHPercentage",
                  type: "uint256",
                },
              ],
              name: "createCeremony",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "feistelRounds",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "ceremonyId",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
              ],
              name: "forceClaim",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "ceremonyId",
                  type: "uint256",
                },
              ],
              name: "getRandomness",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "ceremonyId",
                  type: "uint256",
                },
                {
                  internalType: "enum LottoAndNFTCeremony.WinnerType",
                  name: "winnerType",
                  type: "uint8",
                },
              ],
              name: "getWinner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "randomnessCeremony",
              outputs: [
                {
                  internalType: "contract RandomnessCeremony",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "renounceOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "ceremonyId",
                  type: "uint256",
                },
                {
                  internalType: "bytes32",
                  name: "hashedValue",
                  type: "bytes32",
                },
                {
                  internalType: "bytes32",
                  name: "secretValue",
                  type: "bytes32",
                },
              ],
              name: "reveal",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "ceremonyId",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "ticketId",
                  type: "uint256",
                },
              ],
              name: "tickets",
              outputs: [
                {
                  internalType: "address",
                  name: "ticketOwner",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
        MockNFT: {
          address: "0x88f9f78f8AD5Ac224ec48Fef7F345299e7411D14",
          abi: [
            {
              inputs: [],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "approved",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "Approval",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "operator",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "bool",
                  name: "approved",
                  type: "bool",
                },
              ],
              name: "ApprovalForAll",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "Transfer",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "approve",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
              ],
              name: "balanceOf",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "getApproved",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "operator",
                  type: "address",
                },
              ],
              name: "isApprovedForAll",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "nftId",
                  type: "uint256",
                },
              ],
              name: "mint",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "name",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "ownerOf",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "safeTransferFrom",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes",
                },
              ],
              name: "safeTransferFrom",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "operator",
                  type: "address",
                },
                {
                  internalType: "bool",
                  name: "approved",
                  type: "bool",
                },
              ],
              name: "setApprovalForAll",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes4",
                  name: "interfaceId",
                  type: "bytes4",
                },
              ],
              name: "supportsInterface",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "symbol",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "tokenURI",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "transferFrom",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
        RandomnessCeremony: {
          address: "0x5Cf9501A7fCDFC3Eec11508968D335de253b7A76",
          abi: [
            {
              inputs: [],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "randomnessId",
                  type: "uint256",
                },
                {
                  internalType: "bytes32",
                  name: "hashedValue",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
              ],
              name: "claimSlashedETH",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "committer",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "randomnessId",
                  type: "uint256",
                },
                {
                  internalType: "bytes32",
                  name: "hashedValue",
                  type: "bytes32",
                },
              ],
              name: "commit",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "randomnessId",
                  type: "uint256",
                },
                {
                  internalType: "bytes32",
                  name: "hashedValue",
                  type: "bytes32",
                },
              ],
              name: "commitments",
              outputs: [
                {
                  internalType: "address",
                  name: "committer",
                  type: "address",
                },
                {
                  internalType: "enum RandomnessCeremony.CommitmentState",
                  name: "state",
                  type: "uint8",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "commitmentDeadline",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "revealDeadline",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "stakeAmount",
                  type: "uint256",
                },
              ],
              name: "generateRandomness",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "randomnessId",
                  type: "uint256",
                },
              ],
              name: "getRandomness",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "randomnessId",
                  type: "uint256",
                },
              ],
              name: "randomness",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "randomBytes",
                  type: "bytes32",
                },
                {
                  internalType: "uint256",
                  name: "commitmentDeadline",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "revealDeadline",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "rewardIsClaimed",
                  type: "bool",
                },
                {
                  internalType: "uint256",
                  name: "stakeAmount",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "creator",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "randomnessIds",
              outputs: [
                {
                  internalType: "uint256",
                  name: "_value",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "randomnessId",
                  type: "uint256",
                },
                {
                  internalType: "bytes32",
                  name: "hashedValue",
                  type: "bytes32",
                },
                {
                  internalType: "bytes32",
                  name: "secretValue",
                  type: "bytes32",
                },
              ],
              name: "reveal",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;

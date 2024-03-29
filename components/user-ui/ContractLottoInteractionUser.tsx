import { CopyIcon } from './assets/CopyIcon';
import { DiamondIcon } from './assets/DiamondIcon';
import { HareIcon } from './assets/HareIcon';
import { ArrowSmallRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { formatEther, keccak256, stringToHex } from 'viem';
// import { GetBlockReturnType } from 'viem';
// import { createPublicClient, http } from 'viem';
// import { optimismGoerli } from 'viem/chains';
import { useAccount } from 'wagmi';
import {
	useScaffoldContractRead,
	useScaffoldContractWrite,
} from '~~/hooks/scaffold-eth';
import { formatEpochTimestamp } from '~~/utils/ceremony-utils';
import CeremonyTimer from '~~/utils/timer';

interface IParams {
	index: string;
}

// const getBlock = async () => {
// 	const publicClient = createPublicClient({
// 		chain: optimismGoerli,
// 		transport: http(),
// 	});

// 	return await publicClient.getBlock({ blockTag: 'latest' });
// };

export const ContractLottoInteractionUser = ({ index }: IParams) => {
	const router = useRouter();
	const { address } = useAccount();
	const [visible, setVisible] = useState(true);
	const [newCommit, setNewCommit] = useState('');
	const [newReveal, setNewReveal] = useState('');
	// const [block, setBlock] = useState<GetBlockReturnType | null>(null);
	// const [loading, setLoading] = useState(true);
	type ObjectKey = keyof typeof ceremonies;
	const commitmentDeadline = '1' as ObjectKey;
	const revealDeadline = '2' as ObjectKey;
	const ticketPrice = '6' as ObjectKey;
	const stakeAmount = '7' as ObjectKey;

	// useEffect(() => {
	// 	// Fetch block data when the component mounts
	// 	const fetchBlockData = async () => {
	// 		try {
	// 			const blockData = await getBlock();
	// 			setBlock(blockData);
	// 			setLoading(false);
	// 		} catch (error) {
	// 			console.error('Error fetching block data:', error);
	// 			setLoading(false);
	// 		}
	// 	};

	// 	fetchBlockData();
	// }, [newCommit, newReveal]);

	const currentCeremony = index !== undefined ? BigInt(index) : 0n;

	const { data: ceremonies } = useScaffoldContractRead({
		contractName: 'LottoAndNFTCeremony',
		functionName: 'ceremonies',
		args: [currentCeremony],
	});

	const { data: randomness, isLoading: randomnessLoading } =
		useScaffoldContractRead({
			contractName: 'RandomnessCeremony',
			functionName: 'randomness',
			args: [currentCeremony],
		});

	//keccak256(stringToHex(newCommit, { size: 32 }))
	const total = ceremonies
		? ceremonies?.[ticketPrice] + ceremonies?.[stakeAmount]
		: 0;
	const totalString = formatEther(BigInt(total));
	const totalNumber = Number(totalString);

	const { writeAsync: writeCommitAsync, isLoading: isCommitLoading } =
		useScaffoldContractWrite({
			contractName: 'LottoAndNFTCeremony',
			functionName: 'commit',
			args: [
				address,
				currentCeremony,
				keccak256(stringToHex(newCommit, { size: 32 })),
			],
			value: `${totalNumber}`,
			onBlockConfirmation: (txnReceipt) => {
				console.log('📦 Transaction blockHash', txnReceipt.blockHash);
				toast(txnReceipt.blockHash);
			},
		});

	const { writeAsync: writeRevealAsync, isLoading: isRevealLoading } =
		useScaffoldContractWrite({
			contractName: 'LottoAndNFTCeremony',
			functionName: 'reveal',
			args: [
				currentCeremony,
				keccak256(stringToHex(newReveal, { size: 32 })),
				stringToHex(newReveal, { size: 32 }),
			],
			onBlockConfirmation: (txnReceipt) => {
				console.log('📦 Transaction blockHash', txnReceipt.blockHash);
				toast(txnReceipt.blockHash);
			},
		});

	if (randomnessLoading) {
		// Display a loading message or spinner while data is being fetched
		return <div>Loading...</div>;
	} else if (randomness !== null && randomness !== undefined) {
		const _now = new Date(Date.now());
		const nowepoch = Math.trunc(_now.getTime() / 1000);
		// const commitTime = BigInt(randomness?.[commitmentDeadline]);
		// const revealTime = BigInt(randomness?.[revealDeadline]);
		const commitValueRaw = randomness?.[commitmentDeadline];
		const commitNumber = Number(commitValueRaw);
		const commitTime = new Date(0);
		commitTime.setUTCSeconds(commitNumber);

		const revealValueRaw = randomness?.[revealDeadline];
		const revealNumber = Number(revealValueRaw);
		const revealTime = new Date(0);
		revealTime.setUTCSeconds(revealNumber);

		return (
			<div className='flex bg-base-300 relative pb-10'>
				<DiamondIcon className='absolute top-24' />
				<CopyIcon className='absolute bottom-0 left-36' />
				<HareIcon className='absolute right-0 bottom-24' />
				<div className='flex flex-col w-full mx-5 sm:mx-8 2xl:mx-20'>
					<div
						className={`mt-10 flex gap-2 ${
							visible ? '' : 'invisible'
						} max-w-2xl`}
					>
						<div className='flex gap-5 bg-base-200 bg-opacity-80 z-0 p-7 rounded-2xl shadow-lg'>
							<span className='text-3xl'>👋🏻</span>
							<div>
								<div>
									Ingresa tu <strong>Palabra Secreta</strong> para contribuir,
									en la generaci&oacute;n de verdadero random en la cadena de
									bloques Optimsim! Ademas de participar ganando del Pot de
									ETHOP y el NFT de un artista local, y estas aportando a un
									Bien Publico!!!
								</div>
							</div>
						</div>
						<button
							className='btn btn-circle btn-ghost h-6 w-6 bg-base-200 bg-opacity-80 z-0 min-h-0 drop-shadow-md'
							onClick={() => setVisible(false)}
						>
							<XMarkIcon className='h-4 w-4' />
						</button>
					</div>
					<div className='flex flex-col mt-6 px-7 pt-2 bg-base-200 opacity-80 rounded-2xl shadow-lg border-2 border-primary'>
						{_now < commitTime && _now < revealTime ? (
							<div className='justify-center items-center'>
								<span className='text-l sm:text-xl text-black'>
									Commit Deadline:
								</span>
								{formatEpochTimestamp(BigInt(commitNumber))}
								<CeremonyTimer
									expiryTimestamp={commitTime}
									onClick={() => router.push(`/ceremony/${index}`)}
								/>
							</div>
						) : _now > commitTime && _now < revealTime ? (
							<div className='justify-center items-center'>
								<span className='text-l sm:text-xl text-black'>
									Reveal Deadline:{' '}
									{formatEpochTimestamp(BigInt(randomness?.[revealDeadline]))}
								</span>
								<CeremonyTimer
									expiryTimestamp={revealTime}
									onClick={() => router.push(`/ceremony/${index}`)}
								/>
							</div>
						) : (
							<CeremonyTimer
								expiryTimestamp={_now}
								onClick={() => {}}
							/>
						)}
					</div>

					{_now < commitTime && _now < revealTime ? (
						<div className='flex flex-col mt-6 px-7 py-8 bg-base-200 opacity-80 rounded-2xl shadow-lg border-2 border-primary'>
							<span className='text-4xl sm:text-6xl text-black'>Commit_</span>

							<div className='mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5'>
								<input
									type='text'
									placeholder='Escribe tu palabra secreta'
									className="input font-bai-jamjuree w-full px-5 bg-[url('/assets/gradient-bg.png')] bg-[length:100%_100%] border border-primary text-lg sm:text-2xl placeholder-white"
									onChange={(e) => setNewCommit(e.target.value)}
								/>
								<div className='flex rounded-full border border-primary p-1 flex-shrink-0'>
									<div className='flex rounded-full border-2 border-primary p-1'>
										<button
											className='btn btn-primary rounded-full capitalize font-normal font-white w-26 flex items-center gap-1 hover:gap-2 transition-all tracking-widest'
											onClick={() => writeCommitAsync()}
											disabled={isCommitLoading}
										>
											{isCommitLoading ? (
												<span className='loading loading-spinner loading-sm'></span>
											) : (
												<>
													Enviar{' '}
													<ArrowSmallRightIcon className='w-3 h-3 mt-0.5' />
												</>
											)}
										</button>
									</div>
								</div>
							</div>

							<div className='mt-4 flex gap-2 items-start'>
								<span className='text-sm leading-tight'>Precio:</span>
								<div className='badge badge-warning'>
									{totalString} ETH + Gas
								</div>
							</div>
						</div>
					) : (
						<div className='flex flex-col mt-6 px-7 py-8 bg-base-200 opacity-80 rounded-2xl shadow-lg border-2 border-primary'>
							<span className='text-4xl sm:text-6xl text-black'>
								Commit not Available
							</span>
						</div>
					)}

					{_now > commitTime && _now < revealTime ? (
						<div className='flex flex-col mt-6 px-7 py-8 bg-base-200 opacity-80 rounded-2xl shadow-lg border-2 border-primary'>
							<span className='text-4xl sm:text-6xl text-black'>Reveal_</span>

							<div className='mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5'>
								<input
									type='text'
									placeholder='Escribe tu palabra secreta'
									className="input font-bai-jamjuree w-full px-5 bg-[url('/assets/gradient-bg.png')] bg-[length:100%_100%] border border-primary text-lg sm:text-2xl placeholder-white"
									onChange={(e) => setNewReveal(e.target.value)}
								/>
								<div className='flex rounded-full border border-primary p-1 flex-shrink-0'>
									<div className='flex rounded-full border-2 border-primary p-1'>
										<button
											className='btn btn-primary rounded-full capitalize font-normal font-white w-26 flex items-center gap-1 hover:gap-2 transition-all tracking-widest'
											onClick={() => writeRevealAsync()}
											disabled={isRevealLoading}
										>
											{isRevealLoading ? (
												<span className='loading loading-spinner loading-sm'></span>
											) : (
												<>
													Enviar{' '}
													<ArrowSmallRightIcon className='w-3 h-3 mt-0.5' />
												</>
											)}
										</button>
									</div>
								</div>
							</div>

							<div className='mt-4 flex gap-2 items-start'>
								<span className='text-sm leading-tight'>Precio:</span>
								<div className='badge badge-warning'>0.0001 Gas</div>
							</div>
						</div>
					) : (
						<div className='flex flex-col mt-6 px-7 py-8 bg-base-200 opacity-80 rounded-2xl shadow-lg border-2 border-primary'>
							<span className='text-4xl sm:text-6xl text-black'>
								Reveal not Available
							</span>
						</div>
					)}
				</div>
			</div>
		);
	} else {
		return <div>Bad Data</div>;
	}
};

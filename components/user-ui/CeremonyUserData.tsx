import { ArrowSmallRightIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef, useState } from 'react';
import Marquee from 'react-fast-marquee';
import toast from 'react-hot-toast';
import { formatEther } from 'viem';
import { useAccount } from 'wagmi';
import {
	useAnimationConfig,
	useScaffoldContractRead,
	useScaffoldContractWrite,
} from '~~/hooks/scaffold-eth';

interface IParams {
	index: string;
}

const MARQUEE_PERIOD_IN_SEC = 5;

export const CeremonyUserData = ({ index }: IParams) => {
	const { address } = useAccount();
	const [transitionEnabled, setTransitionEnabled] = useState(true);
	const [isRightDirection, setIsRightDirection] = useState(false);
	const [marqueeSpeed, setMarqueeSpeed] = useState(0);

	const containerRef = useRef<HTMLDivElement>(null);
	const greetingRef = useRef<HTMLDivElement>(null);

	type ObjectKey = keyof typeof randomness;
	const commitmentDeadline = '1' as ObjectKey;
	const revealDeadline = '2' as ObjectKey;
	const ticketPrice = '6' as ObjectKey;
	const stakeAmount = '7' as ObjectKey;

	const currentCeremony = index !== undefined ? BigInt(index) : 0n;

	const { data: winner0, isLoading: winnerLoading0 } = useScaffoldContractRead({
		contractName: 'LottoAndNFTCeremony',
		functionName: 'getWinner',
		args: [currentCeremony, 0],
	});
	const { data: winner1, isLoading: winnerLoading1 } = useScaffoldContractRead({
		contractName: 'LottoAndNFTCeremony',
		functionName: 'getWinner',
		args: [currentCeremony, 1],
	});
	const { data: winner2, isLoading: winnerLoading2 } = useScaffoldContractRead({
		contractName: 'LottoAndNFTCeremony',
		functionName: 'getWinner',
		args: [currentCeremony, 2],
	});
	if (winner0 !== undefined && winner1 !== undefined && winner2 !== undefined) {
		console.log('ETH', winner0);
		console.log('NFT', winner1);
		console.log('Beer', winner2);
	}

	const { writeAsync: writeClaimETHAsync, isLoading: isClaimETHLoading } =
		useScaffoldContractWrite({
			contractName: 'LottoAndNFTCeremony',
			functionName: 'claimETH',
			args: [currentCeremony],
			onBlockConfirmation: (txnReceipt) => {
				console.log('📦 Transaction blockHash', txnReceipt.blockHash);
				toast(txnReceipt.blockHash);
			},
		});

	const { writeAsync: writeClaimNFTAsync, isLoading: isClaimNFTLoading } =
		useScaffoldContractWrite({
			contractName: 'LottoAndNFTCeremony',
			functionName: 'claimNFT',
			args: [currentCeremony],
			onBlockConfirmation: (txnReceipt) => {
				console.log('📦 Transaction blockHash', txnReceipt.blockHash);
				toast(txnReceipt.blockHash);
			},
		});

	const { data: randomness, isLoading: randomnessLoading } =
		useScaffoldContractRead({
			contractName: 'RandomnessCeremony',
			functionName: 'randomness',
			args: [currentCeremony],
		});

	const { data: ceremonies, isLoading: ceremoniesLoading } =
		useScaffoldContractRead({
			contractName: 'LottoAndNFTCeremony',
			functionName: 'ceremonies',
			args: [currentCeremony],
		});

	const { showAnimation } = useAnimationConfig(index);

	const showTransition =
		transitionEnabled && !!currentCeremony && !ceremoniesLoading;

	useEffect(() => {
		if (transitionEnabled && containerRef.current && greetingRef.current) {
			setMarqueeSpeed(
				Math.max(
					greetingRef.current.clientWidth,
					containerRef.current.clientWidth
				) / MARQUEE_PERIOD_IN_SEC
			);
		}
	}, [transitionEnabled, containerRef, greetingRef]);

	if (randomnessLoading && ceremoniesLoading) {
		// Render a loading state or return null
		return <div>Loading...</div>;
	} else if (randomness && ceremonies) {
		const _now = new Date(Date.now());
		// Prepare commit Time
		const commitValueRaw = randomness?.[commitmentDeadline];
		const commitNumber = Number(commitValueRaw);
		const commitTime = new Date(0);
		commitTime.setUTCSeconds(commitNumber);

		// Prepare reveal Time
		const revealValueRaw = randomness?.[revealDeadline];
		const revealNumber = Number(revealValueRaw);
		const revealTime = new Date(0);
		revealTime.setUTCSeconds(revealNumber);

		const _ticketPrice = ceremonies ? ceremonies?.[ticketPrice] : 0;
		const ticketString = formatEther(BigInt(_ticketPrice));
		const _stakePrice = ceremonies ? ceremonies?.[stakeAmount] : 0;
		const stakeString = formatEther(BigInt(_stakePrice));

		return (
			<div className="flex flex-col justify-center items-center bg-[url('/assets/gradient-bg.png')] bg-[length:100%_100%] py-10 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
				<div
					className={`flex flex-col max-w-md bg-base-200 bg-opacity-70 rounded-2xl shadow-lg px-5 py-4 w-full ${
						showAnimation ? 'animate-zoom' : ''
					}`}
				>
					<div className='flex justify-between w-full'>
						<button
							className="btn btn-circle btn-ghost relative bg-center bg-[url('/assets/switch-button-on.png')] bg-no-repeat"
							onClick={() => {
								setTransitionEnabled(!transitionEnabled);
							}}
						>
							<div
								className={`absolute inset-0 bg-center bg-no-repeat bg-[url('/assets/switch-button-off.png')] transition-opacity ${
									transitionEnabled ? 'opacity-0' : 'opacity-100'
								}`}
							/>
						</button>
						<div className='bg-secondary border border-primary rounded-xl flex'>
							<div className='p-2 py-1 border-r border-primary flex items-end'>
								Total count
							</div>
							<div className='text-4xl text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree'>
								{index || '0'}
							</div>
						</div>
					</div>
					<div>Ticket Price: {ticketString} ETH</div>
					<div>Stake Amount: {stakeString} ETH</div>

					{_now > commitTime && _now > revealTime && winner0 === undefined ? (
						<div className='mt-3 border border-primary bg-neutral rounded-3xl text-secondary  overflow-hidden text-[116px] whitespace-nowrap w-full uppercase tracking-tighter font-bai-jamjuree leading-tight'>
							<div
								className='relative overflow-x-hidden'
								ref={containerRef}
							>
								{/* for speed calculating purposes */}
								<div
									className='absolute -left-[9999rem]'
									ref={greetingRef}
								>
									<div className='px-4'>{currentCeremony.toString()}</div>
								</div>
								{new Array(3).fill('').map((_, i) => {
									const isLineRightDirection =
										i % 2 ? isRightDirection : !isRightDirection;
									return (
										<Marquee
											key={i}
											direction={isLineRightDirection ? 'right' : 'left'}
											gradient={false}
											play={showTransition}
											speed={marqueeSpeed}
											className={i % 2 ? '-my-10' : ''}
										>
											<div className='px-4'>
												{_now < commitTime && _now < revealTime
													? 'Commit'
													: _now > commitTime && _now < revealTime
													? 'Reveal'
													: 'Claim'}
											</div>
										</Marquee>
									);
								})}
							</div>
						</div>
					) : winner0 !== undefined ? (
						<>
							<div className='mt-10 text-xl'>ETH Winner</div>
							<div className='mt-3 border border-primary bg-neutral rounded-3xl text-base px-4  overflow-hidden text-[116px] whitespace-nowrap w-full uppercase tracking-tighter font-bai-jamjuree leading-tight'>
								<div>{winner0}</div>
							</div>
							<div className='mt-5 text-xl'>NFT Winner</div>
							<div className='mt-3 border border-primary bg-neutral rounded-3xl text-base px-4  overflow-hidden text-[116px] whitespace-nowrap w-full uppercase tracking-tighter font-bai-jamjuree leading-tight'>
								<div>{winner1}</div>
							</div>
							<div className='mt-5 text-xl'>Has to pay beer</div>
							<div className='mt-3 border border-primary bg-neutral rounded-3xl text-base px-4  overflow-hidden text-[116px] whitespace-nowrap w-full uppercase tracking-tighter font-bai-jamjuree leading-tight'>
								<div>{winner2}</div>
							</div>
						</>
					) : (
						<div className='text-3xl'>HOLA</div>
					)}

					<div className='mt-3 flex items-end justify-between'>
						<div className='mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5'>
							{address === winner0 ? (
								<div className='flex rounded-full border border-primary p-1 flex-shrink-0'>
									<div className='flex rounded-full border-2 border-primary p-1'>
										<button
											className='btn btn-primary rounded-full capitalize font-normal font-white w-26 flex items-center gap-1 hover:gap-2 transition-all tracking-widest'
											onClick={() => writeClaimETHAsync()}
											disabled={isClaimETHLoading}
										>
											{isClaimETHLoading ? (
												<span className='loading loading-spinner loading-sm'></span>
											) : (
												<>
													Claim ETH{' '}
													<ArrowSmallRightIcon className='w-3 h-3 mt-0.5' />
												</>
											)}
										</button>
									</div>
								</div>
							) : (
								<></>
							)}
							{address === winner1 ? (
								<div className='flex rounded-full border border-primary p-1 flex-shrink-0'>
									<div className='flex rounded-full border-2 border-primary p-1'>
										<button
											className='btn btn-primary rounded-full capitalize font-normal font-white w-26 flex items-center gap-1 hover:gap-2 transition-all tracking-widest'
											onClick={() => writeClaimNFTAsync()}
											disabled={isClaimNFTLoading}
										>
											{isClaimNFTLoading ? (
												<span className='loading loading-spinner loading-sm'></span>
											) : (
												<>
													Claim NFT{' '}
													<ArrowSmallRightIcon className='w-3 h-3 mt-0.5' />
												</>
											)}
										</button>
									</div>
								</div>
							) : (
								<></>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className="flex flex-col justify-center items-center bg-[url('/assets/gradient-bg.png')] bg-[length:100%_100%] py-10 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
				Not Data
			</div>
		);
	}
};

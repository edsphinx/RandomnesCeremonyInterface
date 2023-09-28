/* eslint-disable @next/next/no-img-element */
import { CeremonyData } from '~~/utils/ceremonyInterface';

interface CeremonyCardProps {
	ceremony: CeremonyData;
	nftData: { image: string; description: string } | null;
	onClick: () => void;
}

const CeremonyCard = ({ ceremony, nftData, onClick }: CeremonyCardProps) => {
	return (
		<div
			onClick={onClick}
			className='bg-white p-4 rounded-lg shadow-md w-200 sm:w-auto'
		>
			<h3 className='text-xl font-semibold mb-2'>
				Randomness Ceremony ID: {ceremony.randomnessCeremonyId.toString()}
			</h3>
			<div className='justify-center items-center'>
				{nftData !== null ? (
					<img
						className='w-64'
						src={nftData?.image}
						width={200}
						height={200}
						alt={nftData?.description}
					/>
				) : (
					<p>NFT Data Not Available</p>
				)}
			</div>
			<p>Is NFT Claimed: {ceremony.isNFTClaimed ? 'Yes' : 'No'}</p>
			<p>Is ETH Claimed: {ceremony.isETHClaimed ? 'Yes' : 'No'}</p>
			<p>
				Is NFT Creator Claimed: {ceremony.isNFTCreatorETHClaimed ? 'Yes' : 'No'}
			</p>
			<p>
				Is Protocol ETH Claimed: {ceremony.isProtocolETHClaimed ? 'Yes' : 'No'}
			</p>
		</div>
	);
};

export default CeremonyCard;

import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { MetaHeader } from '~~/components/MetaHeader';
import ClientOnly from '~~/components/providers/client-only';
import EmptyState from '~~/components/providers/empty-state';
import { CeremonyUserData } from '~~/components/user-ui/CeremonyUserData';
import { ContractLottoInteractionUser } from '~~/components/user-ui/ContractLottoInteractionUser';

const RandomnessCeremonyUI: NextPage = () => {
	const router = useRouter();
	const { ceremonyId } = router.query;

	if (
		ceremonyId !== undefined &&
		!Array.isArray(ceremonyId) &&
		typeof ceremonyId === 'string'
	) {
		return (
			<>
				<MetaHeader
					title='Ceremony User UI | Randomness Ceremony'
					description='Randomness Ceremony.'
				></MetaHeader>
				<div
					className='grid lg:grid-cols-2 flex-grow'
					data-theme='pageUi'
				>
					<ClientOnly>
						<ContractLottoInteractionUser index={ceremonyId} />
						<CeremonyUserData index={ceremonyId} />
					</ClientOnly>
				</div>
			</>
		);
	} else {
		return <EmptyState />;
	}
};

export default RandomnessCeremonyUI;

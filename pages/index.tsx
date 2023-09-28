import type { NextPage } from 'next';
import { MetaHeader } from '~~/components/MetaHeader';
import ClientOnly from '~~/components/providers/client-only';
import { CeremonyList } from '~~/components/user-ui/CeremonyList';

// import { CeremonyUserData } from '~~/components/user-ui/CeremonyUserData';
// import { ContractLottoInteractionUser } from '~~/components/user-ui/ContractLottoInteractionUser';

const RandomnessCeremonyUI: NextPage = () => {
	return (
		<>
			<MetaHeader
				title='Ceremony User UI | Randomness Ceremony'
				description='Randomness Ceremony.'
			></MetaHeader>
			<div
				className='grid flex-grow'
				data-theme='pageUi'
			>
				<ClientOnly>
					<CeremonyList />
				</ClientOnly>
			</div>
		</>
	);
};

export default RandomnessCeremonyUI;

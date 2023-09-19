import type { NextPage } from 'next';
import { MetaHeader } from '~~/components/MetaHeader';
import { CeremonyUserData } from '~~/components/user-ui/CeremonyUserData';
import { ContractLottoInteractionUser } from '~~/components/user-ui/ContractLottoInteractionUser';

const RandomnessCeremonyUI: NextPage = () => {
	return (
		<>
			<MetaHeader
				title='Ceremony User UI | Randomness Ceremony'
				description='Randomness Ceremony.'
			></MetaHeader>
			<div
				className='grid lg:grid-cols-2 flex-grow'
				data-theme='exampleUi'
			>
				<ContractLottoInteractionUser />
				<CeremonyUserData />
			</div>
		</>
	);
};

export default RandomnessCeremonyUI;

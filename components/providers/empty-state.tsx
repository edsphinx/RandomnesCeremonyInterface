'use client';

import { Footer } from '../Footer';
import { Header } from '../Header';

const EmptyState = () => {
	return (
		<div
			className='
    h-[60vh]
    flex
    flex-col
    gap-2
    justify-center
    items-center
  '
		>
			<Header />
			<div className='w-48 mt-4'>No se encontro</div>
			<Footer />
		</div>
	);
};

export default EmptyState;

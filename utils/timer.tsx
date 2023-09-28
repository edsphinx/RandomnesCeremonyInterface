import { useTimer } from 'react-timer-hook';

interface ITimer {
	expiryTimestamp: Date;
	onClick: () => void;
}

export default function CeremonyTimer({ expiryTimestamp, onClick }: ITimer) {
	const { seconds, minutes, hours, days, isRunning } = useTimer({
		expiryTimestamp,
		onExpire: onClick,
	});

	return (
		<div style={{ textAlign: 'center' }}>
			<div className='text-6xl'>
				<span>{String(days).padStart(2, '0')}</span>:
				<span>{String(hours).padStart(2, '0')}</span>:
				<span>{String(minutes).padStart(2, '0')}</span>:
				<span>{String(seconds).padStart(2, '0')}</span>
			</div>
			<p>{isRunning ? 'Running' : 'Not running'}</p>
		</div>
	);
}

export function SimpleTimer({ expiryTimestamp, onClick }: ITimer) {
	const { seconds, minutes, hours, days } = useTimer({
		expiryTimestamp,
		onExpire: onClick,
	});

	return (
		<div>
			<span>{String(days).padStart(2, '0')}</span>:
			<span>{String(hours).padStart(2, '0')}</span>:
			<span>{String(minutes).padStart(2, '0')}</span>:
			<span>{String(seconds).padStart(2, '0')}</span>
		</div>
	);
}

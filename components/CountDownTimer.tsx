import React, { useEffect, useState } from "react";
import { calculateDetailedTimeLeft } from "~~/utils/ceremony-utils";

interface CountdownTimerProps {
  durationInSeconds: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ durationInSeconds }) => {
  const [timeLeft, setTimeLeft] = useState<number>(durationInSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, [timeLeft]);

  // Calculate the percentage of time remaining
  const percentageRemaining = (timeLeft / durationInSeconds) * 100;

  return (
    <div className="countdown-timer p-4">
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
              Countdown
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-blue-600">
              {calculateDetailedTimeLeft(BigInt(timeLeft))} left
            </span>
          </div>
        </div>
        <div className="relative">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                Progress
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-teal-600">
                {percentageRemaining.toFixed(2)}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-teal-200">
            <div
              style={{ width: `${percentageRemaining.toFixed(2)}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;

import { useEffect, useRef, useState } from "react";
import CountdownTimer from "../CountDownTimer";
import Marquee from "react-fast-marquee";
import { formatEther } from "viem";
import { useAnimationConfig, useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { formatEpochTimestamp } from "~~/utils/ceremony-utils";

const MARQUEE_PERIOD_IN_SEC = 5;

export const CeremonyUserData = () => {
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isRightDirection, setIsRightDirection] = useState(false);
  const [marqueeSpeed, setMarqueeSpeed] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLDivElement>(null);

  type ObjectKey = keyof typeof randomness;
  const commitmentDeadline = "1" as ObjectKey;
  const revealDeadline = "2" as ObjectKey;
  const ticketPrice = "6" as ObjectKey;
  const stakeAmount = "7" as ObjectKey;

  const { data: ceremonyCount } = useScaffoldContractRead({
    contractName: "LottoAndNFTCeremony",
    functionName: "ceremonyCount",
  });

  const currentCeremony = ceremonyCount !== undefined && ceremonyCount > 0 ? ceremonyCount - 1n : 0n;

  const { data: randomness, isLoading: randomnessLoading } = useScaffoldContractRead({
    contractName: "RandomnessCeremony",
    functionName: "randomness",
    args: [currentCeremony],
  });

  const { data: feistelRounds, isLoading: isGreetingLoading } = useScaffoldContractRead({
    contractName: "LottoAndNFTCeremony",
    functionName: "feistelRounds",
  });

  const { data: ceremonies, isLoading: ceremoniesLoading } = useScaffoldContractRead({
    contractName: "LottoAndNFTCeremony",
    functionName: "ceremonies",
    args: [currentCeremony],
  });

  const { showAnimation } = useAnimationConfig(ceremonyCount);

  const showTransition = transitionEnabled && !!feistelRounds && !isGreetingLoading;

  useEffect(() => {
    if (transitionEnabled && containerRef.current && greetingRef.current) {
      setMarqueeSpeed(
        Math.max(greetingRef.current.clientWidth, containerRef.current.clientWidth) / MARQUEE_PERIOD_IN_SEC,
      );
    }
  }, [transitionEnabled, containerRef, greetingRef]);

  if (randomnessLoading && ceremoniesLoading) {
    // Render a loading state or return null
    return <div>Loading...</div>;
  } else if (randomness && ceremonies) {
    const commitTime = Number(randomness?.[commitmentDeadline]);
    const revealTime = Number(randomness?.[revealDeadline]);
    const _ticketPrice = ceremonies ? ceremonies?.[ticketPrice] : 0;
    const ticketString = formatEther(BigInt(_ticketPrice));
    const _stakePrice = ceremonies ? ceremonies?.[stakeAmount] : 0;
    const stakeString = formatEther(BigInt(_stakePrice));
    return (
      <div className="flex flex-col justify-center items-center bg-[url('/assets/gradient-bg.png')] bg-[length:100%_100%] py-10 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
        <div
          className={`flex flex-col max-w-md bg-base-200 bg-opacity-70 rounded-2xl shadow-lg px-5 py-4 w-full ${
            showAnimation ? "animate-zoom" : ""
          }`}
        >
          <div className="flex justify-between w-full">
            <button
              className="btn btn-circle btn-ghost relative bg-center bg-[url('/assets/switch-button-on.png')] bg-no-repeat"
              onClick={() => {
                setTransitionEnabled(!transitionEnabled);
              }}
            >
              <div
                className={`absolute inset-0 bg-center bg-no-repeat bg-[url('/assets/switch-button-off.png')] transition-opacity ${
                  transitionEnabled ? "opacity-0" : "opacity-100"
                }`}
              />
            </button>
            <div className="bg-secondary border border-primary rounded-xl flex">
              <div className="p-2 py-1 border-r border-primary flex items-end">Total count</div>
              <div className="text-4xl text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
                {ceremonyCount?.toString() || "0"}
              </div>
            </div>
          </div>
          <div>Ticket Price: {ticketString} ETH</div>
          <div>Stake Amount: {stakeString} ETH</div>

          <div className="mt-3 border border-primary bg-neutral rounded-3xl text-secondary  overflow-hidden text-[116px] whitespace-nowrap w-full uppercase tracking-tighter font-bai-jamjuree leading-tight">
            <div className="relative overflow-x-hidden" ref={containerRef}>
              {/* for speed calculating purposes */}
              <div className="absolute -left-[9999rem]" ref={greetingRef}>
                <div className="px-4">{feistelRounds?.toString()}</div>
              </div>
              {new Array(3).fill("").map((_, i) => {
                const isLineRightDirection = i % 2 ? isRightDirection : !isRightDirection;
                return (
                  <Marquee
                    key={i}
                    direction={isLineRightDirection ? "right" : "left"}
                    gradient={false}
                    play={showTransition}
                    speed={marqueeSpeed}
                    className={i % 2 ? "-my-10" : ""}
                  >
                    <div className="px-4">{feistelRounds?.toString() || " "}</div>
                  </Marquee>
                );
              })}
            </div>
          </div>

          <div className="mt-3 flex items-end justify-between">
            <button
              className={`btn btn-circle btn-ghost border border-primary hover:border-primary w-12 h-12 p-1 bg-neutral flex items-center ${
                isRightDirection ? "justify-start" : "justify-end"
              }`}
              onClick={() => {
                if (transitionEnabled) {
                  setIsRightDirection(!isRightDirection);
                }
              }}
            >
              <div className="border border-primary rounded-full bg-secondary w-2 h-2" />
            </button>
            <div className="w-44 p-0.5 flex items-center bg-neutral border border-primary rounded-full">
              <div
                className="h-1.5 border border-primary rounded-full bg-secondary animate-grow"
                style={{ animationPlayState: showTransition ? "running" : "paused" }}
              />
            </div>
          </div>

          <span className="text-l sm:text-xl text-black">Commit Deadline:</span>
          {formatEpochTimestamp(BigInt(randomness?.[commitmentDeadline]))}
          <CountdownTimer durationInSeconds={commitTime} />
          <div></div>
          <span className="text-l sm:text-xl text-black">Reveal Deadline:</span>
          {formatEpochTimestamp(BigInt(randomness?.[revealDeadline]))}
          <CountdownTimer durationInSeconds={revealTime} />
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

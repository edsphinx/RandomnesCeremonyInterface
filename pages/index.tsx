import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { CeremonyUserData } from "~~/components/example-ui/CeremonyUserData";
import { ContractLottoInteractionUser } from "~~/components/example-ui/ContractLottoInteractionUser";

const RandomnessCeremonyUI: NextPage = () => {
  return (
    <>
      <MetaHeader title="Ceremony User UI | Randomness Ceremony" description="Randomness Ceremony.">
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>
      <div className="grid lg:grid-cols-2 flex-grow" data-theme="exampleUi">
        <ContractLottoInteractionUser />
        <CeremonyUserData />
      </div>
    </>
  );
};

export default RandomnessCeremonyUI;

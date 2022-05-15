import { useWallet } from "@solana/wallet-adapter-react";
import { IMintDataType } from "components/MintP/LuanchpadPageInner";
import { useMemo } from "react";

export type useIsUserInWhitelistPropsType = {
  data: IMintDataType;
};

const useIsUserInWhitelist = (data: IMintDataType) => {
  const { whitelistedWallets, whitelistOne, whitelistTwo, whitelistThree } =
    data;
  const { publicKey } = useWallet();
  const stringPublicKey = publicKey?.toString() ?? "000__";

  const allowedWalletsToMint = useMemo(() => {
    let workingAllwedWallets: string[] = [];

    const firstList = whitelistedWallets["one"] ?? [];
    const secondList = whitelistedWallets["two"] ?? [];
    const thirdList = whitelistedWallets["three"] ?? [];

    if (whitelistOne) {
      workingAllwedWallets = [...workingAllwedWallets, ...firstList];
    }
    if (whitelistTwo) {
      workingAllwedWallets = [...workingAllwedWallets, ...secondList];
    }
    if (whitelistThree) {
      workingAllwedWallets = [...workingAllwedWallets, ...thirdList];
    }

    return workingAllwedWallets;
  }, [whitelistOne, whitelistThree, whitelistTwo, whitelistedWallets]);

  return allowedWalletsToMint.includes(stringPublicKey);
};

export default useIsUserInWhitelist;

import { Box, Typography } from "@mui/material";
import { usePolkadot } from "@/hooks/usePolkadot";
import { SHIBUYA_ADDRESS } from "@/constants/polkadot";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { TvButton } from "./TvButton/TvButton";

const Extension = () => {
  const { allAccounts, invest, withdraw, deploy, deployedContractAddress } = usePolkadot();

  return (
    <>
      <Box sx={{
        display: "flex",
        flexDirection: "column"
      }}>
        {typeof allAccounts !== "undefined"
          ? allAccounts.map((account: InjectedAccountWithMeta, index: number) => {
            return (
              <Box key={index + 1}>
                <Box>
                  <Typography>Account name: {account.meta.name}</Typography>
                  <Typography>Account address: {account.address}</Typography>
                </Box>
                <TvButton onClick={() => { invest(SHIBUYA_ADDRESS, 1); }}>invest</TvButton>
                <TvButton onClick={() => { withdraw(SHIBUYA_ADDRESS); }}>withdraw</TvButton>
              </Box>
            );
          })
          : <></>}
        <Box>
          <TvButton onClick={() => { deploy(SHIBUYA_ADDRESS, "test2", "200", "20"); }}>deploy</TvButton>
          <Typography>Deployed Contract address: {deployedContractAddress}</Typography>
        </Box>
      </Box>
    </>
  );
};

export default Extension;

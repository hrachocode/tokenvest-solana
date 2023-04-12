import { Box, Button, Typography } from "@mui/material";
import { usePolkadot } from "@/hooks/usePolkadot";
import { SHIBUYA_ADDRESS } from "@/constants/polkadot";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";

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
                <Button onClick={() => { invest(SHIBUYA_ADDRESS, 1); }}>invest</Button>
                <Button onClick={() => { withdraw(SHIBUYA_ADDRESS); }}>withdraw</Button>
              </Box>
            );
          })
          : <></>}
        <Box>
          <Button onClick={() => { deploy(SHIBUYA_ADDRESS, "test2", "200", "20"); }}>deploy</Button>
          <Typography>Deployed Contract address: {deployedContractAddress}</Typography>
        </Box>
      </Box>
    </>
  );
};

export default Extension;

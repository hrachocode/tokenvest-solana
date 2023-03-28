import dynamic from "next/dynamic";
import { useState } from "react";
import { Button } from "@mui/material";

const Extension = dynamic(() => import("../components/extension"), {
  ssr: false,
});

export default function Home() {
    const [showExtention, setShowExtention] = useState(false);
  return (
    <>
      <Button onClick={() => setShowExtention(true)}>Show Accounts</Button>
      {showExtention == true && <Extension/>}
    </>
  );
}

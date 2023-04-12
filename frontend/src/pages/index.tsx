import dynamic from "next/dynamic";
import { useState } from "react";
import { TvButton } from "@/components/TvButton/TvButton";

const Extension = dynamic(() => import("../components/extension"), {
  ssr: false,
});

export default function Home() {
  const [ showExtention, setShowExtention ] = useState(false);
  return (
    <>
      <TvButton onClick={() => setShowExtention(true)}>Show Accounts</TvButton>
      {showExtention == true && <Extension />}
    </>
  );
}

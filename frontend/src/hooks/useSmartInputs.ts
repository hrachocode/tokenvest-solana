import { useState } from "react";

export const useSmartInputs = () => {
  const [ name, setName ] = useState("");
  const [ projectName, setProjectName ] = useState("");
  const [ projectDescription, setProjectDescription ] = useState("");
  const [ contact, setContact ] = useState("");

  return {
    name,
    setName,
    projectName,
    setProjectName,
    projectDescription,
    setProjectDescription,
    contact,
    setContact,
  };
};

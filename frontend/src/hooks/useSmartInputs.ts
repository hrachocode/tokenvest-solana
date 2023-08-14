import { createNewChange, getLastChanges } from "@/components/CreateProduct/utils";
import { useEffect, useState } from "react";

export const useSmartInputs = () => {

  const [ name, setName ] = useState("");
  const [ description, setDescription ] = useState("");
  const [ raiseGoal, setRaiseGoal ] = useState("");
  const [ sharePercentage, setSharePercentage ] = useState("");
  const [ days, setDays ] = useState("");
  const [ category, setCategory ] = useState("");
  const [ editId, setEditId ] = useState(0);

  useEffect(() => {
    (async () => {
      const lastChanges = await getLastChanges();
      if (lastChanges) {
        setName(lastChanges.attributes.title);
        setDescription(lastChanges.attributes.description);
        setRaiseGoal(lastChanges.attributes.raiseGoal);
        setSharePercentage(lastChanges.attributes.sharePercentage);
        setDays(lastChanges.attributes.days);
        setCategory(lastChanges.attributes.category.data.id);
        setEditId(lastChanges.id);
      } else {
        const id = await createNewChange();
        if (id) {
          setEditId(id);
        }
      }
    })();
  }, []);

  return {
    name, setName,
    description, setDescription,
    raiseGoal, setRaiseGoal,
    sharePercentage, setSharePercentage,
    days, setDays,
    category, setCategory,
    editId
  };
};

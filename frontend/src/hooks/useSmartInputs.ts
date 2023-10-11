import {
  createNewChange,
  getLastChanges,
} from "@/components/CreateProduct/utils";
import { useEffect, useState } from "react";

export const useSmartInputs = () => {
  const [ name, setName ] = useState("");
  const [ description, setDescription ] = useState("");
  const [ raiseGoal, setRaiseGoal ] = useState("");
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
    name,
    setName,
    description,
    setDescription,
    raiseGoal,
    setRaiseGoal,
    days,
    setDays,
    category,
    setCategory,
    editId,
  };
};

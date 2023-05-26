import { createNewEdit, getLastChanges, getLocalChanges } from "@/components/CreateProduct/utils";
import { CATEGORY_KEY, DAYS_KEY, DESCRIPTION_KEY, EDIT_ID_KEY, RAISE_GOAL_KEY, SHARE_PERCENTAGE_KEY, TITLE_KEY } from "@/constants/general";
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
      const localChanges = getLocalChanges();
      if (localChanges.title) {
        setName(localChanges.title);
        setDescription(localChanges.description);
        setRaiseGoal(localChanges.raiseGoal);
        setSharePercentage(localChanges.sharePercentage);
        setDays(localChanges.days);
        setCategory(localChanges.category);
        setEditId(localChanges.editId);
      } else {
        const lastChanges = await getLastChanges();
        if (lastChanges) {
          localStorage.setItem(TITLE_KEY, lastChanges.attributes.title);
          setName(lastChanges.attributes.title);
          localStorage.setItem(DESCRIPTION_KEY, lastChanges.attributes.description);
          setDescription(lastChanges.attributes.description);
          localStorage.setItem(RAISE_GOAL_KEY, lastChanges.attributes.raiseGoal);
          setRaiseGoal(lastChanges.attributes.raiseGoal);
          localStorage.setItem(SHARE_PERCENTAGE_KEY, lastChanges.attributes.sharePercentage);
          setSharePercentage(lastChanges.attributes.sharePercentage);
          localStorage.setItem(DAYS_KEY, lastChanges.attributes.days);
          setDays(lastChanges.attributes.days);
          localStorage.setItem(CATEGORY_KEY, lastChanges.attributes.category.data.id);
          setCategory(lastChanges.attributes.category.data.id);
          localStorage.setItem(EDIT_ID_KEY, lastChanges.id);
          setEditId(lastChanges.id);
        } else {
          const id = await createNewEdit();
          if (id) {
            localStorage.setItem(EDIT_ID_KEY, id);
            setEditId(id);
          }
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

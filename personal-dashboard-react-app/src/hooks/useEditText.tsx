import { ObjectId } from "@schemas/data";
import { ChangeEvent, useRef, useState } from "react";

export function useEditText(
  itemId: ObjectId,
  onBlur: (updatedName?: string) => void
) {
  const [selectedName, setSelectedName] = useState<ObjectId>();
  const [updatedName, setUpdatedName] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setUpdatedName(e.target.value);

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      inputRef.current?.blur();
    }
  };

  const onInputBlur = () => {
    setSelectedName(undefined);
    if (updatedName) {
      onBlur(updatedName);
    }
  };

  const onTextElementClick = () => setSelectedName(itemId);

  const shouldShowInput = selectedName === itemId;

  return {
    updatedName,
    shouldShowInput,
    inputRef,
    onInputChange,
    onInputKeyDown,
    onInputBlur,
    onTextElementClick,
  };
}

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Dispatch, SetStateAction, useState } from "react";
import { Button, Input, InputSectionRow } from "../../shared";
import { Goal } from "@schemas/data";
import { addItem } from "../../api";

function GoalsInput({
  setGoals,
}: {
  setGoals: Dispatch<SetStateAction<Goal[]>>;
}) {
  const [newGoal, setNewGoal] = useState<Pick<Goal, "name" | "href">>({
    name: "",
  });

  return (
    <InputSectionRow>
      <Input
        value={newGoal.name}
        name="goal"
        type="text"
        placeholder="Enter a goal..."
        onChange={(e) => {
          setNewGoal({ ...newGoal, name: e.target.value });
        }}
        css={css`
          width: 180px;
        `}
      />
      <Input
        value={newGoal.href ?? undefined}
        name="href"
        type="text"
        placeholder="(Optional) Enter a link..."
        onChange={(e) => {
          setNewGoal({ ...newGoal, href: e.target.value });
        }}
        css={css`
          width: 180px;
        `}
      />
      <Button
        onClick={() => {
          addItem<Goal>("goals", {
            ...newGoal,
            starred: false,
            progress: 0,
          }).then((response) => {
            if (response.success) {
              setGoals((prevGoals) => [...prevGoals, response.payload]);
            }
          });
          setNewGoal({ name: "", href: undefined });
        }}
      >
        Add new
      </Button>
    </InputSectionRow>
  );
}

export default GoalsInput;

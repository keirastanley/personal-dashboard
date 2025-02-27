/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Dispatch, SetStateAction, useState } from "react";
import { Button, InputSectionRow } from "../../shared";
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
      <input
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
      <input
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
            console.log({ response });
            if (response.success) {
              setGoals((prevGoals) => [...prevGoals, response.payload]);
            }
          });
        }}
      >
        Add new
      </Button>
    </InputSectionRow>
  );
}

export default GoalsInput;

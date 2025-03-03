/** @jsxImportSource @emotion/react */
import { Dispatch, SetStateAction, useState } from "react";
import { Idea } from "@schemas/data";
import { Button, Input, InputSectionColumn } from "../../shared";
import { addItem } from "../../api";

export default function IdeasInput({
  setIdeas,
}: {
  setIdeas: Dispatch<SetStateAction<Idea[]>>;
}) {
  const [newIdea, setNewIdea] = useState<Pick<Idea, "name" | "href">>({
    name: "",
  });

  return (
    <InputSectionColumn>
      <Input
        value={newIdea.name}
        name="idea-text-input"
        placeholder="Enter an idea..."
        onChange={(e) => {
          setNewIdea({ ...newIdea, name: e.target.value as string });
        }}
      />
      <Input
        value={newIdea.href ?? ""}
        name={"idea-link-input"}
        placeholder="(Optional) Enter a link"
        onChange={(e) => {
          setNewIdea({ ...newIdea, href: e.target.value as string });
        }}
      />
      <Button
        onClick={() => {
          addItem<Idea>("ideas", newIdea).then((response) => {
            if (response.success) {
              setIdeas((prevIdeas) => [...prevIdeas, response.payload]);
            }
          });
          setNewIdea({ name: "", href: undefined });
        }}
      >
        Add new
      </Button>
    </InputSectionColumn>
  );
}

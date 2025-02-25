/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { Idea } from "personal-dashboard-schemas/data";
import { Button, InputColumn, InputSectionColumn } from "../../shared";

export default function IdeasInput({
  ideas,
  setIdeas,
}: {
  ideas: Idea[];
  setIdeas: (ideas: Idea[]) => void;
}) {
  const [newIdea, setNewIdea] = useState<Idea>({ name: "" });

  return (
    <InputSectionColumn>
      <InputColumn
        value={newIdea.name}
        name="idea-text-input"
        placeholder="Enter an idea..."
        onChange={(e) => {
          setNewIdea({ ...newIdea, name: e.target.value as string });
        }}
      />
      <InputColumn
        value={newIdea.href ?? ""}
        name={"idea-link-input"}
        placeholder="(Optional) Enter a link"
        onChange={(e) => {
          setNewIdea({ ...newIdea, href: e.target.value as string });
        }}
      />
      <Button
        onClick={() => {
          setIdeas([...ideas, newIdea]);
          setNewIdea({ name: "" });
        }}
      >
        Add new
      </Button>
    </InputSectionColumn>
  );
}

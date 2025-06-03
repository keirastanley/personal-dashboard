/** @jsxImportSource @emotion/react */
import { DeleteIcon, PlusIcon, MinusIcon } from "../../icons";
import { Goal } from "@schemas/data";
import styled from "@emotion/styled";
import { Dispatch, HTMLAttributes, SetStateAction } from "react";
import {
  EditableLinkInput,
  IconButton,
  ListItem,
  ListItemLeft,
  ListItemRight,
  ListItemsContainer,
  StarIcon,
} from "../../shared";
import { deleteItem, editItem } from "../../api";

const ProgressBar = styled.div`
  width: 70%;
  background-color: #b0b0b0;
`;

const progressColors = {
  0: "#f97575",
  10: "#f98b75",
  20: "#f9a375",
  30: "#f9ae75",
  40: "#f9cd75",
  50: "#f9e975",
  60: "#e1f975",
  70: "#d6f975",
  80: "#98f975",
  90: "#82f975",
  100: "#75f979",
};

const getProgressColor = (progress: Goal["progress"]) => {
  let color = progressColors[0];
  Object.keys(progressColors).map((key) => {
    const progressColorKey = Number(key) as keyof typeof progressColors;
    if (progress >= progressColorKey) {
      color = progressColors[progressColorKey];
    }
  });
  return color;
};

type ProgressProps = HTMLAttributes<HTMLDivElement> & { progress: number };

const Progress = styled.div`
  height: 100%;
  width: ${({ progress }: ProgressProps) => progress}%;
  background-color: ${({ progress }: ProgressProps) =>
    getProgressColor(progress)};
`;

function GoalsList({
  goals,
  setGoals,
  isEditing,
}: {
  goals: Goal[];
  setGoals: Dispatch<SetStateAction<Goal[]>>;
  isEditing: boolean;
}) {
  return (
    <ListItemsContainer>
      {goals.map((goal, i) => (
        <ListItem key={goal._id.toString()}>
          <ListItemLeft width="50%">
            <IconButton
              onClick={() => {
                editItem<Goal>("goals", goal._id, {
                  starred: !goal.starred,
                }).then((response) => {
                  if (response.success) {
                    setGoals((prevGoals) => [
                      ...prevGoals.slice(0, i),
                      response.payload,
                      ...prevGoals.slice(i + 1),
                    ]);
                  }
                });
              }}
            >
              <StarIcon starred={goal.starred} />
            </IconButton>
            <EditableLinkInput
              isEditing={isEditing}
              displayText={goal.name}
              onDisplayTextBlur={(updatedName?: string) => {
                if (updatedName) {
                  editItem<Goal>("goals", goal._id, {
                    name: updatedName,
                  }).then((response) => {
                    if (response.success) {
                      setGoals((prevGoals) => [
                        ...prevGoals.slice(0, i),
                        response.payload,
                        ...prevGoals.slice(i + 1),
                      ]);
                    }
                  });
                }
              }}
              href={goal.href}
              onHrefBlur={(updatedHref?: string) => {
                if (updatedHref) {
                  editItem<Goal>("goals", goal._id, {
                    href: updatedHref,
                  }).then((response) => {
                    if (response.success) {
                      setGoals((prevGoals) => [
                        ...prevGoals.slice(0, i),
                        response.payload,
                        ...prevGoals.slice(i + 1),
                      ]);
                    }
                  });
                }
              }}
            />
          </ListItemLeft>
          <ListItemRight width="80%">
            <ProgressBar>
              <Progress progress={goal.progress} />
            </ProgressBar>
            <IconButton
              onClick={() => {
                editItem<Goal>("goals", goal._id, {
                  progress: goal.progress + 5 < 100 ? goal.progress + 5 : 100,
                }).then((response) => {
                  if (response.success) {
                    setGoals((prevGoals) => [
                      ...prevGoals.slice(0, i),
                      response.payload,
                      ...prevGoals.slice(i + 1),
                    ]);
                  }
                });
              }}
            >
              <PlusIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                editItem<Goal>("goals", goal._id, {
                  progress: goal.progress - 5 > 0 ? goal.progress - 5 : 0,
                }).then((response) => {
                  if (response.success) {
                    setGoals((prevGoals) => [
                      ...prevGoals.slice(0, i),
                      response.payload,
                      ...prevGoals.slice(i + 1),
                    ]);
                  }
                });
              }}
            >
              <MinusIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                if (window.confirm(`Do you want to delete '${goal.name}'?`)) {
                  deleteItem("goals", goal._id).then((response) => {
                    if (response.success) {
                      setGoals((prevGoals) =>
                        prevGoals.filter(({ _id }) => _id !== goal._id)
                      );
                    }
                  });
                }
              }}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemRight>
        </ListItem>
      ))}
    </ListItemsContainer>
  );
}

export default GoalsList;

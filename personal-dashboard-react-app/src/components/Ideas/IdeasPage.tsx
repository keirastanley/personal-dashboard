/** @jsxImportSource @emotion/react */
import { SetStateAction, useEffect, useState } from "react";
import {
  EditableLinkInput,
  Heading3,
  IconButton,
  InnerBox,
  InputSectionRow,
  ListItem,
  ListItemLeft,
  ListItemRight,
  ListItemsContainer,
  MainContainer,
  TopSection,
} from "../shared";
import IdeasInput from "./Ideas Input";
import { Idea } from "@schemas/data";
import { css } from "@emotion/react";
import { deleteItem, editItem, getItems } from "../api";
import { DeleteIcon } from "../icons";

export const IdeasPage = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);

  useEffect(() => {
    getItems<Idea[]>("ideas").then((response) => {
      if (response.success) {
        setIdeas(response.payload);
      }
    });
  }, []);

  return (
    <MainContainer
      color="#dad1d4"
      css={css`
        align-items: center;
        height: 100vh;
      `}
    >
      <TopSection>
        <Heading3>Something to do...</Heading3>
      </TopSection>
      <InputSectionRow>
        <IdeasInput setIdeas={setIdeas} />
      </InputSectionRow>
      <InnerBox
        color="white"
        css={css`
          width: 60%;
          margin-top: 10px;
        `}
      >
        <ListItemsContainer
        // css={css`
        //   background-color: white;
        //   width: 60%;
        // `}
        >
          {ideas.map(({ _id, href, name }, i) => (
            <ListItem key={_id.toString()}>
              <ListItemLeft>
                <EditableLinkInput
                  displayText={name}
                  onDisplayTextBlur={(updatedName?: string) => {
                    if (updatedName) {
                      editItem<Idea>("ideas", _id, {
                        name: updatedName,
                      }).then((response) => {
                        if (response.success) {
                          setIdeas((prevIdeas) => [
                            ...prevIdeas.slice(0, i),
                            response.payload,
                            ...prevIdeas.slice(i + 1),
                          ]);
                        }
                      });
                    }
                  }}
                  href={href}
                  onHrefBlur={(updatedHref?: string) => {
                    if (updatedHref) {
                      editItem<Idea>("ideas", _id, {
                        href: updatedHref,
                      }).then((response) => {
                        if (response.success) {
                          setIdeas((prevIdeas) => [
                            ...prevIdeas.slice(0, i),
                            response.payload,
                            ...prevIdeas.slice(i + 1),
                          ]);
                        }
                      });
                    }
                  }}
                />
              </ListItemLeft>
              <ListItemRight width="80%">
                <IconButton
                  onClick={() => {
                    if (window.confirm(`Do you want to delete '${name}'?`)) {
                      deleteItem("goals", _id).then((response) => {
                        if (response.success) {
                          setIdeas((prevIdeas) =>
                            prevIdeas.filter((prevIdea) => prevIdea._id !== _id)
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
      </InnerBox>
    </MainContainer>
  );
};

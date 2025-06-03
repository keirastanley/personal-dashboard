/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  ControlsContainer,
  Dialog,
  IconButton,
  Label,
  ListItemLeft,
  ListItemRight,
} from "../shared";
import { useState } from "react";
import { DropdownIcon, OpenIcon, EditIcon } from "../icons";
import { isLogEntry } from "./Diary";
import { MediaType, ObjectId } from "@schemas/data";
import { useDiaryEntries } from "./DiaryEntriesProvider";

export const DiaryList = () => {
  const { entries, filterBy } = useDiaryEntries();
  const [showMoreId, setShowMoreId] = useState<ObjectId>();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  if (!entries || entries.length < 1) {
    return null;
  }

  const getLabelColor = (mediaType?: MediaType) => {
    const textColor = "#c4e1f5";
    if (!mediaType) {
      return textColor;
    }
    if (mediaType === MediaType.book) {
      return "#f5eac4";
    }
    return "#f5c4df";
  };

  return (
    <div>
      <Dialog open={modalIsOpen} width="80%" height="80%">
        <div>
          <textarea
            css={css`
              width: 80%;
            `}
          ></textarea>
        </div>
      </Dialog>
      <ul
        css={css`
          display: flex;
          flex-direction: column;
          gap: 10px;
          overflow-y: auto;
          margin: 0;
          padding: 0;
        `}
      >
        {entries
          .filter((entry) => {
            if (filterBy) {
              if (isLogEntry(entry)) {
                return filterBy === entry.mediaType;
              }
              return filterBy === "text";
            }
            return true;
          })
          .map((entry) => (
            <li
              css={css`
                display: flex;
                flex-direction: column;
                background-color: white;
                font-size: 12px;
                gap: 5px;
                padding: 5px;
              `}
            >
              <div
                css={css`
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  gap: 5px;
                `}
              >
                <ListItemLeft width="70%">
                  <Label color={getLabelColor(entry.mediaType)}>
                    {isLogEntry(entry)
                      ? entry.mediaType.slice(0, 1).toUpperCase() +
                        entry.mediaType.slice(1)
                      : "Text"}
                  </Label>
                  <span>
                    {entry.title.length > 25
                      ? `${entry.title.slice(0, 25)}...`
                      : entry.title}
                  </span>
                </ListItemLeft>
                <ListItemRight width="30%">
                  <span>{entry.date.split("-").reverse().join("/")}</span>
                  <IconButton
                    onClick={() =>
                      showMoreId === entry._id
                        ? setShowMoreId(undefined)
                        : setShowMoreId(entry._id)
                    }
                  >
                    <DropdownIcon />
                  </IconButton>
                </ListItemRight>
              </div>
              {showMoreId === entry._id && (
                <div
                  css={css`
                    display: flex;
                    max-height: 100px;
                  `}
                >
                  {entry.src && (
                    <img
                      src={entry.src}
                      css={css`
                        width: 60px;
                        margin: 10px;
                      `}
                    />
                  )}
                  <span
                    css={css`
                      padding: 10px;
                      max-height: calc(100px - 20px);
                      overflow-y: auto;
                    `}
                  >
                    {entry.text}
                  </span>
                  <div
                    css={css`
                      position: absolute;
                      left: 70%;
                    `}
                  >
                    {!modalIsOpen && (
                      <ControlsContainer>
                        <IconButton
                          onClick={() => {
                            setModalIsOpen(true);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                        // onClick={() => {
                        //   setModalIsOpen(true);
                        // }}
                        >
                          <OpenIcon />
                        </IconButton>
                      </ControlsContainer>
                    )}
                  </div>
                </div>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

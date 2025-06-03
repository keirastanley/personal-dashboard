/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button, ControlsContainer, Input, InputSectionRow } from "../shared";
import { isLogEntry } from "./Diary";
import { MediaType } from "@schemas/data";
import { useDiaryEntries } from "./DiaryEntriesProvider";
import { SelectsWrapper } from "./diaryShared";

export const EntryDetailsForm = () => {
  const { entry, setEntry, onSubmit, setIsAddingNewEntry } = useDiaryEntries();

  if (!entry) {
    return null;
  }

  return (
    <>
      <SelectsWrapper>
        <InputSectionRow>
          <Input
            placeholder={isLogEntry(entry) ? "Title" : "Title (optional)"}
            onChange={(e) => setEntry({ ...entry, title: e.target.value })}
            css={css`
              width: 150px;
            `}
          />
          {isLogEntry(entry) && entry.mediaType === MediaType.book && (
            <Input
              placeholder="Author"
              onChange={(e) => setEntry({ ...entry, author: e.target.value })}
              css={css`
                width: 150px;
              `}
            />
          )}
        </InputSectionRow>
        {isLogEntry(entry) && (
          <Input
            placeholder="Release year"
            type="number"
            min="1900"
            max={new Date().getFullYear()}
            step="1"
            onChange={(e) => setEntry({ ...entry, year: e.target.value })}
            css={css`
              width: 100px;
            `}
          />
        )}
      </SelectsWrapper>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          height: calc(100% - 75px);
          width: calc(100% - 25px);
          margin: 0px 10px 10px 10px;
        `}
      >
        <div
          css={css`
            width: 100%;
            height: 100%;
          `}
        >
          <input
            defaultValue={new Date()
              .toLocaleDateString()
              .split("/")
              .reverse()
              .join("-")}
            type="date"
            onChange={(e) => setEntry({ ...entry, date: e.target.value })}
            css={css`
              margin: 5px;
              width: 105px;
              position: absolute;
            `}
          />
          <textarea
            onChange={(e) => {
              const text = e.target.value;
              if (entry.title) {
                setEntry({ ...entry, text });
              } else {
                setEntry({
                  ...entry,
                  text,
                  title: `${text.slice(0, 25)}...`,
                });
              }
            }}
            css={css`
              height: calc(100% - 40px);
              width: calc(100% - 5px);
              padding-top: 30px;
            `}
          />
        </div>
        <ControlsContainer>
          <Button onClick={onSubmit}>Add</Button>
          <Button onClick={() => setIsAddingNewEntry(false)}>Cancel</Button>
        </ControlsContainer>
      </div>
    </>
  );
};

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Select } from "../shared";
import { EntryType, MediaType } from "@schemas/data";
import { isLogEntry } from "./Diary";
import { useDiaryEntries } from "./DiaryEntriesProvider";
import { SelectsWrapper } from "./diaryShared";

export const NewEntryInputs = () => {
  const { entry, handleTypeChange, handleMediaTypeChange } = useDiaryEntries();

  return (
    <SelectsWrapper>
      <Select onChange={handleTypeChange} value={entry?.type}>
        <option>Entry type</option>
        <option value={EntryType.free}>Free text</option>
        <option value={EntryType.log}>Log / Review</option>
      </Select>
      {entry && isLogEntry(entry) && (
        <Select onChange={handleMediaTypeChange} value={entry?.mediaType}>
          <option>Media type</option>
          <option value={MediaType.film}>Film</option>
          <option value={MediaType.book}>Book</option>
        </Select>
      )}
    </SelectsWrapper>
  );
};

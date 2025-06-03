/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { DiaryList } from "./DiaryList";
import { NewEntryInputs } from "./NewEntryInputs";
import { useDiaryEntries } from "./DiaryEntriesProvider";
import { EntryDetailsForm } from "./EntryDetailsForm";
import { Button, Dialog, Heading3, MainContainer, TopSection } from "../shared";
import { FilterDropdown } from "./FilterDropdown";

export const DiaryPage = () => {
  const { setIsAddingNewEntry } = useDiaryEntries();

  return (
    <MainContainer
      css={css`
        align-items: center;
        padding: 10px;
      `}
    >
      <Heading3>Diary</Heading3>
      <TopSection
        css={css`
          width: 80%;
          align-items: center;
        `}
      >
        <FilterDropdown />
        <Button onClick={() => setIsAddingNewEntry(true)}>New entry</Button>
      </TopSection>
      <Dialog>
        <div
          css={css`
            display: flex;
            justify-content: space-between;
          `}
        >
          <NewEntryInputs />
          <Button onClick={() => setIsAddingNewEntry(false)}>Close</Button>
        </div>
        <EntryDetailsForm />
      </Dialog>
      <div
        css={css`
          width: 50%;
        `}
      >
        <DiaryList />
      </div>
    </MainContainer>
  );
};

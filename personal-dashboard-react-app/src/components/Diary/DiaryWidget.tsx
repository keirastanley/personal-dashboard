/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  Button,
  Heading3,
  InnerBox,
  MainContainer,
  TopSection,
} from "../shared";
import { useEffect, useState } from "react";
import demoEntries from "./demo-entries.json";
import { NewEntryInputs } from "./NewEntryInputs";
import { EntryDetailsForm } from "./EntryDetailsForm";
import { DiaryList } from "./DiaryList";
import { useDiaryEntries } from "./DiaryEntriesProvider";
import { DiaryEntry } from "@schemas/data";
import { FilterDropdown } from "./FilterDropdown";

export const DiaryWidget = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    setEntries(demoEntries as any as DiaryEntry[]);
  }, []);

  const { entry, isAddingNewEntry, setIsAddingNewEntry } = useDiaryEntries();

  return (
    <MainContainer color="#d3d9d0">
      <TopSection>
        <Heading3>Diary</Heading3>
        {!isAddingNewEntry ? (
          <Button onClick={() => setIsAddingNewEntry(true)}>Add new</Button>
        ) : (
          <NewEntryInputs />
        )}
      </TopSection>
      {isAddingNewEntry && entry && <EntryDetailsForm />}
      {!isAddingNewEntry && (
        <div>
          <div
            css={css`
              padding-left: 10px;
              padding-right: 10px;
              margin-bottom: 10px;
            `}
          >
            <FilterDropdown />
          </div>
          <InnerBox>
            {entries.length > 0 ? (
              <DiaryList />
            ) : (
              <i> Write something to remember</i>
            )}
          </InnerBox>
        </div>
      )}
    </MainContainer>
  );
};

import { DiaryPage } from "./DiaryPage";
import { DiaryWidget } from "./DiaryWidget";
import { DiaryEntriesContextProvider } from "./DiaryEntriesProvider";
import {
  DiaryEntry,
  EntryType,
  LogEntry,
  WithId,
  WithoutId,
} from "@schemas/data";

export const isLogEntry = (
  entry: WithoutId<DiaryEntry>
): entry is WithId<LogEntry> => !!(entry.type && entry.type === EntryType.log);

export const Diary = ({ asWidget }: { asWidget?: boolean }) => (
  <DiaryEntriesContextProvider>
    {asWidget ? <DiaryWidget /> : <DiaryPage />}
  </DiaryEntriesContextProvider>
);

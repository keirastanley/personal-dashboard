import { ChangeEvent, useEffect, useState } from "react";
import { Goal, Item, Priority, Status, Task } from "../../schemas/data";

export type OrderBy = string;

export function useOrderBy<ArrType extends Item>(
  items: ArrType[],
  setItems: (items: ArrType[]) => void
) {
  const [orderBy, setOrderBy] = useState<string>();
  const [isAscending, setIsAscending] = useState<boolean>(true);

  const onOrderByChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      setOrderBy(e.target.value);
      setIsAscending(true);
    }
  };

  const onAscendingClick = () => {
    if (orderBy) {
      setIsAscending(true);
    }
  };

  const onDescendingClick = () => {
    if (orderBy) {
      setIsAscending(false);
    }
  };

  useEffect(() => {
    console.log("HERE");
    const reorderedItems = getReorderedItems<ArrType>(
      items,
      orderBy,
      isAscending
    );
    setItems([...reorderedItems]);
  }, [orderBy, isAscending]);

  return {
    orderBy,
    isAscending,
    onOrderByChange,
    onAscendingClick,
    onDescendingClick,
  };
}

function getReorderedItems<ArrType extends Item>(
  items: ArrType[],
  orderBy?: OrderBy,
  isAscending = true
) {
  let orderedItems = items;
  if (orderBy === "name") {
    orderedItems = [
      ...items.sort((a, b) =>
        (isAscending ? a : b).name > (isAscending ? b : a).name
          ? 1
          : (isAscending ? b : a).name > (isAscending ? a : b).name
          ? -1
          : 0
      ),
    ];
  }
  if (orderBy === "deadline") {
    orderedItems = (items as Task[]).sort(
      (a, b) =>
        new Date((isAscending ? b : a).deadline).getTime() -
        new Date((isAscending ? a : b).deadline).getTime()
    ) as ArrType[];
  }
  if (orderBy === "priority") {
    orderedItems = [
      ...(items as Task[]).filter(
        ({ priority }) =>
          priority === (isAscending ? Priority.low : Priority.high)
      ),
      ...(items as Task[]).filter(
        ({ priority }) => priority === Priority.medium
      ),
      ...(items as Task[]).filter(
        ({ priority }) =>
          priority === (isAscending ? Priority.high : Priority.low)
      ),
    ] as ArrType[];
  }

  if (orderBy === "progress") {
    orderedItems = (items as Goal[]).sort(
      (a, b) => (isAscending ? b : a).progress - (isAscending ? a : b).progress
    ) as ArrType[];
  }

  if (orderBy === "starred") {
    orderedItems = [
      ...((items as Goal[]).filter((item) =>
        item.starred === isAscending ? true : false
      ) as ArrType[]),
      ...((items as Goal[]).filter((item) =>
        item.starred === isAscending ? false : true
      ) as ArrType[]),
    ];
  }

  if (orderBy === "status") {
    orderedItems = [
      ...(items as Task[]).filter(
        ({ status }) =>
          status === (isAscending ? Status.notStarted : Status.completed)
      ),
      ...(items as Task[]).filter(({ status }) => status === Status.inProgress),
      ...(items as Task[]).filter(
        ({ status }) =>
          status === (isAscending ? Status.completed : Status.notStarted)
      ),
    ] as ArrType[];
  }

  return orderedItems;
}

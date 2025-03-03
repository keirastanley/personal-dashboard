/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { CircleIcon, ExclamationIcon } from "../../icons";
import { Priority, Task } from "../../../../../schemas/src/data";

export default function PriorityIcon({
  priority,
}: {
  priority?: Task["priority"];
}) {
  switch (priority) {
    case Priority.low:
      return (
        <CircleIcon
          css={css`
            font-size: 10px;
            color: white;
            stroke: #818181;
            stroke-width: 30px;
          `}
        />
      );
    case Priority.medium:
      return (
        <CircleIcon
          css={css`
            font-size: 10px;
            color: #ffb265;
          `}
        />
      );
    case Priority.high:
      return (
        <ExclamationIcon
          css={css`
            font-size: 10px;
            color: red;
            justify-self: flex-start;
            width: 10px;
          `}
        />
      );
    default:
      return null;
  }
}

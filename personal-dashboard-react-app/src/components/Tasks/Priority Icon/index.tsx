/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FaCircle, FaExclamation } from "react-icons/fa";
import { Priority, Task } from "../../../../../schemas/src/data";

export default function PriorityIcon({
  priority,
}: {
  priority?: Task["priority"];
}) {
  switch (priority) {
    case Priority.low:
      return (
        <FaCircle
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
        <FaCircle
          css={css`
            font-size: 10px;
            color: #ffb265;
          `}
        />
      );
    case Priority.high:
      return (
        <FaExclamation
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

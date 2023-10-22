import { MouseEventHandler, useState } from "react";

import DatePicker from "react-date-picker";

import { dateDiffInDays } from "../../utils/utils";

import { Todo } from "../../types/todo-list";

import "../../styles/todo-list/deadline.css";

interface Deadline {
  value: Todo["deadline"];
  onChange: (value: Todo["deadline"]) => void;
}

const getDeadlineStatusColor = (dateDiff: number) => {
  if (dateDiff === null) return "";
  if (dateDiff <= 1) return "has-background-danger";
  if (dateDiff > 1 && dateDiff <= 3) return "has-background-warning";
  return "has-background-primary";
};

const getDeadlineStatusTitle = (dateDiff: number) => {
  if (dateDiff < 0)
    return `past ${Math.abs(dateDiff)} ${dateDiff === -1 ? "day" : "days"}`;
  if (dateDiff === 0) return "deadline today";
  return `${dateDiff} ${dateDiff === 1 ? "day" : "days"} left`;
};

export const Deadline = ({ value, onChange }: Deadline) => {
  const [isOpen, setIsOpen] = useState(false);

  let dateDifference = null;
  if (value) dateDifference = dateDiffInDays(new Date(), new Date(value));
  const deadlineStatusColor = getDeadlineStatusColor(dateDifference);
  const deadlineStatusTitle = getDeadlineStatusTitle(dateDifference);

  const onDateChange = (value: any) => {
    let val = value;
    if (typeof value === "object") val = value.toString();
    onChange(val);
  };

  const openCalendar = () => setIsOpen(true);
  const closeCalendar = () => {
    setIsOpen(false);
  };

  const onIconClick: MouseEventHandler<HTMLElement> = (e) => {
    e.stopPropagation();
    openCalendar();
  };

  return (
    <span className="is-flex is-align-items-center is-justify-content-center">
      <i
        onClick={onIconClick}
        className="fa-solid fa-clock has-text-primary is-flex is-align-items-center tl_todo-item-deadline-icon"
      />
      <DatePicker
        onCalendarClose={closeCalendar}
        onChange={onDateChange}
        isOpen={isOpen}
        value={value}
      />
      {dateDifference !== null && (
        <i
          title={deadlineStatusTitle}
          className={`tl_todo-item-deadline-status ml-2 ${deadlineStatusColor}`}
        />
      )}
    </span>
  );
};

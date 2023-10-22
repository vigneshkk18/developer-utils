type Checkbox = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "type"
>;

export const Checkbox = ({ className, onChange, ...props }: Checkbox) => {
  const onCheckboxClick = (e: any) => {
    onChange({ ...e, target: { ...e.target, checked: !props.checked } });
  };

  return (
    <>
      <input {...props} className="is-hidden" readOnly type="hidden" />
      <span
        aria-checked={props.checked}
        onClick={onCheckboxClick}
        className={`du_checkbox ${className || ""}`}
      >
        {props.checked && <i className="fa-solid fa-check fa-sm" />}
      </span>
    </>
  );
};

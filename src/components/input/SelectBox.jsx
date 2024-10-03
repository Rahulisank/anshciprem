import { Select, SelectGroup, SelectTrigger, SelectValue } from "../ui/select";

const SelectBox = (props) => {
  const { children, value } = props;

  console.log(value);

  return (
    <Select className={`bg-blue-gray ${props?.className}`} {...props}>
      <SelectTrigger className="rounded-xl border-none bg-blue-gray px-4 py-7 text-sm text-white outline-none ring-0 focus:shadow-none focus:ring-blue-gray focus:ring-offset-0 md:text-base">
        {value ? (
          <SelectValue />
        ) : (
          <span className="text-white">{props.placeholder}</span>
        )}
      </SelectTrigger>
      <SelectGroup className={props.optionclass}>{children}</SelectGroup>
    </Select>
  );
};

export default SelectBox;

import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

const CustomInput = (props) => {
  return (
    <Input
      {...props}
      className={cn(
        "rounded-xl border-none bg-blue-gray px-4 py-7 text-sm text-white placeholder:text-[#a1a1aa] md:text-base " +
          props.className,
      )}
    />
  );
};

export default CustomInput;

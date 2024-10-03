import { cn } from "@/lib/utils";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

const FormInput = (props) => {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <Input
            {...field}
            type={props?.type ? props?.type : "text"}
            placeholder={props.placeholder}
            className={cn(
              "rounded-xl border-none bg-blue-gray px-4 py-7 text-sm text-white placeholder:text-[#a1a1aa] md:text-base " +
                props.className,
            )}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export default FormInput;

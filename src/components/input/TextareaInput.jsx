import { cn } from "@/lib/utils";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Textarea } from "../ui/textarea";

const TextareaInput = (props) => {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Textarea
              placeholder={"Text"}
              rows={8}
              className={cn(
                "rounded-xl border-none bg-blue-gray px-4 py-4 text-sm text-white placeholder:text-[#a1a1aa] md:text-base " +
                  props.className,
              )}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export default TextareaInput;

import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const CTAButton = ({ onClick, children, extra, disabled }) => {
  return (
    <Button
      variant="default"
      className={cn(
        "rounded-full bg-shiny-blue text-dark-slate hover:bg-[#21ffdb] lg:text-sm xl:text-[15px] 2xl:text-base 4xl:text-lg " +
          extra,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default CTAButton;

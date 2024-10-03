import { PopoverContent } from "../ui/popover";
import { X } from "lucide-react";
import { NotificationCard } from "..";
import { PopoverClose } from "@radix-ui/react-popover";
import { ScrollArea } from "../ui/scroll-area";

const Notificaton = () => {
  return (
    <PopoverContent className="pointer-events-none relative right-3 top-5 hidden w-[440px] overflow-hidden rounded-xl border-none bg-slate-gray p-0 shadow-md shadow-black xl:pointer-events-auto xl:block">
      <div className="border-b-[2px] border-[#2D2D32]">
        <div className="flex items-center justify-between px-5 py-5">
          <h2 className="text-base text-white 2xl:text-lg">Notifications</h2>
          <PopoverClose asChild>
            <p className="mt-0 max-w-min cursor-pointer justify-end border-none bg-slate-gray p-0 !text-white hover:bg-transparent">
              <X />
            </p>
          </PopoverClose>
        </div>
      </div>
      <div className="flex flex-col">
        <ScrollArea className="h-[50vh]">
          {new Array(9).fill(true).map((_, i) => (
            <NotificationCard key={i} />
          ))}
        </ScrollArea>
      </div>
    </PopoverContent>
  );
};

export default Notificaton;

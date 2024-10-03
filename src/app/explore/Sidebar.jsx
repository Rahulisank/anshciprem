import { useEffect } from "react";

import { X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const Sidebar = (props) => {
  const { openDrawer, setOpenDrawer, children } = props;

  useEffect(() => {
    if (openDrawer) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }

    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, [openDrawer]);

  return (
    <aside
      className={`absolute bottom-0 left-0 top-0 z-30 h-screen w-full pb-10 transition-all duration-300 md:w-3/5 lg:w-1/2 xl:w-full ${openDrawer ? "translate-x-0" : "-translate-x-full"} bg-dark-slate text-white xl:relative xl:z-0 xl:translate-x-0`}
    >
      <div
        onClick={() => setOpenDrawer(false)}
        className="relative right-5 top-2 flex cursor-pointer justify-end bg-dark-slate py-2 text-white xl:hidden"
      >
        <X />
      </div>
      <div className="mb-5 flex flex-col gap-y-0 xl:gap-y-6 2xl:mb-7 3xl:gap-y-8 4xl:top-36">
        <ScrollArea className="h-screen p-0 pb-24 xl:h-full xl:pb-0">
          {children}
        </ScrollArea>
      </div>
    </aside>
  );
};

export default Sidebar;

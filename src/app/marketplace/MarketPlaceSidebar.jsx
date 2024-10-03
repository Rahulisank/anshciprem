import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import Image from "next/image";
import { ASSETS } from "@/assets";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

const MarketPlaceSidebar = ({ drawer, setDrawer }) => {
  return (
    <aside
      className={`absolute left-0 top-0 z-10 h-screen w-full overflow-auto transition-all md:overflow-y-hidden ${drawer ? "translate-x-0" : "-translate-x-full"} md:min-h-auto bg-dark-slate p-5 md:relative md:z-0 md:translate-x-0 md:p-0`}
    >
      <div
        onClick={() => setDrawer(false)}
        className="flex cursor-default justify-end text-white md:hidden"
      >
        <X />
      </div>
      <Accordion defaultValue={["item-1", "item-2", "item-3"]} type="multiple">
        <AccordionItem open value="item-1" className={cn("border-[#2D2D32]")}>
          <AccordionTrigger
            className={cn("mb-0 text-white hover:no-underline")}
          >
            Blockchain
          </AccordionTrigger>
          <AccordionContent className={cn("mt-3 3xl:mt-4")}>
            <ul className="flex flex-col gap-y-5">
              <li className="flex cursor-pointer items-center gap-2 text-[15px] text-white hover:font-semibold">
                <span className="w-4">
                  <Image
                    src={ASSETS.POLYGOM}
                    alt="Camera"
                    className="w-full rounded-xl object-cover"
                  />
                </span>
                <span>All</span>
              </li>
              <li className="flex cursor-pointer items-center gap-2 text-[15px] text-white hover:font-semibold">
                <span className="w-4">
                  <Image
                    src={ASSETS.POLYGOM}
                    alt="Camera"
                    className="w-full rounded-xl object-cover"
                  />
                </span>
                <span>Ethereum</span>
              </li>
              <li className="flex cursor-pointer items-center gap-2 text-[15px] text-white hover:font-semibold">
                <span className="w-4">
                  <Image
                    src={ASSETS.POLYGOM}
                    alt="Camera"
                    className="w-full rounded-xl object-cover"
                  />
                </span>
                <span>Polygon</span>
              </li>
              <li className="flex cursor-pointer items-center gap-2 text-[15px] text-white hover:font-semibold">
                <span className="w-4">
                  <Image
                    src={ASSETS.POLYGOM}
                    alt="Camera"
                    className="w-full rounded-xl object-cover"
                  />
                </span>
                <span>Optimism</span>
              </li>
              <li className="flex cursor-pointer items-center gap-2 text-[15px] text-white hover:font-semibold">
                <span className="w-4">
                  <Image
                    src={ASSETS.POLYGOM}
                    alt="Camera"
                    className="w-full rounded-xl object-cover"
                  />
                </span>
                <span>BNB Chain</span>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className={cn("border-[#2D2D32]")}>
          <AccordionTrigger
            className={cn("mb-0 text-white hover:no-underline")}
          >
            Category
          </AccordionTrigger>
          <AccordionContent className={cn("mt-3 3xl:mt-4")}>
            <ul className="flex flex-col gap-y-5">
              <li className="cursor-pointer text-[15px] text-white hover:font-semibold">
                All
              </li>
              <li className="cursor-pointer text-[15px] text-white hover:font-semibold">
                Art
              </li>
              <li className="cursor-pointer text-[15px] text-white hover:font-semibold">
                Games
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3" className={cn("border-[#2D2D32]")}>
          <AccordionTrigger
            className={cn("mb-0 text-white hover:no-underline")}
          >
            Prince Range
          </AccordionTrigger>
          <AccordionContent className={cn("mt-3 3xl:mt-4")}>
            <div className="flex justify-between gap-4">
              <Input
                name="min"
                placeholder="Min"
                className="rounded-lg border-none bg-blue-gray py-4 text-white placeholder:text-[#a1a1aa]"
              />
              <Input
                name="max"
                placeholder="Max"
                className="rounded-lg border-none bg-blue-gray py-4 text-white placeholder:text-[#a1a1aa]"
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
};

export default MarketPlaceSidebar;

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { Ellipsis } from "lucide-react";

const Dropdown = (props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer text-white">
          <Ellipsis />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={`relative !right-9 mt-4 w-56 border-slate-gray bg-blue-gray p-2 text-white sm:!right-12 xl:!right-24 xl:mt-0 ${props.contentClass}`}
      >
        {props.dropdownMenu?.map((menu, i) => {
          return (
            menu && (
              <Link
                key={i}
                onClick={menu.onClick && menu.onClick}
                href={menu.link ? menu.link : "#"}
              >
                <DropdownMenuLabel className="my-1 rounded-md border-none capitalize transition-all hover:bg-white hover:text-dark-slate hover:outline-none">
                  {menu.name}
                </DropdownMenuLabel>
              </Link>
            )
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;

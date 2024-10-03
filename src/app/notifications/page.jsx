import { NotificationCard } from "@/components";

export default function Notifications() {
  return (
    <div className="xl:hidden">
      <div className="border-b-[2px] border-[#2D2D32]">
        <div className="pb-4 lg:pb-5">
          <h2 className="text-base text-white md:text-lg lg:text-xl">
            Notifications
          </h2>
        </div>
      </div>
      <div className="mb-20 flex flex-col">
        {new Array(9).fill(true).map((_, i) => (
          <NotificationCard key={i} />
        ))}
      </div>
    </div>
  );
}

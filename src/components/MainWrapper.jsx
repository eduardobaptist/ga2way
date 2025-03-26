import { CustomSidebarTrigger } from "./CustomSidebarTrigger";
import { Separator } from "@/components/ui/separator";

export const MainWrapper = ({ title, children }) => {
  return (
    <section>
      <div className="px-5 mt-3">
        <div className="flex items-center">
          <CustomSidebarTrigger />
          <h1 className="text-3xl font-bold tracking-tighter">{title}</h1>
        </div>
      </div>
      <Separator className="mt-3 mb-10" />
      <div className="px-5 mb-10">
        <div className="mt-5">{children}</div>
      </div>
    </section>
  );
};

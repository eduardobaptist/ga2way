import { Badge } from "./ui/badge";

const MainWrapper = ({ title, children }) => {
  return (
    <div className="px-5">
      <div className="flex items-center justify-start my-3">
        <h1 className="text-4xl font-bold tracking-tighter">{title}</h1>
      </div>
      <div className="mt-10">{children}</div>
    </div>
  );
};

export default MainWrapper;

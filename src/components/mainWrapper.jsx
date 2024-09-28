const MainWrapper = ({ title, children }) => {
  return (
    <div
      className="rounded-lg border-none sm:border-dashed sm:border shadow-sm tracking-tight"
    >
        <div className="flex items-center justify-center my-3">
          <h1 className="text-4xl font-bold tracking-tighter">{title}</h1>
        </div>
        <div className="mt-5">{children}</div>
    </div>
  );
};

export default MainWrapper;

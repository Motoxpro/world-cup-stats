const RaceInfo: React.FC = () => {
  return (
    <div className="flex flex-col items-start justify-between gap-x-8 gap-y-4 bg-gray-700/10 px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
      <div>
        <div className="flex items-center gap-x-3">
          <div className="flex-none rounded-full bg-green-400/10 p-1 text-green-400">
            <div className="h-2 w-2 rounded-full bg-current" />
          </div>
          <h1 className="flex gap-x-3 text-base leading-7">
            <span className="font-semibold text-white">Live</span>
          </h1>
        </div>
        <p className="mt-2 text-xs leading-6 text-gray-400">
          Date: 23rd January 2023 8:00 to 23rd January 2023 16:00
        </p>
      </div>
      <div className="order-first flex-none rounded-full bg-sky-400/10 px-2 py-1 text-xs font-medium text-sky-400 ring-1 ring-inset ring-sky-400/30 sm:order-none">
        World Cup #2
      </div>
    </div>
  );
};

export default RaceInfo;

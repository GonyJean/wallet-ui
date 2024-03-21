import { IBalance } from "@/store/useChains";
import { formatValue } from "@/utils/format";
import { cn } from "@/utils/util";

interface AssetProps {
  data?: IBalance;
}

export default function Asset(props: AssetProps) {
  const { data = {} } = props;
  const {
    sumBalanceUSD = "0",
    pastDay,
    past1Hour,
    past7Day,
  } = data as IBalance;

  const isGreaterThanZero = (s: string): boolean => {
    if (!s) return false;
    const n = parseFloat(s);
    if (n >= 0) return true;
    return false;
  };

  const past1HourValue = past1Hour?.value || "0";
  const past1HourPercentage = past1Hour?.percentage || "0";

  const pastDayValue = pastDay?.value || "0";
  const pastDayPercentage = pastDay?.percentage || "0";

  const past7DayValue = past7Day?.value || "0";
  const past7DayPercentage = past7Day?.percentage || "0";

  const past1HourValueIsGreaterThanZero = isGreaterThanZero(past1HourValue);
  const pastDayValueIsGreaterThanZero = isGreaterThanZero(pastDayValue);
  const past7DayValueIsGreaterThanZero = isGreaterThanZero(past7DayValue);

  return (
    <div className="mt-8 ml-4 text-sm">
      <div className="flex">
        <div className="text-5xl font-bold">${formatValue(sumBalanceUSD)}</div>
        <div className="ml-2">
          <span>USD</span>
        </div>
      </div>
      <div className="mt-2 mb-6">
        <span
          className={cn(
            "mr-2",
            past1HourValueIsGreaterThanZero
              ? "text-[#6FFF62]"
              : "text-[#FF8266]"
          )}
        >
          ${past1HourValueIsGreaterThanZero ? "+" : ""}
          {formatValue(past1HourValue)}
        </span>
        <span
          className={cn(
            "mr-4",
            past1HourValueIsGreaterThanZero
              ? "text-[#6FFF62]"
              : "text-[#FF8266]"
          )}
        >
          {formatValue(past1HourPercentage)}%
        </span>
        <span className="text-[#819DF580]">Last Hour</span>
      </div>
      <div className="flex mt-2">
        <div className="text-[#819DF580]">
          <div
            className={cn(
              pastDayValueIsGreaterThanZero
                ? "text-[#6FFF62]"
                : "text-[#FF8266]"
            )}
          >
            <span className="mr-2">
              ${pastDayValueIsGreaterThanZero ? "+" : ""}
              {formatValue(pastDayValue)}
            </span>
            <span className="mr-2">{formatValue(pastDayPercentage)}%</span>
          </div>
          <div className="mr-1">Last Day</div>
        </div>
        <div className="text-[#819DF580] ml-2">
          <div
            className={cn(
              past7DayValueIsGreaterThanZero
                ? "text-[#6FFF62]"
                : "text-[#FF8266]"
            )}
          >
            <span className="mr-2">
              ${past7DayValueIsGreaterThanZero ? "+" : ""}
              {formatValue(past7DayValue)}
            </span>
            <span className="mr-2">{formatValue(past7DayPercentage)}%</span>
          </div>
          <div className="mr-1">Last Week</div>
        </div>
      </div>
    </div>
  );
}

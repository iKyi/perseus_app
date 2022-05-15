import { useEffect, useState } from "react";
import { setInterval, clearInterval } from "timers-browserify";
import { DateTime, Duration } from "luxon";

const useCountdown = (futureDate: string | false | null | undefined) => {
  const [shownValue, setvalue] = useState<string>("");
  const [refValue, setRefValue] = useState(null);

  const getSum = () => {
    if (futureDate) {
      const durationNow = Duration.fromObject((DateTime.now() as any).c);
      const parsed = DateTime.fromISO(futureDate, { zone: "utc" }).toUTC();
      const futrDate = Duration.fromObject((parsed as any).c);

      const duration = futrDate.minus(durationNow).toFormat("d : h : mm : ss");

      setvalue(`${duration}`);
    }
  };

  useEffect(() => {
    getSum();
    if (futureDate) {
      setRefValue(setInterval(getSum, 1000));
    } else {
      clearInterval(refValue);
      setRefValue(null);
    }
    return () => {
      clearInterval(refValue);
      setRefValue(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [futureDate]);

  if (!futureDate) return null;
  return shownValue;
};

export default useCountdown;

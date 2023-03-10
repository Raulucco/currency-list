import { useCallback, useState } from "react";

const MIN_DAYS = 0;
const MAX_DAYS = 3;

export default function useDailyCourse() {
  const [days = MIN_DAYS, setDays] = useState(() => {
    const queryString = window.location.search;

    if (queryString) {
      const urlParams = new URLSearchParams(queryString);
      return parseInt(urlParams.get("days") ?? "0", 10);
    }

    return 0;
  });

  const setCourseDays = useCallback((d: number) => {
    if (d < MIN_DAYS || d > MAX_DAYS || !Number.isInteger(d)) {
      throw new Error(
        `Number of days must be an integer between ${MIN_DAYS} and ${MAX_DAYS} inclusive.\nGot ${d} instead.`
      );
    }

    window.history.pushState({ days: d }, "", `?days=${d}`);
    setDays(d);
  }, []);

  return {
    days,
    setCourseDays,
  };
}

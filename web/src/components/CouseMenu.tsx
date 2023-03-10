import React, { useMemo } from "react";
import { primary, white } from "../colors";
import useDailyCourse from "../hooks/useDailyCourse";
import { CourseButton, CourseButtonsRow } from "./CourseMenu.styles";

export default function CourseMenu() {
  const { days, setCourseDays } = useDailyCourse();
  const styles = useMemo(() => ({
      display: 'inline-block',
      marginLeft: 'auto',
      alignSelf: 'center',
      marginRight: 'auto',
  }), []);

  return (
    <div style={styles}>
      <CourseButtonsRow>
        <CourseButton
          backgroundColor={days === 0 ? primary : white}
          color={days === 0 ? white : primary}
          onClick={() => setCourseDays(0)}
        >
          Aktuální
        </CourseButton>
        <CourseButton
          backgroundColor={days === 1 ? primary : white}
          color={days === 1 ? white : primary}
          onClick={() => setCourseDays(1)}
        >
          + 1 den
        </CourseButton>
        <CourseButton
          backgroundColor={days === 2 ? primary : white}
          color={days === 2 ? white : primary}
          onClick={() => setCourseDays(2)}
        >
          + 2 dny
        </CourseButton>
        <CourseButton
          backgroundColor={days === 3 ? primary : white}
          color={days === 3 ? white : primary}
          onClick={() => setCourseDays(3)}
        >
          + 3 dny
        </CourseButton>
      </CourseButtonsRow>
    </div>
  );
}

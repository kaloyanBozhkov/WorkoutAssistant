import React, { useState, useEffect } from "react";

import Prompt from "../Prompt/Prompt";
import styles from "./exercisetable.module.scss";

const ExerciseTable = ({
  exercisesDoneToday,
  date,
  setExercises,
  exercises
}) => {
  const [prompt, setPrompt] = useState(false);
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      let timer;
      clearTimeout(timer);
      setTimeout(() => setWindowSize(window.innerWidth), 200);
    });

    return () => window.removeEventListener("resize");
  }, []);
  return (
    <>
      {prompt ? (
        <Prompt
          exerciseRowEdited={prompt}
          setPrompt={setPrompt}
          exercisesDoneToday={exercisesDoneToday}
          exercises={exercises}
          setExercises={setExercises}
          date={date}
        />
      ) : null}

      <div
        className={styles.exerciseTable}
        title={
          "Exercises Done " +
          (new Date().toLocaleDateString() === date ? "Today" : " on " + date)
        }
      >
        {exercisesDoneToday.length === 0 && (
          <p>
            No exercises done for{" "}
            {new Date().toDate() === date ? "today yet" : " on " + date}{" "}
          </p>
        )}
        {exercisesDoneToday.length > 0 && (
          <>
            <header>
              <div>Exercise Name</div>
              <div>Set 1</div>
              <div>Set 2</div>
              <div>Set 3</div>
              <div>Set 4</div>
              <div />
            </header>
            <section>
              {exercisesDoneToday.map((wrkt, k) => (
                <div key={k}>
                  {Object.keys(wrkt).map((key, index) => (
                    <div key={index}>
                      {key === "name" && <p>{wrkt[key]}</p>}
                      {key !== "name" && (
                        <span>{wrkt[key] === "" ? "-" : wrkt[key]}</span>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      setPrompt(wrkt);
                    }}
                  >
                    Edit
                  </button>
                </div>
              ))}
            </section>
          </>
        )}
      </div>
      {windowSize < 800 && (
        <p className={styles.exerciseTableMsgMobile}>
          If on mobile, you can scroll the table left-right
        </p>
      )}
    </>
  );
};

export default ExerciseTable;

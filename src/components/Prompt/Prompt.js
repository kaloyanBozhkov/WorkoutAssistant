import React, { useState } from "react";

import styles from "./prompt.module.scss";

const Prompt = ({
  exerciseRowEdited,
  setPrompt,
  exercises,
  setExercises,
  date
}) => {
  //toChange exercises[date].indexOf(prompt)
  prompt.ok = 100;
  console.log(
    exercises,
    exerciseRowEdited,
    exercises[date].indexOf(exerciseRowEdited)
  );
  const [sets, setSets] = useState({
    name: exerciseRowEdited.name,
    set1: exerciseRowEdited.set1 === "" ? "-" : exerciseRowEdited.set1,
    set2: exerciseRowEdited.set2 === "" ? "-" : exerciseRowEdited.set2,
    set3: exerciseRowEdited.set3 === "" ? "-" : exerciseRowEdited.set3,
    set4: exerciseRowEdited.set4 === "" ? "-" : exerciseRowEdited.set4
  });

  return (
    <div className={styles.prompt}>
      <div>
        <h1>Edit exercise sets</h1>
        <div className={styles.prompt__main}>
          <p>{exerciseRowEdited.name}</p>
          {[...new Array(4)].map((v, i) => (
            <div title={`Set ${i + 1}`}>
              <input
                value={sets[`set${i + 1}`]}
                onChange={({ target: { value } }) =>
                  setSets({
                    ...sets,
                    [`set${i + 1}`]: value
                  })
                }
                onFocus={({ target: { value } }) => {
                  if (value === "-") {
                    setSets({
                      ...sets,
                      [`set${i + 1}`]: ""
                    });
                  }
                }}
                onBlur={({ target: { value } }) => {
                  if (value === "") {
                    setSets({
                      ...sets,
                      [`set${i + 1}`]: "-"
                    });
                  }
                }}
              />
            </div>
          ))}
        </div>
        <div className={styles.prompt__actions}>
          <button
            onClick={() => {
              const toEdit = exercises[date].indexOf(exerciseRowEdited);
              setExercises({
                ...exercises,
                [date]: exercises[date].map((e, i) => (i !== toEdit ? e : sets))
              });
              setPrompt(false);
            }}
          >
            Save
          </button>
          <button onClick={() => setPrompt(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Prompt;

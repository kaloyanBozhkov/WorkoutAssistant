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
          <div title="Set 1">
            <input
              value={sets.set1}
              onChange={({ target: { value } }) =>
                setSets({
                  ...sets,
                  set1: value
                })
              }
              onFocus={({ target: { value } }) => {
                if (value === "-") {
                  setSets({
                    ...sets,
                    set1: ""
                  });
                }
              }}
              onBlur={({ target: { value } }) => {
                if (value === "") {
                  setSets({
                    ...sets,
                    set1: "-"
                  });
                }
              }}
            />
          </div>
          <div title="Set 2">
            <input
              value={sets.set2}
              onChange={({ target: { value } }) =>
                setSets({
                  ...sets,
                  set2: value
                })
              }
              onFocus={({ target: { value } }) => {
                if (value === "-") {
                  setSets({
                    ...sets,
                    set2: ""
                  });
                }
              }}
              onBlur={({ target: { value } }) => {
                if (value === "") {
                  setSets({
                    ...sets,
                    set2: "-"
                  });
                }
              }}
            />
          </div>
          <div title="Set 3">
            <input
              value={sets.set3}
              onChange={({ target: { value } }) =>
                setSets({
                  ...sets,
                  set3: value
                })
              }
              onFocus={({ target: { value } }) => {
                if (value === "-") {
                  setSets({
                    ...sets,
                    set3: ""
                  });
                }
              }}
              onBlur={({ target: { value } }) => {
                if (value === "") {
                  setSets({
                    ...sets,
                    set3: "-"
                  });
                }
              }}
            />
          </div>
          <div title="Set 4">
            <input
              value={sets.set4}
              onChange={({ target: { value } }) =>
                setSets({
                  ...sets,
                  set4: value
                })
              }
              onFocus={({ target: { value } }) => {
                if (value === "-") {
                  setSets({
                    ...sets,
                    set4: ""
                  });
                }
              }}
              onBlur={({ target: { value } }) => {
                if (value === "") {
                  setSets({
                    ...sets,
                    set4: "-"
                  });
                }
              }}
            />
          </div>
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

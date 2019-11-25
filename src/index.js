import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import Header from "./components/Header/Header";
import ExerciseTable from "./components/ExerciseTable/ExerciseTable";
import Button from "./components/Button/Button";

import exercisesData from "./exercises.json";
import workoutSchedule from "./workoutSchedule.json";
import "./styles.css";

const todayDate = new Date().toLocaleDateString();

const loadExercises = () => {
  if (!Object.prototype.hasOwnProperty.call(localStorage, "exercises")) {
    localStorage.setItem(
      "exercises",
      JSON.stringify({
        [todayDate]: []
      })
    );
  }

  return JSON.parse(localStorage.getItem("exercises"));
};

const loadWorkoutInfo = () => {
  if (!Object.prototype.hasOwnProperty.call(localStorage, "startDate")) {
    localStorage.setItem(
      "startDate",
      JSON.stringify({
        date: todayDate
      })
    );
  }

  return JSON.parse(localStorage.getItem("startDate"));
};

const weeksBetween = (d1, d2) =>
  Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000));

const getHeaderData = ({ date: startDate }) => {
  const day = new Date(todayDate).toLocaleDateString("en-gb", {
    weekday: "short"
  });
  const week = weeksBetween(new Date(startDate), new Date()) + 1;
  const currentWeekWorkoutSchedule =
    week % 2 === 0 ? workoutSchedule[1] : workoutSchedule[0];
  let dayToday = new Date(todayDate).getDay();
  const muscleGroupsToWorkoutToday = currentWeekWorkoutSchedule[dayToday].split(
    ","
  );
  return {
    day,
    week,
    training_today: (
      <ul>
        {muscleGroupsToWorkoutToday
          .reduce(
            (acc, item) => [
              ...(~acc.indexOf(item.substr(0, 1).toUpperCase() + item.substr(1))
                ? acc
                : [...acc, item.substr(0, 1).toUpperCase() + item.substr(1)])
            ],
            []
          )
          .map((item, i) => (
            <li key={i}>
              {i + 1} - {item}
            </li>
          ))}
      </ul>
    ),
    next_rest:
      currentWeekWorkoutSchedule[dayToday] === null
        ? "Today!"
        : (() => {
            let daysToWait =
              [...currentWeekWorkoutSchedule].splice(dayToday).indexOf(null) +
              1;

            if (daysToWait === 0) {
              const otherSchedule =
                week % 2 !== 0 ? workoutSchedule[1] : workoutSchedule[0];
              const daysForThisWeek =
                [...currentWeekWorkoutSchedule].splice(dayToday).length -
                1 +
                (otherSchedule.indexOf(null) + 1);
              daysToWait = daysForThisWeek;
            }

            return `in ${daysToWait} days`;
          })(),
    exercises: (
      <ul>
        {muscleGroupsToWorkoutToday
          .reduce(
            (acc, item) => [
              ...(~acc.indexOf(item.substr(0, 1).toUpperCase() + item.substr(1))
                ? acc
                : [...acc, item.substr(0, 1).toUpperCase() + item.substr(1)])
            ],
            []
          )
          .map(item => (
            <li>
              {muscleGroupsToWorkoutToday.reduce(
                (akk, ytem) => (ytem === item.toLowerCase() ? (akk += 1) : akk),
                0
              ) +
                " for " +
                item}
            </li>
          ))}
      </ul>
    )
  };
};

const getRandomNumberBetween = (start, end) =>
  Math.floor(Math.random() * (end - start + 1)) + start;

function App() {
  const [exercises, setExercises] = useState(loadExercises());
  const headerData = getHeaderData(loadWorkoutInfo());
  const currentWeekWorkoutSchedule =
    headerData.week % 2 === 0 ? workoutSchedule[1] : workoutSchedule[0];

  const muscleGroupsToWorkoutToday = currentWeekWorkoutSchedule[
    new Date(todayDate).getDay()
  ].split(",");

  const [workoutsForDay, setWorkoutsForDay] = useState(
    (() => {
      let newMuscleGroupsToWorkoutToday = [...muscleGroupsToWorkoutToday];
      if (
        Object.prototype.hasOwnProperty.call(exercises, todayDate) &&
        exercises[todayDate].length > 0
      ) {
        const getExerciseMuscleGroup = exName =>
          Object.keys(exercisesData).reduce(
            (acc, key) =>
              exercisesData[key].filter(e => {
                return (
                  e.toString().toLowerCase() === exName.toString().toLowerCase()
                );
              }).length === 0
                ? acc
                : acc + key,
            ""
          );
        const muscleGroupsAlreadyTrained = exercises[todayDate].map(e =>
          getExerciseMuscleGroup(e.name)
        );
        const muscleGroupsLeftToTrain = newMuscleGroupsToWorkoutToday.reduce(
          (acc, muscleGroup) =>
            muscleGroupsAlreadyTrained.filter(mg => mg === muscleGroup)
              .length ===
            newMuscleGroupsToWorkoutToday.filter(mg => mg === muscleGroup)
              .length
              ? acc
              : [...acc, muscleGroup],
          []
        );
        newMuscleGroupsToWorkoutToday = [...muscleGroupsLeftToTrain];
      }
      return newMuscleGroupsToWorkoutToday;
    })() //here
  );
  const addExercise = () => {
    const [workoutToFetch, ...remainingWorkoutsForDay] = workoutsForDay;
    const exercisesForWorkout = exercisesData[workoutToFetch];

    let foundExercise = false;
    let exerciseFetched;
    while (!foundExercise) {
      exerciseFetched =
        exercisesForWorkout[
          getRandomNumberBetween(0, exercisesForWorkout.length - 1)
        ];
      foundExercise =
        exercises[todayDate].filter(
          exercise => exercise.name === exerciseFetched
        ).length === 0;
    }

    setWorkoutsForDay(remainingWorkoutsForDay);

    setExercises({
      ...exercises,
      [todayDate]: [
        ...exercises[todayDate],
        {
          name: exerciseFetched,
          set1: "",
          set2: "",
          set3: "",
          set4: ""
        }
      ]
    });
  };

  //save
  useEffect(() => {
    if (localStorage.getItem("exercises") !== JSON.stringify(exercises)) {
      localStorage.setItem("exercises", JSON.stringify(exercises));
    }
  }, [exercises]);

  return (
    <div className="App">
      <Header headerData={headerData} />
      <div className="buttonWrapper">
        <Button
          label={
            workoutsForDay.length > 0
              ? "Add Random Exercise"
              : "You're finished fam!"
          }
          action={addExercise}
          disabled={workoutsForDay.length === 0}
        />
      </div>
      <ExerciseTable
        exercisesDoneToday={exercises[todayDate]}
        date={todayDate}
        exercises={exercises}
        setExercises={setExercises}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

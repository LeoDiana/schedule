/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react';
import {
  classroomInfo,
  dayInfo,
  lessonTimeInfo,
  subgroupInfo,
  teacherInfo,
} from '../types/entitiesInfo';
import { readLessonsWithFilter } from '../api/apiCalls';

export const SchedulePage = ({ filter = 'subgroup', filteredEntityId = '1' }) => {
  const [days, setDays] = useState();
  const [lessonTimes, setLessonTimes] = useState();
  const [lessons, setLessons] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setDays(await dayInfo.api.readAll());
      setLessonTimes(await lessonTimeInfo.api.readAll());
      setLessons(await readLessonsWithFilter(filteredEntityId, filter));
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>Title</h1>
      {days && lessonTimes ? <Schedule {...{ days, lessonTimes, lessons }} /> : null}
    </>
  );
};

const les = [
  {
    day: { id: 1, name: 'Понеділок' },
    lessonTime: { id: 1, number: 'I', timeStart: '8:00', timeEnd: '9:20' },
  },
  {
    day: { id: 2, name: 'Вівторок' },
    lessonTime: { id: 2, number: 'II', timeStart: '9:45', timeEnd: '11:05' },
  },
];

const indexInGrid = (list, val) => {
  return list.findIndex((item) => item.id.toString() === val.id.toString()) + 2;
};

const Schedule = ({ days, lessonTimes, lessons }) => {
  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `150px repeat(${days.length}, 200px)`,
          gridTemplateRows: `40px repeat(${lessonTimes.length}, 95px)`,
          gap: '7px',
        }}
      >
        {days.map((item, i) => (
          <div
            key={i}
            style={{
              gridColumn: i + 2,
              gridRow: 1,
              justifySelf: 'center',
              alignSelf: 'end',
            }}
          >
            <strong>{item.name}</strong>
          </div>
        ))}
        {lessonTimes.map((item, i) => (
          <div
            key={i}
            style={{
              gridColumn: 1,
              gridRow: i + 2,
              alignSelf: 'center',
            }}
          >
            <p style={{ margin: 0, textAlign: 'center' }}>
              <strong>{`${item.number}`}</strong>
            </p>
            <p
              style={{ margin: 0, textAlign: 'center' }}
            >{`(${item.timeStart}-${item.timeEnd})`}</p>
          </div>
        ))}
        {lessons
          ? lessons.map((item, i) => (
              <div
                draggable
                key={i}
                style={{
                  gridColumn: indexInGrid(days, item.day),
                  gridRow: indexInGrid(days, item.lessonTime),
                  backgroundColor: 'rebeccapurple',
                  border: 'solid 1.5px #4d086e', //#c7c8c9
                  // borderColor: 'mediumpurple',
                  borderRadius: '8px',
                  padding: '9px',
                  boxShadow:
                    'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
                }}
              >
                <p style={{ margin: '0 0 5px', color: 'white' }}>
                  <strong>{item.subject.shortName}</strong>
                </p>
                <p style={{ margin: 0, color: 'white' }}>
                  {teacherInfo.shortShownName(item.teacher)}
                </p>
                <p style={{ margin: 0, color: 'white' }}>
                  {classroomInfo.shortShownName(item.classroom)}
                </p>
              </div>
            ))
          : null}
      </div>
    </>
  );
};

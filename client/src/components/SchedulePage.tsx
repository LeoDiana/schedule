/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react';
import { readLessonsWithFilter } from '../api/apiCalls';
import { commonEntitiesInfo } from '../common/entitiesInfo';
import { FieldsOfType } from '../common/types';

export const SchedulePage = ({ filter = 'subgroup', filteredEntityId = '1' }) => {
  const [days, setDays] = useState([] as FieldsOfType<'day'>[]);
  const [lessonTimes, setLessonTimes] = useState([] as FieldsOfType<'lessonTime'>[]);
  const [lessons, setLessons] = useState([] as FieldsOfType<'lesson'>[]);

  useEffect(() => {
    const fetchData = async () => {
      setDays(await commonEntitiesInfo.day.api.readAll());
      setLessonTimes(await commonEntitiesInfo.lessonTime.api.readAll());
      setLessons(await readLessonsWithFilter(filteredEntityId, filter));
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLessons(await readLessonsWithFilter(filteredEntityId, filter));
    };

    fetchData();
  }, [filter, filteredEntityId]);

  return (
    <>
      <h1>Title</h1>
      {days && lessonTimes ? <Schedule {...{ days, lessonTimes, lessons }} /> : null}
    </>
  );
};

const indexInGrid = (list: any, val: any) => {
  return list.findIndex((item: any) => item.id.toString() === val.id.toString()) + 2;
};

type ScheduleParams = {
  days: FieldsOfType<'day'>[];
  lessonTimes: FieldsOfType<'lessonTime'>[];
  lessons: FieldsOfType<'lesson'>[];
};

const Schedule = ({ days, lessonTimes, lessons }: ScheduleParams) => {
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
                  {commonEntitiesInfo.teacher.shortShownName(item.teacher)}
                </p>
                <p style={{ margin: 0, color: 'white' }}>
                  {commonEntitiesInfo.classroom.shortShownName(item.classroom)}
                </p>
              </div>
            ))
          : null}
      </div>
    </>
  );
};

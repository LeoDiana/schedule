/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react';
import { readLessonsWithFilter } from '../api/apiCalls';
import { commonEntitiesInfo } from '../common/entitiesInfo';
import { FieldsOfType, FilterTypes } from '../common/types';
import styled from 'styled-components';
import { Lesson } from '../common/entitiesInterfaces';

type SchedulePageProps = {
  filter: FilterTypes;
  filteredEntityId: number;
};

export const SchedulePage = ({ filter, filteredEntityId }: SchedulePageProps) => {
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
      {days && lessonTimes ? (
        <Schedule {...{ days, lessonTimes, lessons, filterType: filter }} />
      ) : null}
    </>
  );
};

const Card = styled.div`
  background-color: rebeccapurple;
  border: solid 1.5px #4d086e;
  border-radius: 8px;
  padding: 9px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  position: relative;
  box-sizing: border-box;
  height: 100%;
`;

const CardTitle = styled.p`
  margin: 0 0 5px;
  color: white;
  font-weight: bold;
`;

const CardContent = styled.div`
  margin: 0;
  color: white;
  position: absolute;
  bottom: 4px;
`;

const CardText = styled.p`
  margin: 1px 0 0;
`;

type LessonCardProps = {
  lesson: Lesson;
  filterType: FilterTypes;
};

// TODO GROUP_S_
const LessonCard = ({ lesson, filterType }: LessonCardProps) => {
  const subject = lesson.subject.shortName;
  const teacher = commonEntitiesInfo.teacher.shortShownName(lesson.teacher);
  const classroom = commonEntitiesInfo.classroom.shortShownName(lesson.classroom);
  const group = commonEntitiesInfo.subgroup.shortShownName(lesson.subgroup);

  return (
    <Card>
      <CardTitle>{subject}</CardTitle>
      <CardContent>
        {filterType === 'subgroup' ? (
          <>
            <CardText>{teacher}</CardText>
            <CardText>{classroom}</CardText>
          </>
        ) : filterType === 'teacher' ? (
          <>
            <CardText>{group}</CardText>
            <CardText>{classroom}</CardText>
          </>
        ) : filterType === 'classroom' ? (
          <>
            <CardText>{group}</CardText>
            <CardText>{teacher}</CardText>
          </>
        ) : null}
      </CardContent>
    </Card>
  );
};

const ScheduleGrid = styled.div<{ rows: number; columns: number }>`
  display: grid;
  grid-template-columns: 150px repeat(${(props) => props.columns}, 200px);
  grid-template-rows: 40px repeat(${(props) => props.rows}, 100px);
  gap: 7px;
`;

const DayCell = styled.div<{ dayNumber: number }>`
  grid-column: ${(props) => props.dayNumber + 2};
  grid-row: 1;
  justify-self: center;
  align-self: end;
  font-weight: bold;
`;

const LessonTimeCell = styled.div<{ lessonNumber: number }>`
  grid-column: 1;
  grid-row: ${(props) => props.lessonNumber + 2};
  align-self: center;
  text-align: center;
`;

const CellText = styled.p<{ bold?: boolean }>`
  margin: 0;
  font-weight: ${(props) => (props.bold ? 'bold' : 'normal')};
`;

const GridCell = styled.div<{ row: number; column: number }>`
  grid-column: ${(props) => props.column};
  grid-row: ${(props) => props.row}; ;
`;

type ScheduleParams = {
  days: FieldsOfType<'day'>[];
  lessonTimes: FieldsOfType<'lessonTime'>[];
  lessons: FieldsOfType<'lesson'>[];
  filterType: FilterTypes;
};

const Schedule = ({ days, lessonTimes, lessons, filterType }: ScheduleParams) => {
  const positionInGrid = (dayId = 0, lessonTimeId = 0) => {
    return {
      column: days.findIndex((day: any) => day.id === dayId) + 2,
      row: lessonTimes.findIndex((lt: any) => lt.id === lessonTimeId) + 2,
    };
  };

  return (
    <>
      <ScheduleGrid rows={lessonTimes.length} columns={days.length}>
        {days.map((day, i) => (
          <DayCell key={i} dayNumber={i}>
            {day.name}
          </DayCell>
        ))}
        {lessonTimes.map((lessonTime, i) => (
          <LessonTimeCell key={i} lessonNumber={i}>
            <CellText bold>{lessonTime.number}</CellText>
            <CellText>{`${lessonTime.timeStart}-${lessonTime.timeEnd}`}</CellText>
          </LessonTimeCell>
        ))}
        {lessons
          ? lessons.map((lesson, i) => (
              <GridCell key={i} {...positionInGrid(lesson.day.id, lesson.lessonTime.id)}>
                <LessonCard lesson={lesson} filterType={filterType} />
              </GridCell>
            ))
          : null}
      </ScheduleGrid>
    </>
  );
};

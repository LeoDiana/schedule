import { DayDTO, ID, LessonDTO, LessonTimeDTO, WeekTypeDTO } from '../entities/entitiesDTO';
import { FilterType } from './types';

type LessonTimeTable = Map<ID, Required<LessonDTO>[]>;
type DayTable = Map<ID, LessonTimeTable>;
type WeekTable = Map<ID, DayTable>;
export type ScheduleTable = Map<ID, WeekTable>;

type TableNames = 'groups' | 'teachers' | 'classrooms';

export type ScheduleTables = Map<TableNames, ScheduleTable>;

export type CollisionMark = 'conflict' | 'ok';

export type Collision = {
  filter: {
    tableName: TableNames,
    item: ID,
    weekType: ID,
    day: ID,
    lessonTime: ID
  }
  collidedObjects: Required<LessonDTO>[],
  markedAs: CollisionMark;
}
export type Collisions = Collision[];

function makeEmptySchedule(weekTypes: WeekTypeDTO[], days: DayDTO[], lessonTimes: LessonTimeDTO[]) {
  const weekTables = new Map() as WeekTable;
  weekTypes.forEach(weekType => {
    const dayTables = new Map() as DayTable;
    days.forEach(day => {
      const lessonTimeTables = new Map() as LessonTimeTable;
      lessonTimes.forEach(lessonTime => {
        lessonTimeTables.set(lessonTime.id, [] as Required<LessonDTO>[]);
      });
      dayTables.set(day.id, lessonTimeTables);
    });
    weekTables.set(weekType.id, dayTables);
  });
  return weekTables;
}

type LessonProps = 'subgroup' | 'teacher' | 'classroom';
const collisionsFor: Array<{ name: TableNames, idFrom: LessonProps }> = [
  { name: 'groups', idFrom: 'subgroup' },
  { name: 'teachers', idFrom: 'teacher' },
  { name: 'classrooms', idFrom: 'classroom' },
];

export function buildScheduleTables(
  allLessons: Required<LessonDTO>[],
  weekTypes: WeekTypeDTO[],
  days: DayDTO[],
  lessonTimes: LessonTimeDTO[],
): ScheduleTables {
  const scheduleTables: ScheduleTables = new Map();
  collisionsFor.forEach(item => {
    scheduleTables.set(item.name, new Map());
  });

  allLessons.forEach((lesson) => {
    const { weekType, day, lessonTime } = lesson;

    collisionsFor.forEach(item => {
      const id = lesson[item.idFrom].id;
      const table = scheduleTables.get(item.name)?.get(id);

      if (table) {
        table?.get(weekType.id)?.get(day.id)?.get(lessonTime.id)?.push(lesson);
      } else {
        scheduleTables?.get(item.name)?.set(id, makeEmptySchedule(weekTypes, days, lessonTimes));
        scheduleTables.get(item.name)?.get(id)?.get(weekType.id)?.get(day.id)?.get(lessonTime.id)?.push(lesson);
      }
    });
  });

  return scheduleTables;
}

export function buildCollisions(schedule: ScheduleTables) {
  const collisions: Collisions = [];
  collisionsFor.forEach(filter => {
    schedule.get(filter.name)?.forEach((item, itemId) => {
      item.forEach((weekType, weekTypeId) => {
        weekType.forEach((day, dayId) => {
          day.forEach((lessonTime, lessonTimeId) => {

            if (lessonTime.length > 1) {
              collisions.push({
                filter: {
                  tableName: filter.name,
                  item: itemId,
                  weekType: weekTypeId,
                  day: dayId,
                  lessonTime: lessonTimeId,
                },
                collidedObjects: lessonTime,
                markedAs: 'conflict',
              });
            }
          });
        });
      });
    });
  });

  return collisions;
}

function filterTypeToTablesFormat(filter: FilterType): TableNames {
  switch (filter) {
    case 'subgroup':
      return 'groups';
    case 'teacher':
      return 'teachers';
    default:
      throw new Error('Not implemented FilterType');
  }
}

export function tableNameToFilterType(tableName: TableNames): FilterType {
  switch (tableName) {
    case 'groups':
      return 'subgroup';
    case 'teachers':
      return 'teacher';
    // case 'classrooms': return 'classrooms';
    default:
      throw new Error('Not implemented TableNames');
  }
}

export function getCollisions(
  schedule: ScheduleTables,
  filter: FilterType,
  objId: ID,
  weekTypeId: ID,
  dayId: ID,
  lessonTimeId: ID,
): Required<LessonDTO>[] {
  try {
    const tableName = filterTypeToTablesFormat(filter);
    const lessons = schedule?.get(tableName)?.get(objId)?.get(weekTypeId)?.get(dayId)?.get(lessonTimeId);
    return lessons || [];
  } catch (err) {
    console.log(err);
    return [];
  }
}
import { DayDTO, ID, LessonDTO, LessonTimeDTO, WeekTypeDTO } from '../common/entitiesDTO';
import { FilterType } from '../common/types';

type LessonTimeTable = Map<ID, Required<LessonDTO>[]>;
type DayTable = Map<ID, LessonTimeTable>;
type WeekTable = Map<ID, DayTable>;
export type ScheduleTable = Map<ID, WeekTable>;
export type ScheduleTables = Map<FilterType, ScheduleTable>;

export type CollisionMark = 'conflict' | 'ok';

export type Collision = {
  filter: {
    tableName: FilterType,
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

const collisionsFor: FilterType[] = ['subgroup', 'teacher', 'classroom'];

export function buildScheduleTables(
  allLessons: Required<LessonDTO>[],
  weekTypes: WeekTypeDTO[],
  days: DayDTO[],
  lessonTimes: LessonTimeDTO[],
): ScheduleTables {
  const scheduleTables: ScheduleTables = new Map();
  collisionsFor.forEach(item => {
    scheduleTables.set(item, new Map());
  });

  allLessons.forEach((lesson) => {
    const { weekType, day, lessonTime } = lesson;

    collisionsFor.forEach(item => {
      const id = lesson[item].id;
      const table = scheduleTables.get(item)?.get(id);

      if (table) {
        table?.get(weekType.id)?.get(day.id)?.get(lessonTime.id)?.push(lesson);
      } else {
        scheduleTables?.get(item)?.set(id, makeEmptySchedule(weekTypes, days, lessonTimes));
        scheduleTables.get(item)?.get(id)?.get(weekType.id)?.get(day.id)?.get(lessonTime.id)?.push(lesson);
      }
    });
  });

  return scheduleTables;
}

export function buildCollisions(schedule: ScheduleTables) {
  const collisions: Collisions = [];
  collisionsFor.forEach(filter => {
    schedule.get(filter)?.forEach((item, itemId) => {
      item.forEach((weekType, weekTypeId) => {
        weekType.forEach((day, dayId) => {
          day.forEach((lessonTime, lessonTimeId) => {

            if (lessonTime.length > 1) {
              collisions.push({
                filter: {
                  tableName: filter,
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

export function getCollisions(
  schedule: ScheduleTables,
  filter: FilterType,
  objId: ID,
  weekTypeId: ID,
  dayId: ID,
  lessonTimeId: ID,
): Required<LessonDTO>[] {
  try {
    const lessons = schedule?.get(filter)?.get(objId)?.get(weekTypeId)?.get(dayId)?.get(lessonTimeId);
    return lessons || [];
  } catch (err) {
    console.log(err);
    return [];
  }
}
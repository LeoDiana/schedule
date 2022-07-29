import { FieldsOfType } from './types';
import { Lesson, LessonSubgroups } from './entitiesInterfaces';

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const convertToKebab = (str: string): string => {
  return str.replace(/[A-Z]/g, (match, offset, string) => {
    return (offset > 0 ? '-' : '') + match.toLowerCase();
  });
};

// if only one difference between two lessons is subgroup, so it should be merged
export const mergeLessons = (lessons: Required<Lesson>[]): LessonSubgroups[] => {
  const usedLessonsIndexes: number[] = [];
  const lessonsSubgroups: LessonSubgroups[] = []; //lessons.map((lesson) => ({...lesson, ids: [lesson.id], subgroups: [lesson.subgroup]}));
  for (let i = 0; i < lessons.length; i++) {
    if (usedLessonsIndexes.find((el) => el === i)) {
      continue;
    }
    const newLS: LessonSubgroups = {
      ...lessons[i],
      ids: [lessons[i].id],
      subgroups: [lessons[i].subgroup],
    };

    for (let j = i + 1; j < lessons.length; j++) {
      if (
        lessons[i].teacher.id === lessons[j].teacher.id &&
        lessons[i].subject.id === lessons[j].subject.id &&
        lessons[i].classroom.id === lessons[j].classroom.id &&
        lessons[i].day.id === lessons[j].day.id &&
        lessons[i].lessonTime.id === lessons[j].lessonTime.id &&
        lessons[i].weekType.id === lessons[j].weekType.id
      ) {
        newLS.ids.push(lessons[j].id);
        newLS.subgroups.push(lessons[j].subgroup);
        usedLessonsIndexes.push(j);
      }
    }
    lessonsSubgroups.push(newLS);
  }
  return lessonsSubgroups;
};

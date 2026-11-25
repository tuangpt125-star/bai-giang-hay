import { getCollection } from 'astro:content';
import book from '../content/ket-noi-tri-thuc/lop-08/khoa-hoc-tu-nhien/book.json';

export { book };
export const chapters = book.chapters.filter((chapter) => chapter.subject === 'vat-li');
export const lessons = chapters.flatMap((chapter) =>
  chapter.lessons.map((lesson) => ({ ...lesson, chapter }))
);

export function lessonUrl(lesson: { slug: string }) {
  return `/${book.seriesSlug}/lop-${book.grade}/${book.slug}/${lesson.slug}/`;
}

export async function loadBookLessons() {
  const entries = await getCollection('lessons');
  return new Map(entries.map((entry) => [entry.id, entry]));
}

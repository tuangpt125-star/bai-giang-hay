import { getCollection } from 'astro:content';

export interface Lesson {
  number: number;
  title: string;
  slug: string;
  pages: number[];
}

export interface Chapter {
  id: string;
  number: string;
  title: string;
  subject: string;
  icon: string;
  lessons: Lesson[];
}

export interface Book {
  series: string;
  seriesSlug: string;
  title: string;
  slug: string;
  grade: number;
  chapters: Chapter[];
}

const catalogues = import.meta.glob<Book>('../content/*/*/*/book.json', { eager: true, import: 'default' });
export const books = Object.values(catalogues).sort((a, b) => a.grade - b.grade);
export const defaultBook = books.find((book) => book.grade === 8)!;

export function physicsChapters(book: Book) {
  return book.chapters.filter((chapter) => chapter.subject === 'vat-li');
}

export function physicsLessons(book: Book) {
  return physicsChapters(book).flatMap((chapter) =>
    chapter.lessons.map((lesson) => ({ ...lesson, chapter }))
  );
}

export function bookRoute(book: Book) {
  return {
    series: book.seriesSlug,
    grade: `lop-${book.grade}`,
    book: book.slug,
  };
}

export const homeUrl = import.meta.env.BASE_URL;

function bookPath(book: Book) {
  const route = bookRoute(book);
  return `${homeUrl}${route.series}/${route.grade}/${route.book}/`;
}

export function catalogUrl(book: Book) {
  return book === defaultBook ? homeUrl : bookPath(book);
}

export function lessonUrl(book: Book, lesson: Pick<Lesson, 'slug'>) {
  return `${bookPath(book)}${lesson.slug}/`;
}

export function lessonId(book: Book, lesson: Pick<Lesson, 'slug'>) {
  const grade = String(book.grade).padStart(2, '0');
  return `${book.seriesSlug}/lop-${grade}/${book.slug}/bai-hoc/${lesson.slug}`;
}

export async function loadBookLessons() {
  const entries = await getCollection('lessons');
  return new Map(entries.map((entry) => [entry.id, entry]));
}

export type LanguageType = "en" | "ru" | "de";

type Translations = {
  [key in LanguageType]: {
    language: string;
    likes: string;
    reviews: string;
    isbn: string;
    title: string;
    author: string;
    publisher: string;
    noReviews: string;
  };
};

const translations: Translations = {
  en: {
    language: "Language",
    likes: "Likes",
    reviews: "Reviews",
    isbn: "ISBN",
    title: "Title",
    author: "Author",
    publisher: "Publisher",
    noReviews: "There are no reviews yet",
  },
  ru: {
    language: "Язык",
    likes: "Лайки",
    reviews: "Отзывы",
    isbn: "ISBN",
    title: "Название",
    author: "Автор",
    publisher: "Издатель",
    noReviews: "Отзывов пока нет",
  },
  de: {
    language: "Sprache",
    likes: "Gefällt mir",
    reviews: "Bewertungen",
    isbn: "ISBN",
    title: "Titel",
    author: "Autor",
    publisher: "Verlag",
    noReviews: "Es gibt noch keine Bewertungen",
  },
};

export default translations;

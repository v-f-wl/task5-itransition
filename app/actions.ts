import { BookProps } from '@/types';
import { ru, de, en, Faker } from '@faker-js/faker';
interface RequestType {
  locale: string;
  seed: number;
  offset: number;
  limit: number;
  rating: number;
  reviews: number;
  indexOfLastBook: number;
  page: number;
}

const locales: Record<string, typeof en> = { en, de, ru }

export async function generateBooks({
  locale,
  seed,
  offset,
  limit,
  rating,
  reviews,
  indexOfLastBook,
  page
}: RequestType) {
  try {
    if(reviews > 10 || rating> 10) return { status: 200, books: [], offset, indexOfLastBook};
    const faker = new Faker({ locale: locales[locale] })
    const books: BookProps[] = []
    let currentOffset = offset + 1
    let currentIndex = indexOfLastBook

    const minRating = Math.floor(rating)
    const maxRating = Math.ceil(rating)
    const minReviews = Math.floor(reviews)
    const maxReviews = Math.ceil(reviews)

    while (books.length < limit) {
      const currentSeed = seed + currentOffset
      faker.seed(currentSeed)

      const ratingValue = faker.number.int({ min: 0, max: 10 })
      const reviewsList = generateReviews(faker, currentSeed * 12)

      if (shouldIncludeBook(rating, ratingValue, minRating, maxRating, reviews, reviewsList.length, minReviews, maxReviews)) {
        books.push(generateBook(faker, currentIndex, ratingValue, reviewsList))
        currentIndex++
      }
      currentOffset++;
    }
    return { status: 200, books, offset: currentOffset, indexOfLastBook: currentIndex, page: ++page}
  } catch (error) {
    return { status: 500, error, books: [], offset: 0, indexOfLastBook: -1, page: 1}
  }
}

function shouldIncludeBook(
  rating: number,
  ratingValue: number,
  minRating: number,
  maxRating: number,
  reviews: number,
  reviewCount: number,
  minReviews: number,
  maxReviews: number
): boolean {
  if (rating > -1) {
    if (rating % 1 !== 0) { 
      if (Math.random() < 0.5) {
        maxRating = minRating
      } else {
        minRating = maxRating
      }
    }
    if (ratingValue < minRating || ratingValue > maxRating) {
      return false;
    }
  }

  if (reviews > -1) {
    if (reviews % 1 !== 0) { 
      if (Math.random() < 0.5) {
        maxReviews = minReviews
      } else {
        minReviews = maxReviews
      }
    }
    if (reviewCount < minReviews || reviewCount > maxReviews) {
      return false;
    }
  }

  return true;
}


function generateBook(faker: Faker, index: number, ratingValue: number, reviewsList: any[]): BookProps {
  return {
    numberIndex: index,
    authorName: faker.person.fullName(),
    isbn: faker.commerce.isbn(),
    titleOfBook: faker.lorem.words({ min: 2, max: 4 }),
    publisher: faker.company.name(),
    dateOfPublish: faker.date.past({ years: 10 }).toString(),
    coverColor: faker.color.rgb({ format: 'hex', casing: 'lower' }),
    likesRate: ratingValue,
    reviews: reviewsList,
  }
}

function generateReviews(faker: Faker, seed: number) {
  faker.seed(seed)
  const reviewCount = faker.number.int({ min: 0, max: 10 })

  return Array.from({ length: reviewCount }, (_, reviewIndex) => {
    faker.seed(seed + reviewIndex)
    return {
      authName: faker.person.fullName(),
      label: faker.lorem.words({ min: 4, max: 6 }),
      id: faker.number.int(100000),
    }
  })
}

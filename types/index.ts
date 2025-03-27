export interface BookReview{
  authName: string,
  label: string,
  id: string
}

export interface BookProps {
  numberIndex: number,
  authorName: string,
  titleOfBook: string,
  publisher: string,
  dateOfPublish: string,
  likesRate: number,
  isbn: string,
  coverColor?: string,
  reviews: BookReview[]
}

'use client'
import { useEffect, useRef, useState } from "react";
import BookItem from "./book-info";
import { BookProps } from "@/types";
import { useRequestsContext } from "@/providers/requests-context";
import { generateBooks } from "../actions";
import ILoading from "./icons/loading-icon";
import { debounce } from "lodash";

interface GetBooksProps{
  locale: string;
  indexOfLastBook: number;
  seed: number;
  offset: number;
  limit: number;
  rating: number;
  reviews: number;
  page: number,
}
const BooksContainer = () => {
  const [booksHandler, setBooksHandler] = useState<BookProps[]>([])
  const [offset, setOffset] = useState(0)
  const [indexOfLastBook, setIndexOfLastBook] = useState(0)
  const [isMoreBooks, setIsMoreBooks] = useState(false)
  const [pages, setPages] = useState(1)
  const loadRef = useRef(null)
  const context = useRequestsContext()
  if (!context) {
    throw new Error("useRequestsContext must be used within a RequestsContextProvider")
  }
  const { language, gridStyle, seed, reviewsQuery, ratingQuery } = context
  useEffect(() => {
    setIsMoreBooks(false)
    const debouncedFetch = debounce(async () => {

      const resultBooks = await getBooks({
        locale: language,
        indexOfLastBook: 1,
        seed,
        offset: 0,
        limit: 20,
        rating: ratingQuery,
        reviews: reviewsQuery,
        page: pages
      });

      
      setIndexOfLastBook(prev =>resultBooks.indexOfLastBook)
      setBooksHandler(prev => resultBooks.books)
      setOffset(prev => resultBooks.offset)
      setPages(prev => resultBooks.page ||  1)
      setIsMoreBooks(true)
    }, 500);
    
    debouncedFetch();

    return () => {
      debouncedFetch.cancel()
    };
  }, [language, seed, reviewsQuery, ratingQuery])

  async function getBooks({ locale, indexOfLastBook, seed, offset, limit, rating, reviews, page}:GetBooksProps) {
    return await generateBooks({ locale, indexOfLastBook, seed, offset, limit, rating, reviews, page })
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
  
        if (entries[0].isIntersecting && isMoreBooks) {
          getMoreBooks(offset);
        }
      },
      { rootMargin: "10px" }
    );
  
    if (loadRef.current) {
      observer.observe(loadRef.current)
    }
  
    return () => {
      if (loadRef.current) {
        observer.unobserve(loadRef.current)
      }
    };
  }, [offset])

  const getMoreBooks = async (offset: number) => {
    if(booksHandler.length === 0) return
    const resultBooks = await getBooks({
      locale: language,
      indexOfLastBook,
      seed,
      offset,
      limit: 10,
      rating: ratingQuery ?? -1,
      reviews: reviewsQuery ?? -1,
      page: pages
    })
    if(pages + 1 !== resultBooks.page) return
    setBooksHandler((prev) => [...prev, ...resultBooks.books])
    setOffset(resultBooks.offset)
    setIndexOfLastBook(resultBooks.indexOfLastBook)
    setPages(prev => resultBooks.page)
  }
  return ( 
    <div 
      className={`
        ${gridStyle === 'grid' ? 'mt-30 grid grid-cols-2 gap-6' : 'flex flex-col gap-2'}
        mt-4
        mx-auto container 
      `}
    >
      {booksHandler.map( book => (
        <BookItem
          key={book.isbn}
          numberIndex={book.numberIndex}
          authorName={book.authorName}
          titleOfBook={book.titleOfBook}
          dateOfPublish={new Date(book.dateOfPublish).getFullYear().toString()}
          likesRate={book.likesRate}
          isbn={book.isbn}
          coverColor={book.coverColor}
          publisher={book.publisher}
          reviews={book.reviews}
        />
      ))}
      <div 
        ref={loadRef}
        className="
          my-3 text-center
          flex items-center justify-center
          "
          >
        <div className="animate-spin">
          <ILoading/>
        </div>
      </div>
    </div>
  );
}
 
export default BooksContainer

// useEffect(() => {
//   const debouncedFetch = debounce(async () => {
//     const resultBooks = await getBooks({
//       locale: language,
//       indexOfLastBook: 1,
//       seed,
//       offset: 0,
//       limit: 20,
//       rating: ratingQuery,
//       reviews: reviewsQuery,
//     });
    
//     setIndexOfLastBook(prev =>resultBooks.indexOfLastBook);
//     setBooksHandler(prev => resultBooks.books);
//     setOffset(prev =>resultBooks.offset);
//   }, 500);
  
//   debouncedFetch();

//   return () => {
//     debouncedFetch.cancel()
//   };
// }, [language, seed, reviewsQuery, ratingQuery]);

// useEffect(() => {
//   const observer = new IntersectionObserver(
//     (entries) => {
//       if (entries[0].isIntersecting) {
//         getMoreBooks(offset);
//       }
//     },
//     { rootMargin: "10px" }
//   );

//   if (loadRef.current) {
//     observer.observe(loadRef.current)
//   }

//   return () => {
//     if (loadRef.current) {
//       observer.unobserve(loadRef.current)
//     }
//   };
// }, [offset])

// async function getBooks({
//   locale,
//   indexOfLastBook,
//   seed,
//   offset,
//   limit,
//   rating,
//   reviews,
// }: {
//   locale: string;
//   indexOfLastBook: number;
//   seed: number;
//   offset: number;
//   limit: number;
//   rating: number;
//   reviews: number;
// }) {
//   return await generateBooks({ locale, indexOfLastBook, seed, offset, limit, rating, reviews })
// }

// const getMoreBooks = async (offset: number) => {
//   if(booksHandler.length === 0) return
//   const resultBooks = await getBooks({
//     locale: language,
//     indexOfLastBook,
//     seed,
//     offset,
//     limit: 10,
//     rating: ratingQuery ?? -1,
//     reviews: reviewsQuery ?? -1,
//   })

//   setBooksHandler((prev) => [...prev, ...resultBooks.books])
//   setOffset(resultBooks.offset)
//   setIndexOfLastBook(resultBooks.indexOfLastBook)
// }

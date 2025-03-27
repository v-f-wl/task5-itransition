'use client'
import { useEffect, useState } from "react";
import IArrow from "./icons/arrow-icon";
import { BookProps } from "@/types";
import BookReviews from "./book-reviews";
import BookDescription from "./book-description";
import BookCover from "./book-cover";
import { Rating } from "@mui/material";
import { useRequestsContext } from "@/providers/requests-context";

const BookItem = ({
  numberIndex,
  authorName,
  titleOfBook,
  dateOfPublish,
  likesRate,
  isbn,
  publisher,
  coverColor,
  reviews
}:BookProps) => {
  const context = useRequestsContext()
  if (!context) {
    console.error("Something went wront, please reload the page");
    return <div className=""></div>
  }
    
  const { gridStyle } = context
  const [isOpened, setIsOpened] = useState(false)
  const handleToggleBookInfo = () => {
    setIsOpened(prev => !prev)
  }
  return ( 
    <div className={`
      bg-white rounded-md py-2 px-4 shadow
      `}
    >
      <div 
        onClick={handleToggleBookInfo}
        className={`
          ${gridStyle === 'grid' && 'hidden' }
          grid grid-cols-(--my-grid-cols) text-center cursor-pointer items-center
        `}
      >
        <div 
          className={`
            ${isOpened && 'rotate-180'}
            flex items-center justify-center transition-transform duration-500
          `}
        >
          <IArrow/>
        </div>
        <div className="">{numberIndex}</div>
        <div className="">{isbn}</div>
        <div className="">{titleOfBook}</div>
        <div className="">{authorName}</div>
        <div className="">{publisher}, {dateOfPublish}</div>
        </div>
      <div 
        className={`
          mt-0
          max-h-0 invisible overflow-hidden
          ${isOpened && 'max-h-max mt-8 pb-4 visible overflow-visible ' }
          ${gridStyle === 'grid' && 'max-h-max mt-8 pb-4 visible overflow-visible ' }
          transition-all duration-300
          grid grid-cols-(--description-grid) gap-4
        `}
          
      >
        <div className="">
          <BookCover
            titleOfBook={titleOfBook}
            authorName={authorName}
            publisher={publisher}
            likesRate={likesRate}
            coverColor={coverColor}
          />
          <div className="max-w-[248px]">
            <div 
              className="
                flex items-center gap-2 justify-center
                px-3 mx-auto mt-4 py-2 
                w-min
                text-center text-white text-xl font-medium
              "
              >
              <Rating name="size-small" value={likesRate} readOnly max={10} />
            </div>
            <div className="text-center font-bold text-neutral-400">{`${likesRate} / 10`}</div>
          </div>
        </div>
        <div className="">
          {gridStyle === 'grid' && <div>{isbn}</div>}
          <BookDescription
            titleOfBook={titleOfBook}
            dateOfPublish={dateOfPublish}
            authorName={authorName}
            publisher={publisher}
          />
          <BookReviews reviews={reviews}/>
        </div>
      </div>
    </div>
  );
}
 
export default BookItem;
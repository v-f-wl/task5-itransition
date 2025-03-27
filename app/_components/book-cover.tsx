import { BookProps } from "@/types";

type BookCoverProps = Omit< BookProps, 'numberIndex' | 'dateOfPublish' | 'isbn' | 'reviews'>
const BookCover = ({
  titleOfBook,
  authorName,
  coverColor
}: BookCoverProps) => {
  return ( 
    <div className="">
      <div className={`relative  max-w-[248px] max-h-[360px] bg-[${coverColor}]`}>
        <div className={`absolute inset-0 opacity-20 rounded-r-lg overflow-hidden`} style={{ backgroundColor: coverColor }} ></div>
        <img src="./img/book.png" alt=""/>
        <div className="absolute max-w-[248px] text-center capitalize text-lg font-medium top-10 left-1/2 -translate-x-1/2 merriweather">{titleOfBook}</div>
        <div className="absolute text-sm bottom-8 left-1/2 -translate-x-1/2 text-center">{authorName}</div>
      </div>
    </div>
   );
}
 
export default BookCover;
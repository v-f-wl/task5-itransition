import { BookProps } from "@/types";

type BookDescriptionProps = Omit<BookProps, 'reviews' | 'numberIndex' | 'likesRate' | 'isbn'>

const BookDescription = ({
  titleOfBook,
  dateOfPublish,
  authorName,
  publisher
} : BookDescriptionProps) => {
  return ( 
    <div className="flex flex-col gap2 text-neutral-700 font-medium text-xl">
      <h2 className="text-3xl font-bold">{titleOfBook}</h2>
      <div className="italic">{authorName}</div>
      <div className="text-muted-foreground">
        {publisher} {dateOfPublish}
      </div> 
    </div>
  );
}
 
export default BookDescription;
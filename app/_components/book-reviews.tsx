'use client'
import translations from "@/locale";
import { useRequestsContext } from "@/providers/requests-context";
import { BookReview } from "@/types";

interface BookreviewProps {
  reviews: BookReview[];
}
const BookReviews = ({reviews}: BookreviewProps) => {
  const context = useRequestsContext()
    if (!context) {
      console.error("Something went wront, please reload the page");
      return <div className=""></div>
    }
      
  const { language } = context
  return (  
    <div className="mt-6">
      <h3 className="text-xl font-bold">{translations[language].reviews}</h3>
      {reviews.length === 0 && <div className="mt-2">{translations[language].noReviews}</div>}

      {reviews.map(review => (
        <div key={review.id} className="mt-2 pb-2">
          <div className="text-lg font-medium">
            {review.label}
          </div>
          <div className="text-muted-foreground">
            -{review.authName}
          </div>
        </div>
      ))}
    </div>
  )
}
 
export default BookReviews;
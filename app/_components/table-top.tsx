'use client'

import translations from "@/locale";
import { useRequestsContext } from "@/providers/requests-context";

const TableTop = () => {
  const context = useRequestsContext()
  if (!context) {
    console.error("Something went wront, please reload the page");
    return <div className=""></div>
  }
    
  const { gridStyle, language } = context
  
  return ( 
    <div 
      className={`
        ${gridStyle === 'grid' && 'hidden'}
      bg-white rounded-md container mx-auto
        mt-30 px-4 py-2 shadow-sm
        grid grid-cols-(--my-grid-cols)
        text-center
      `}
    >
      <div className="flex items-center justify-center"></div>
      <div className="">#</div>
      <div className="">ISBN</div>
      <div className="">{translations[language].title}</div>
      <div className="">{translations[language].author}</div>
      <div className="">{translations[language].publisher}</div>
    </div>
   );
}
 
export default TableTop;
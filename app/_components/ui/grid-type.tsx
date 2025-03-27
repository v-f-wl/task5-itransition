'use client'
import { useState } from "react";
import IGrid from "../icons/grid-icon";
import IList from "../icons/list-icon";
import { useRequestsContext } from "@/providers/requests-context";

const GridType = () => {
  const context = useRequestsContext()
  if (!context) {
    console.error("Something went wront, please reload the page")
    return <div className=""></div>
  }
  
  const { gridStyle, changeGridStyle } = context

  const handleChangeGrid = (value: 'line' | 'grid') => {
    if (gridStyle === value) return
    changeGridStyle()
  }
  
  return ( 
    <div className="flex items-center gap-4">
      <div 
        onClick={() => handleChangeGrid('line')}
        className={`
          ${gridStyle === 'line' && 'bg-blue-400 text-white cursor-default'}
          cursor-pointer p-2 rounded-lg transition-all
          `}
          >
        <IList size='26'/>
      </div>
      <div 
        onClick={() => handleChangeGrid('grid')}
        className={`
          ${gridStyle === 'grid' && 'bg-blue-400 text-white cursor-default'}
          cursor-pointer p-2 rounded-lg transition-all
        `}
      >
        <IGrid size='26'/>
      </div>
    </div>
   );
}
 
export default GridType;
'use client'
import { LanguageType } from "@/locale";
import { faker } from "@faker-js/faker";
import { createContext, ReactNode, useContext, Dispatch, SetStateAction, useState, useEffect } from "react"

interface RequestsContextType {
  language: LanguageType,
  gridStyle: 'line'| 'grid',
  ratingQuery: number 
  seed: number,
  reviewsQuery: number ,
  randomSeed: () => void,
  setRatingQuery: Dispatch<SetStateAction<number >>,
  setSeed: Dispatch<SetStateAction<number >>,
  setReviewsQuery: Dispatch<SetStateAction<number >>,
  setLanguage: Dispatch<SetStateAction<LanguageType >>,
  changeGridStyle: () => void,
}

const RequestsContext = createContext<RequestsContextType | null>(null)


export const RequestsProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<LanguageType>("en")
  const [ratingQuery, setRatingQuery] = useState(-1)
  const [seed, setSeed] = useState(0)
  const [reviewsQuery, setReviewsQuery] = useState(-1)
  const [gridStyle, setGridStyle] = useState<'line' | 'grid'>('line')

  useEffect(() => {
    setSeed(prev =>faker.number.int({min: 1000, max: 9999}))
  },[])

  const randomSeed= () => {
    setSeed(prev => faker.number.int({min: 1000, max: 9999}))
  }
  const changeGridStyle = () => {
    setGridStyle(prev => prev === 'line' ? 'grid' : 'line')
  }
  return (
    <RequestsContext.Provider value={{ gridStyle, randomSeed, changeGridStyle, language ,seed, reviewsQuery, setReviewsQuery, setLanguage, setSeed, ratingQuery, setRatingQuery }}>
      {children}
    </RequestsContext.Provider>
  )
}

export const useRequestsContext = () => useContext(RequestsContext)

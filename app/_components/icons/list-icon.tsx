const IList = ({size}: {size: string}) => {
  return ( 
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 4.5H14M5 8H14M5 11.5H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2.5 5C2.77614 5 3 4.77614 3 4.5C3 4.22386 2.77614 4 2.5 4C2.22386 4 2 4.22386 2 4.5C2 4.77614 2.22386 5 2.5 5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2.5 8.5C2.77614 8.5 3 8.27614 3 8C3 7.72386 2.77614 7.5 2.5 7.5C2.22386 7.5 2 7.72386 2 8C2 8.27614 2.22386 8.5 2.5 8.5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2.5 12C2.77614 12 3 11.7761 3 11.5C3 11.2239 2.77614 11 2.5 11C2.22386 11 2 11.2239 2 11.5C2 11.7761 2.22386 12 2.5 12Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
 
export default IList;
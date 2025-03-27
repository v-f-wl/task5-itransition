import BooksContainer from './_components/books-container';
import Nav from './_components/nav'
import TableTop from './_components/table-top';

export default function Home() {
  return (
    <main className="flex flex-col">
      <Nav/>
      <TableTop/>
      <BooksContainer/>
    </main>
  );
}

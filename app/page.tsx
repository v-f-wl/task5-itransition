import BooksContainer from './_components/books-container';
import SettingsBar from './_components/settings-bar'
import TableTop from './_components/table-top';

export default function Home() {
  return (
    <main className="flex flex-col">
      <SettingsBar/>
      <TableTop/>
      <BooksContainer/>
    </main>
  );
}

import './scss/index.scss';
import { FlexTable } from './components/flexTable/FlexTable';
import { Header } from './components/header/Header';
import { Navbar } from './components/navbar/Navbar';
import { Table } from './components/table/Table';
import { Details } from './components/details/Details';
import { Spinner } from './components/spinner/Spinner';

const flexTable = new FlexTable('#app', {
  components: [Header, Spinner, Navbar, Table, Details],
});
flexTable.render();

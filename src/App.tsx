import { Component } from 'react';
import { Header } from './Header';
import { Catalog } from './Catalog';
import { Loader } from './Loader';
export interface PaginationInfo {
  count: number;
  next: string;
  previous: string;
}
export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  base_experience: number;
  types: { type: { name: string } }[];
}

interface AppState {
  searchValue: string;
  nav: PaginationInfo;
  items: Pokemon[];
  isSending: boolean;
}
export class App extends Component<object, AppState> {
  state: AppState = {
    searchValue: '',
    items: [],
    nav: {
      previous: '',
      next: '',
      count: 0,
    },
    isSending: false,
  };
  navigate = (goToNext: boolean) => {
    const url = goToNext ? this.state.nav.next : this.state.nav.previous;
    this.loadPokemons(url);
  };
  async loadPokemons(link?: string) {
    this.setState({ isSending: true });
    const res = await fetch(
      link ?? `https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`
    );
    const data = await res.json();
    this.setPagination(data);
    const pokemons = await this.fetchManyPokemons(data.results);
    console.log('pockemons', pokemons);
    this.setState({ items: pokemons, isSending: false });
  }
  setPagination(data: PaginationInfo) {
    this.setState({
      nav: { next: data.next, previous: data.previous, count: data.count },
    });
  }

  fetchManyPokemons(list: { name: string; url: string }[]): Promise<Pokemon[]> {
    return Promise.all(
      list.map((el) => fetch(el.url).then((res) => res.json()))
    );
  }

  handleSubmit = (value: string) => {
    this.setState({ searchValue: value });
  };
  componentDidMount(): void {
    this.loadPokemons();
  }
  render() {
    return (
      <>
        <Header onSubmit={this.handleSubmit} />
        <div style={{ height: '80vw' }}>
          {this.state.isSending ? (
            <Loader />
          ) : (
            <Catalog
              items={this.state.items}
              goToNext={this.navigate}
              navInfo={this.state.nav}
            />
          )}
        </div>
      </>
    );
  }
}

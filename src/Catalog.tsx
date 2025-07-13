import { Component } from 'react';
import type { PaginationInfo, Pokemon } from './App';

interface CatalogProps {
  items: Pokemon[];
  navInfo: PaginationInfo;
  goToNext: (goToNext: boolean) => void;
}

export class Catalog extends Component<CatalogProps> {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: '16px',
            padding: '20px',
          }}
        >
          {this.props.items.map((pokemon) => (
            <div
              key={pokemon.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '12px',
                textAlign: 'center',
                backgroundColor: '#f9f9f9',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                style={{ width: '80px', height: '80px' }}
              />
              <h4 style={{ margin: '8px 0 4px' }}>{pokemon.name}</h4>
              <p style={{ margin: 0, fontSize: '12px' }}>
                Типы: {pokemon.types.map((t) => t.type.name).join(', ')}
              </p>
              <p style={{ margin: 0, fontSize: '12px' }}>
                Опыт: {pokemon.base_experience}
              </p>
            </div>
          ))}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}
        >
          <button
            onClick={() => this.props.goToNext(false)}
            disabled={!this.props.navInfo.previous}
            style={{
              padding: '8px 16px',
              backgroundColor: this.props.navInfo.previous ? '#1976d2' : '#aaa',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Prev
          </button>
          <button
            onClick={() => this.props.goToNext(true)}
            disabled={!this.props.navInfo.next}
            style={{
              padding: '8px 16px',
              backgroundColor: this.props.navInfo.next ? '#1976d2' : '#aaa',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

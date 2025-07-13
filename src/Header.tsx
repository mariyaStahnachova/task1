import React, { Component, ChangeEvent } from 'react';

interface HeaderState {
  searchValue: string;
}
interface HeaderProps {
  onSubmit: (value: string) => void;
}

export class Header extends Component<HeaderProps, HeaderState> {
  state: HeaderState = {
    searchValue: '',
  };

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchValue: event.target.value });
  };

  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          height: '48px',
        }}
      >
        <input
          type="text"
          value={this.state.searchValue}
          onChange={this.handleChange}
          placeholder="Outlined"
          style={{
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            outline: 'none',
          }}
        />
        <button
          onClick={() => this.props.onSubmit(this.state.searchValue)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Search
        </button>
      </div>
    );
  }
}

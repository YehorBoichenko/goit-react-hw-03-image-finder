import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../SearchBar/Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    searchInput: '',
  };
  handlerSubmit = event => {
    event.preventDefault();
    if (this.state.searchInput.trim() === '') {
      return toast.error('Please enter request');
    }
    this.props.onSubmit(this.state.searchInput);
    this.setState({ searchInput: '' });
  };
  handlerChange = event => {
    this.setState({ searchInput: event.currentTarget.value.toLowerCase() });
  };
  render() {
    return (
      <header className={styles.Searchbar}>
        <form onSubmit={this.handlerSubmit} className={styles.SearchForm}>
          <button type="submit" className={styles.SearchFormButton}>
            <span className={styles.SearchFormButtonLabel}>Search</span>
          </button>
          <input
            className={styles.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchInput}
            onChange={this.handlerChange}
          />
        </form>
      </header>
    );
  }
}

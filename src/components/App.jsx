import { Component } from 'react';
import Searchbar from './SearchBar/Searchbar';
import PixaBay from '../API/PixaBay';
import ModalWindow from './ModalWindow/ModalWindow';
import ImageGallery from './ImageGallery/ImageGallery';
import LoaderSpinner from './Loader/Loader';
import Button from './Button/Button';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './App.module.css';

class App extends Component {
  state = {
    searchInput: '',
    images: [],
    page: 1,
    isLoading: false,
    error: null,
    showModal: false,
    modalImage: '',
    alt: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const previousInput = prevState.searchInput;
    const nextInput = this.state.searchInput;
    const previousPage = prevState.page;
    const nextPage = this.state.page;

    if (previousInput !== nextInput || previousPage !== nextPage) {
      this.setState({ isLoading: true });
      PixaBay.fetchImages(nextInput, nextPage)
        .then(({ hits }) => {
          if (hits.length === 0) {
            return this.setState({
              status: 'rejected',
              error: `could not find image by request ${nextInput}`,
            });
          }
          this.setState(({ images, page }) => ({
            images: [...images, ...hits],
            page: page,
            status: 'resolved',
          }));
        })
        .catch(error => this.setState({ error, status: 'rejected' }))
        .finally(() => this.setState({ isLoading: false }));
    }
  }
  onSearch = searchInput => {
    this.setState({ searchInput, page: 1, error: null });
  };
  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    this.scroll();
  };
  scroll = () => {
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 1000);
  };
  modalWindowToggle = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  modalWindowOpen = event => {
    this.setState(() => ({
      modalImage: event.target.src,
      alt: event.target.alt,
    }));
    this.modalWindowToggle();
  };
  modalWindowClose = () => {
    this.setState({
      modalImage: '',
    });
    this.modalWindowToggle();
  };

  render() {
    const { images, error, modalImage, showModal, isLoading, alt, page } =
      this.state;
    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.onSearch} />
        {isLoading && <LoaderSpinner />}
        {images.length > 0 && !error && (
          <ImageGallery onClick={this.modalWindowOpen} images={images} />
        )}
        {images.length >= 12 * page && <Button loadImages={this.loadMore} />}
        {showModal && (
          <ModalWindow
            onClose={this.modalWindowClose}
            src={modalImage}
            alt={alt}
          />
        )}
        {error && <p className={styles.error}>{error}</p>}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
export default App;

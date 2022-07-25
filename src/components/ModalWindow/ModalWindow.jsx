import { Component } from 'react';
import styles from '../ModalWindow/ModalWindow.module.css';
import { createPortal } from 'react-dom';

const modalWindowRoot = document.querySelector('#modal-root');

export default class ModalWindow extends Component {
  state = {
    loading: false,
  };
  componentDidMount() {
    window.addEventListener('keydown', this.handleCloseModal);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleCloseModal);
  }

  handleCloseModal = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  backDropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };
  render() {
    const { src, alt } = this.props;
    return createPortal(
      <div className={styles.overlay} onClick={this.backDropClick}>
        <div className={styles.modal}>
          <img src={src} alt={alt} />
        </div>
      </div>,
      modalWindowRoot
    );
  }
}

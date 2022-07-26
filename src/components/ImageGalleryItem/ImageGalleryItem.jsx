import React from 'react';
import styles from '../ImageGallery/ImageGallery.module.css';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({
  tags,
  src,
  largeimg,
  openModalWindow,
}) {
  return (
    <li className={styles.imageGalleryItem} onClick={openModalWindow}>
      <img
        src={src}
        alt={tags}
        largeimg={largeimg}
        className={styles.galleryItem}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  largeimg: PropTypes.string,
  openModalWindow: PropTypes.func.isRequired,
};

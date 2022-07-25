import React from 'react';
import styles from '../ImageGallery/ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

export default function ImageGallery({ images, onClick }) {
  return (
    <ul className={styles.ImageGallery}>
      {images.map(({ id, tags, webformatURL, largeImageURL }) => {
        return (
          <ImageGalleryItem
            key={id}
            tags={tags}
            src={webformatURL}
            largeImg={largeImageURL}
            openModalWindow={onClick}
          />
        );
      })}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape).isRequired,
  onClick: PropTypes.func.isRequired,
};

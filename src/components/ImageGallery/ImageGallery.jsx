import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={css.imageGallery}>
      {images.map(({ webformatURL, largeImageURL, id, tags }) => (
        <ImageGalleryItem
          key={id}
          previewImg={webformatURL}
          alt={tags}
          openModal={() => openModal(largeImageURL)}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array,
  openModal: PropTypes.func.isRequired,
}
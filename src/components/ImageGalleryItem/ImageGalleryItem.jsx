import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ tags, previewImg, id, openModal }) => (
  <li className={css.imageGalleryItem} key={id}>
    <img
      className={css.image}
      src={previewImg}
      alt={tags}
      onClick={openModal}
    />
  </li>
);

ImageGalleryItem.propTypes = {
  tags: PropTypes.string,
  previewImg: PropTypes.string,
  id: PropTypes.string,
  openModal: PropTypes.func.isRequired,
};

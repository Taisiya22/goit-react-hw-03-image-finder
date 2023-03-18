import css from './BtnLoad.module.css';
import PropTypes from 'prop-types';

export const Button = ({ onClick }) => {
  return (
    <div className={css.wrapper}>
      <button type="button" className={css.loadMore} onClick={onClick}>
        Load more
      </button>
    </div>
  );
};
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
}
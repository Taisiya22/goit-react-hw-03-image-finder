import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal-root');
export class Modal extends Component {
    static propTypes = {
        selectedImage: PropTypes.string.isRequired,
        onClose: PropTypes.func.isRequired,
    }
   
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentDidUpdate() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdrop = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };
  render() {
    const { selectedImage, tags } = this.props;
    return createPortal(
      <div onClick={this.handleBackdrop} className={css.overlay}>
        <div className={css.modal}>
                <img src={selectedImage} alt={tags } />
        </div>
      </div>,
      modalRoot
    );
  }
}

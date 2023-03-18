import css from './ImageGalleryItem.module.css'

export const ImageGalleryItem = ({  tags, previewImg, id, openModal  }) => (
   
    <li className={css.imageGalleryItem } key={id} class="gallery-item">
        <img className={css.image} src={previewImg} alt={tags} onClick={ openModal} />
</li>
)




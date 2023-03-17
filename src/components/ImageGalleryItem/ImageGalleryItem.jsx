

export const ImageGalleryItem = ({  tags, previewImg, id, openModal  }) => (
   
    <li key={id} class="gallery-item">
        <img src={previewImg} alt={tags} onClick={ openModal} />
</li>
)




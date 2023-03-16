

export const ImageGalleryItem = ({  tags, previewImg, id  }) => (
   
    <li key={id} class="gallery-item">
        <img src={previewImg} alt={tags} />
</li>
)




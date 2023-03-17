import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem"
export const ImageGallery = ({ images, openModal }) => {
    return (
     <ul>
        {images.map(({webformatURL, largeImageURL, id, tags})=> (
            <ImageGalleryItem key={id} previewImg={webformatURL} alt={tags} openModal={() => openModal(largeImageURL)} />
        )) }
    </ul>

)
   
 }
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem"
export const ImageGallery = ({ images }) => {
    return (
     <ul>
        {images.map(({webformatURL, largeImageURL, id, tags})=> (
            <ImageGalleryItem key={id} previewImg={webformatURL} alt={tags} />
        )) }
    </ul>

)
   
 }
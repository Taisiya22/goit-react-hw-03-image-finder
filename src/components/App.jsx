import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Searchbar } from './Searchbar/Searchbar';
import { imgApi } from './service/ApiService';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    selectedImage: null,
    page: 1,
    error: '',
    isLoading: false,
    alt: null
  };
  totalImage = null;
  async componentDidUpdate(_, prevState) {
    const { searchQuery, page} = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      // console.log(prevState.searchQuery);
      // console.log(this.state.searchQuery)

      this.setState({ isLoading: true });
      try {
        const responce = await imgApi(searchQuery, page);
        this.totalImage = responce.totalHits;
      
// console.log(responce.hits.length)
        if (responce.hits.length === 0) {
          this.setState({ images: []})
         toast.warning(
            'No results were found for your search, please try something else.'
          );
          
          return;
        }
         if (this.state.page === 1 && this.totalImage  !== 0) { 
          toast.success(`Hooray! We found ${this.totalImage } images.`);
        }
        console.log(this.state.images.length)
        // console.log(prevState.page)
        this.setState(prevState => ({
          images: [...prevState.images, ...responce.hits],
          // loadMore: page < this.totalImage  / 12,
        }));

        console.log(page)
        if (page > this.totalImage / 12) { 
        toast.info('Were sorry, but you ve reached the end of search results.')
        }
      } catch (error) {
        this.setState({ error });
        toast.error(`Whoops, something went wrong: ${error.message}`);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  loadMore = () => {
    this.setState(prevState => ({ 
      page: prevState.page + 1,
      isLoading: true,
    }));
  };

  openModal = (largeImageUrl, tags) => {
    this.setState({ selectedImage: largeImageUrl, alt: tags });
  };
  
  closeModal = () => {
    this.setState({ selectedImage: null });
  };

  handleFormSubmit = (searchQuery, selectedImage) => {
    this.setState({ searchQuery, selectedImage });
    
    if (searchQuery !== selectedImage) {
      this.setState({ images: [], loadMoreBtn: false, page: 1  });
    }
 
  };
 
  render() {
    const { selectedImage, isLoading, images, loadMore, page } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} totalImage ={this.totalImage  } />
        {images.length > 0 && (
          <ImageGallery images={images} openModal={this.openModal} />
        )}
        {selectedImage && (
          <Modal onClose={this.closeModal} selectedImage={selectedImage} alt={this.tags } />
        )}
        {isLoading && <Loader />}
        {images.length > 0 && page < this.totalImage  / 12 && (<Button onClick={this.loadMore}/>)}
        <ToastContainer autoClose={3000} theme="colored" pauseOnHover />
      </>
    );
  }
}

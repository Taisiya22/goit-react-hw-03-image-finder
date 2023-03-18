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
    loadMoreBtn: false,
    page: 1,
    error: '',
    isLoading: false,
    alt: null
  };
  totalpage = null;
  async componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      // console.log(prevState.searchQuery);
      // console.log(this.state.searchQuery)

      this.setState({ isLoading: true });
      try {
        const responce = await imgApi(searchQuery, page);
        this.totalpage = responce.totalHits;
        // console.log(this.totalpage);

        if (this.totalpage.length === 0) {
          this.setState({loadMoreBtn: false})
           toast.warning(
            'No results were found for your search, please try something else.'
          );
          return;
        }
         if (this.state.page === 1 && this.totalpage !== 0) { 
          toast.success(`Hooray! We found ${this.totalpage} images.`);
        }
        
        this.setState(prevState => ({
          images: [...prevState.images, ...responce.hits],
          loadMore: page < this.totalpage / 12,
        }));

        if (page > this.totalpage / 12) { 
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
      this.setState({ images: [] });
    }
  };

  render() {
    const { selectedImage, isLoading, images, loadMore } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} totalpage={this.totalpage } />
        {images.length > 0 && (
          <ImageGallery images={images} openModal={this.openModal} />
        )}
        {selectedImage && (
          <Modal onClose={this.closeModal} selectedImage={selectedImage} alt={this.tags } />
        )}
        {isLoading && <Loader />}
        {loadMore && <Button onClick={this.loadMore} />}
        <ToastContainer autoClose={3000} theme="colored" pauseOnHover />
      </>
    );
  }
}

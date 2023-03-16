import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Searchbar } from './Searchbar/Searchbar';
import { imgApi } from './service/ApiService';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    selectedImage: null,
    page: 1,
    status: 'idle',
  };
  totalHits = null;
  async componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      // console.log(prevState.searchQuery);
      // console.log(this.state.searchQuery)
      this.setState({ status: 'pending' });
      try {
        const responce = await imgApi(searchQuery, page);
        this.totalHits = responce.total;

        if (!responce.hits.length) {
          toast.warning(
            'No results were found for your search, please try something else.'
          );
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...responce.hits],
          status: 'resolved',
        }));
      } catch (error) {}
    }
  }

  closeModal = () => {
    this.setState({ selectedImage: null })
    
  }
  

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  render() {
    const { selectedImage } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ToastContainer autoClose={3000} theme="colored" pauseOnHover />
        <ImageGallery images={this.state.images} />
        {selectedImage && <Modal selectedImage={selectedImage} onClose={this.closeModal } />}
      </>
    );
  }
}
import { Component } from 'react';
import styles from 'styles/App.module.css';

import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { finderInstance } from 'api/client';
import { Button } from 'components/Button';
import { Modal } from 'components/Modal';

// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

// import { Oval } from 'react-loader-spinner';




class App extends Component {
  static defaultProps = {};

  static propTypes = {};

  state = {
    pictures: [],
    isLoading: false,
    error: null,

    lookingValue: '',
    page: 1,

    isModalOpen: false,
  };

  handleChange = event => {
    event.preventDefault();
    this.setState({ lookingValue: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    // console.log(this.state.lookingValue);
    try {
      const response = await finderInstance.get(
        `?q=${this.state.lookingValue}&page=${this.state.page}&key=26513861-7ba7a860ef1b492cf85cf7d68&&image_type=photo&orientation=horizontal&per_page=12`
      );
      console.log(response);
      this.setState({ pictures: response.data.hits, page: 2 });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleLoadMore = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });
    console.log(this.state.page);
    try {
      const response = await finderInstance.get(
        `?q=${this.state.lookingValue}&page=${this.state.page}&key=26513861-7ba7a860ef1b492cf85cf7d68&&image_type=photo&orientation=horizontal&per_page=12`
      );
      this.setState(prevState => ({
        pictures: [...prevState.pictures, ...response.data.hits],
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
    this.setState(prevState => {
      //console.log(prevState.page);
      return { page: prevState.page + 1 };
    });
  };

  handleModalOpenClose = () => {
    if (this.state.isModalOpen) {
      this.setState({ isModalOpen: false });
    } else {
      this.setState({ isModalOpen: true });
    }
  };

  handleModalCloseByKey = (event) => {
  console.log(event.code);  
  if (event.key === 'Escape' && this.state.isModalOpen) {
    this.setState({ isModalOpen: false });
    console.log(event.code);
  }
  };

  render() {
    const { pictures, lookingValue } = this.state;
    // console.log(pictures);
    return (
      <div className={styles.App}>
        <Searchbar
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
          value={lookingValue}
        />
        {/* <Oval color="#00BFFF" height={80} width={80} ariaLabel="loading" /> */}
        <ImageGallery>
          <ImageGalleryItem
            pictures={pictures}
            onClick={this.handleModalOpenClose}
          />
          <Modal
            isModalOpen={this.state.isModalOpen}
            onClick={this.handleModalOpenClose}
            onKeyPress={this.handleModalCloseByKey}
          />
        </ImageGallery>
        <Button pictures={pictures} onClick={this.handleLoadMore} />
      </div>
    );
  }
}


export default App;
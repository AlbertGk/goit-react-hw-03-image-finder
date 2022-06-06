import { Component } from 'react';
import styles from 'styles/App.module.css';

import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { finderInstance } from 'api/client';
import { Button } from 'components/Button';
import { Modal } from 'components/Modal';
import { Loader } from 'components/Loader';


class App extends Component {
  static defaultProps = {};

  static propTypes = {};

  state = {
    pictures: [],
    bigPicture: [],
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

  handleModalOpenClose = (id) => {
    if (this.state.isModalOpen) {
      this.setState({ isModalOpen: false });
    } else {
      this.setState({ isModalOpen: true });
    }

    const uniqueBigPicture = this.state.pictures.find(
      picture => picture.id === id
    );
    this.setState({ bigPicture: uniqueBigPicture });
    console.log(this.state.bigPicture);
  };

  handleModalCloseByKey = (event) => {
  console.log(event.code);  
  if (event.key === 'Escape' && this.state.isModalOpen) {
    this.setState({ isModalOpen: false });
    console.log(event.code);
  }
  };

  render() {
    const { pictures, lookingValue, isLoading } = this.state;
    // console.log(pictures);
    return (
      <div
        className={styles.App}
        onKeyDown={this.handleModalCloseByKey}
        tabIndex="-1"
        // onClick={this.handleModalOpenClose}
      >
        <Searchbar
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
          value={lookingValue}
        />

        <ImageGallery>
          <ImageGalleryItem
            pictures={pictures}
            onClick={this.handleModalOpenClose}
          />
        </ImageGallery>
        {isLoading && <Loader type="spin" color="#3f51b5" />}
        <Button
          pictures={pictures}
          onClick={this.handleLoadMore}
          isLoading={isLoading}
        />
        <Modal
          isModalOpen={this.state.isModalOpen}
          bigPicture={this.state.bigPicture}
          onClick={this.handleModalOpenClose}
        />
      </div>
    );
  }
}


export default App;
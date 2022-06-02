import { Component } from 'react';
import styles from 'styles/App.module.css';

import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { finderInstance } from 'api/client';

class App extends Component {
  static defaultProps = {};

  static propTypes = {};

  state = {
    pictures: [],
    isLoading: false,
    error: null,

    lookingValue: '',
    // q: '',
  };

  handleChange = event => {
    event.preventDefault();
    this.setState({ lookingValue: event.target.value });
  };

  // handleSubmit = event => {
  //   event.preventDefault();
  //   this.setState({ q: event.target.value });

  // };

  // async componentDidMount() {
  //   this.setState({ isLoading: true });

  //   try {
  //     const response = await finderInstance.get(
  //       `?q=${this.state.q}&page=1&key=26513861-7ba7a860ef1b492cf85cf7d68&&image_type=photo&orientation=horizontal&per_page=12`
  //     );
  //     this.setState({ pictures: response.data.hits });
  //     console.log(response);
  //   } catch (error) {
  //     this.setState({ error });
  //   } finally {
  //     this.setState({ isLoading: false });
  //   }
  // }

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
console.log(this.state.lookingValue);
    try {
      const response = await finderInstance.get(
        `?q=${this.state.lookingValue}&page=1&key=26513861-7ba7a860ef1b492cf85cf7d68&&image_type=photo&orientation=horizontal&per_page=12`
      );
      console.log(response);
      this.setState({ pictures: response.data.hits });
      
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { pictures, lookingValue } = this.state;
    console.log(pictures);
    return (
      <div className={styles.App}>
        <Searchbar
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
          value={lookingValue}
        />
        <ImageGallery>
          <ImageGalleryItem pictures={pictures} />
        </ImageGallery>
      </div>
    );
  }
}


export default App;
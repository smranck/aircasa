import React, { Component } from 'react';
import Lightbox from 'react-images';

export default class Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lightboxIsOpen: this.props.isOpen,
      currentImage: 0,
      formattedImages: [],
    };

    this.closeLightbox = this.closeLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
    this.gotoImage = this.gotoImage.bind(this);
    this.handleClickImage = this.handleClickImage.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.formatImages(nextProps.images);
    this.setState({ lightboxIsOpen: nextProps.isOpen });
  }

  formatImages(imagesArr) {
    const formattedImages = imagesArr.map(imageLink => ({ src: imageLink }));
    this.setState({ formattedImages });
  }

  openLightbox(index, event) {
    event.preventDefault();
    this.setState({
      currentImage: index,
      lightboxIsOpen: true,
    });
  }
  closeLightbox() {
    this.props.handleClick();
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }
  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }
  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }
  gotoImage(index) {
    this.setState({
      currentImage: index,
    });
  }
  handleClickImage() {
    if (this.state.currentImage === this.state.formattedImages.length - 1) return;

    this.gotoNext();
  }

  render() {
    return (
      <div className="section">
        <Lightbox
          currentImage={this.state.currentImage}
          images={this.state.formattedImages}
          isOpen={this.state.lightboxIsOpen}
          onClickImage={this.handleClickImage}
          onClickNext={this.gotoNext}
          onClickPrev={this.gotoPrevious}
          onClickThumbnail={this.gotoImage}
          onClose={this.closeLightbox}
        />
      </div>
    );
  }
}

// {
//   this.props.heading && <h2>{this.props.heading}</h2>;
// }
// {
//   this.props.subheading && <p>{this.props.subheading}</p>;
// }
// {
//   this.renderGallery();
// }

// showThumbnails={this.props.showThumbnails}
//           spinner={this.props.spinner}
//           spinnerColor={this.props.spinnerColor}
//           spinnerSize={this.props.spinnerSize}
//           theme={this.props.theme}

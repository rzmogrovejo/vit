import React from 'react'
import cookie from '../../../utils/cookie';
import { iModalForImages, iState } from './contracts';
import {
  Container,
  Backdrop,
  Content,
  CloseBtn,
  Image
} from './styles';

class ModalForImages extends React.Component<iModalForImages, iState>{

  constructor(props: iModalForImages) {
    super(props);
    this.state = {
      shouldHide: false
    };
  }

  static defaultProps: Partial<iModalForImages> = {
    imageWidth: '450px',
    linkTarget: '_self',
    showAgainInXHours: 0
  }

  onClick = () => {
    this.setState({
      shouldHide: true
    });
  }

  render() {
    const {
      id,
      image,
      link,
      imageWidth,
      linkTarget,
      showAgainInXHours = 0
    } = this.props;

    const cookieName = '__VIT_MODAL_FOR_IMAGES__' + id;

    if (!image) {
      return;
    }

    if (cookie.get(cookieName)) {
      return;
    }

    cookie.set(cookieName, true, showAgainInXHours);

    let picture = <Image src={image} width={imageWidth} alt="Anuncio" />

    if (link) {
      picture = (
        <a href={link} target={linkTarget}>
          {picture}
        </a>
      )
    }

    return (
      <Container shouldHide={this.state.shouldHide}>
        <Backdrop onClick={this.onClick}>
          <Content onClick={e => e.stopPropagation()}>
            <CloseBtn onClick={this.onClick}>&times;</CloseBtn>
            <div>
              {picture}
            </div>
          </Content>
        </Backdrop>
      </Container>
    );
  }
}

export default ModalForImages;

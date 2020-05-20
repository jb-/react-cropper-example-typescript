import React from 'react';
import Cropper from 'react-cropper';

interface IProps {
}
interface IState {
  src: string | ArrayBuffer | null;
  cropResult: string | undefined;
  isCropping: boolean;
}

export default class App extends React.Component<IProps, IState> {
  private cropper = React.createRef<Cropper>();
  private src = 'https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg';

  constructor(props: IProps) {
    super(props);
    this.state = {
      src: '',
      cropResult: undefined,
      isCropping: false,
    };
  }

  onFileChange(e: React.ChangeEvent<HTMLInputElement> & { dataTransfer?: DataTransfer }) {
    e.preventDefault();
    const files = e.dataTransfer?.files || e.target.files;
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ src: reader.result });
    }
    reader.readAsDataURL(files?.[0] || new Blob());
  }

  cropImage() {
    if (!this.cropper.current/*  || typeof this.cropper.current.getCroppedCanvas() === 'undefined' */) {
      return;
    }
    this.setState({
      isCropping: true,
    }, function() {
      this.setState({
        cropResult: this.cropper.current.getCroppedCanvas()!.toDataURL(),
      }, () => {
        this.setState({
          isCropping: false,
        });
      });
    });
  }

  useDefaultImage() {
    this.setState({ src: this.src }, () => {
      console.log('useDefaultImage: ', this.state.src);
    });
  }

  render() {
    const { cropResult, isCropping, src } = this.state;
    return (
      <div>
        <div style={{ width: '100%' }}>
          <input type="file" onChange={e => this.onFileChange(e)} />
          <button onClick={() => this.useDefaultImage()}>Use default img</button>
          <br />
          <br />
          <Cropper
            style={{ height: 400, width: '100%' }}
            aspectRatio={16 / 9}
            preview=".img-preview"
            guides={false}
            src={src as string}
            ref={this.cropper}
          />
        </div>
        <div>
          <div className="box" style={{ width: '50%', float: 'right' }}>
            <h1>Preview</h1>
            <div className="img-preview" style={{ width: '100%', float: 'left', height: 300 }} />
          </div>
          <div className="box" style={{ width: '50%', float: 'right' }}>
            <h1>
              <span>Crop</span>
              <button onClick={() => this.cropImage()} style={{ float: 'right' }}>
                Crop Image
              </button>
            </h1>
            {isCropping ? <>loading</> : <img style={{ width: '100%' }} src={cropResult} alt="cropped image" />}
          </div>
        </div>
        <br style={{ clear: 'both' }} />
      </div>
    );
  }
}

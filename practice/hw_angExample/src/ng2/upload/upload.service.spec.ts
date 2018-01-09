// tslint:disable:max-classes-per-file
import {UploadService} from './upload.service';

const baseFileParams = { maxFileSize: 1024, maxImageWidth: 100, maxImageHeigth: 50 };

class FakeFileReader {
  static instance;

  constructor() {
    FakeFileReader.instance = this;
  }

  readAsDataURL() {
    // pass
  }
}

class FakeImage {
  static instance;

  constructor() {
    FakeImage.instance = this;
  }
}

describe('UploadService ->', () => {
  let service: UploadService;
  let mocks: any;

  beforeEach(() => {
    mocks = {
      window: {
        FileReader: FakeFileReader,
        Image: FakeImage
      }
    };
    service = new UploadService(
      mocks.window
    );
  });

  afterEach(() => {
    FakeFileReader.instance = undefined;
    FakeImage.instance = undefined;
  });

  describe('getImgContent() ->', () => {
    it('should reject big file', (done) => {
      const file = <File> { size: 1030 };
      service
        .getImgContent({ ...baseFileParams, file })
        .catch(reason => {
          expect(reason).to.be.equal('big_file_size');
          done();
        });
    });

    const loadImg = (width, height) => {
      const file = <File> { size: 1000 };
      const prom = service.getImgContent({ ...baseFileParams, file });

      FakeFileReader.instance.result = 'base64;abcdef';
      FakeFileReader.instance.onloadend();

      FakeImage.instance.width = width;
      FakeImage.instance.height = height;
      FakeImage.instance.onload();

      return prom;
    };

    it('should reject big image width', (done) => {
      loadImg(100, 52)
        .catch(reason => {
          expect(reason).to.be.equal('big_image_size');
          done();
        });
    });

    it('should reject big image height', (done) => {
      loadImg(102, 50)
        .catch(reason => {
          expect(reason).to.be.equal('big_image_size');
          done();
        });
    });

    it('should accept correct image', (done) => {
      loadImg(100, 50)
        .then(result => {
          expect(result).to.be.equal('base64;abcdef');
          done();
        });
    });
  });

});

declare namespace cad {
  interface IUploadOptions {
    titlesRoot: string;
    uploadFn: Function;
    pattern: string;
    accept: string;
    maxSize: number;
  }
}

declare namespace cad {
  interface IWindowService extends ng.IWindowService {
    blockAdBlock: IBlockAdBlock;
  }

  interface IBlockAdBlock {
    on(boolean, Function);
  }
}

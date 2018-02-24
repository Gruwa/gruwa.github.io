export class CreateObject {
  create(data: any): void {
    Object.keys(data).forEach((key: string) => {
      if (key in this) {
        this[key]=data[key];
      }
    })
  }
}

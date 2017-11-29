export class Item {
  constructor(
    public id: number,
    public category: string,
    public imgUrl: string,
    public name?: string,
    public x?: number,
    public y?: number,
    public rotationAngle?: number,
  ) { }
}

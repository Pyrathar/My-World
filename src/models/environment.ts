import { Item } from "./item";

// TODO: make id not optional
export class Environment extends Item {
  public items: Item[];
  public backgroundUrl: string;
  constructor(
    name: string,
    imgUrl: string,
    backgroundUrl: string,
    items: any[],
    category?: string,
    id?: number,
  ) {
    super(id, category, imgUrl, name);
    this.backgroundUrl = backgroundUrl;
    this.items = items;
  }
}

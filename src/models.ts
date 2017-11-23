// FIXME: optimize classes
export class Patient {
  // id is a timestamp, which will be used as well as date/time when user was created
  constructor(
    public id: number,
    public name: string,
    public avatar: string,
    public note?: Note,
  ) { }
}

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

// TODO: make its own class
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

export class Note {
  constructor(
    public q1?: string,
    public q2a?: string,
    public q2b?: string,
    public q2c?: string,
    public q3a?: string,
    public q3b?: string,
    public q4?: string,
    public q5?: string,
    public q6a?: string,
    public q6b?: string,
    public q6c?: string,
    public q6d?: string,
    public q7?: string,
    public q8?: string,
  ) { }
}
// export class Environment {
//   constructor(
//     // public E_id: number,
//     public name: string,
//     public imgUrl: string,
//     public items?: any[]
//   ) { }
// }
// export class ItemPosition extends Item {
//   public x: number;
//   public y: number;
//   public rotationAngle: number;

//   constructor(
//     id: number,
//     category: string,
//     imgUrl: string,
//     x: number,
//     y: number,
//     rotationAngle: number,
//     name?: string
//   ) {
//     super(id, category, imgUrl);
//     this.x = x;
//     this.y = y;
//     this.rotationAngle = rotationAngle;
//   }
// }

export enum AvatarUrl {
  afro_boy,
  afro_girl,
  asian_boy,
  asian_girl,
  caucasis_boy,
  caucasis_girl,
  ginger_boy,
  mid_east_boy,
  mid_east_girl,
}

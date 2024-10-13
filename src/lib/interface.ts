export interface IBook {
  _id: string,
  title: string,
  abbreviation: string,
  amount: number,
  city: string,
  postedBy: {
    _id: string,
    name: string,
  }
  image: string,
  cloudinaryId: string,
  createdAt: string
}

export interface IConversation{
  _id: string,
  members: string[];
}
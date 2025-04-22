export class Article {
  constructor(
    public articleId: number,
    public articleName: string,
    public uniqueNumber: string,
    public canAssignQuantity: boolean
  ) {}
}
export class Quantity {
  constructor(
    public id: number,
    public parentId: number,
    public kolvo: number
  ) {}
}
  

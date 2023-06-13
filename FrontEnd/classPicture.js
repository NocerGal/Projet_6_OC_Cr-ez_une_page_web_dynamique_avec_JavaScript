export class classPicture {
  constructor(id, tittle, imageURL, categoryId, userId, category) {
    this.id = id;
    this.tittle = tittle;
    this.imageURL = imageURL;
    this.categoryId = categoryId;
    this.userId = userId;
    this.category = category;
  }
}

export class classCategory {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

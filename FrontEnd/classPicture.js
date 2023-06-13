export class classPicture {
  constructor(id, title, imageUrl, categoryId, userId, category) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
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

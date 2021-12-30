export class RollerCoaster {
  constructor({
    id,
    name,
    description,
    park,
    location,
    state,
    image,
    rating = 5,
    checkin = false,
    url,
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.park = park;
    this.location = location;
    this.state = state;
    this.image = image;
    this.rating = rating;
    this.checkin = checkin;
    this.url = url;
  }
}

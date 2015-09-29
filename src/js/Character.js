function Character(id, name) {
  this.id = id;
  this.name = name;
}

Character.prototype.getId = function () {
  return this.id;
};

Character.prototype.getName = function () {
  return this.name;
};
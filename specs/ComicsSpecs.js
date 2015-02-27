var seq = 0;
function createComic() {
  return new marvel.model.Comic({id: ++seq, title: "Comic " + seq});
}
describe("Las colecciones de Comics", function () {
  it("Saben si contienen un cómic", function () {
    var containedComic = createComic();
    var notContainerComic = createComic();
    var comics = new marvel.model.Comics([containedComic]);
    expect(comics.contains(containedComic)).toBeTruthy();
    expect(comics.contains(notContainerComic)).toBeFalsy();
  });
  it("Saben obtener la intersección con otra colección", function () {
    expect(true).toBeFalsy();
  });
});
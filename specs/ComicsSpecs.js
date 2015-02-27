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
  describe("Saben obtener la intersección con otra colección", function () {
    it("cuando ambas están vacías", function () {
      var comics1 = new marvel.model.Comics([]);
      var comics2 = new marvel.model.Comics([]);
      expect(comics1.intersection(comics2).length).toBe(0);
    });

    it("cuando una está vacía", function () {
      var comics1 = new marvel.model.Comics([createComic()]);
      var comics2 = new marvel.model.Comics([]);
      expect(comics1.intersection(comics2).length).toBe(0);
    });

    it("cuando no hay comics en común", function () {
      var comics1 = new marvel.model.Comics([createComic()]);
      var comics2 = new marvel.model.Comics([createComic()]);
      expect(comics1.intersection(comics2).length).toBe(0);
    });

    it("cuando hay comics en común", function () {
      var commonComic = createComic();
      var comics1 = new marvel.model.Comics([createComic(), commonComic]);
      var comics2 = new marvel.model.Comics([commonComic, createComic()]);

      var intersection = comics1.intersection(comics2);

      expect(intersection.length).toBe(1);
      expect(intersection[0]).toBe(commonComic);
    });
  });
});
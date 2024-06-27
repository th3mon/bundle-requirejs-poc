require(["one", "two", "three", "Models/two", "Models/one"], function (
  one,
  two,
  three,
  model,
  model2,
) {
  one.say();
  two.say();
  three.say();
  model.say();
  model2.say();
});

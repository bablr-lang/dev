export var createParseStrategy = function createParseStrategy(
  rootLanguage,
  rootMatcher,
  rootProps
) {
  return function (ctx) {
    return new StreamGenerator(parseStrategy(ctx, rootLanguage, rootMatcher, rootProps));
  };
};

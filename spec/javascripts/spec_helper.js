context = describe;
xcontext = xdescribe;

beforeEach(function(){
  this.addMatchers({
    toBeVisible: function(){
      this.message = function(){
        return [
          "Expected object: '" + jasmine.pp(this.actual) + "' to be visible but it was.",
          "Expected object: '" + jasmine.pp(this.actual) + "' to not be visible but it was."
        ];
      };

      return this.actual.css('display') !== 'none';
    },
    toHaveBeenCalledWithHashPair: function(key, val){
      if (!jasmine.isSpy(this.actual)) {
        throw new Error('Expected a spy, but got ' + jasmine.pp(this.actual) + '.');
      }

      this.message = function() {
        return [
          "Expected hash: '" + jasmine.pp(this.actual.mostRecentCall.args[0]) + "' to have " + key + ": " + val,
          "Expected hash: '" + jasmine.pp(this.actual.mostRecentCall.args[0]) + "' to not have " + key + ": " + val
        ];
      };

      return this.env.equals_(this.actual.mostRecentCall.args[0][key], val);
    }
  });
});

afterEach(function(){
  var testBody = $('#test');
  for(var eventType in testBody.data('events') ) {
    testBody.unbind(eventType);
  }
});
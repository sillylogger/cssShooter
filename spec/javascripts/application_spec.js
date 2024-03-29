require('/javascripts/jquery.js');
require('/javascripts/underscore.js');
require('/javascripts/backbone.js');
require('/javascripts/application.js');
require('/javascripts/models/target.js');
require('/javascripts/views/range_view.js');
require('/javascripts/views/target_view.js');

template('application.html');

describe('Application', function(){
    
  var body, mockRangeView;
  
  beforeEach(function(){
    body = $('#test');
    
    mockRangeView = jasmine.createSpyObj('mockRangeView', ['render']);
    spyOn(views, 'RangeView').andReturn(mockRangeView);
    
    Application.body = '#test';
    Application.initialize();
  });
    
  describe('initialize', function(){
    it('creates a RangeView', function(){
      expect(views.RangeView).toHaveBeenCalled();      
      var options = views.RangeView.mostRecentCall.args[0];
      expect(options.el.selector).toEqual('article');
    });

    it('creates a link for each Target in the sample data', function(){
      expect( $('nav a', body).size() ).toEqual( SampleData.Target.all.length )
      expect( $('nav a', body).first().data('target_id') ).toEqual( 0 ) // the id is the index
    });    
  });
  
  describe('navigation', function(){
    it("sets the RangeView's model do that Target on click", function(){
      expect(mockRangeView.model).toBeUndefined();
      $('nav a', body).first().click();
      expect(mockRangeView.model.attributes).toEqual( SampleData.Target.all[0]);
    });
    
    it("calls render the RangeView's model do that Target on click", function(){
      expect(mockRangeView.render).not.toHaveBeenCalled();
      $('nav a', body).first().click();
      expect(mockRangeView.render).toHaveBeenCalled();
    });  
  });
  
  describe('help', function(){
    var link, dl;
    
    beforeEach(function(){
      link = $('a:contains("help")', body);
      dl = $('dl', body);
    });
    
    it("opens the dl on click", function(){
      expect(dl).not.toBeVisible();
      link.click();
      expect(dl).toBeVisible();
    });
  });
  
});



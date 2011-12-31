require('/javascripts/jquery.js');
require('/javascripts/underscore.js');
require('/javascripts/backbone.js');
require('/javascripts/application.js');
require('/javascripts/models/target.js');
require('/javascripts/views/range_view.js');
require('/javascripts/views/target_view.js');

describe('RangeView', function(){
  
  var view, model;
  var mockTargetView;
    
  beforeEach(function(){
    mockTargetView = {
      render: function(){ return { el: $('<div id="mockTargetView"></div>')}; },
      shoot: jasmine.createSpy('mockTargetView.shoot')
    }
    spyOn(views, 'TargetView').andReturn(mockTargetView);
    
    model = new models.Target(SampleData.Target.all[0]);
    view = new views.RangeView({ el: $('#test'), model: model });    
  });
  
  describe("render", function(){
    
    beforeEach(function(){    
      view.render();      
    });

    it("has form input to enter your selector", function(){
      //TODO: toExist  --  jquery matchers
      expect( $('form input#selector', view.el).size() ).toEqual(1);
    });

    context("TargetView", function(){
      it('initializes one with the model', function(){
        expect(views.TargetView).toHaveBeenCalledWith({ model: model });
      });

      it('renders it into the dom', function(){
        expect( $('#mockTargetView', view.el).size() ).toEqual(1);
      });      
    });
    
  });
  
  describe("shoot - form submit", function(){
    var form, input;

    beforeEach(function(){
      spyOn(window, 'alert');
      view.render();
      form = $('form', view.el);
      input = $('input', form);
    });
  
    it('calls shoot on the view with the selected value', function(){
      var cssFourSelector = '#css $four selector';
      input.val(cssFourSelector);
      form.submit();
      expect(mockTargetView.shoot).toHaveBeenCalledWith(cssFourSelector);
    });

    it("it calls alert with shoot's results (true)", function(){
      form.submit();
      expect(window.alert).toHaveBeenCalled();
    });
  });
});



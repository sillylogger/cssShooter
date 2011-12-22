require('/javascripts/jquery.js');
require('/javascripts/underscore.js');
require('/javascripts/backbone.js');
require('/javascripts/application.js');
require('/javascripts/models/target.js');
require('/javascripts/views/target_view.js');

template('application.html');

describe('Application', function(){
    
  describe('initialize', function(){
    var mockTarget;
    var mockTargetHtml = 'hit me';
    
    beforeEach(function(){
      mockTarget = jasmine.createSpy('mockTarget');
      spyOn(models, 'Target').andReturn(mockTarget);
      
      mockTargetView = {
        render: function(){ return mockTargetHtml; },
        shoot: jasmine.createSpy('shoot').andReturn(true)
      };
      spyOn(views, 'TargetView').andReturn(mockTargetView);
      
      Application.initialize();
    });

    it('creates a target', function(){
      expect(models.Target).toHaveBeenCalled();

      var options = models.Target.mostRecentCall.args[0];
      expect(options).toEqual(SampleData.Target.all[0])
    });

    it('passes that target to the view', function(){
      expect(views.TargetView).toHaveBeenCalledWith({ model: mockTarget});
    });
    
    context('form submit', function(){
      var form, input;
      
      beforeEach(function(){
        form = $('article form');
        input = $('input', form);
      });
      
      it('calls shoot on the view with the selected value', function(){
        var cssFourSelector = '#css $four selector';
        input.val(cssFourSelector);
        form.submit();
        expect(mockTargetView.shoot).toHaveBeenCalledWith(cssFourSelector);
      });

      it("it calls alert with shoot's results (true)", function(){
        spyOn(window, 'alert');
        form.submit();
        expect(window.alert).toHaveBeenCalled();
      });
    });
  });
});



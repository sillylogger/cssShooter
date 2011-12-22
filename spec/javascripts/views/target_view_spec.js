require('/javascripts/jquery.js');
require('/javascripts/underscore.js');
require('/javascripts/backbone.js');
require('/javascripts/application.js');
require('/javascripts/models/target.js');
require('/javascripts/views/target_view.js');

describe('Target', function(){
  
  var view, model;
    
  beforeEach(function(){
    model = new models.Target(SampleData.Target.all[0]);
    view = new views.TargetView({ el: $('#test'), model: model });
  });

  describe("render", function(){
    it('puts the domScape in the view', function(){
      view.render();
      var text = $(view.el).html(); 
      expect( text ).toContain('Bystander');
      expect( text ).toContain('Target');
    });
    
    it('strips the "data-target" attribute off', function(){
      view.render();
      var text = $(view.el).html(); 
      expect( text ).not.toContain('data-target');
    });
    
    it('escapes everything', function(){
      view.render();
      var text = $(view.el).html(); 
      expect( text ).not.toContain('<')
      expect( text ).not.toContain('>')
    });
  });
  
  describe("shoot", function(){
    beforeEach(function(){
      view.render();
    });

    context('when you miss', function(){
      it('fails by hitting nothing', function(){
        expect( view.shoot('') ).toBeFalsy();        
      });
      
      it('fails by hitting everything', function(){
        expect( view.shoot('*') ).toBeFalsy();        
      });
    });

    context('when you hit only the target', function(){
      it('succeeds with "p span + span"', function(){
        expect( view.shoot('p span + span') ).toBeTruthy();
      });
      
      it('succeeds with "p span ~ span"', function(){
        expect( view.shoot('p span ~ span') ).toBeTruthy();
      });
      
      it('succeeds with "p span:last-of-type"', function(){
        expect( view.shoot('p span:last-of-type') ).toBeTruthy();
      });
      
      it('succeeds with "p span:nth-of-type(2)"', function(){
        expect( view.shoot('p span:nth-of-type(2)') ).toBeTruthy();
      });
      
      it('succeeds with "p span:last-child"', function(){
        expect( view.shoot('p span:last-child') ).toBeTruthy();
      });
      
      it('succeeds with "p span:nth-child(2)"', function(){
        expect( view.shoot('p span:nth-child(2)') ).toBeTruthy();
      });
    });    
  });
    
});



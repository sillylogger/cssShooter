models = {};
views = {};

SampleData = {
  Target: {
    all: [{
      domScape: '\
<p>Bystander</p>\n\
<p>Bystander</p>\n\
<p>Bystander</p>\n\
<p>\n\
  <span>Barrier</span>\n\
  <span data-target="true">Target</span>\n\
</p>',
      solution: 'p span:last-of-type'
    }]
  }
};

Application = {
    
	initialize: function(){
    var target = new models.Target(SampleData.Target.all[0]);
    var targetView = new views.TargetView({ model: target });
    $('article pre').replaceWith(targetView.render().el);
    
    $('article form').submit(function(){
      var result = targetView.shoot( $('input', this).val() );
      
      alert(result ? "Hole in One!" : "Keep tryin'");
      
      return false;
    });
	}

};

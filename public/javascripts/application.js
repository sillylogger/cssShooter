models = {};
views = {};

SampleData = {
  Target: {
    all: [{
      domScape: '\
<p>Bystander</p>\n\
<p>Innocent Bystander</p>\n\
<p>Bystander</p>\n\
<p>\n\
  <span>Barrier</span>\n\
  <span data-target="true">Zombie (the target)</span>\n\
</p>',
      solution: 'p span:last-of-type'
    }]
  }
};

Application = {
  
  nav: 'nav',
    
	initialize: function(){
	  var nav = $(this.nav);

    var rangeView = new views.RangeView({ el: $('article') });
	  
	  _.each( SampleData.Target.all, function(target, index) {
	    var link = $('<a href="#">').data('target_id', index).text('Level ' + index);
	    nav.append(link);
	  });
	  
	  $('nav a').bind('click', function(){
	    var link = $(this);
	    var targetData = SampleData.Target.all[ link.data('target_id') ];
	    rangeView.model = new models.Target(targetData);
	    rangeView.render();
	    return false;
	  });
	  
	}

};

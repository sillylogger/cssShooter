models = {};
views = {};

SampleData = {
  Target: {
    all: [{
      domScape: '\
<p data-target="true">Zombie</p>\n\
<div data-target="true">Bad Guy</div>\n\
<p data-target="true">Evil Doer</p>',
      solution: '*'
    },{
      domScape: '\
<p data-target="true">Zombie</p>\n\
<div>Innocent Bystander</div>\n\
<p data-target="true">Evil Doer</p>',
      solution: 'p'
    },{
        domScape: '\
<p>Lowly henchman</p>\n\
<div>Innocent Bystander</div>\n\
<p boss="true" data-target="true">Mr. Big Time Bad Guy</p>',
        note: 'Just go for the big guy',
        solution: 'p[boss=true]'
    },{
        domScape: '\
<a>Just a link</a>\n\
<p data-target="true">Bad Guy</p>\n\
<p data-target="true">Bad Guy</p>\n\
<a>Another link</a>\n\
<p>Innocent Bystander</p>',
        solution: 'p:not(p:last-child)'
    },{
      domScape: '\
<p>Bystander</p>\n\
<p>Innocent Bystander</p>\n\
<p>Bystander</p>\n\
<p>\n\
  <span>Barrier</span>\n\
  <span data-target="true">Zombie (the target)</span>\n\
</p>',
      solution: 'p span:last-of-type'
    },
    
    ]
  }
};

Application = {
  
  header: 'header',
  nav: 'nav',
    
	initialize: function(){
	  this._setupHelp();

    var rangeView = new views.RangeView({ el: $('article') });
    this._setupLevels(rangeView);
	},
	
	_setupHelp: function(){
	  var header = $(this.header);
	  var link = $('a:contains("help")', header);
	  var dl = $('dl', header);
	  
	  link.bind('click', function(){
	    dl.toggle();
	  });
	},
	
	_setupLevels: function(rangeView){
	  var nav = $(this.nav);
	  
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

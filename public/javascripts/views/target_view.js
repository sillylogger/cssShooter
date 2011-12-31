views.TargetView = Backbone.View.extend({
  
  tagName: 'pre',  
  className: 'target',

  initialize: function(options) {
    this.domScape = $('<pre>').append( $(this.model.get('domScape')) );    
    this.target = $("[data-target]", this.domScape).removeAttr('data-target');
  },
  
  render: function(){
    $(this.el).text( this.domScape.html() );
    return this; 
  },
  
  shoot: function(selector){
    var selected = $(selector, this.domScape);
    return _.isEqual( this.target.toArray() , selected.toArray() ); 
  }
  
});
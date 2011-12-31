views.RangeView = Backbone.View.extend({

  className: 'range',
  
  events: {
    'submit form': 'testShot'
  },
  
  initialize: function(){
    _.bindAll(this, 'testShot');
  },
  
  render: function(){
    var form = $('<form>');
    form.append( $('<label>').attr('for', 'selector').text('Try to write a css selector that matches just the target') );
    form.append( $('<input>').attr('id',  'selector').attr('name', 'selector').attr('placeholder', '#css.selector') );
    
    $(this.el).empty().append(form);

    this.targetView = new views.TargetView({ model: this.model });    
    $(this.el).append(this.targetView.render().el)

    return this; 
  }, 
  
  testShot: function(){
    var result = this.targetView.shoot( $('input', this.el).val() );
    window.alert(result ? "Bam! Headshot." : "Keep tryin'");
    return false;
  }
  
});
//ng.core.Component

var MyName = ng.core
  .Component({
    selector: 'a2Label',
    template: '<span>This is angular 2</span>'
  })
  .Class({
    constructor: function() {}
  });

export var XComponent = ng.core
  .Component({
    selector: 'a2Content',
    template: `<div><a2Label></a2Label></div>`,
    directives: [MyName]
  })
  .Class({
    constructor: function() {}
  });

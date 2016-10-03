
function onRun(context) {
	if(context.selection.count() != 2) {
		print("Selection is wrong");
		return;
	}
	var shape1 = context.selection[0];
	var shape2 = context.selection[1];
	var shape1_copy = [shape1 duplicate];
	var shape2_copy = [shape2 duplicate];
	var shape1_second_copy = [shape1_copy duplicate];
	var shape2_second_copy = [shape2_copy duplicate];

	var app = NSApplication.sharedApplication();
	var call_action = function(menuitem) {
		var action = menuitem.action();
		print(action);
		var target = app.targetForAction(action);
		print(target);
		
		var method_signature = [[target class] instanceMethodSignatureForSelector: action];
		var invocation = [NSInvocation invocationWithMethodSignature: method_signature];
		[invocation setTarget:target];
		[invocation setSelector: action];
		[invocation invoke];
	};
	var main_menu = app.mainMenu();
	var layer_menu = main_menu.itemWithTitle("Layer").submenu();
	var arrange_menu = main_menu.itemWithTitle("Arrange").submenu(); //[0] - bring forward
	var combine_menu = layer_menu.itemWithTitle("Combine").submenu();
	var paths_menu = layer_menu.itemWithTitle("Paths").submenu();

    var intersect = function() { call_action(combine_menu.itemWithTitle("Intersect")); };
    var subtract = function() { call_action(combine_menu.itemWithTitle("Subtract")); };
    var flatten = function() { call_action(paths_menu.itemWithTitle("Flatten")); };
    var move_to_front = function() { call_action(arrange_menu.itemWithTitle("Move To Front")); };


	[shape1 select:true byExpandingSelection:false];
	[shape2 select:true byExpandingSelection:true];
	intersect();
	flatten();

	[shape1_second_copy select:true byExpandingSelection:false];
	move_to_front();

	[shape2_second_copy select:true byExpandingSelection:false];
	move_to_front();

	[shape1_copy select:true byExpandingSelection:false];
	[shape2_second_copy select:true byExpandingSelection:true];
	subtract();
	flatten();

	[shape1_second_copy select:true byExpandingSelection:false];
	[shape2_copy select:true byExpandingSelection:true];
	subtract();
	flatten();

    var doc = context.document
	[[doc currentPage] deselectAllLayers];
};
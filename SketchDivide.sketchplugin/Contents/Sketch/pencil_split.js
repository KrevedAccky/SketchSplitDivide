// currently unused

function onRun(context) {
	if(context.selection.count() != 2) {
		print("Selection is wrong");
		return;
	}

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
	var combine_menu = layer_menu.itemWithTitle("Combine").submenu();
	var paths_menu = layer_menu.itemWithTitle("Paths").submenu();

    var subtract = function() { call_action(combine_menu.itemWithTitle("Subtract")); };
    var flatten = function() { call_action(paths_menu.itemWithTitle("Flatten")); };
    var split = function() { call_action(paths_menu.itemWithTitle("Split")); };
    var convert_to_outlines = function() { call_action(layer_menu.itemWithTitle("Convert to Outlines")); };

	var the_shape = context.selection[0]; // selection is always bottom to top layers
	[the_shape select:false byExpandingSelection:true];

    convert_to_outlines();

	[the_shape select:true byExpandingSelection:true];

    subtract();
    flatten();
    split();

    var doc = context.document
	[[doc currentPage] deselectAllLayers];
};
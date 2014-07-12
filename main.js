var lakeSelected = false;
var campfireSelected = false;

// Helper function that finds the btn class of a targeted li
var findBtnClass = function (target) {
	return $(target).attr('class');
};



var catchFire = function(clicked) {
	// Get index of clicked
	var currentIndex = $(clicked).parent().index();

	// Test for edge to set fire to left side
	if (currentIndex !== 0 && currentIndex !== 9 && currentIndex !== 18 && currentIndex !==27 && 
		currentIndex !== 36 && currentIndex !== 45 && currentIndex !== 54 && currentIndex !== 63 && 
		currentIndex !== 72) {
		
		var targetedLeftBtn = $(clicked).parent().prev().children();
		// Tests to make sure btn isn't already on fire	
		if(findBtnClass(targetedLeftBtn) !== 'btn btn-warning' && 
			findBtnClass(targetedLeftBtn) !== 'btn btn-danger') {

			$(targetedLeftBtn).removeClass('btn-default').removeClass('btn-info');
			$(targetedLeftBtn).addClass('btn-warning');
		}
	}
	// Test for edge to set fire to right side
	if (currentIndex !== 8 && currentIndex !== 17 && currentIndex !== 26 && currentIndex !==35 &&
		currentIndex !== 44 && currentIndex !== 53 && currentIndex !== 62 && currentIndex !== 71 &&
		currentIndex !== 80) {
		var targetedRightBtn = $(clicked).parent().next().children();
		// Tests to make sure targeted btn isn't already on fire
		if(findBtnClass(targetedRightBtn) !== 'btn btn-warning' && 
			findBtnClass(targetedRightBtn) !== 'btn btn-danger') {

			$(targetedRightBtn).removeClass('btn-default').removeClass('btn-info');
			$(targetedRightBtn).addClass('btn-warning');
		}	
	}
	
	// Test if above exists and set fire
	if (currentIndex > 8) {
		var temp = 'li:eq(' + (currentIndex-9) + ')';
		var targetedTopBtn = $(temp).children();

		// Test to make sure targeted btn isn't already on fire
		if (findBtnClass(targetedTopBtn) !== 'btn btn-warning' && 
			findBtnClass(targetedTopBtn) !== 'btn btn-danger') {
			$(targetedTopBtn).removeClass('btn-default').removeClass('btn-info');
			$(targetedTopBtn).addClass('btn-warning');
		}
	}

	// Test if below exists and set fire
	if (currentIndex < 72) {
		var temp = 'li:eq(' + (currentIndex + 9) + ')';
		var targetedBottomBtn = $(temp).children();
		// Tests if targeted btn is alrady on fire
		if (findBtnClass(targetedBottomBtn) !== 'btn btn-warning' && 
			findBtnClass(targetedBottomBtn) !== 'btn btn-danger') {
			$(targetedBottomBtn).removeClass('btn-default').removeClass('btn-info');
			$(targetedBottomBtn).addClass('btn-warning');
		}
	}
};

var spreadFire = function() {
	setInterval(function () {
		// Loops thru all li's
		for(var i=0; i < $('li').length; i++) {
			var temp = 'li:eq(' + i + ')';
			if($(temp).children().attr('class') === 'btn btn-warning') {
				var onFire = $(temp).children();
				catchFire(onFire);
			}
		}
	}, 4000);
};

$(document).on('ready', function() {

	$(document).on('click', '#lake', function () {
		$(this).addClass('border');
		$('#campfire').removeClass('border');
		lakeSelected = true;
		campfireSelected = false;
	});

	$(document).on('click', '#campfire', function () {
		$(this).addClass('border');
		$('#lake').removeClass('border');
		campfireSelected = true;
		lakeSelected = false;
	});

	$(document).on('click', '#land li a', function () {
		if(lakeSelected) {
			$(this).removeClass('btn-default');
			$(this).removeClass('btn-danger')
			$(this).addClass('btn-info');
		}
		if(campfireSelected) {
			$(this).removeClass('btn-default');
			$(this).removeClass('btn-info');			
			$(this).addClass('btn-danger');
		
			var self = $(this);
			catchFire(this);


		}
	});

});
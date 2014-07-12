var lakeSelected = false;
var campfireSelected = false;

var catchFire = function(clicked) {
	// Get index of clicked
	var currentIndex = $(clicked).parent().index();

	// Test for edge to set fire to left side
	if (currentIndex !== 0 && currentIndex !== 9 && currentIndex !== 18 && currentIndex !==27 && 
		currentIndex !== 36 && currentIndex !== 45 && currentIndex !== 54 && currentIndex !== 63 && 
		currentIndex !== 72) {
			$(clicked).parent().prev().children().removeClass('btn-default').removeClass('btn-info');
			$(clicked).parent().prev().children().addClass('btn-warning');
		}
	// Test for edge to set fire to right side
	if (currentIndex !== 8 && currentIndex !== 17 && currentIndex !== 26 && currentIndex !==35 &&
		currentIndex !== 44 && currentIndex !== 53 && currentIndex !== 62 && currentIndex !== 71 &&
		currentIndex !== 80) {
			$(clicked).parent().next().children().removeClass('btn-default').removeClass('btn-info');
			$(clicked).parent().next().children().addClass('btn-warning');
		}
	
	// Test if above exists and set fire
	if (currentIndex > 8) {

		var temp = 'li:eq(' + (currentIndex-9) + ')';
		$(temp).children().removeClass('btn-default').removeClass('btn-info');
		$(temp).children().addClass('btn-warning');
	}

	// Test if below exists and set fire
	if (currentIndex < 72) {
		var temp = 'li:eq(' + (currentIndex + 9) + ')';
		$(temp).children().removeClass('btn-default').removeClass('btn-info');
		$(temp).children().addClass('btn-warning');
	}
};

var spreadFire = function() {
	setInterval(function () {
		for(var i=0; i < $('li').length; i++) {
			var temp = 'li:eq(' + i + ')';
			if($(temp).children().attr('class') === 'btn btn-warning') {
				var onFire = $(temp).children();
				catchFire(onFire);
			}
		}
	}, 2000);
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
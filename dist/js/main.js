jQuery(document).ready(function($) {
	$('h1').on('click', function() {
		$(this).css({
			"color": 'red',
			"text-decoration": 'line-through'
		});
	});
});
	

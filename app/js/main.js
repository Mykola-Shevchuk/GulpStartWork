$(document).ready(function($) {

	/*MENU HOVERS*/

	var $headerLinks = $('.header-menu a'),
		$menuCatalogLinks = $('.menu-catalog a');

	function sortLinks(variable) {
		variable.on('click', function(event) {
			event.preventDefault();

			variable.each(function(index, el) {
				$(el).removeClass('active')
			});

			$(this).addClass('active');
		});
	} 

	sortLinks($headerLinks);
	sortLinks($menuCatalogLinks);

	/*CURRENCY AND LANUAGES NAV BAR*/

		$('.right-nav-bar-navigation').on('click', 'li', function() {
			$(this).find('ul').toggleClass('down-arrow');
			$(this).find('ul:last-child').slideToggle();
		});

});
	

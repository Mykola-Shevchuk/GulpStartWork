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

	var $currencyPanel = $('.currency-panel'),
		$currency = $currencyPanel.find('.currency'),
		$languagesPanel = $('.languages-panel'),
		$languages = $languagesPanel.find('.languages');

		$currencyPanel.on('click', function() {
			$currencyPanel.find('ul').toggleClass('down-arrow');
			$currency.slideToggle();
		});

		$languagesPanel.on('click', function() {
			$languagesPanel.find('ul').toggleClass('down-arrow');
			$languages.slideToggle();
		});

});
	

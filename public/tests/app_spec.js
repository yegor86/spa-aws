/***
 * Excerpted from "Serverless Single Page Apps",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/brapps for more book information.
***/
describe('SPA', function() {
	it('can show a problem view', function() {
		spa.showView('#problem-1');
		expect($('.view-container .problem-view').length).toEqual(1);
	});

	it('can show a landing view', function() {
		spa.showView('');
		expect($('.view-container .landing-view').length).toEqual(1);
	});

	it('pass the hash view parmeter to the view function', function() {
		spyOn(spa, 'problemView');
		spa.showView('#problem-42');
		expect(spa.problemView).toHaveBeenCalledWith('42');
	});

	it('invokes the router when loaded', function(){
		spyOn(spa, 'showView');
		spa.appOnReady();
		expect(spa.showView).toHaveBeenCalledWith(window.location.hash);
	});

	it('subscribe to the hash change event', function(){
		spa.appOnReady();
		spyOn(spa, 'showView');
		$(window).trigger('hashchange');
		expect(spa.showView).toHaveBeenCalledWith(window.location.hash);
	});


	describe('problem view', function() {
		var view;
		beforeEach(function(){
			view = spa.problemView('1');
		});

		it('it has a title that includes the problem number', function() {
			expect(view.text()).toEqual('Problem #1');
		});

		describe('answer section', function() {
			
			it('can check a correct answer by hitting a button', function(){
				view.find('.answer').val('true');
				view.find('.check-btn').click();
				expect(view.find('.result').text()).toEqual('Correct');
			});

			it('reject an incorrect answer', function(){
				view.find('.answer').val('false');
				view.find('.check-btn').click();
				expect(view.find('.result').text()).toEqual('Incorrect');
			});
		});
	});
});

'use strict';

var spa = {};

spa.problems = [{
		description: "Are we alone?",
		code: "function problem(){return __;}"
	},{
		description: "Do we have only one universe?",
		code: "function problem(){return 42 === 6*__;}"
	}
];

spa.problemView = function(data) {
	var problemNumber = parseInt(data, 10);
	var view = $('.templates .problem-view').clone();
	var problemData = spa.problems[problemNumber - 1];
	var resultFlash = view.find('.result');

	function checkAnswer(){
		var answer = view.find('.answer').val();
		var test = problemData.code.replace('__', answer) + '; problem();';
		return eval(test);
	}

	function checkAnswerClick(){
		if (checkAnswer()){
			var correctFlash = spa.buildCorrectFlash(problemNumber);
			spa.flashElement(resultFlash, correctFlash);
		} else {
			spa.flashElement(resultFlash, 'Incorrect');
		}
		return false;
	}

	view.find('.check-btn').click(checkAnswerClick);
	view.find('.title').text('Problem #' + problemNumber);
	spa.applyObject(spa.problems[problemNumber - 1], view);
	return view;
}

spa.landingView = function(){
	return spa.template('landing-view');
}

spa.showView = function(hash) {

	var routes = {
		'': spa.landingView,
		'#': spa.landingView,
		'#problem': spa.problemView
	};
	var parts = hash.split('-');
	var viewFn = routes[parts[0]];
	if (viewFn) {
		$('.view-container').empty().append(viewFn(parts[1]));
	}
}

spa.appOnReady = function() {
	window.onhashchange = function(){
		spa.showView(window.location.hash);
	};
	spa.showView(window.location.hash);
}

spa.applyObject = function(obj, elem) {
	for (var key in obj){
		elem.find('[data-name="' + key + '"]').text(obj[key]);
	}
}

spa.template = function(name) {
	return $('.templates .' + name).clone();
}

spa.flashElement = function(elem, content){
	elem.fadeOut('fast', function(){
		elem.html(content);
		elem.fadeIn();	
	});
}

spa.buildCorrectFlash = function(problemNumber){
	var correctFlash = spa.template('correct-flash');
	var link = correctFlash.find('a');
	if (problemNumber < spa.problems.length) {
		link.attr('href', '#problem-' + (problemNumber + 1));
	} else {
		link.attr('href', '');
		link.text('You are finished');
	}
	return correctFlash;
}
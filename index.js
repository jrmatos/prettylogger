var moment = require('moment'),
	colors = require('colors');

var colorsArr = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];

module.exports = function (options) {

	var color = options ? options.color : null; 
	var print = printColor(color);

	return function () {
		var args = objectsToString([].slice.call(arguments)),
			reports = [],
			timeFormat = 'HH:mm:ss'
			time = true;

		if(options) {
			options.module ? reports.push(options.module) : null;
			timeFormat = options.timeFormat ? options.timeFormat : timeFormat;
			time = options.time === false ? false: true;
		}

		time ? reports.push(moment().format(timeFormat)) : null;

		print(reports.join(' ') || null, args);
	}
}

function objectsToString(arguments) {
	for(var item in arguments) {
		if(arguments.hasOwnProperty(item)) {
			if(typeof arguments[item] === 'object') {
				arguments[item] = JSON.stringify(arguments[item], null, '\t');
			}
		}
	}
	return arguments.join(' ');
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function printColor(color) {
	var _color = false;

	if(color) {
		_color = (color === 'random') ? colorsArr[getRandomInt(0, colorsArr.length - 1)] : color;
		_color = colorsArr.indexOf(_color) > -1 ? _color : false;
	}

	return function (reports, str) {
		_color ? console.log(reports.grey, str[_color]) : console.log(reports.grey, str);
	}
}
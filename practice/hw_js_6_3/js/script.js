'use strict';

var timer = document.getElementById('outTimer');
var startPauseBtn = document.getElementById('startPause');
var clearBtn = document.getElementById('clear');
var splitBtn = document.getElementById('split');
var number = 0;
var watch = new Stopwatch(timer);

startPauseBtn.addEventListener('click', function () {
    if (watch.isOn) {
        watch.stop();
        startPauseBtn.textContent = 'Start';
        watch.result();
    } else {
        watch.start();
        startPauseBtn.textContent = 'Pause';
    };

});
clearBtn.addEventListener('click', function() {
    if (watch.isOn) {
        startPauseBtn.textContent = 'Start';
    };
    watch.reset();
    $("p").remove(".pList");
    number = 0;
});
splitBtn.addEventListener('click', function() {
    watch.split();
});

function Stopwatch(elem) {
        var time = 0;
        var interval;
        var offset;
        this.isOn = false;
        this.start = function() {
                if (!this.isOn) {
                    interval = setInterval(this.update.bind(this), 10);
                    offset = Date.now();
                    this.isOn = true;
                };
            };
        this.stop = function () {
                if (this.isOn) {
                    clearInterval(interval);
                    interval = null;
                    this.isOn = false;
                };
            };
        this.reset = function () {
                clearInterval(interval);
                interval = null;
                this.isOn = false;
                time = 0;
                this.update();
            };
        this.split = function() {
            this.result();
        };
        this.update = function() {
                if (this.isOn) {
                    time += delta();
                };
                var formattedTime = timeFormatter(time);
                elem.textContent = formattedTime;
            }
        this.result = function() {
            var element = document.createElement('p');
            var box = document.getElementsByClassName('content');
            if (!watch.isOn) {
                element.innerHTML = ++number + '. ' + 'Stop ' + timer.innerHTML;
            } if (watch.isOn) {
                element.innerHTML = ++number + '. ' + 'Split ' + timer.innerHTML;
            } else {};
            element.classList.add('pList');
            box[0].insertBefore(element, element.nextSibling);
        }
        function delta() {
                var now = Date.now();
                var timePassed = now - offset;
                offset = now;
                return timePassed;
            }
        function timeFormatter(timeInMilliseconds) {
                var time = new Date(timeInMilliseconds);
                var hours = '0';
                var minutes = time.getMinutes().toString();
                var seconds = time.getSeconds().toString();
                var milliseconds = time.getMilliseconds().toString();

                if (hours.length < 2) {
                    hours = '0' + hours;
                }
                if (minutes.length < 2) {
                    minutes = '0' + minutes;
                }
                if (seconds.length < 2) {
                    seconds = '0' + seconds;
                }
                while (milliseconds.length < 3) {
                    milliseconds = '0' + milliseconds;
                }
                return hours + ' : ' + minutes + ' : ' + seconds + ' : ' + milliseconds
            }

    }

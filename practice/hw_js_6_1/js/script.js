'use strict';

var timer = document.getElementById('outTimer');
var startPauseBtn = document.getElementById('startPause');
var clearBtn = document.getElementById('clear');
var watch = new Stopwatch(timer);

startPauseBtn.addEventListener('click', function () {
    if (watch.isOn) {
        watch.stop();
        startPauseBtn.textContent = 'Start';
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
        this.update = function() {
                if (this.isOn) {
                    time += delta();
                };
                var formattedTime = timeFormatter(time);
                elem.textContent = formattedTime;
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

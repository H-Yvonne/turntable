/**
 * @author HY
 * @create 2018.6.21
 */
(function(root, factory) {
    if (typeof exports === 'object') {
        const $ = require('../lib/jquery.min.js');
        require('../lib/jQueryRotate.js');
        module.exports = factory($);
    } else if (typeof define === 'function' && define.amd) {
        define(['../lib/jquery.min.js', '../lib/jQueryRotate.js'], function($) {
            return (root.turntable = factory($));
        });
    } else {
        root.turntable = factory();
    }
})(this, function($) {
    let Turntable = function(config, turnWheel) {
        this.init(config, turnWheel);
    };
    Turntable.prototype = {
        config: {
            mainWrap: '', //装在canvas容器
            startAngle: 0,
            bRotate: false
        },
        init: function(config, turnWheel) {
            for (let o in config) {
                this.config[o] = config[o];
            }
            this.startRotate = this.startRotate;
            this.turnWheel = turnWheel;
            this.drawTurntable();
        },
        drawTurntable: function() {
            this.createElement();
            this.drawWheelCanvas();
        },
        //create element
        createElement: function() {
            document.querySelector(this.config.mainWrap).innerHTML = '';
            this.ele = document.createElement('canvas');
            this.ele.id = 'wheelCanvas';
            this.resizeCanvas();
        },
        //resize canvas
        resizeCanvas: function() {
            const width = document.querySelector(this.config.mainWrap).clientWidth,
                height = document.querySelector(this.config.mainWrap).clientHeight;
            this.size = {
                w: width,
                h: height ? height : width,
                outerRadius: (482 / 568) * width / 2,
                innerRadius: (145 / 568) * width / 2,
                textRadius: (420 / 568) * width / 2
            };
            document.querySelector(this.config.mainWrap).appendChild(this.ele);
            this.ctx = this.ele.getContext('2d');
            this.ctx.save();
            this.adjustRatio(this.ctx);
            this.ctx.restore();
            // this.setCanvasBg();
            // if (this.config.canEve) {
            //     this.bindEvent();
            // }
        },
        adjustRatio: function(ctx) {
            var backingStore = ctx.backingStorePixelRatio ||
                ctx.webkitBackingStorePixelRatio ||
                ctx.mozBackingStorePixelRatio ||
                ctx.msBackingStorePixelRatio ||
                ctx.oBackingStorePixelRatio ||
                ctx.backingStorePixelRatio || 1;
            pixelRatio = (window.devicePixelRatio || 1) / backingStore;
            ctx.canvas.width = this.size.w * pixelRatio;
            ctx.canvas.height = this.size.h * pixelRatio;
            ctx.canvas.style.width = this.size.w + 'px';
            ctx.canvas.style.height = this.size.h + 'px';
            ctx.scale(pixelRatio, pixelRatio);
        },
        drawWheelCanvas: function() {
            const baseAngle = Math.PI * 2 / (this.turnWheel.rewardNames.length);
            this.ctx.clearRect(0, 0, this.size.w, this.size.h);
            this.ctx.strokeStyle = 'rgba(0,0,0,0)';
            this.ctx.font = '16px Microsoft Yahei, PingFang SC';
            for (let i = 0, len = this.turnWheel.rewardNames.length; i < len; i++) {
                this.renderTurntableBg(baseAngle, i);
                this.renderTurntableText(baseAngle, i);
            }
        },
        renderTurntableBg: function(baseAngle, i) {
            const angle = this.config.startAngle + i * baseAngle;
            this.ctx.fillStyle = this.turnWheel.colors[i];
            this.ctx.beginPath();
            this.ctx.arc(this.size.w * 0.5, this.size.h * 0.5, this.size.outerRadius, angle, angle + baseAngle, false);
            this.ctx.arc(this.size.w * 0.5, this.size.h * 0.5, this.size.innerRadius, angle + baseAngle, angle, true);
            this.ctx.stroke();
            this.ctx.fill();
            this.ctx.save();
        },
        renderTurntableText: function(baseAngle, i) {
            const angle = this.config.startAngle + i * baseAngle;
            this.ctx.fillStyle = 'black';
            const rewardName = this.turnWheel.rewardNames[i];
            // const line_height = 17;
            const translateX = this.size.w * 0.5 + Math.cos(angle + baseAngle / 2) * this.size.textRadius;
            const translateY = this.size.h * 0.5 + Math.sin(angle + baseAngle / 2) * this.size.textRadius;
            this.ctx.translate(translateX, translateY);
            this.ctx.rotate(angle + baseAngle / 2 + Math.PI / 2);
            this.ctx.fillText(rewardName, -this.ctx.measureText(rewardName).width / 2, 0);
            this.ctx.restore();
        },
        startRotate: function() {
            if (this.config.bRotate) return;
            this.config.bRotate = !this.config.bRotate;
            const count = this.turnWheel.rewardNames.length;
            const item = this.randomNum(0, count - 1);
            this.rotateFunction(item, this.turnWheel.rewardNames[item], count);
        },
        randomNum: function(n, m) {
            var random = Math.floor(Math.random() * (m - n)) + n;
            return random;
        },
        rotateFunction: function(item, tip, count) {
            const self = this;
            const baseAngle = 360 / count;
            const angles = 360 * 3 / 4 - (item * baseAngle) - baseAngle / 2;
            $('#wheelCanvas').stopRotate();
            $('#wheelCanvas').rotate({
                angle: 0,
                animateTo: angles + 360 * 10, // 这里多旋转了5圈，圈数越多，转的越快
                duration: 8000,
                callback: function() { // 回调方法
                    // $("#tip").text(tip);
                    console.log(tip);
                    self.config.bRotate = !self.config.bRotate;
                    // if (isMobile.any()) // 判断是否移动设备
                    // {
                    //     // 调OC代码
                    //     window.location.href = "turntable://test.com?" + "index=" + item + "&tip=" + tip;
                    // }
                }
            });
        }
    }
    return Turntable;
});
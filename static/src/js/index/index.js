/**
 * @author HY
 * @create 2018.6.20
 */
const $ = require('../lib/jquery.min.js');
const Turntable = require('../module/turntable.js');
(function() {
    let turntable = '';
    const init = () => {
        initTurntable();
        mouseEvent();
    };

    const initTurntable = () => {
        turntable = new Turntable({
            mainWrap: '.turntable-wheel-canvas'
        }, {
            rewardNames: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            colors: ['#db1316', '#ff3e1e', '#ff1d83', '#fe9ece', '#b0100e', '#ff1800', '#ff0e00', '#b054af', '#ff3300', '#c10064', '#7d0000', '#4a1111']
        });
    };

    const mouseEvent = () => {
        $('div.turntable-container').on('click', 'a.turntable-start-btn', function() {
            const img = $(this).find('img');
            img.attr('src', './static/dist/images/index/start-btn1.png');
            turntable.startRotate();
            setTimeout(function() {
                img.attr('src', './static/dist/images/index/start-btn.png');
            }, 200);
        });
    };

    $(init);
})();
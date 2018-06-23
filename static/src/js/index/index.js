/**
 * @author HY
 * @create 2018.6.20
 */
const $ = require('../lib/jquery.min.js');
const Turntable = require('../module/turntable.js');
(function() {
    let turntable = '',
        count = 0,
        startLock = false;
    const init = () => {
        isFirstLogin();
        // getCountAndAwardNum();
        getRewardFromServer();
        mouseEvent();
        dialogMouseEvent();
    };

    const isFirstLogin = () => {
        showLoginDialog();
        return;
        $.get('', {}, function(data) {
            if (data.code == 1) {

            } else {

            }
        }, 'json');
    };

    const showLoginDialog = () => {
        const html = `<div class="js-dialog-wrap">
                    <div class="turntable-dialog-bg"></div>
                    <div class="turntable-dialog-smBg">
                        <p class="turntable-dialog-title">登录成功</p>
                        <p class="turntable-dialog-login">恭喜您获得登录奖励 抽奖券 <b>+2</b></p>
                        <a href="javascript:;" class="turntable-icons turntable-dialog-btn" nt="js-close-btn">进入游戏</a>
                    </div>
                </div>`;
        $('body').append(html);
    };

    const getRewardFromServer = () => {
        initTurntable();
        return;
        $.get('', {}, function(data) {
            if (data.code == 1) {

            } else {

            }
        }, 'json');
    }

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
            if (count <= 0) {
                showShareDialog();
                return;
            }
            if (startLock) return;
            startLock = true;
            count--;
            const img = $(this).find('img');
            img.attr('src', './static/dist/images/index/start-btn1.png');
            turntable.startRotate();
            setTimeout(function() {
                img.attr('src', './static/dist/images/index/start-btn.png');
            }, 200);
        }).on('click', 'a.turntable-rule-btn', function() {
            showRuleDialog();
        }).on('click', 'a.turntable-ticket-btn', function() {
            showRechargeDialog();
        });
    };

    const showShareDialog = () => {
        const html = `<div>
                        <div class="turntable-dialog-bg"></div>
                        <div class="turntable-dialog-smBg">
                            <p class="turntable-dialog-title">分享得奖券啦~</p>
                            <p class="turntable-dialog-share">你的抽奖券已经用完了，分享到微信群可以再获得 <b>+1</b> 抽奖券哦~</p>
                            <a href="javascript:;" class="turntable-icons turntable-dialog-btn">分享到群</a>
                        </div>
                    </div>`;
        $('body').append(html);
    };

    const showRuleDialog = () => {
        const html = `<div class="js-dialog-wrap">
                        <div class="turntable-dialog-bg"></div>
                        <div class="turntable-dialog-mdBg turntable-dialog-rule">
                            <div>
                                <p class="dialog-rule-title">游戏规则</p>
                                <p class="dialog-rule-text">游戏规则内容游戏规则内容游戏规则内容游戏规则内容游戏规则内容游戏规则内容</p>
                            </div>
                            <a href="javascript:;" class="turntable-icons dialog-send-btn" nt="js-close-btn">开始游戏</a>
                        </div>
                    </div>`;
        $('body').append(html);
    };

    const showRechargeDialog = () => {
        const html = `<div class="js-dialog-wrap">
                        <div class="turntable-dialog-bg"></div>
                        <div class="turntable-dialog-lgBg">
                            <div class="turntable-icons turntable-dialog-head">购买抽奖券</div>
                            <a href="javascript:;" class="turntable-icons turntable-dialog-close" nt="js-close-btn"></a>
                            <div>
                                <div class="dialog-common-title dialog-buy-title clearfix">
                                    <i class="fl turntable-icons"></i>
                                    <div class="fl">
                                        <p class="title">剩余抽奖券：<b>2</b></p>
                                        <p class="text">抽奖券可用于抽奖</p>
                                    </div>
                                </div>
                                <div>
                                    <ul class="dialog-common-list clearfix">
                                        <li class="it it-discount">
                                            <div class="turntable-icons dialog-buy-label"></div>
                                            <div class="dialog-common-item dialog-buy-item clearfix">
                                                <div class="fl clearfix">
                                                    <i class="fl turntable-icons"></i>
                                                    <b class="fl"><span>x</span>2</b>
                                                </div>
                                                <div class="fr">
                                                    <a href="javascript:;" class="turntable-icons buy-btn"><u>￥</u>2.00</a>
                                                    <u class="origin-price">￥5.oo</u>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="it it-recomand">
                                            <div class="turntable-icons dialog-buy-label"></div>
                                            <div class="dialog-common-item dialog-buy-item clearfix">
                                                <div class="fl clearfix">
                                                    <i class="fl turntable-icons"></i>
                                                    <b class="fl"><span>x</span>5</b>
                                                </div>
                                                <div class="fr">
                                                    <a href="javascript:;" class="turntable-icons buy-btn"><u>￥</u>5.00</a>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="it">
                                            <div class="dialog-common-item dialog-buy-item clearfix">
                                                <div class="fl clearfix">
                                                    <i class="fl turntable-icons"></i>
                                                    <b class="fl"><span>x</span>10</b>
                                                </div>
                                                <div class="fr">
                                                    <a href="javascript:;" class="turntable-icons buy-btn"><u>￥</u>10.00</a>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="it">
                                            <div class="dialog-common-item dialog-buy-item clearfix">
                                                <div class="fl clearfix">
                                                    <i class="fl turntable-icons"></i>
                                                    <b class="fl"><span>x</span>20</b>
                                                </div>
                                                <div class="fr">
                                                    <a href="javascript:;" class="turntable-icons buy-btn"><u>￥</u>20.00</a>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="it">
                                            <div class="dialog-common-item dialog-buy-item clearfix">
                                                <div class="fl clearfix">
                                                    <i class="fl turntable-icons"></i>
                                                    <b class="fl"><span>x</span>30</b>
                                                </div>
                                                <div class="fr">
                                                    <a href="javascript:;" class="turntable-icons buy-btn"><u>￥</u>30.00</a>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>`;
        $('body').append(html);
    };

    const dialogMouseEvent = () => {
        $('body').on('click', 'a[nt="js-close-btn"]', function() {
            $('div.js-dialog-wrap').remove();
        });
    };

    $(init);
})();
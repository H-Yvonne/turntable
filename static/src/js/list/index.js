/**
 * @author HY
 * @create 2018.6.23
 */
const $ = require('../lib/jquery.min.js');
(function() {
    const init = () => {
        mouseEvent();
        dialogMouseEvent();
    };

    const mouseEvent = () => {
        $('div.list-container').on('click', 'a[nt="send-btn"]', function() {
            showSendDialog();
        }).on('click', 'a.list-btn-expand', function() {
            $(this).parents('.it').addClass('it-expand');
        }).on('click', 'a.list-btn-retract', function() {
            $(this).parents('.it').removeClass('it-expand');
        });
    };

    const showSendDialog = () => {
        const html = `<div class="js-dialog-wrap">
                        <div class="turntable-dialog-bg"></div>
                        <div class="turntable-dialog-lgBg">
                            <div class="turntable-icons turntable-dialog-head">寄送奖品</div>
                            <a href="javascript:;" class="turntable-icons turntable-dialog-close" nt="js-close-btn"></a>
                            <div>
                                <div class="dialog-common-title dialog-send-title clearfix">
                                    <i class="fl turntable-icons"></i>
                                    <div class="fl">
                                        <p class="title">选择您要急送的奖品</p>
                                        <p class="text">寄送地址不同的需要分批寄送哦~</p>
                                    </div>
                                </div>
                                <div class="dialog-send-wrap">
                                    <ul class="dialog-common-list clearfix">
                                        <li class="it">
                                            <div class="dialog-common-item dialog-send-item clearfix">
                                                <div class="fl dialog-send-img">
                                                    <img src="" />
                                                </div>
                                                <div class="fl dialog-send-name">dior #12</div>
                                                <div class="fr dialog-send-checkbox">
                                                    <input type="checkbox" id="item_1" value="1" />
                                                    <label for="item_1"></label>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="it">
                                            <div class="dialog-common-item dialog-send-item clearfix">
                                                <div class="fl dialog-send-img">
                                                    <img src="" />
                                                </div>
                                                <div class="fl dialog-send-name">dior #12</div>
                                                <div class="fr dialog-send-checkbox">
                                                    <input type="checkbox" id="item_2" value="2" />
                                                    <label for="item_2"></label>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="it">
                                            <div class="dialog-common-item dialog-send-item clearfix">
                                                <div class="fl dialog-send-img">
                                                    <img src="" />
                                                </div>
                                                <div class="fl dialog-send-name">dior #12</div>
                                                <div class="fr dialog-send-checkbox">
                                                    <input type="checkbox" id="item_3" value="3" />
                                                    <label for="item_3"></label>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="it">
                                            <div class="dialog-common-item dialog-send-item clearfix">
                                                <div class="fl dialog-send-img">
                                                    <img src="" />
                                                </div>
                                                <div class="fl dialog-send-name">dior #12</div>
                                                <div class="fr dialog-send-checkbox">
                                                    <input type="checkbox" id="item_4" value="4" />
                                                    <label for="item_4"></label>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <a href="javascript:;" class="turntable-icons dialog-send-btn" nt="comfirm-btn">确认提交</a>
                        </div>
                    </div>`;
        $('body').append(html);
    };

    const dialogMouseEvent = () => {
        $('body').on('click', 'a[nt="js-close-btn"]', function() {
            $('div.js-dialog-wrap').remove();
        }).on('click', 'a[nt="comfirm-btn"]', function() {
            const checked = $('input[type="checkbox"]');
            let value = [];
            for (let i in checked) {
                if (checked[i].checked) {
                    value.push(checked[i].value);
                }
            }
            console.log(value);
        });
    };

    $(init);
})();
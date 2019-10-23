/****************************************************************************
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.
 
 http://www.cocos2d-x.org
 
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/


var BoardLayer = cc.Layer.extend({
    model: null,
    view: null,
    controller: null,
    ctor: function () {
        this._super();
        
        var tiledMap = new cc.TMXTiledMap(res.board_tmx);
        this.model = new Model(tiledMap);
        
        this.view = new View(this.model);
        this.addChild(this.view.getBoard(), 0);
        this.addChild(this.view.getPacMan(), 1);
        this.addChild(this.view.getShadow(), 1);
        this.addChild(this.view.getSpeedy(), 1);
        this.addChild(this.view.getBashful(), 1);
        this.addChild(this.view.getPokey(), 1);
        this.addChild(this.view.getLabelScore(), 2);
        this.addChild(this.view.getLabelScoreCounter(), 2);
        this.addChild(this.view.getLabelHighScore(), 2);
        this.addChild(this.view.getLabelHighScoreCounter(), 2);
        this.addChild(this.view.getLabelLives(), 2);
        this.addChild(this.view.getFruitsEatenAmount(), 2);
        
        this.controller = new Controller(this.model);

        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (keyCode, event) {
                event.getCurrentTarget().controller.onKeyPressed(keyCode);
            },
            onKeyReleased: function (keyCode, event) {
                event.getCurrentTarget().controller.onKeyReleased(keyCode);
            }
        }, this);

        this.scheduleUpdate();

        return true;
    },
    update: function (dt) {
        this.model.update(dt);
        this.view.update(dt);
    }
});

var BoardScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var boardLayer = new BoardLayer();
        this.addChild(boardLayer);
    }
});


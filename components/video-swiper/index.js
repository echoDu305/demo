module.exports =
    /******/
    (function (modules) { // webpackBootstrap
        /******/ // The module cache
        /******/
        var installedModules = {};
        /******/
        /******/ // The require function
        /******/
        function __webpack_require__(moduleId) {
            /******/
            /******/ // Check if module is in cache
            /******/
            if (installedModules[moduleId]) {
                /******/
                return installedModules[moduleId].exports;
                /******/
            }
            /******/ // Create a new module (and put it into the cache)
            /******/
            var module = installedModules[moduleId] = {
                /******/
                i: moduleId,
                /******/
                l: false,
                /******/
                exports: {}
                /******/
            };
            /******/
            /******/ // Execute the module function
            /******/
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            /******/
            /******/ // Flag the module as loaded
            /******/
            module.l = true;
            /******/
            /******/ // Return the exports of the module
            /******/
            return module.exports;
            /******/
        }
        /******/
        /******/
        /******/ // expose the modules object (__webpack_modules__)
        /******/
        __webpack_require__.m = modules;
        /******/
        /******/ // expose the module cache
        /******/
        __webpack_require__.c = installedModules;
        /******/
        /******/ // define getter function for harmony exports
        /******/
        __webpack_require__.d = function (exports, name, getter) {
            /******/
            if (!__webpack_require__.o(exports, name)) {
                /******/
                Object.defineProperty(exports, name, {
                    enumerable: true,
                    get: getter
                });
                /******/
            }
            /******/
        };
        /******/
        /******/ // define __esModule on exports
        /******/
        __webpack_require__.r = function (exports) {
            /******/
            if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
                /******/
                Object.defineProperty(exports, Symbol.toStringTag, {
                    value: 'Module'
                });
                /******/
            }
            /******/
            Object.defineProperty(exports, '__esModule', {
                value: true
            });
            /******/
        };
        /******/
        /******/ // create a fake namespace object
        /******/ // mode & 1: value is a module id, require it
        /******/ // mode & 2: merge all properties of value into the ns
        /******/ // mode & 4: return value when already ns object
        /******/ // mode & 8|1: behave like require
        /******/
        __webpack_require__.t = function (value, mode) {
            /******/
            if (mode & 1) value = __webpack_require__(value);
            /******/
            if (mode & 8) return value;
            /******/
            if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
            /******/
            var ns = Object.create(null);
            /******/
            __webpack_require__.r(ns);
            /******/
            Object.defineProperty(ns, 'default', {
                enumerable: true,
                value: value
            });
            /******/
            if (mode & 2 && typeof value != 'string')
                for (var key in value) __webpack_require__.d(ns, key, function (key) {
                    return value[key];
                }.bind(null, key));
            /******/
            return ns;
            /******/
        };
        /******/
        /******/ // getDefaultExport function for compatibility with non-harmony modules
        /******/
        __webpack_require__.n = function (module) {
            /******/
            var getter = module && module.__esModule ?
                /******/
                function getDefault() {
                    return module['default'];
                } :
                /******/
                function getModuleExports() {
                    return module;
                };
            /******/
            __webpack_require__.d(getter, 'a', getter);
            /******/
            return getter;
            /******/
        };
        /******/
        /******/ // Object.prototype.hasOwnProperty.call
        /******/
        __webpack_require__.o = function (object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        };
        /******/
        /******/ // __webpack_public_path__
        /******/
        __webpack_require__.p = "";
        /******/
        /******/
        /******/ // Load entry module and return exports
        /******/
        return __webpack_require__(__webpack_require__.s = 0);
        /******/
    })
/************************************************************************/
/******/
([
    /* 0 */
    /***/
    (function (module, exports, __webpack_require__) {

        "use strict";


        Component({
            options: {
                addGlobalClass: true,
                pureDataPattern: /^_/
            },
            properties: {
                duration: {
                    type: Number,
                    value: 500
                },
                easingFunction: {
                    type: String,
                    value: 'default'
                },
                loop: {
                    type: Boolean,
                    value: false
                },
                index: {
                    type: Number,
                    value: 0
                },
                videoList: {
                    type: Array,
                    value: [],
                    observer: function observer() {
                        var newVal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
                        if (newVal.length) {
                            newVal.map((item, index) => {
                                return item.idxKey = index + 1;
                            });
                            if (newVal.length <= 10) {
                                this._videoListChanged(newVal);
                            } else {
                                // ???????????????????????????
                                let arr = JSON.parse(JSON.stringify(newVal));
                                // ?????????????????????
                                let nextArr = arr.splice(this.data.total);
                                this.data.nextQueue.push(...nextArr);
                            }
                            this.setData({
                                total: newVal.length
                            })
                        }
                    }
                }
            },
            data: {
                nextQueue: [],
                prevQueue: [],
                curQueue: [],
                circular: false,
                _last: 1,
                _change: -1,
                _invalidUp: 0,
                _invalidDown: 0,
                _videoContexts: [],
                total: 0,
                videoBol: [false, false, false, false],
            },
            lifetimes: {
                attached: function attached() {
                    this.data._videoContexts = [wx.createVideoContext('video_0', this), wx.createVideoContext('video_1', this), wx.createVideoContext('video_2', this), wx.createVideoContext('video_3', this)];
                }
            },
            methods: {
                _videoListChanged: function _videoListChanged(newVal) {
                    var _this = this;
                    var index = this.data.index;
                    var total = newVal.length;
                    // ???????????????index???????????????????????????0????????????
                    if (index + 1 > total) {index = 0;};
                    var data = this.data;
                    let remainder = index % 3; // 3?????????--??????????????????
                    var curQueue = [];
                    var _pop = [];
                    var swiperCurrent = remainder;
                    newVal.forEach(function (item, idx) {
                        item.index = idx;
                        data.nextQueue.push(item);
                    });
                    // console.log(newVal, 'newval', data);
                    if (data.curQueue.length === 0) {
                        let curIndex = index > 0 ? index - 1 : 0;
                        _this.data._change = ((index % 3) + 1) % 3;
                        // ??????????????????????????????
                        // _this.data._last = index === 0 ? 0 : // ?????????????????????0?????????
                        //     // index??????0????????????3?????????????????????swiper-item????????????2(????????????)
                        //     _this.data._change === 0 ? 2 : _this.data._change - 1;// ?????????????????????_change - 1??????
                        _this.data._last = remainder;
                        _this.data._invalidDown = index === 0 ? 1 : 0; // ??????????????????0?????????????????????

                        _this.data._invalidUp = total - curIndex < 2 ? 1 : 0; // ?????????????????????

                        // ??????????????????????????????
                        _this.data.prevQueue = newVal.slice(0, curIndex);
                        _this.data.nextQueue = newVal.slice(curIndex + 3);

                        var circular = true;
                        if (_this.data.nextQueue.length === 0 && _this.data._change !== 0) {
                            circular = false;
                        }
                        if (_this.data.prevQueue.length === 0 && _this.data._change !== 2) {
                            circular = false;
                        }

                        // ??????swiper?????????????????????
                        let indexAdd = index + 1;
                        let indexAdd2 = index + 2;
                        let indexSub = index - 1;
                        if (total > 4 && total % 3 == 1 && (total - 1) - index <= 2) { // ??????3???1

                            curQueue = [
                                ...newVal.slice(total - 1, total),
                                ...newVal.slice(total - 3, total - 2),
                                ...newVal.slice(total - 2, total - 1),
                                ...newVal.slice(total - 1, total),
                            ]

                            _this.data.circular = circular = false;
                            if (total - 1 - index == 0) {
                                _this.data._change = 0;
                                _this.data._invalidDown = 0;
                                _this.data._invalidUp = 1;
                                _this.data._last = 3;
                                swiperCurrent = 3;
                                _this.data.prevQueue = newVal.slice(0, curIndex - 1);
                            } else if (total - 1 - index == 1) {
                                _this.data._change = 0;
                                _this.data._invalidDown = 0;
                                _this.data._invalidUp = 0;
                                _this.data._last = 2;
                            } else if (total - 1 - index == 2) {
                                _this.data._change = 2;
                                _this.data._invalidDown = 0;
                                _this.data._invalidUp = 0;
                                _this.data._last = 1;
                                _this.data.circular = circular = true;
                                curQueue = [
                                    ...newVal.slice(indexSub, index),
                                    ...newVal.slice(index, indexAdd),
                                    ...newVal.slice(indexAdd, indexAdd2),
                                ]
                            }

                        } else if (total > 4 && total % 3 == 2 && total - index - 1 <= 1) { // ??????3???2

                            _pop = newVal.slice(total - 3, total - 2);
                            _pop = _pop[0];
                            if (total - index - 1 == 0 || total == index + 2) {
                                if (total == index + 2) { // ???????????????????????????????????????
                                    _this.data._change = 1;
                                    _this.data._invalidDown = 0;
                                    _this.data._invalidUp = 0;
                                    _this.data._last = 0;
                                    circular = false;
                                    curQueue = [
                                        ...newVal.slice(total - 2, total - 1),
                                        ...newVal.slice(total - 1, total),
                                        // ...newVal.slice(total - 3, total - 2),
                                    ];
                                } else {
                                    _this.data._change = 1;
                                    _this.data._invalidDown = 0;
                                    _this.data._invalidUp = 1;
                                    _this.data._last = 1;
                                    circular = false;
                                    curQueue = [
                                        ...newVal.slice(total - 2, total - 1),
                                        ...newVal.slice(total - 1, total),
                                    ];
                                }
                                _this.data.prevQueue = newVal.slice(0, total - 3);
                            } else if (total - index - 1 == 1) {
                                _this.data._change = 1;
                                _this.data._invalidDown = 0;
                                _this.data._invalidUp = 0;
                                _this.data._last = 0;
                                circular = true;
                                curQueue = [
                                    ...newVal.slice(total - 2, total - 1),
                                    ...newVal.slice(total - 1, total),
                                    ...newVal.slice(total - 3, total - 2),
                                ];
                            }

                        } else {
                            if (total <= 4) { // ????????????????????????????????????????????????
                                // ?????????????????? ????????????
                                _this.data._change = -1;
                                _this.data._last = 1;
                                _this.data._invalidDown = 0;
                                _this.data._invalidUp = 0;
                                // curQueue = newVal.slice(curIndex, curIndex + 3);
                                curQueue = newVal;
                                circular = false;
                            } else {
                                if (remainder == 0 && total > 4) {
                                    let lastArr = newVal.slice(indexSub, index); // ????????????N???????????????swiper????????????????????????????????????
                                    if (index == 0) { // ??????????????????swiper?????????????????????????????????????????????2???
                                        _this.data._change = -1;
                                        _this.data._last = 1;
                                        _this.data._invalidDown = 0;
                                        _this.data._invalidUp = 0;
                                        lastArr = newVal.slice(indexAdd2, indexAdd2 + 1);
                                    }
                                    curQueue = [
                                        ...newVal.slice(index, indexAdd),
                                        ...newVal.slice(indexAdd, indexAdd2),
                                        ...lastArr
                                    ];
                                } else if (remainder == 1 && total > 4) {
                                    curQueue = [
                                        ...newVal.slice(indexSub, index),
                                        ...newVal.slice(index, indexAdd),
                                        ...newVal.slice(indexAdd, indexAdd2)
                                    ]
                                } else if (remainder == 2 && total > 4) {
                                    let homeArr = newVal.slice(indexAdd, indexAdd2); // ??????????????????swiper???????????????????????????
                                    if (total === index + 1) { // ???????????????????????????????????????????????????2???
                                        circular = false;
                                        homeArr = newVal.slice(index - 2, indexSub);
                                    }
                                    curQueue = [
                                        ...homeArr,
                                        ...newVal.slice(indexSub, index),
                                        ...newVal.slice(index, indexAdd)
                                    ]
                                }
                            }

                        }
                        if (total <= 4) {
                            swiperCurrent = index;
                        }
                        this.setData({
                            curQueue: curQueue,
                            total,
                            circular,
                            swiperCurrent,
                            _pop
                        }, function () {
                            _this.playCurrent(swiperCurrent);
                        });
                    }
                },
                animationfinish: function animationfinish(e) {
                    var _data = this.data,
                        _last = _data._last,
                        _change = _data._change,
                        curQueue = _data.curQueue,
                        prevQueue = _data.prevQueue,
                        nextQueue = _data.nextQueue,
                        total = _data.total;

                    var current = e.detail.current;
                    var diff = current - _last;
                    this.data.swiperCurrent = current;
                    this.playCurrent(current);
                    // ?????????????????????????????????10?????????????????????4?????????????????????????????????????????????????????????????????????????????????
                    if (total >= 10 && nextQueue.length < 5) {
                        this.triggerEvent('UpdataVideo', {});
                    }
                    if (diff === 0 || total <= 4) return;
                    this.data._last = current;
                    this.triggerEvent('change', {
                        activeId: curQueue[current].id
                    });
                    var direction = diff === 1 || diff === -2 ? 'up' : 'down';
                    if (direction === 'up') {
                        if (this.data._invalidDown === 0) {
                            var change = (_change + 1) % 3;
                            var add = nextQueue.shift();
                            var remove = curQueue[change];
                            if (add) {
                                prevQueue.push(remove);
                                curQueue[change] = add;
                                this.data._change = change;

                                // strart ?????????????????????????????????????????????????????????2?????????4??????????????????3?????????
                                if ((total % 3) === 1 && nextQueue.length === 0) {
                                    let timers = new Date();
                                    let addItem = JSON.parse(JSON.stringify(add));
                                    addItem.idxKey = timers.getTime();
                                    curQueue[3] = addItem;
                                } else if ((total % 3) === 2 && nextQueue.length === 0) {
                                    let _pop = curQueue.pop();
                                    this.setData({
                                        _pop: _pop
                                    })
                                }
                                // end

                            } else {
                                this.data._invalidUp += 1;
                            }
                        } else {
                            this.data._invalidDown -= 1;
                        }
                    }
                    if (direction === 'down') {
                        if (this.data._invalidUp === 0) {
                            var _change2 = _change;
                            var _remove = curQueue[_change2];
                            var _add = prevQueue.pop();
                            if (_add) {
                                curQueue[_change2] = _add;
                                nextQueue.unshift(_remove);
                                this.data._change = (_change2 - 1 + 3) % 3;
                            } else {
                                this.data._invalidDown += 1;
                            }
                        } else {

                            // strart ?????????????????????????????????????????????????????????2?????????4??????????????????3?????????
                            if ((total % 3) === 1 && curQueue.length === 4) {
                                curQueue.pop();
                            } else if ((total % 3) === 2 && nextQueue.length === 0) {
                                curQueue.push(this.data._pop);
                            }
                            // end

                            this.data._invalidUp -= 1;
                        }
                    }
                    var circular = true;
                    if (nextQueue.length === 0 && current !== 0) {
                        circular = false;
                    }
                    if (prevQueue.length === 0 && current !== 2) {
                        circular = false;
                    }
                    this.setData({
                        curQueue: curQueue,
                        circular: circular
                    }, () => {
                        // console.log('curQueue:', JSON.parse(JSON.stringify(this.data.curQueue)), 'nextQueue:', this.data.nextQueue, 'prevQueue:', this.data.prevQueue)
                        // console.log(this.data);
                        // console.log(curQueue[current], 'id', this.data, current);
                        // console.log('_change:', this.data._change, '_invalidDown:', this.data._invalidDown, '_invalidUp:', this.data._invalidUp, '_last:', this.data._last)
                    });
                },
                // ?????????????????????
                clickVideo(e) {
                    let current = this.data.swiperCurrent;
                    let index = e.currentTarget.dataset.index;
                    var videoContextPrev = wx.createVideoContext(`video_${current}`, this)
                    if (this.data.videoBol[index]) {
                        videoContextPrev.pause();
                    } else {
                        videoContextPrev.pause();
                        setTimeout(function () {
                            //???????????????????????????
                            videoContextPrev.play();
                        }, 300)
                    }
                },
                playCurrent: function playCurrent(current) {
                    this.setData({
                        swiperCurrent: current
                    }, () => {
                        let _videoContexts = this.data._videoContexts;
                        _videoContexts.map((item, index) => {
                            if (current == index) {
                                item.play();
                            } else {
                                item.stop();
                            }
                        })
                    });
                },
                onPlay: function onPlay(e) {
                    this.trigger(e, 'play');
                    let index = e.currentTarget.dataset.index;
                    let id = e.currentTarget.dataset.id;
                    this.setData({
                        [`videoBol[${index}]`]: true
                    });
                },
                onPause: function onPause(e) {
                    this.trigger(e, 'pause');

                    let index = e.currentTarget.dataset.index;
                    this.setData({
                        [`videoBol[${index}]`]: false
                    });
                },
                onEnded: function onEnded(e) {
                    this.trigger(e, 'ended');

                    let index = e.currentTarget.dataset.index;
                    this.setData({
                        [`videoBol[${index}]`]: false
                    });
                },
                onError: function onError(e) {
                    this.trigger(e, 'error');

                    let index = e.currentTarget.dataset.index;
                    this.setData({
                        [`videoBol[${index}]`]: false
                    });
                },
                onTimeUpdate: function onTimeUpdate(e) {
                    this.trigger(e, 'timeupdate');
                },
                onWaiting: function onWaiting(e) {
                    this.trigger(e, 'wait');
                },
                onProgress: function onProgress(e) {
                    this.trigger(e, 'progress');
                },
                onLoadedMetaData: function onLoadedMetaData(e) {
                    this.trigger(e, 'loadedmetadata');
                },
                trigger: function trigger(e, type) {
                    var ext = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

                    var detail = e.detail;
                    var activeId = e.target.dataset.id;
                    this.triggerEvent(type, Object.assign(Object.assign(Object.assign({}, detail), {
                        activeId: activeId
                    }), ext));
                }
            }
        });

        /***/
    })
    /******/
]);
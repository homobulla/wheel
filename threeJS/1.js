(function(Application, Window, Utils, API, VFS, GUI) {
    "use strict";

    var notificationWasDisplayed = {};

    /////////////////////////////////////////////////////////////////////////////
    // WINDOWS
    /////////////////////////////////////////////////////////////////////////////

    function ApplicationTransaction_RecordWindow(app, metadata, scheme, path, settings) {
        Window.apply(this, [
            "ApplicationTransaction_RecordWindow",
            {
                icon: metadata.icon,
                title: metadata.name,
                allow_drop: true,
                width: 900,
                height: 500,
                gravity: "center"
            },
            app,
            scheme
        ]);

        this.currentPath = path;
        this.currentSummary = {};
        this.viewOptions = Utils.argumentDefaults(
            settings || {},
            {
                ViewHidden: true,
                ViewNavigation: true,
                ViewSide: true
            },
            true
        );
        this.history = [];
        this.historyIndex = -1;
    }

    ApplicationTransaction_RecordWindow.prototype = Object.create(Window.prototype);
    ApplicationTransaction_RecordWindow.constructor = Window.prototype;

    ApplicationTransaction_RecordWindow.prototype.init = function(wm, app, scheme) {
        var root = Window.prototype.init.apply(this, arguments);
        var self = this;

        // Load and set up scheme (GUI) here
        scheme.render(this, "Operation_Record", root, null, null, {
            _: OSjs.Applications.ApplicationTransaction_Record._
        });

        //
        // 初始化
        //

        //当前窗口参数集合
        this.params = {};
        this.params.PageIndex_AuthorList = 0;
        this.params.PageIndex_ChangeList = 0;
        this.params.PageIndex_KFList = 0;
        this.params.Window_OpenChildList = []; //打开的子页面窗口
        this.params.Operation_Record_DataSource = []; //脚本数据集

        //当前窗口编号
        this.params.WinId = this._$element.getAttribute("data-window-id");
        ///选中行数
        this.params.Operation_Record_SelectIndex = 0;
        this.params.Data_LUA = []; //账户充值
        this.params.Data_TSP = []; //授权购买
        this.params.Data_KF = []; //设备扣费
        this.params.btnTsp = scheme.find(this, "btnTsp");
        this.params.btnLua = scheme.find(this, "btnLua");
        this.params.btnKF = scheme.find(this, "btnKF");
        this.params.TabOptions = scheme.find(this, "TabOptions");
        this.params.TabType = "tsp";
        this.params.Operation_Record_SelectIndex_TSP = 0;
        this.params.Operation_Record_SelectIndex_LUA = 0;
        this.params.Operation_Record_SelectIndex_KF = 0;
        this.params.TSPSurplus = scheme.find(this, "TSPSurplus"); //剩余点数文字

        //操作栏鼠标移动上的事件
        var Options = scheme.find(this, "gvcUpdate").$element;
        Options.addEventListener(
            "mouseover",
            function() {
                this.children[1].style.display = "block";
            },
            false
        );
        Options.addEventListener(
            "mouseout",
            function() {
                this.children[1].style.display = "none";
            },
            false
        );

        //表格
        var View_Operation_Record = scheme.find(this, "Operation_RecordList");
        this.params.TabDom = View_Operation_Record;

        //底部内容
        this.params.SumCount = scheme.find(this, "SumCount");
        this.params.TSPSY = scheme.find(this, "TSPSY");

        //加载表格head
        this.render_Operation_Record(View_Operation_Record);

        //加载表格数据
        this.render_Operation_Record_Data();

        //点击刷新脚本列表
        scheme.find(this, "btnUpdate").on("click", function() {
            if (self.params.TabType === "tsp") {
                self.render_Operation_Record_Data();
            } else if (self.params.TabType === "lua") {
                self.Init_DataLua();
            } else {
                self.Init_DataKF();
            }
        });
        var SubmenuAuthor_Manager_Option = scheme.find(this, "SubmenuAuthor_Manager_Option").on("select", menuEvent);

        var txtCopyText = this._$element.querySelector("#txtCopyText");
        var menuMap = {
            Auth_Manager_MenuCopyDevId: function() {
                txtCopyText.select();
                document.execCommand("Copy"); // 执行浏览器复制命令
            }
        };
        function menuEvent(ev) {
            if (menuMap[ev.detail.id]) {
                menuMap[ev.detail.id]();
            }
        }
        // 右键
        this.params.TabDom.on("contextmenu", function(ev) {
            if (ev.detail && ev.detail.entries && ev.detail.entries.length > 0 && ev.detail.entries[0].index != undefined) {
                var Data_Index = ev.detail.entries[0].index || 0;
                var obj = {
                    tsp: "Data_TSP",
                    lua: "Data_LUA",
                    kf: "Data_KF"
                };
                var copyType = obj[self.params.TabType];

                var row = Enumerable.From(self.params[copyType])
                    .Where("$.Index==" + Data_Index)
                    .ToArray()[0];
                console.log(self.params[copyType], row);
                if (row) {
                    txtCopyText.value = row.device;
                }
            }

            SubmenuAuthor_Manager_Option.show(ev);
        });

        //切换 账户充值记录
        this.params.btnTsp.on("click", function() {
            if (self.params.TabType === "tsp") return;
            self.Init_Page_Finsh = false;
            self.params.txtKeyWord.set("value", "");
            self.params.SumCount.set("value", 0);
            self._toggleLoading(true);
            self.params.TabDom.clear();
            self.render_Operation_Record(self.params.TabDom);
            self.render_Operation_Record_Data();

            self.params.TabType = "tsp";
            self.params.btnTsp.set("class", "selected");
            self.params.btnLua.set("class", "");
            self.params.btnKF.set("class", "");
            self.params.TabOptions.set("class", "");
            self.params.TabDom.set("class", "");
            self.params.TSPSurplus.show();
        });
        //切换 授权购买记录
        this.params.btnLua.on("click", function() {
            if (self.params.TabType === "lua") return;
            self.Init_Page_Finsh = false;
            self.params.txtKeyWord.set("value", "");
            self.params.SumCount.set("value", 0);
            self._toggleLoading(true);
            self.params.TabDom.clear();
            self.Init_TabHead_Lua();
            self.Init_DataLua();

            self.params.TabType = "lua";
            self.params.btnTsp.set("class", "");
            self.params.btnKF.set("class", "");
            self.params.btnLua.set("class", "selected");
            self.params.TabOptions.set("class", "lua");
            self.params.TabDom.set("class", "lua");
            self.params.TSPSurplus.hide();
            clearTimeout(self.params.TimeOut_UpdateTSP);
        });
        // 切换 扣费记录
        this.params.btnKF.on("click", function() {
            if (self.params.TabType == "kf") return;
            self.Init_Page_Finsh = false;
            self.params.txtKeyWord.set("value", "");
            self.params.SumCount.set("value", 0);
            self._toggleLoading(true);
            self.params.TabDom.clear();
            self.Init_TabHead_KF();
            self.Init_DataKF();
            self.params.TabType = "kf";
            self.params.btnTsp.set("class", "");
            self.params.btnLua.set("class", "");
            self.params.btnKF.set("class", "selected");
            self.params.TabOptions.set("class", "");
            self.params.TabDom.set("class", "");
            self.params.TSPSurplus.hide();
            clearTimeout(self.params.TimeOut_UpdateTSP);
        });
        function Search() {
            var _this = self;
            _this.Init_Page_Finsh = false;
            if (_this.params.TabType === "tsp") {
                _this.params.Data_TSP = [];
                _this.params.PageIndex_AuthorList = 0;
                _this.params.KeyWord_AuthorList = _this.params.txtKeyWord.get("value");
                _this.render_Operation_Record_Data();
            } else if (_this.params.TabType === "lua") {
                _this.params.Data_LUA = [];
                _this.params.PageIndex_ChangeList = 0;
                _this.params.KeyWord_ChangeList = _this.params.txtKeyWord.get("value");
                _this.Init_DataLua();
            } else {
                _this.params.Data_KF = [];
                _this.params.PageIndex_KFList = 0;
                _this.params.KeyWord_KFList = _this.params.txtKeyWord.get("value");
                _this.Init_DataKF();
            }
        }
        scheme.find(this, "Search").on("click", function() {
            Search();
        });
        //文本框搜索
        this.params.txtKeyWord = scheme.find(this, "txtKeyWord");
        this.params.txtKeyWord.on("keydown", function(ev) {
            if (ev.keyCode === 13) {
                Search();
            }
        });

        return root;
    };

    //关闭界面
    ApplicationTransaction_RecordWindow.prototype._close = function() {
        for (var i = 0; i < this.params.Window_OpenChildList.length; i++) this.params.Window_OpenChildList[i].destroy();
        if (this.params.XHR_InvertUpdateDev_Ev) this.params.XHR_InvertUpdateDev_Ev.abort();
        if (this.params.HTTP_Init_List) this.params.HTTP_Init_List.abort();

        this.destroy();
    };

    //加载分页
    ApplicationTransaction_RecordWindow.prototype.Init_Page = function(page_info) {
        var _this = this;
        if (_this.Init_Page_Finsh) return;
        $(this._$element)
            .find("#page")
            .createPage_record({
                pageCount: page_info.total || 1,
                current: 1,
                backFn: function(p) {
                    if (_this.params.TabType === "tsp") {
                        _this.params.Data_TSP = [];
                        _this.params.PageIndex_AuthorList = p - 1;
                        _this.render_Operation_Record_Data();
                    } else if (_this.params.TabType === "lua") {
                        _this.params.Data_LUA = [];
                        _this.params.PageIndex_ChangeList = p - 1;
                        _this.Init_DataLua();
                    } else {
                        _this.params.Data_KF = [];
                        _this.params.PageIndex_KFList = p - 1;
                        _this.Init_DataKF();
                    }
                }
            });
        _this.Init_Page_Finsh = true;
    };

    //加载表格数据
    ApplicationTransaction_RecordWindow.prototype.render_Operation_Record_Data = function() {
        var TSPView = this.params.TabDom;
        var sideViewItems = [];
        var _this = _this || this;
        _this._toggleLoading(true);
        if (_this.params.TimeOut_UpdateTSP) clearTimeout(_this.params.TimeOut_UpdateTSP);
        var Index = 0;
        _this.params.Operation_Record_DataSource = [];
        TSPView.clear();
        _this.params.Operation_Record_SelectIndex_TSP = 0;
        API.call(
            "history.buy_list",
            { cu: { page: _this.params.PageIndex_AuthorList, query: { device: _this.params.KeyWord_AuthorList } } },
            function(ok, success, result) {
                console.log(success, result);
                if (!ok || !success)
                    return API.createDialog("Alert", {
                        title: "提示",
                        message: success || result || "history.buy_list no message"
                    });

                _this.Init_Page(result.page_info);
                _this.params.SumCount.set("value", result.total);
                for (var i = 0; i < result.rows.length; i++) {
                    var iter = result.rows[i];
                    sideViewItems.push({
                        value: Index,
                        id: Index,
                        className: "tsplistrow",
                        columns: [
                            { label: iter.device, tooltip: iter.device },
                            { label: iter.mode, tooltip: iter.mode },
                            { label: iter.type, tooltip: iter.type },
                            { label: iter.time, tooltip: iter.time },
                            { label: iter.create_at, tooltip: iter.create_at }
                        ]
                    });
                    iter.Check = false;
                    iter.Index = Index;
                    iter.point = parseInt(iter.point);
                    Index++;
                    _this.params.Data_TSP.push(iter);
                }
                TSPView.clear();
                TSPView.add(sideViewItems);
                _this.params.Operation_Record_DataSource = result.rows;
                _this._toggleLoading(false);
            },
            null,
            null,
            function(http) {
                _this.params.HTTP_Init_List = http;
            }
        );
    };

    //排序
    ApplicationTransaction_RecordWindow.prototype.Sort_Click = function(orderType, sortKey) {
        console.log(1111111111);
        if (!sortKey) return;
        this._$element.querySelector("[data-name=checkbox]").setAttribute("data-class", "UnCheckbox");
        var _this = this;
        //排序从小到大
        var json = [];

        if (orderType == "asc")
            json = Enumerable.From(_this.params.Data_ + _this.params.TabType.toLocaleUpperCase())
                .OrderBy("$." + sortKey)
                .ToArray();
        else
            json = Enumerable.From(_this.params.Data_ + _this.params.TabType.toLocaleUpperCase())
                .OrderByDescending("$." + sortKey)
                .ToArray();

        _this.params.Data_Author = [];
        for (var i = 0; i < json.length; i++) {
            var iter = json[i];
            iter.Index = i;

            var column = [];
            if (_this.params.TabType == "tsp") {
                column = [];
            } else if (_this.params.Init_Data_Type === "kf") {
                column = [];
            }

            _this.params.Temp_AuthorizationManager.add({
                value: iter.Index,
                id: iter.Index,
                className: this.params.Init_Data_Type === "service" ? "" : iter.devState,
                columns: column,
                cooldown: this.params.Init_Data_Type === "service" ? undefined : iter.change_times_show ? true : false,
                btn_disabled: this.params.Init_Data_Type === "service" && iter.value_author == 0 ? "true" : ""
            });
            _this.params.Data_Author.push(iter);
        }
    };
    //加载账户充值表格数据
    ApplicationTransaction_RecordWindow.prototype.Init_DataLua = function() {
        var _this = this;
        var Index = 0;

        _this.params.Operation_Record_DataSource = [];
        _this.params.Operation_Record_SelectIndex_LUA = 0;
        _this._toggleLoading(true);
        API.call(
            "history.change_list",
            { cu: { page: _this.params.PageIndex_ChangeList, query: { device: _this.params.KeyWord_ChangeList } } },
            function(ok, success, result) {
                if (!ok || !success) {
                    API.createDialog("Alert", {
                        title: "提示",
                        message: success || result || "history.change_list no message"
                    });
                    _this._toggleLoading(false);
                    return;
                }
                _this.Init_Page(result.page_info);
                _this.params.SumCount.set("value", result.total);
                _this.params.TabDom.clear();
                for (var i = 0; i < result.rows.length; i++) {
                    var iter = result.rows[i];
                    _this.params.TabDom.add({
                        value: i,
                        id: i,
                        className: "tsplistrow",
                        columns: [
                            { label: iter.device, tooltip: iter.device },
                            { label: iter.type, tooltip: iter.type },
                            { label: iter.target, tooltip: iter.target },
                            { label: iter.type, tooltip: iter.type },
                            { label: iter.create_at, tooltip: iter.create_at }
                        ]
                    });
                    iter.Index = Index;
                    Index++;
                    _this.params.Data_LUA.push(iter);
                    _this.params.Operation_Record_DataSource.push(iter);
                }

                _this._toggleLoading(false);
            },
            null,
            null,
            function(http) {
                _this.params.HTTP_Init_List = http;
            }
        );
    };
    //加载扣费记录表格数据
    ApplicationTransaction_RecordWindow.prototype.Init_DataKF = function() {
        var _this = this;
        var Index = 0;

        _this.params.Operation_Record_DataSource = [];
        _this.params.Operation_Record_SelectIndex_KF = 0;
        _this._toggleLoading(true);
        API.call(
            "history.change_list",
            { cu: { page: _this.params.PageIndex_KFList, query: { device: _this.params.KeyWord_KFList } } },
            function(ok, success, result) {
                if (!ok || !success) {
                    API.createDialog("Alert", {
                        title: "提示",
                        message: success || result || "history.change_list no message"
                    });
                    _this._toggleLoading(false);
                    return;
                }

                _this.Init_Page(result.page_info);
                _this.params.SumCount.set("value", result.total);
                _this.params.TabDom.clear();
                for (var i = 0; i < result.rows.length; i++) {
                    var iter = result.rows[i];
                    _this.params.TabDom.add({
                        value: i,
                        id: i,
                        className: "tsplistrow",
                        columns: [
                            { label: iter.device, tooltip: iter.device },
                            { label: iter.type, tooltip: iter.type },
                            { label: iter.target, tooltip: iter.target },
                            { label: iter.type, tooltip: iter.type }
                        ]
                    });
                    iter.Index = Index;
                    Index++;
                    _this.params.Data_KF.push(iter);
                    _this.params.Operation_Record_DataSource.push(iter);
                }

                _this._toggleLoading(false);
            },
            null,
            null,
            function(http) {
                _this.params.HTTP_Init_List = http;
            }
        );
    };
    //加载购买记录头部
    ApplicationTransaction_RecordWindow.prototype.Init_TabHead_Lua = function() {
        this.params.TabDom.set("event", { Operation_RecordList: { eventSort: this.Sort_Click.bind(this) } }); //为表格添加排序事件
        this.params.TabDom.set("columns", [
            { label: "购买时间", basis: "20%", grow: 0, shrink: 0, textalign: "left", resizable: true, key: "Index" },
            { label: "设备平台", basis: "10%", grow: 0, shrink: 0, textalign: "left", resizable: true, key: "related_name" },
            { label: "授权类型", basis: "10%", grow: 0, shrink: 0, textalign: "left", resizable: true, key: "related_name" },
            { label: "授权时长", basis: "5%", grow: 0, shrink: 0, textalign: "left", resizable: true, key: "related_name" },
            { label: "单价（元）", basis: "5%", grow: 0, shrink: 0, textalign: "left", resizable: true, key: "related_name" },
            { label: "购买数量（台）", basis: "5%", grow: 0, shrink: 0, textalign: "left", resizable: true, key: "related_name" },
            { label: "倍数", basis: "5%", grow: 0, shrink: 0, textalign: "left", resizable: true, key: "related_name" },
            { label: "支付金额", basis: "5%", grow: 0, shrink: 0, textalign: "left", resizable: true, key: "related_name" },
            { label: "支付方式", basis: "10%", grow: 0, shrink: 0, textalign: "left", resizable: true, key: "related_name" },
            { label: "商户订单号", basis: "25%", grow: 0, shrink: 0, textalign: "left", resizable: true, key: "related_name" }
        ]);
    };
    //加载设备扣费记录头部
    ApplicationTransaction_RecordWindow.prototype.Init_TabHead_KF = function() {
        this.params.TabDom.set("event", { Operation_RecordList: { eventSort: this.Sort_Click.bind(this) } }); //为表格添加排序事件
        this.params.TabDom.set("columns", [
            { label: "扣费时间", basis: "30%", grow: 0, shrink: 0, textalign: "left", resizable: true, key: "Index" },
            { label: "设备号", basis: "30%", grow: 0, shrink: 0, textalign: "left", resizable: true, key: "related_name" },
            { label: "扣费金额（元）", basis: "20%", grow: 0, shrink: 0, textalign: "left", resizable: true, key: "related_name" },
            { label: "扣费类型", basis: "20%", grow: 0, shrink: 0, textalign: "left", resizable: true, key: "related_name" }
        ]);
    };
    //加载账户充值记录头部
    ApplicationTransaction_RecordWindow.prototype.render_Operation_Record = function(TSPView) {
        this.params.TabDom.set("event", { Operation_RecordList: { eventSort: this.Sort_Click.bind(this) } }); //为表格添加排序事件
        TSPView.set("columns", [
            { label: "充值时间", basis: "25%", grow: 0, shrink: 0, textalign: "left", resizable: true },
            { label: "充值金额", basis: "12.5%", grow: 0, shrink: 0, textalign: "left", resizable: true },
            { label: "支付金额", basis: "12.5%", grow: 0, shrink: 0, textalign: "left", resizable: true },
            { label: "支付方式", basis: "12.5%", grow: 0, shrink: 0, textalign: "left", resizable: true },
            { label: "账户余额", basis: "12.5%", grow: 0, shrink: 0, textalign: "left", resizable: true },
            { label: "商户订单号", basis: "25%", grow: 0, shrink: 0, textalign: "left", resizable: true }
        ]);
    };

    /////////////////////////////////////////////////////////////////////////////
    // APPLICATION
    /////////////////////////////////////////////////////////////////////////////

    var ApplicationTransaction_Record = function(args, metadata) {
        Application.apply(this, ["ApplicationTransaction_Record", args, metadata]);
    };

    ApplicationTransaction_Record.prototype = Object.create(Application.prototype);
    ApplicationTransaction_Record.constructor = Application;

    ApplicationTransaction_Record.prototype.destroy = function() {
        return Application.prototype.destroy.apply(this, arguments);
    };

    ApplicationTransaction_Record.prototype.init = function(settings, metadata, onInited) {
        Application.prototype.init.apply(this, arguments);

        var self = this;
        var path = this._getArgument("path") || API.getDefaultPath();

        var url = API.getApplicationResource(this, "./TransactionRecord.html");
        var scheme = GUI.createScheme(url);
        scheme.load(function(error, result) {
            self._addWindow(new ApplicationTransaction_RecordWindow(self, metadata, scheme, path, settings));

            onInited();
        });

        this._setScheme(scheme);
    };

    /////////////////////////////////////////////////////////////////////////////
    // EXPORTS
    /////////////////////////////////////////////////////////////////////////////

    OSjs.Applications = OSjs.Applications || {};
    OSjs.Applications.ApplicationTransaction_Record = OSjs.Applications.ApplicationTransaction_Record || {};
    OSjs.Applications.ApplicationTransaction_Record.Class = ApplicationTransaction_Record;
})(OSjs.Core.Application, OSjs.Core.Window, OSjs.Utils, OSjs.API, OSjs.VFS, OSjs.GUI);

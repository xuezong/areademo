// pages/list/list.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        var me = this;
        wx.request({
            url: "http://127.0.0.1:8888/springbootdemo/supperadmin/listarea",
            method: "GET",
            data: {},
            success: function(res) {
                var list = res.data.areaList;
                if (list == null) {
                    var toastText = '获取数据失败' + res.data.errMsg;
                    wx.showToast({
                        title: toastText,
                        icon: '',
                        duration: 2000
                    });
                } else {
                    me.setData({
                        list: list
                    });
                }
            }
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },

    /**
     * 删除区域信息
     */
    deleteArea: function(e) {
        var me = this;
        wx.showModal({
            title: '提示',
            content: '确定要删除[' + e.target.dataset.areaname + ']吗?',
            success: function(sm) {
                if (sm.confirm) {
                    // 用点击了确定 ， 可以调用删除方法
                    wx.request({
                        url: "http://127.0.0.1:8888/springbootdemo/supperadmin/deletearea",
                        data: {
                            "areaId": e.target.dataset.areaid
                        },
                        method: 'GET',
                        success: function(res) {
                            var result = res.data.success;
                            var toastText = "删除成功!";
                            if(result != true) {
                                toastText = "删除失败!" + res.data.errMsg;
                            } else {
                                me.data.list.splice(e.target.dataset.index, 1);
                                // 渲染数据
                                me.setData({
                                    list: me.data.list
                                });
                            }
                            wx.showToast({
                                title: toastText,
                                icon: '',
                                duration: 2000
                            })
                        }
                    })
                }
            }
        })
    },

    /**
     * 添加区域信息
     */
    addArea: function() {
        wx.navigateTo({
            url: '../operation/operation',
        })
    }
})
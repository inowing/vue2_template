
new daum.Postcode({
    oncomplete: function (data) {
        this.searchAddressResultHandler(data)
        this.daumPostInit()

    },
    onresize: function (size) {
        element_wrap.style.height = size.height + 'px';
    },
    width: '100%',
    height: '100%',
    hideMapBtnL: true
}).bind(this).embed(element_wrap);
var NotificationUI = function () {
    return {
        showMessage: function (title,message,type) {
                var shortCutFunction = type;
                var msg = message;
                toastr.options = {
                    closeButton: true,
                    positionClass: 'toast-top-right',
                    onclick: null
                };
                toastr[shortCutFunction](msg, title);
        }
    };
}();
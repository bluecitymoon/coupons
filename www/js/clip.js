/**
 * Created by jerry on 31/8/15.
 */
function copyToClipboard(b, c) {
    var d = $(b);
    d.select();
    try {
        if (therange = void 0, 1 == copytoclip && (d.createTextRange && (therange = d.createTextRange()), therange = therange ? therange : document, therange.execCommand("Copy"))) {
            !1 != c && alert("\u590d\u5236\u6210\u529f\u3002\u73b0\u5728\u60a8\u53ef\u4ee5\u7c98\u8d34\uff08Ctrl+v\uff09\u5230Blog \u6216BBS\u4e2d\u4e86\u3002");
            return
        }
    } catch (e) {
    }
    alert("\u60a8\u4f7f\u7528\u7684\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u6b64\u590d\u5236\u529f\u80fd\uff0c\u8bf7\u4f7f\u7528Ctrl+C\u6216\u9f20\u6807\u53f3\u952e\u3002")
}

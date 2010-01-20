module("core");

test("Basic Requirements", function() {
    expect(4);
    ok(Array.prototype.push, "Array.push");
    ok(document.getElementById, "getElementById");
    ok(document.getElementsByTagName, "getElementsByTagName");
    ok(RegExp, "RegExp");
});

test("getPlayer", function() {
    var g = Shadowbox.getPlayer;

    // flv
    equal(g("movie.flv"), "flv", ".flv extension");
    equal(g("movie.m4v"), "flv", ".m4v extension");

    // inline & iframe
    var h = document.location.href;
    equal(g(h), "iframe", "same document");
    equal(g(h + '#id'), "inline", "same document with hash");
    equal(g('/'), "iframe", "same domain, root document");
    equal(g('/#name'), "iframe", "same domain, root document with hash");
    equal(g('/index.html'), "iframe", "same domain, external document");
    equal(g('/index.html#name'), "iframe", "same domain, external document with hash");

    // img
    equal(g("some.bmp"), "img", ".bmp extension");
    equal(g("some.gif"), "img", ".gif extension");
    equal(g("some.jpg"), "img", ".jpg extension");
    equal(g("some.jpeg"), "img", ".jpeg extension");
    equal(g("some.png"), "img", ".png extension");

    // qt
    equal(g("movie.dv"), "qt", ".dv extension");
    equal(g("movie.mov"), "qt", ".mov extension");
    equal(g("movie.moov"), "qt", ".moov extension");
    equal(g("movie.movie"), "qt", ".movie extension");
    equal(g("movie.mp4"), "qt", ".mp4 extension");

    // swf
    equal(g("movie.swf"), "swf", ".swf extension");

    // wmp
    equal(g("movie.asf"), "wmp", ".asf extension");
    equal(g("movie.wm"), "wmp", ".wm extension");
    equal(g("movie.wmv"), "wmp", ".wmv extension");

    // qtwmp
    equal(g("movie.avi"), "qtwmp", ".avi extension");
    equal(g("movie.mpg"), "qtwmp", ".mpg extension");
    equal(g("movie.mpeg"), "qtwmp", ".mpeg extension");
});

test("setDimensions", function() {
    var dims;

    // perfect fit
    dims = Shadowbox.setDimensions(100, 100, 100, 100, 0, 0, 0, true);
    equal(dims.innerHeight, 100);
    equal(dims.innerWidth, 100);
    equal(dims.height, 100);
    equal(dims.width, 100);
    equal(dims.top, 0);
    equal(dims.left, 0);
    equal(dims.oversized, false);
    equal(dims.resizeHeight, 100);
    equal(dims.resizeWidth, 100);

    // oversized and resizable
    dims = Shadowbox.setDimensions(100, 200, 50, 50, 0, 0, 0, true);
    equal(dims.innerHeight, 25);
    equal(dims.innerWidth, 50);
    equal(dims.height, 25);
    equal(dims.width, 50);
    equal(dims.top, 12);
    equal(dims.left, 0);
    equal(dims.oversized, true);
    equal(dims.resizeHeight, 25);
    equal(dims.resizeWidth, 50);

    // oversized and not resizable
    dims = Shadowbox.setDimensions(100, 200, 50, 50, 0, 0, 0, false);
    equal(dims.innerHeight, 50);
    equal(dims.innerWidth, 50);
    equal(dims.height, 50);
    equal(dims.width, 50);
    equal(dims.top, 0);
    equal(dims.left, 0);
    equal(dims.oversized, true);
    equal(dims.resizeHeight, 100);
    equal(dims.resizeWidth, 200);
});

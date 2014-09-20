Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

var unread = 0;

var pusher = new Pusher("50ed18dd967b455393ed");
var subredditChannel = pusher.subscribe("todayilearned");

subredditChannel.bind("new-listing", function(listing) {
    process(listing);
});

var last, all = [];

function process(listing) {
    var title = listing.title.trim();

    var newTitle = process(title);
    if (newTitle === false) return;

    title = newTitle.charAt(0).toUpperCase() + newTitle.slice(1);

    listing.title = title;

    if (window.state && window.state === "hidden") {
        unread++;
        updateFavicon(unread);
    }

    if ($(".waiting")[0])
        $(".waiting").remove();

    if (last && last.title) {
        $("<a/>")
            .attr('href', last.url)
            .text(last.title)
            .prependTo("#more");
    }

    $("blockquote")
        .find('a')
        .attr('href', listing.url)
        .text(title);

    last = listing;
}

function process(title) {
    var newTitle = title.replace(/^(til|today i learned) (that )?/gi, "");
    if (title === newTitle) // make sure it matches ^
        return false;

    if (/^(about|why|of)/gi.test(newTitle) || /(me|i|my)/gi.test(newTitle)) // make sure the stripped title can be understood
        return false;

    var wordsInNewTitle = newTitle.split(" "), entry, wordsInEntry;
    for (e = 0; e < all.length; e++) {
        entry = all[e];
        for (i = 0; i < wordsInNewTitle.length; i++) {
            wordsInEntry = entry.split(" ");
            for (j = 0; j < wordsInEntry.length; j++) {

            }
        }
    }

    all.push(newTitle);

    // if `all` contains `newTitle`, return `newTitle`, else return `false`
    return (all.contains(newTitle) && newTitle);
}

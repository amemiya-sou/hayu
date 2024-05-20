$(function () {
    var teraList = [
        "ノーマル", "ほのお", "みず", "でんき", "くさ",
        "こおり", "かくとう", "どく", "じめん", "ひこう",
        "エスパー", "むし", "いわ", "ゴースト", "ドラゴン",
        "あく", "はがね", "フェアリー", "ステラ"
    ];

    function startsWithIgnoreCase(str, term) {
        return ignoreKana(str.toLowerCase()).indexOf(term) === 0;
    }

    function ignoreKana(str) {
        return str.replace(/[\u30a1-\u30f6]/g, function (match) {
            var chr = match.charCodeAt(0) - 0x60;
            return String.fromCharCode(chr);
        });
    }

    $(".tera_input").autocomplete({
        source: function (request, response) {
            var term = ignoreKana(request.term.toLowerCase());

            var matchingItems = $.grep(teraList, function (item) {
                return startsWithIgnoreCase(item, term);
            });

            response(matchingItems.slice(0, 4));
        },
        position: { my: "left top-1", at: "left bottom", collision: "none" },
        delay: 100,
        autoFocus: true,
        select: function (event, ui) {
            var currentInput = $(event.target);
            var nextInput = currentInput.closest('.input-group').nextAll('.moves-group').find('input[type="search"]').first();
            if (nextInput.length > 0) {
                nextInput.focus();
            }
        }
    });
});

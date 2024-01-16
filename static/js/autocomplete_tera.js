$(function () {
    var teraList = [
        "ノーマル", "ほのお", "みず", "でんき", "くさ",
        "こおり", "かくとう", "どく", "じめん", "ひこう",
        "エスパー", "むし", "いわ", "ゴースト", "ドラゴン",
        "あく", "はがね", "フェアリー", "ステラ"
    ];

    // ひらがなとカタカナを区別せずに前方一致検索するための関数
    function startsWithIgnoreCase(str, term) {
        return ignoreKana(str.toLowerCase()).indexOf(term) === 0;
    }

    // ひらがなとカタカナを区別せずに検索するための関数
    function ignoreKana(str) {
        return str.replace(/[\u30a1-\u30f6]/g, function (match) {
            var chr = match.charCodeAt(0) - 0x60;
            return String.fromCharCode(chr);
        });
    }

    // Autocompleteを適用
    $(".tera_input").autocomplete({
        source: function (request, response) {
            var term = ignoreKana(request.term.toLowerCase()); // 入力された値をひらがなとカタカナを区別せずに小文字に変換

            // teraListから入力に前方一致する項目を検索
            var matchingItems = $.grep(teraList, function (item) {
                return startsWithIgnoreCase(item, term);
            });

            // 最大4つまでの候補を表示
            response(matchingItems.slice(0, 4));
        },
        position: { my: "left top-1", at: "left bottom", collision: "none" },
        delay: 100,
        autoFocus: true,
        select: function (event, ui) {
            var currentInput = $(event.target);
            var nextInput = currentInput.closest('.input-group').nextAll('.input-group').find('input[type="search"]').first();
            if (nextInput.length > 0) {
                nextInput.focus();
            }
        }
    });
});

/*候補のフォントサイズを変更
.ui-autocomplete {
    font-size: 14px;
}*/
(function ($) {
    function cleanQuery(query) {
        var arr = [];
        $.each(query.split('&'), function (i, param) {
            if (param.split('=')[1]) { arr.push(param); }
        });
        return arr.join('&');
    }

    $.fn.cleanQuery = function () {
        this.on('submit', function (event) {
            event.preventDefault();

            var query = cleanQuery($(this).serialize());
            location.href = this.action + '?' + query;
        });

        return this;
    };
})(jQuery);

$(function () {
    var source = function () {
        return function (request, response) {
            var list = [];
            var list_bubun = [];
            var poke_kata = [
                "ノーマル",
                "ほのお",
                "みず",
                "でんき",
                "くさ",
                "こおり",
                "かくとう",
                "どく",
                "じめん",
                "ひこう",
                "エスパー",
                "むし",
                "いわ",
                "ゴースト",
                "ドラゴン",
                "あく",
                "はがね",
                "フェアリー",
                "ステラ"
            ];
            var term = request.term.toUpperCase();

            for (i = 0; i < poke_kata.length; i++) {
                var katakanaTerm = hiraganaToKatakana(term);  // 平仮名を片仮名に変換
                var hiraganaTerm = katakanaToHiragana(term);  // 片仮名を平仮名に変換

                // 前方一致
                if (poke_kata[i].indexOf(katakanaTerm) == 0 || poke_kata[i].indexOf(hiraganaTerm) == 0) {
                    list.push(poke_kata[i]);
                }
            }

            list = list.concat(list_bubun);
            list = list.filter(function (x, i, self) { return self.indexOf(x) === i; });
            response(list.slice(0, 4));
        };
    };

    let autoCompleteTargetsPokemon = [$('#tera1'), $('#tera2'), $('#tera3'), $('#tera4'), $('#tera5'), $('#tera6'), $('#teras1'), $('#teras2'), $('#teras3')];
    
    for (let i = 0; i < autoCompleteTargetsPokemon.length; i++) {
        autoCompleteTargetsPokemon[i].autocomplete({
            source: source(),
            autoFocus: true,
            delay: 100,
            select: function (event, ui) {
                // 選択されたときの処理
                var currentInput = $(this);
                var nextInput = currentInput.nextAll('input:first'); // 次のinput要素を取得

                if (nextInput.length > 0) {
                    nextInput.focus();
                } else {
                    // 次の項目がない場合、他の処理を行うか、フォーカスを移動しないようにする
                }
            }
        });
    }
});

// ひらがなをカタカナに変換
function hiraganaToKatakana(src) {
    return src.replace(/[\u3041-\u3096]/g, function (match) {
        var chr = match.charCodeAt(0) + 0x60;
        return String.fromCharCode(chr);
    });
}

// カタカナをひらがなに変換
function katakanaToHiragana(src) {
    return src.replace(/[\u30a1-\u30f6]/g, function (match) {
        var chr = match.charCodeAt(0) - 0x60;
        return String.fromCharCode(chr);
    });
}

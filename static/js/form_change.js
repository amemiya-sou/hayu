//pokemon1～6の内容をチェック
window.onload = function () {
    for (var i = 1; i <= 6; i++) {
        checkInitialValue('pokemon' + i);
        checkInitialValue('item' + i);
        checkInitialValue('tera' + i);
    }
};

//以下のポケモンなら背景を赤くする
function checkInitialValue(elementId) {
    var inputValue = document.getElementById(elementId).value;
    var inputElement = document.getElementById(elementId);
    if (inputValue === "" ||
        inputValue === "ライチュウ" ||
        inputValue === "サンド" ||
        inputValue === "サンドパン" ||
        inputValue === "ロコン" ||
        inputValue === "キュウコン" ||
        inputValue === "ディグダ" ||
        inputValue === "ダグトリオ" ||
        inputValue === "ニャース" ||
        inputValue === "ペルシアン" ||
        inputValue === "ガーディ" ||
        inputValue === "ウインディ" ||
        inputValue === "イシツブテ" ||
        inputValue === "ゴローン" ||
        inputValue === "ゴローニャ" ||
        inputValue === "ヤドン" ||
        inputValue === "ヤドラン" ||
        inputValue === "ベトベター" ||
        inputValue === "ベトベトン" ||
        inputValue === "ビリリダマ" ||
        inputValue === "マルマイン" ||
        inputValue === "ナッシー" ||
        inputValue === "マタドガス" ||
        inputValue === "ケンタロス" ||
        inputValue === "フリーザー" ||
        inputValue === "サンダー" ||
        inputValue === "ファイヤー" ||
        inputValue === "バクフーン" ||
        inputValue === "ウパー" ||
        inputValue === "ヤドキング" ||
        inputValue === "ハリーセン" ||
        inputValue === "ニューラ" ||
        inputValue === "デオキシス" ||
        inputValue === "カラナクシ" ||
        inputValue === "トリトドン" ||
        inputValue === "ロトム" ||
        inputValue === "ディアルガ" ||
        inputValue === "パルキア" ||
        inputValue === "ギラティナ" ||
        inputValue === "シェイミ" ||
        inputValue === "ダイケンキ" ||
        inputValue === "ドレディア" ||
        inputValue === "バスラオ" ||
        inputValue === "ゾロア" ||
        inputValue === "ゾロアーク" ||
        inputValue === "シキジカ" ||
        inputValue === "メブキジカ" ||
        inputValue === "ウォーグル" ||
        inputValue === "トルネロス" ||
        inputValue === "ボルトロス" ||
        inputValue === "ランドロス" ||
        inputValue === "ニャオニクス" ||
        inputValue === "ヌメイル" ||
        inputValue === "ヌメルゴン" ||
        inputValue === "クレベース" ||
        inputValue === "ジュナイパー" ||
        inputValue === "オドリドリ" ||
        inputValue === "ルガルガン" ||
        inputValue === "ネクロズマ" ||
        inputValue === "ストリンダー" ||
        inputValue === "イエッサン" ||
        inputValue === "ウーラオス" ||
        inputValue === "バドレックス" ||
        inputValue === "ガチグマ" ||
        inputValue === "イダイトウ" ||
        inputValue === "ラブトロス" ||
        inputValue === "パフュートン" ||
        inputValue === "イッカネズミ" ||
        inputValue === "イキリンコ" ||
        inputValue === "シャリタツ" ||
        inputValue === "コレクレー" ||
        inputValue === "オーガポン") {
        inputElement.classList.add("red-background");
    }
}

function showPokemonSuggestions(elementId) {
    var inputElement = document.getElementById(elementId);
    if (!inputElement.classList.contains("sakuraino")) {
        //内容によって表示する候補を格納
        var inputValue = inputElement.value;
        var suggestions = [];
        if (inputValue === "ライチュウ") {
            suggestions = ["ライチュウ", "ライチュウ(アローラ)"];
        } else if (inputValue === "サンド") {
            suggestions = ["サンド", "サンド(アローラ)"];
        } else if (inputValue === "サンドパン") {
            suggestions = ["サンドパン", "サンドパン(アローラ)"];
        } else if (inputValue === "ロコン") {
            suggestions = ["ロコン", "ロコン(アローラ)"];
        } else if (inputValue === "キュウコン") {
            suggestions = ["キュウコン", "キュウコン(アローラ)"];
        } else if (inputValue === "ディグダ") {
            suggestions = ["ディグダ", "ディグダ(アローラ)"];
        } else if (inputValue === "ダグトリオ") {
            suggestions = ["ダグトリオ", "ダグトリオ(アローラ)"];
        } else if (inputValue === "ニャース") {
            suggestions = ["ニャース", "ニャース(アローラ)", "ニャース(ガラル)"];
        } else if (inputValue === "ペルシアン") {
            suggestions = ["ペルシアン", "ペルシアン(アローラ)"];
        } else if (inputValue === "ガーディ") {
            suggestions = ["ガーディ", "ガーディ(ヒスイ)"];
        } else if (inputValue === "ウインディ") {
            suggestions = ["ウインディ", "ウインディ(ヒスイ)"];
        } else if (inputValue === "イシツブテ") {
            suggestions = ["イシツブテ", "イシツブテ(アローラ)"];
        } else if (inputValue === "ゴローン") {
            suggestions = ["ゴローン", "ゴローン(アローラ)"];
        } else if (inputValue === "ゴローニャ") {
            suggestions = ["ゴローニャ", "ゴローニャ(アローラ)"];
        } else if (inputValue === "ヤドン") {
            suggestions = ["ヤドン", "ヤドン(ガラル)"];
        } else if (inputValue === "ヤドラン") {
            suggestions = ["ヤドラン", "ヤドラン(ガラル)"];
        } else if (inputValue === "ベトベター") {
            suggestions = ["ベトベター", "ベトベター(アローラ)"];
        } else if (inputValue === "ベトベトン") {
            suggestions = ["ベトベトン", "ベトベトン(アローラ)"];
        } else if (inputValue === "ビリリダマ") {
            suggestions = ["ビリリダマ", "ビリリダマ(ヒスイ)"];
        } else if (inputValue === "マルマイン") {
            suggestions = ["マルマイン", "マルマイン(ヒスイ)"];
        } else if (inputValue === "ナッシー") {
            suggestions = ["ナッシー", "ナッシー(アローラ)"];
        } else if (inputValue === "マタドガス") {
            suggestions = ["マタドガス", "マタドガス(ガラル)"];
        } else if (inputValue === "ケンタロス") {
            suggestions = ["ケンタロス", "ケンタロス(パルデア単)", "ケンタロス(パルデア炎)", "ケンタロス(パルデア水)"];
        } else if (inputValue === "フリーザー") {
            suggestions = ["フリーザー", "フリーザー(ガラル)"];
        } else if (inputValue === "サンダー") {
            suggestions = ["サンダー", "サンダー(ガラル)"];
        } else if (inputValue === "ファイヤー") {
            suggestions = ["ファイヤー", "ファイヤー(ガラル)"];
        } else if (inputValue === "バクフーン") {
            suggestions = ["バクフーン", "バクフーン(ヒスイ)"];
        } else if (inputValue === "ウパー") {
            suggestions = ["ウパー", "ウパー(パルデア)"];
        } else if (inputValue === "ヤドキング") {
            suggestions = ["ヤドキング", "ヤドキング(ガラル)"];
        } else if (inputValue === "ハリーセン") {
            suggestions = ["ハリーセン", "ハリーセン(ヒスイ)"];
        } else if (inputValue === "ニューラ") {
            suggestions = ["ニューラ", "ニューラ(ヒスイ)"];
        } else if (inputValue === "デオキシス") {
            suggestions = ["デオキシス(ノーマル)", "デオキシス(アタック)", "デオキシス(ディフェンス)", "デオキシス(スピード)"];
        } else if (inputValue === "カラナクシ") {
            suggestions = ["カラナクシ(ピンク)", "カラナクシ(水色)"];
        } else if (inputValue === "トリトドン") {
            suggestions = ["トリトドン(ピンク)", "トリトドン(水色)"];
        } else if (inputValue === "ロトム") {
            suggestions = ["ロトム", "ヒートロトム", "ウォッシュロトム", "フロストロトム", "スピンロトム", "カットロトム"];
        } else if (inputValue === "ディアルガ") {
            suggestions = ["ディアルガ", "ディアルガ(オリジン)"];
        } else if (inputValue === "パルキア") {
            suggestions = ["パルキア", "パルキア(オリジン)"];
        } else if (inputValue === "ギラティナ") {
            suggestions = ["ギラティナ(アナザー)", "ギラティナ(オリジン)"];
        } else if (inputValue === "シェイミ") {
            suggestions = ["シェイミ(ランド)", "シェイミ(スカイ)"];
        } else if (inputValue === "ダイケンキ") {
            suggestions = ["ダイケンキ", "ダイケンキ(ヒスイ)"];
        } else if (inputValue === "ドレディア") {
            suggestions = ["ドレディア", "ドレディア(ヒスイ)"];
        } else if (inputValue === "バスラオ") {
            suggestions = ["バスラオ(赤すじ)", "バスラオ(青すじ)", "バスラオ(白すじ)"];
        } else if (inputValue === "ゾロア") {
            suggestions = ["ゾロア", "ゾロア(ヒスイ)"];
        } else if (inputValue === "ゾロアーク") {
            suggestions = ["ゾロアーク", "ゾロアーク(ヒスイ)"];
        } else if (inputValue === "シキジカ") {
            suggestions = ["シキジカ(春)", "シキジカ(夏)", "シキジカ(秋)", "シキジカ(冬)"];
        } else if (inputValue === "メブキジカ") {
            suggestions = ["メブキジカ(春)", "メブキジカ(夏)", "メブキジカ(秋)", "メブキジカ(冬)"];
        } else if (inputValue === "ウォーグル") {
            suggestions = ["ウォーグル", "ウォーグル(ヒスイ)"];
        } else if (inputValue === "トルネロス") {
            suggestions = ["トルネロス(化身)", "トルネロス(霊獣)"];
        } else if (inputValue === "ボルトロス") {
            suggestions = ["ボルトロス(化身)", "ボルトロス(霊獣)"];
        } else if (inputValue === "ランドロス") {
            suggestions = ["ランドロス(化身)", "ランドロス(霊獣)"];
        } else if (inputValue === "ニャオニクス") {
            suggestions = ["ニャオニクス♂", "ニャオニクス♀"];
        } else if (inputValue === "ヌメイル") {
            suggestions = ["ヌメイル", "ヌメイル(ヒスイ)"];
        } else if (inputValue === "ヌメルゴン") {
            suggestions = ["ヌメルゴン", "ヌメルゴン(ヒスイ)"];
        } else if (inputValue === "クレベース") {
            suggestions = ["クレベース", "クレベース(ヒスイ)"];
        } else if (inputValue === "ジュナイパー") {
            suggestions = ["ジュナイパー", "ジュナイパー(ヒスイ)"];
        } else if (inputValue === "オドリドリ") {
            suggestions = ["オドリドリ(めらめら)", "オドリドリ(ふらふら)", "オドリドリ(まいまい)", "オドリドリ(ぱちぱち)"];
        } else if (inputValue === "ルガルガン") {
            suggestions = ["ルガルガン(まひる)", "ルガルガン(まよなか)", "ルガルガン(たそがれ)"];
        } else if (inputValue === "ネクロズマ") {
            suggestions = ["ネクロズマ", "ネクロズマ(日食)", "ネクロズマ(月食)"];
        } else if (inputValue === "ストリンダー") {
            suggestions = ["ストリンダー(ハイ)", "ストリンダー(ロー)"];
        } else if (inputValue === "イエッサン") {
            suggestions = ["イエッサン♂", "イエッサン♀"];
        } else if (inputValue === "ウーラオス") {
            suggestions = ["ウーラオス(いちげき)", "ウーラオス(れんげき)"];
        } else if (inputValue === "バドレックス") {
            suggestions = ["バドレックス", "バドレックス(白)", "バドレックス(黒)"];
        } else if (inputValue === "ガチグマ") {
            suggestions = ["ガチグマ", "ガチグマ(アカツキ)"];
        } else if (inputValue === "イダイトウ") {
            suggestions = ["イダイトウ♂", "イダイトウ♀"];
        } else if (inputValue === "ラブトロス") {
            suggestions = ["ラブトロス(化身)", "ラブトロス(霊獣)"];
        } else if (inputValue === "パフュートン") {
            suggestions = ["パフュートン♂", "パフュートン♀"];
        } else if (inputValue === "イッカネズミ") {
            suggestions = ["イッカネズミ(3びき)", "イッカネズミ(4ひき)"];
        } else if (inputValue === "イキリンコ") {
            suggestions = ["イキリンコ(グリーン)", "イキリンコ(ブルー)", "イキリンコ(イエロー)", "イキリンコ(ホワイト)"];
        } else if (inputValue === "シャリタツ") {
            suggestions = ["シャリタツ(橙色)", "シャリタツ(赤色)", "シャリタツ(黄色)"];
        } else if (inputValue === "コレクレー") {
            suggestions = ["コレクレー(はこ)", "コレクレー(とほ)"];
        } else if (inputValue === "オーガポン") {
            suggestions = ["オーガポン(みどり)", "オーガポン(いど)", "オーガポン(かまど)", "オーガポン(いしずえ)"];
        }

        //候補を表示する場所を定義する
        var suggestionsContainer = document.getElementById(elementId + "suggestions");
        suggestionsContainer.innerHTML = "";

        //候補の数だけ繰り返し
        for (var i = 0; i < suggestions.length; i++) {
            var suggestion = suggestions[i];
            var suggestionElement = document.createElement("div");
            suggestionElement.className = "suggestion";
            suggestionElement.textContent = suggestion;

            //候補を選んだ時の処理
            suggestionElement.onclick = function () {
                document.getElementById(elementId).classList.replace("red-background", "sakuraino");
                document.getElementById(elementId).value = this.textContent;
                suggestionsContainer.innerHTML = "";
                suggestionsContainer.style.display = "none";
            };
            suggestionsContainer.appendChild(suggestionElement);

            if (i === 0) {
                suggestionElement.classList.add("selected");
            }
        }
        if (suggestions.length > 0) {
            suggestionsContainer.style.display = "block";
        } else {
            suggestionsContainer.style.display = "none";
        }
    }/* else {
        var inputValue = inputElement.value;
        var suggestions = [];
        if (inputValue === "ウーラオス(れんげき)") {
            suggestions = ["ウーラオス(いちげき)", "ウーラオス(れんげき)"];
        }
        //候補を表示する場所を定義する
        var suggestionsContainer = document.getElementById(elementId + "suggestions");
        suggestionsContainer.innerHTML = "";

        //候補の数だけ繰り返し
        for (var i = 0; i < suggestions.length; i++) {
            var suggestion = suggestions[i];
            var suggestionElement = document.createElement("div");
            suggestionElement.className = "suggestion";
            suggestionElement.textContent = suggestion;
            //候補を選んだ時の処理
            suggestionElement.onclick = function () {
                document.getElementById(elementId).classList.replace("sakuraino", "sakuraino");
                document.getElementById(elementId).value = this.textContent;
                suggestionsContainer.innerHTML = "";
                suggestionsContainer.style.display = "none";
            };
            suggestionsContainer.appendChild(suggestionElement);
        }
        if (suggestions.length > 0) {
            suggestionsContainer.style.display = "block";
        } else {
            suggestionsContainer.style.display = "none";
        }
    }*/
}

//フォーカスを外したら候補を消す
function myBlurFunction(elementId) {
    setTimeout(function () {
        var suggestionsContainer = document.getElementById(elementId + "suggestions");
        suggestionsContainer.style.display = "none";
    }, 100); // 100ミリ秒（0.1秒）の遅延を設定
}

//内容が変更されたら背景を元に戻す
function changeColor(elementId) {
    var inputValue = document.getElementById(elementId).value;
    var inputElement = document.getElementById(elementId);
    if (inputValue !== "イノ" && inputValue !== "ニナ") {
        inputElement.classList.remove("red-background");
    }
}


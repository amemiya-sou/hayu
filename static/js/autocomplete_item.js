$(function () {
    var itemList = [
        "あおぞらプレート", "あかいいと", "あついいわ", "あつぞこブーツ",
        "あまーいりんご", "いかさまダイス", "いかずちプレート", "いじっぱりミント",
        "いのちのたま", "イワイノヨロイ", "インドメタシン", "うすもものミツ",
        "うっかりやミント", "エレキシード", "おうじゃのしるし", "おおきなねっこ",
        "おくびょうミント", "おだやかミント", "おっとりミント", "おとなしいミント",
        "おまもりこばん", "おんみつマント", "かいがらのすず", "かえんだま",
        "かけたポット", "かしらのしるし", "かたいいし", "かみなりのいし",
        "からぶりほけん", "かるいし", "かわらずのいし", "がんせきプレート",
        "きあいのタスキ", "きあいのハチマキ", "きせきのタネ", "キトサン",
        "きゅうこん", "きれいなぬけがら", "ぎんのおうかん", "きんのおうかん",
        "ぎんのこな", "きんりょくのハネ", "くちたけん", "くちたたて",
        "くっつきバリ", "グラスシード", "グランドコート", "クリアチャーム",
        "くれないのミツ", "くろいてっきゅう", "くろいヘドロ", "くろいメガネ",
        "くろおび", "けいけんアメL", "けいけんアメM", "けいけんアメS",
        "けいけんアメXL", "けいけんアメXS", "けむりだま", "こうかくレンズ",
        "こうこうのしっぽ", "こうてつプレート", "こおりのいし", "こだわりスカーフ",
        "こだわりハチマキ", "こだわりメガネ", "ゴツゴツメット", "こぶしのプレート",
        "こわもてプレート", "こんごうだま", "サイコシード", "さみしがりミント",
        "さらさらいわ", "しあわせタマゴ", "じしゃく", "しずくプレート",
        "しめつけバンド", "しめったいわ", "じゃくてんほけん", "じゅうでんち",
        "しゅんぱつのハネ", "しらたま", "シルクのスカーフ", "しろいハーブ",
        "しんかのきせき", "しんちょうミント", "しんぴのしずく", "すっぱいりんご",
        "スピードパウダー", "ずぶといミント", "するどいくちばし", "するどいツメ",
        "せいしんのハネ", "せいれいプレート", "せっかちミント", "せんせいのツメ",
        "だいこんごうだま", "だいしらたま", "だいちのプレート", "だいはっきんだま",
        "たいようのいし", "たいりょくのハネ", "タウリン", "だっしゅつパック",
        "だっしゅつボタン", "たつじんのおび", "たべのこし", "たまむしプレート",
        "ちからのハチマキ", "ちりょくのハネ", "つきのいし", "つめたいいわ",
        "つららのプレート", "ていこうのハネ", "テラピースあく", "テラピースいわ",
        "テラピースかくとう", "テラピースくさ", "テラピースゴースト", "テラピースこおり",
        "テラピースじめん", "テラピースでんき", "テラピースどく", "テラピースドラゴン",
        "テラピースノーマル", "テラピースはがね", "テラピースひこう", "テラピースフェアリー",
        "テラピースほのお", "テラピースみず", "テラピースむし", "でんきだま",
        "とくせいガード", "とくせいカプセル", "とくせいパッチ", "どくどくだま",
        "どくバリ", "とけないこおり", "とつげきチョッキ", "なまいきミント",
        "なんでもなおし", "ねばりのかぎづめ", "ねらいのまと", "のうてんきミント",
        "ノーマルジュエル", "のどスプレー", "のろいのおふだ", "ノロイノヨロイ",
        "のんきミント", "はっきんだま", "パワーアンクル", "パワーウエイト",
        "パワーバンド", "パワーベルト", "パワーリスト", "パワーレンズ",
        "パワフルハーブ", "パンチグローブ", "ばんのうがさ", "ひかえめミント",
        "ひかりごけ", "ひかりのいし", "ひかりのこな", "ひかりのねんど",
        "ひのたまプレート", "ビビリだま", "ピントレンズ", "ブーストエナジー",
        "ふうせん", "フォーカスレンズ", "ふしぎなアメ", "ふしぎのプレート",
        "ブロムヘキシン", "ポイントアップ", "ポイントマックス", "ぼうごパット",
        "ぼうじんゴーグル", "ほのおのいし", "まがったスプーン", "まじめミント",
        "マックスアップ", "まんまるいし", "ミストシード", "みずのいし",
        "みどりのプレート", "むじゃきミント", "むらさきのミツ", "めざめいし",
        "メタルコート", "メタルパウダー", "メトロノーム", "メンタルハーブ",
        "もうどくプレート", "もくたん", "ものしりメガネ", "もののけプレート",
        "ものまねハーブ", "やすらぎのすず", "やまぶきのミツ", "やみのいし",
        "やわらかいすな", "やんちゃミント", "ゆうかんミント", "ゆきだま",
        "ようきミント", "リーフのいし", "リゾチウム", "りゅうのキバ",
        "りゅうのプレート", "ルームサービス", "れいせいミント", "レッドカード",
        "われたポット", "わんぱくミント", "ようせいのハネ", "みついりりんご",
        "ボンサクのちゃわん", "ケッサクのちゃわん", "いしずえのめん", "いどのめん",
        "かまどのめん", "たいりょくのもち", "きんりょくのもち", "ていこうのもち",
        "ちりょくのもち", "せいしんのもち", "しゅんぱつのもち", "まっさらもち",
        "きれいなウロコ", "するどいキバ", "れいかいのぬの", "あまいミツ",
        "ウルトラボール", "クイックボール", "ゴージャスボール", "コンペボール",
        "サファリボール", "スーパーボール", "スピードボール", "ダークボール",
        "ダイブボール", "タイマーボール", "ドリームボール", "ネストボール",
        "ネットボール", "ハイパーボール", "ヒールボール", "プレミアボール",
        "フレンドボール", "ヘビーボール", "マスターボール", "ムーンボール",
        "モンスターボール", "ラブラブボール", "リピートボール", "ルアーボール",
        "レベルボール", "エフェクトガード", "クリティカット", "スピーダー",
        "スペシャルアップ", "スペシャルガード", "ディフェンダー", "ピッピにんぎょう",
        "プラスパワー", "ポケじゃらし", "ヨクアタール", "アッキのみ", "イアのみ",
        "イトケのみ", "イバンのみ", "ウイのみ", "ウタンのみ", "ウブのみ",
        "オッカのみ", "オボンのみ", "オレンのみ", "カイスのみ", "カゴのみ",
        "カシブのみ", "カムラのみ", "キーのみ", "クラボのみ", "ゴスのみ",
        "ザロクのみ", "サンのみ", "シーヤのみ", "ジャポのみ", "シュカのみ",
        "ズアのみ", "スターのみ", "ズリのみ", "セシナのみ", "ソクノのみ",
        "タポルのみ", "タラプのみ", "タンガのみ", "チーゴのみ", "チイラのみ",
        "ドリのみ", "ナゾのみ", "ナナシのみ", "ナナのみ", "ナモのみ", "ネコブのみ",
        "ノメルのみ", "ノワキのみ", "パイルのみ", "バコウのみ", "ハバンのみ",
        "バンジのみ", "ビアーのみ", "ヒメリのみ", "フィラのみ", "ブリーのみ",
        "ベリブのみ", "ホズのみ", "マゴのみ", "マトマのみ", "ミクルのみ",
        "モコシのみ", "モモンのみ", "ヤタピのみ", "ヤチェのみ", "ヨプのみ",
        "ヨロギのみ", "ラブタのみ", "ラムのみ", "リュガのみ", "リリバのみ",
        "リンドのみ", "レンブのみ", "ロゼルのみ", "ロメのみ", "ねむけざまし",
        "いいキズぐすり", "おいしいみず", "かいふくのくすり", "キズぐすり",
        "げんきのかけら", "げんきのかたまり", "こおりなおし", "サイコソーダ",
        "すごいキズぐすり", "ちからのこな", "ちからのねっこ", "どくけし", "ばんのうごな",
        "ピーピーエイダー", "ピーピーエイド", "ピーピーマックス", "ピーピーリカバー",
        "ふっかつそう", "まひなおし", "まんたんのくすり", "ミックスオレ",
        "モーモーミルク", "やけどなおし", "おおきなキノコ", "おおきなしんじゅ",
        "おおきなタケノコ", "おだんごしんじゅ", "かおるキノコ", "きちょうなホネ",
        "きれいなハネ", "きんのたま", "しんじゅ", "すいせいのかけら",
        "ちいさなキノコ", "ちいさなタケノコ", "でかいきんのたま", "ほしのかけら",
        "ほしのすな"
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
    $(".item_input").autocomplete({
        source: function (request, response) {
            var term = ignoreKana(request.term.toLowerCase()); // 入力された値をひらがなとカタカナを区別せずに小文字に変換

            // itemListから入力に前方一致する項目を検索
            var matchingItems = $.grep(itemList, function (item) {
                return startsWithIgnoreCase(item, term);
            });

            // 最大4つまでの候補を表示
            response(matchingItems.slice(0, 4));
        },
        delay: 100,
        autoFocus: true,
        select: function (event, ui) {
            // 選択されたときの処理
            var currentInput = $(this);
            var nextInput = currentInput.nextAll('input:first'); // 次のinput要素を取得

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
from flask import Flask, render_template, request
import cv2
import numpy as np
import pytesseract
from PIL import Image
import Levenshtein
import base64
import os
import concurrent.futures

app = Flask(__name__)

teras_images = {
    "みず": cv2.imread("img/mizu.png"),
    "フェアリー": cv2.imread("img/fairy.png"),
    "はがね": cv2.imread("img/hagane.png"),
    "ほのお": cv2.imread("img/honoo.png"),
    "どく": cv2.imread("img/doku.png"),
    "ゴースト": cv2.imread("img/ghost.png"),
    "ひこう": cv2.imread("img/hikou.png"),
    "ノーマル": cv2.imread("img/normal.png"),
    "でんき": cv2.imread("img/denki.png"),
    "ステラ": cv2.imread("img/sutera.png"),
    "くさ": cv2.imread("img/kusa.png"),
    "あく": cv2.imread("img/aku.png"),
    "ドラゴン": cv2.imread("img/doragon.png"),
    "こおり": cv2.imread("img/koori.png"),
    "かくとう": cv2.imread("img/kakutou.png"),
    "いわ": cv2.imread("img/iwa.png"),
    "じめん": cv2.imread("img/zimen.png"),
    "エスパー": cv2.imread("img/esper.png"),
    "むし": cv2.imread("img/mushi.png")
}

poke_words = [
    "フシギダネ", "フシギソウ", "フシギバナ",
    "ヒトカゲ", "リザード", "リザードン",
    "ゼニガメ", "カメール", "カメックス",
    "アーボ", "アーボック",
    "ピカチュウ", "ライチュウ",
    "サンド", "サンドパン",
    "ピッピ", "ピクシー",
    "ロコン", "キュウコン",
    "プリン", "プクリン",
    "ナゾノクサ", "クサイハナ", "ラフレシア",
    "コンパン", "モルフォン",
    "ディグダ", "ダグトリオ",
    "ニャース", "ペルシアン",
    "コダック", "ゴルダック",
    "マンキー", "オコリザル",
    "ガーディ", "ウインディ",
    "ニョロモ", "ニョロゾ", "ニョロボン",
    "マダツボミ", "ウツドン", "ウツボット",
    "メノクラゲ", "ドククラゲ",
    "イシツブテ", "ゴローン", "ゴローニャ",
    "ヤドン", "ヤドラン",
    "コイル", "レアコイル",
    "ドードー", "ドードリオ",
    "パウワウ", "ジュゴン",
    "ベトベター", "ベトベトン",
    "シェルダー", "パルシェン",
    "ゴース", "ゴースト", "ゲンガー",
    "スリープ", "スリーパー",
    "ビリリダマ", "マルマイン",
    "タマタマ", "ナッシー",
    "サワムラー", "エビワラー",
    "ドガース", "マタドガス",
    "サイホーン", "サイドン",
    "ラッキー",
    "タッツー", "シードラ",
    "ストライク",
    "エレブー",
    "ブーバー",
    "ケンタロス",
    "コイキング", "ギャラドス",
    "ラプラス",
    "メタモン",
    "イーブイ", "シャワーズ", "サンダース", "ブースター",
    "ポリゴン",
    "カビゴン",
    "フリーザー",
    "サンダー",
    "ファイヤー",
    "ミニリュウ", "ハクリュー", "カイリュー",
    "ミュウツー",
    "ミュウ",
    "チコリータ", "ベイリーフ", "メガニウム",
    "ヒノアラシ", "マグマラシ", "バクフーン",
    "ワニノコ", "アリゲイツ", "オーダイル",
    "オタチ", "オオタチ",
    "ホーホー", "ヨルノズク",
    "イトマル", "アリアドス",
    "チョンチー", "ランターン",
    "ピチュー",
    "ピィ",
    "ププリン",
    "メリープ", "モココ", "デンリュウ",
    "キレイハナ",
    "マリル", "マリルリ",
    "ウソッキー",
    "ニョロトノ",
    "ハネッコ", "ポポッコ", "ワタッコ",
    "エイパム",
    "ヒマナッツ", "キマワリ",
    "ヤンヤンマ",
    "ウパー", "ヌオー",
    "エーフィ", "ブラッキー",
    "ヤミカラス",
    "ヤドキング",
    "ムウマ",
    "キリンリキ",
    "クヌギダマ", "フォレトス",
    "ノコッチ",
    "グライガー",
    "ブルー", "グランブル",
    "ハリーセン",
    "ハッサム",
    "ヘラクロス",
    "ニューラ",
    "ヒメグマ", "リングマ",
    "マグマッグ", "マグカルゴ",
    "ウリムー", "イノムー",
    "デリバード",
    "エアームド",
    "デルビル", "ヘルガー",
    "キングドラ",
    "ゴマゾウ", "ドンファン",
    "ポリゴン2",
    "オドシシ",
    "ドーブル",
    "バルキー", "カポエラー",
    "エレキッド",
    "ブビィ",
    "ハピナス",
    "ライコウ",
    "エンテイ",
    "スイクン",
    "ヨーギラス", "サナギラス", "バンギラス",
    "ルギア", "ホウオウ",
    "キモリ", "ジュプトル", "ジュカイン",
    "アチャモ", "ワカシャモ", "バシャーモ",
    "ミズゴロウ", "ヌマクロー", "ラグラージ",
    "ポチエナ", "グラエナ",
    "ハスボー", "ハスブレロ", "ルンパッパ",
    "タネボー", "コノハナ", "ダーテング",
    "キャモメ", "ペリッパー",
    "ラルトス", "キルリア", "サーナイト",
    "アメタマ", "アメモース",
    "キノココ", "キノガッサ",
    "ナマケロ", "ヤルキモノ", "ケッキング",
    "マクノシタ", "ハリテヤマ",
    "ルリリ",
    "ノズパス",
    "ヤミラミ",
    "アサナン", "チャーレム",
    "プラスル",
    "マイナン",
    "バルビート",
    "イルミーゼ",
    "ゴクリン", "マルノーム",
    "ドンメル", "バクーダ",
    "コータス",
    "バネブー", "ブーピッグ",
    "ナックラー", "ビブラーバ", "フライゴン",
    "サボネア", "ノクタス",
    "チルット", "チルタリス",
    "ザングース",
    "ハブネーク",
    "ドジョッチ", "ナマズン",
    "ヘイガニ", "シザリガー",
    "ヒンバス", "ミロカロス",
    "カゲボウズ", "ジュペッタ",
    "ヨマワル", "サマヨール",
    "トロピウス",
    "チリーン",
    "ユキワラシ", "オニゴーリ",
    "ラブカス",
    "タツベイ", "コモルー", "ボーマンダ",
    "ダンバル", "メタング", "メタグロス",
    "レジロック",
    "レジアイス",
    "レジスチル",
    "ラティアス",
    "ラティオス",
    "カイオーガ",
    "グラードン",
    "レックウザ",
    "ジラーチ",
    "デオキシス",
    "ナエトル", "ハヤシガメ", "ドダイトス",
    "ヒコザル", "モウカザル", "ゴウカザル",
    "ポッチャマ", "ポッタイシ", "エンペルト",
    "ムックル", "ムクバード", "ムクホーク",
    "コロボーシ", "コロトック",
    "コリンク", "ルクシオ", "レントラー",
    "ズガイドス", "ラムパルド",
    "タテトプス", "トリデプス",
    "ミツハニー", "ビークイン",
    "パチリス",
    "ブイゼル", "フローゼル",
    "カラナクシ", "トリトドン",
    "エテボース",
    "フワンテ", "フワライド",
    "ムウマージ",
    "ドンカラス",
    "リーシャン",
    "スカンプー", "スカタンク",
    "ドーミラー", "ドータクン",
    "ウソハチ",
    "ピンプク",
    "ミカルゲ",
    "フカマル", "ガバイト", "ガブリアス",
    "ゴンベ",
    "リオル", "ルカリオ",
    "ヒポポタス", "カバルドン",
    "グレッグル", "ドクロッグ",
    "ケイコウオ", "ネオラント",
    "ユキカブリ", "ユキノオー",
    "マニューラ",
    "ジバコイル",
    "ドサイドン",
    "エレキブル",
    "ブーバーン",
    "メガヤンマ",
    "リーフィア", "グレイシア",
    "グライオン",
    "マンムー",
    "ポリゴンZ",
    "エルレイド",
    "ダイノーズ",
    "ヨノワール",
    "ユキメノコ",
    "ロトム",
    "ユクシー",
    "エムリット",
    "アグノム",
    "ディアルガ",
    "パルキア",
    "ヒードラン",
    "レジギガス",
    "ギラティナ",
    "クレセリア",
    "フィオネ",
    "マナフィ",
    "ダークライ",
    "シェイミ",
    "アルセウス",
    "ツタージャ", "ジャノビー", "ジャローダ",
    "ポカブ", "チャオブー", "エンブオー",
    "ミジュマル", "フタチマル", "ダイケンキ",
    "シママ", "ゼブライカ",
    "モグリュー", "ドリュウズ",
    "ドッコラー", "ドテッコツ", "ローブシン",
    "クルミル", "クルマユ", "ハハコモリ",
    "モンメン", "エルフーン",
    "チュリネ", "ドレディア",
    "バスラオ",
    "メグロコ", "ワルビル", "ワルビアル",
    "ズルッグ", "ズルズキン",
    "ゾロア", "ゾロアーク",
    "チラーミィ", "チラチーノ",
    "ゴチム", "ゴチミル", "ゴチルゼル",
    "ユニラン", "ダブラン", "ランクルス",
    "コアルヒー", "スワンナ",
    "シキジカ", "メブキジカ",
    "タマゲタケ", "モロバレル",
    "ママンボウ",
    "バチュル", "デンチュラ",
    "シビシラス", "シビビール", "シビルドン",
    "ヒトモシ", "ランプラー", "シャンデラ",
    "キバゴ", "オノンド", "オノノクス",
    "クマシュン", "ツンベアー",
    "フリージオ",
    "コジョフー", "コジョンド",
    "ゴビット", "ゴルーグ",
    "コマタナ", "キリキザン",
    "ワシボン", "ウォーグル",
    "バルチャイ", "バルジーナ",
    "モノズ", "ジヘッド", "サザンドラ",
    "メラルバ", "ウルガモス",
    "コバルオン",
    "テラキオン",
    "ビリジオン",
    "トルネロス",
    "ボルトロス",
    "レシラム",
    "ゼクロム",
    "ランドロス",
    "キュレム",
    "ケルディオ",
    "メロエッタ",
    "ハリマロン", "ハリボーグ", "ブリガロン",
    "フォッコ", "テールナー", "マフォクシー",
    "ケロマツ", "ゲコガシラ", "ゲッコウガ",
    "ヤヤコマ", "ヒノヤコマ", "ファイアロー",
    "コフキムシ", "コフーライ", "ビビヨン",
    "シシコ", "カエンジシ",
    "フラベベ", "フラエッテ", "フラージェス",
    "メェークル", "ゴーゴート",
    "ニャスパー", "ニャオニクス",
    "マーイーカ", "カラマネロ",
    "クズモー", "ドラミドロ",
    "ウデッポウ", "ブロスター",
    "ニンフィア",
    "ルチャブル",
    "デデンネ",
    "メレシー",
    "ヌメラ", "ヌメイル", "ヌメルゴン",
    "クレッフィ",
    "ボクレー", "オーロット",
    "カチコール", "クレベース",
    "オンバット", "オンバーン",
    "ディアンシー",
    "フーパ",
    "ボルケニオン",
    "モクロー", "フクスロー", "ジュナイパー",
    "ニャビー", "ニャヒート", "ガオガエン",
    "アシマリ", "オシャマリ", "アシレーヌ",
    "ツツケラ", "ケララッパ", "ドデカバシ",
    "ヤングース", "デカグース",
    "アゴジムシ", "デンヂムシ", "クワガノン",
    "マケンカニ", "ケケンカニ",
    "オドリドリ",
    "アブリー", "アブリボン",
    "イワンコ", "ルガルガン",
    "ヒドイデ", "ドヒドイデ",
    "ドロバンコ", "バンバドロ",
    "シズクモ", "オニシズクモ",
    "カリキリ", "ラランテス",
    "ヤトウモリ", "エンニュート",
    "アマカジ", "アママイコ", "アマージョ",
    "キュワワー",
    "ヤレユータン",
    "ナゲツケサル",
    "スナバァ", "シロデスナ",
    "メテノ",
    "ネッコアラ",
    "ミミッキュ",
    "ハギギシリ",
    "ジャラコ", "ジャランゴ", "ジャラランガ",
    "コスモッグ",
    "コスモウム",
    "ソルガレオ",
    "ルナアーラ",
    "ネクロズマ",
    "マギアナ",
    "サルノリ", "バチンキー", "ゴリランダー",
    "ヒバニー", "ラビフット", "エースバーン",
    "メッソン", "ジメレオン", "インテレオン",
    "ホシガリス", "ヨクバリス",
    "ココガラ", "アオガラス", "アーマーガア",
    "カムカメ", "カジリガメ",
    "タンドン", "トロッゴン", "セキタンザン",
    "カジッチュ", "アップリュー", "タルップル",
    "スナヘビ", "サダイジャ",
    "ウッウ",
    "サシカマス", "カマスジョー",
    "エレズン", "ストリンダー",
    "ヤバチャ", "ポットデス",
    "ミブリム", "テブリム", "ブリムオン",
    "ベロバー", "ギモー", "オーロンゲ",
    "ニャイキング",
    "マホミル", "マホイップ",
    "タイレーツ",
    "バチンウニ",
    "ユキハミ", "モスノウ",
    "イシヘンジン",
    "コオリッポ",
    "イエッサン",
    "モルペコ",
    "ゾウドウ", "ダイオウドウ",
    "ジュラルドン",
    "ドラメシヤ", "ドロンチ", "ドラパルト",
    "ザシアン",
    "ザマゼンタ",
    "ムゲンダイナ",
    "ダクマ", "ウーラオス",
    "ザルード",
    "レジエレキ",
    "レジドラゴ",
    "ブリザポス",
    "レイスポス",
    "バドレックス",
    "アヤシシ",
    "バサギリ",
    "ガチグマ",
    "イダイトウ",
    "オオニューラ",
    "ハリーマン",
    "ラブトロス",
    "ニャオハ", "ニャローテ", "マスカーニャ",
    "ホゲータ", "アチゲータ", "ラウドボーン",
    "クワッス", "ウェルカモ", "ウェーニバル",
    "グルトン", "パフュートン",
    "タマンチュラ", "ワナイダー",
    "マメバッタ", "エクスレッグ",
    "パモ", "パモット", "パーモット",
    "ワッカネズミ", "イッカネズミ",
    "パピモッチ", "バウッツェル",
    "ミニーブ", "オリーニョ", "オリーヴァ",
    "イキリンコ",
    "コジオ", "ジオヅム", "キョジオーン",
    "カルボウ", "グレンアルマ", "ソウブレイズ",
    "ズピカ", "ハラバリー",
    "カイデン", "タイカイデン",
    "オラチフ", "マフィティフ",
    "シルシュルー", "タギングル",
    "アノクサ", "アノホラグサ",
    "ノノクラゲ", "リククラゲ",
    "ガケガニ",
    "カプサイジ", "スコヴィラン",
    "シガロコ", "ベラカス",
    "ヒラヒナ", "クエスパトラ",
    "カヌチャン", "ナカヌチャン", "デカヌチャン",
    "ウミディグダ", "ウミトリオ",
    "オトシドリ",
    "ナミイルカ", "イルカマン",
    "ブロロン", "ブロロローム",
    "モトトカゲ",
    "ミミズズ",
    "キラーメ", "キラフロル",
    "ボチ", "ハカドッグ",
    "カラミンゴ",
    "アルクジラ", "ハルクジラ",
    "ミガルーサ",
    "ヘイラッシャ",
    "シャリタツ",
    "コノヨザル",
    "ドオー",
    "リキキリン",
    "ノココッチ",
    "ドドゲザン",
    "イダイナキバ",
    "サケブシッポ",
    "アラブルタケ",
    "ハバタクカミ",
    "チヲハウハネ",
    "スナノケガワ",
    "テツノワダチ",
    "テツノツツミ",
    "テツノカイナ",
    "テツノコウベ",
    "テツノドクガ",
    "テツノイバラ",
    "セビエ", "セゴール", "セグレイブ",
    "コレクレー", "サーフゴー",
    "チオンジェン",
    "パオジアン",
    "ディンルー",
    "イーユイ",
    "トドロクツキ",
    "テツノブジン",
    "コライドン",
    "ミライドン",
    "ウネルミナモ",
    "テツノイサハ",
    "カミッチュ",
    "チャデス", "ヤバソチャ",
    "イイネイヌ",
    "マシマシラ",
    "キチキギス",
    "オーガポン",
    "ブリジュラス",
    "カミツオロチ",
    "ウガツホムラ",
    "タケルライコ",
    "テツノイワオ",
    "テツノカシラ",
    "テラパゴス",
    "モモワロウ"
]


item_words = [
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
    "ほしのすな",
    "いちごアメざいく", "ハートアメざいく",
    "ベリーアメざいく", "よつばアメざいく", "おはなアメざいく", "スターアメざいく",
    "リボンアメざいく", "ガラナツブレス", "ガラナツリース", "ふくごうきんぞく",
    "あやしいパッチ", "マグマブースター", "エレキブースター", "プロテクター",
    "りゅうのウロコ", "アップグレード", "こころのしずく", "なし"
]


move_words = [
    "3ぼんのや", "アーマーキャノン", "アームハンマー", "アイアンテール",
    "アイアンヘッド", "アイアンローラー", "アイススピナー", "アイスハンマー",
    "あおいほのお", "アクアカッター", "アクアジェット", "アクアステップ",
    "アクアテール", "アクアブレイク", "アクアリング", "あくうせつだん",
    "アクセルブレイク", "アクセルロック", "あくのはどう", "あくび",
    "アクロバット", "あさのひざし", "アシストパワー", "アシッドボム",
    "アストラルビット", "あなをほる", "あばれる", "あまいかおり",
    "あまえる", "あまごい", "あやしいひかり", "アロマミスト",
    "アンコール", "あんこくきょうだ", "いあいぎり", "いえき",
    "イカサマ", "いかりのこな", "いかりのまえば", "いじげんホール",
    "いじげんラッシュ", "いたみわけ", "いちゃもん", "いっちょうあがり",
    "いてつくしせん", "いとをはく", "イナズマドライブ", "いにしえのうた",
    "いのちがけ", "いのちのしずく", "いばる", "いびき",
    "いやしのすず", "いやしのねがい", "いやしのはどう", "いやなおと",
    "いわおとし", "いわくだき", "いわなだれ", "インファイト",
    "ウェーブタックル", "ウェザーボール", "うずしお", "うそなき",
    "うたう", "うたかたのアリア", "うちおとす", "ウッドハンマー",
    "ウッドホーン", "うっぷんばらし", "うつしえ", "うらみ",
    "うらみつらみ", "エアカッター", "エアスラッシュ", "エアロブラスト",
    "エコーボイス", "えだづき", "エナジーボール", "エレキネット",
    "エレキフィールド", "エレキボール", "エレクトロビーム", "えんまく",
    "オーバードライブ", "オーバーヒート", "オーラウイング", "オーラぐるま",
    "オーロラビーム", "オーロラベール", "おいかぜ", "おいわい",
    "おかたづけ", "おきみやげ", "おさきにどうぞ", "おたけび",
    "おだてる", "おちゃかい", "おどろかす", "おにび",
    "おはかまいり", "かいでんぱ", "かいりき", "カウンター",
    "かえんぐるま", "かえんのまもり", "かえんほうしゃ", "かえんボール",
    "かかとおとし", "かげうち", "かげぬい", "かげぶんしん",
    "かぜおこし", "かたきうち", "かたくなる", "カタストロフィ",
    "かなしばり", "かふんだんご", "かみくだく", "かみつく",
    "かみなり", "かみなりあらし", "かみなりのキバ", "かみなりパンチ",
    "からげんき", "からにこもる", "からをやぶる", "かわらわり",
    "ガードシェア", "ガードスワップ", "がむしゃら", "ガリョウテンセイ",
    "がんせきアックス", "がんせきふうじ", "がんせきほう", "きあいだま",
    "きあいだめ", "きあいパンチ", "きしかいせい", "キノコのほうし",
    "きまぐレーザー", "きゅうけつ", "きょけんとつげき", "きょじゅうざん",
    "きょじゅうだん", "キラースピン", "きりさく", "きりばらい",
    "きんぞくおん", "ギアチェンジ", "ギガインパクト", "ギガドレイン",
    "クイックターン", "くさのちかい", "くさむすび", "くさわけ",
    "くすぐる", "くちばしキャノン", "くらいつく", "クラブハンマー",
    "クリアスモッグ", "くろいきり", "くろいまなざし", "クロスサンダー",
    "クロスチョップ", "クロスフレイム", "クロスポイズン", "クロロブラスト",
    "グラススライダー", "グラスフィールド", "けたぐり", "げきりん",
    "ゲップ", "げんしのちから", "コーチング", "コートチェンジ",
    "コールドフレア", "こうげきしれい", "こうごうせい", "こうそくいどう",
    "こうそくスピン", "こおりのいぶき", "こおりのキバ", "こおりのつぶて",
    "こがらしあらし", "こごえるかぜ", "こごえるせかい", "コスモパワー",
    "コットンガード", "こなゆき", "このは", "このゆびとまれ",
    "コメットパンチ", "こらえる", "ころがる", "こわいかお",
    "こんげんのはどう", "ゴーストダイブ", "ゴールドラッシュ", "ゴッドバード",
    "さいきのいのり", "サイケこうせん", "サイコカッター", "サイコキネシス",
    "サイコショック", "サイコノイズ", "サイコファング", "サイコフィールド",
    "サイコブースト", "サイコブレイク", "サイコブレイド", "サイドチェンジ",
    "さいはい", "さいみんじゅつ", "さきおくり", "さばきのつぶて",
    "さむいギャグ", "さわぐ", "サンダーダイブ", "サンダープリズン",
    "シードフレア", "シェルアームズ", "シェルブレード", "しおづけ",
    "しおふき", "しおみず", "シザークロス", "したでなめる",
    "しっとのほのお", "しっぺがえし", "しっぽきり", "しっぽをふる",
    "しねんのずつき", "しびれごな", "しめつける", "シャカシャカほう",
    "シャドークロー", "シャドーダイブ", "シャドーパンチ", "シャドーボール",
    "シャドーレイ", "しょうりのまい", "しろいきり", "しんくうは",
    "しんそく", "しんぴのちから", "しんぴのつるぎ", "しんぴのまもり",
    "シンプルビーム", "Gのちから", "ジェットパンチ", "じこあんじ",
    "じこさいせい", "じごくづき", "じしん", "じたばた",
    "じだんだ", "じならし", "じばく", "じばそうさ",
    "ジャイロボール", "じゃどくのくさり", "じゃれつく", "ジャングルヒール",
    "じゅうでん", "10まんばりき", "10まんボルト", "じゅうりょく",
    "じわれ", "じんつうりき", "じんらい", "スイープビンタ",
    "すいとる", "すいりゅうれんだ", "スキルスワップ", "スケイルショット",
    "スケイルノイズ", "スケッチ", "スチームバースト", "すてゼリフ",
    "すてみタックル", "ステルスロック", "ストーンエッジ", "すなあつめ",
    "すなあらし", "すなかけ", "すなじごく", "スパーク",
    "スピードスター", "スピードスワップ", "スマートホーン", "スモッグ",
    "すりかえ", "スレッドトラップ", "ずつき", "せいちょう",
    "せいなるつるぎ", "せいなるほのお", "ぜったいれいど", "ソーラービーム",
    "ソーラーブレード", "ソウルクラッシュ", "ソウルビート", "そらをとぶ",
    "タールショット", "たいあたり", "タキオンカッター", "たきのぼり",
    "たくわえる", "たたきつける", "たたりめ", "たつまき",
    "たてこもる", "タネばくだん", "タネマシンガン", "タマゴうみ",
    "ダークホール", "だいちのちから", "だいちのはどう", "だいばくはつ",
    "ダイビング", "だいふんげき", "ダイマックスほう", "だいもんじ",
    "ダイヤストーム", "だくりゅう", "ダストシュート", "ダブルアタック",
    "ダブルウイング", "ダメおし", "だんがいのつるぎ", "ちいさくなる",
    "ちからをすいとる", "ちきゅうなげ", "チャージビーム", "チャームボイス",
    "ちょうおんぱ", "ちょうのまい", "ちょうはつ", "ついばむ",
    "ツインビーム", "つきのひかり", "つけあがる", "つじぎり",
    "ツタこんぼう", "つっぱり", "つつく", "つのでつく",
    "つのドリル", "つばさでうつ", "つばめがえし", "つぶらなひとみ",
    "つぼをつく", "つめとぎ", "つららおとし", "つららばり",
    "つるぎのまい", "つるのムチ", "てかげん", "テクスチャー",
    "テクスチャー2", "てだすけ", "てっていこうせん", "てっぺき",
    "テラクラスター", "テラバースト", "テレポート", "てをつなぐ",
    "てんしのキッス", "であいがしら", "DDラリアット", "デカハンマー",
    "デコレーション", "でんきショック", "でんげきは", "でんこうせっか",
    "でんこうそうげき", "でんじは", "でんじふゆう", "でんじほう",
    "トーチカ", "とおせんぼう", "とおぼえ", "ときのほうこう",
    "とぐろをまく", "とける", "とっしん", "とっておき",
    "とどめばり", "とびかかる", "とびつく",
    "とびはねる", "とびひざげり", "ともえなげ", "トライアタック",
    "トリック", "トリックフラワー", "トリックルーム", "トリプルアクセル",
    "トリプルキック", "トリプルダイブ", "トロピカルキック", "とんぼがえり",
    "どくガス", "どくづき", "どくどく", "どくどくのキバ",
    "どくのいと", "どくのこな", "どくばり", "どくばりセンボン",
    "どくびし", "どげざつき", "ドゲザン", "ドラゴンアロー",
    "ドラゴンエール", "ドラゴンエナジー", "ドラゴンクロー", "ドラゴンダイブ",
    "ドラゴンテール", "ドラゴンハンマー", "ドラムアタック", "ドリルくちばし",
    "ドリルライナー", "ドレインキッス", "ドレインパンチ", "どろかけ",
    "どろぼう", "ドわすれ", "ないしょばなし", "ナイトバースト",
    "ナイトヘッド", "なかまづくり", "なかよくする", "なきごえ",
    "なげつける", "なまける", "なみだめ", "なみのり",
    "なやみのタネ", "なりきり", "ニードルガード", "にぎりつぶす",
    "ニトロチャージ", "にどげり", "にほんばれ", "にらみつける",
    "ねがいごと", "ねこだまし", "ネコにこばん", "ねごと",
    "ネズミざん", "ねっさのあらし", "ねっさのだいち", "ねっとう",
    "ねっぷう", "ねばねばネット", "ねむりごな", "ねむる",
    "ねらいうち", "ねをはる", "ねんりき", "のしかかり",
    "のみこむ", "のろい", "ハートスワップ", "ハードプラント",
    "ハードプレス", "はいすいのじん", "ハイドロカノン", "ハイドロスチーム",
    "ハイドロポンプ", "ハイパードリル", "ハイパーボイス", "はいよるいちげき",
    "はかいこうせん", "はがねのつばさ", "はきだす", "ハサミギロチン",
    "はさむ", "はたきおとす", "はたく", "はっけい",
    "はっぱカッター", "ハッピータイム", "はどうだん", "はなびらのまい",
    "はなふぶき", "はねやすめ", "はねる", "ハバネロエキス",
    "はめつのねがい", "はやてがえし", "はらだいこ", "はるのあらし",
    "バークアウト", "ばかぢから", "ばくおんぱ", "ばくれつパンチ",
    "バトンタッチ", "バブルこうせん", "バリアーラッシュ", "バレットパンチ",
    "パラボラチャージ", "パワーウィップ", "パワーシェア", "パワーシフト",
    "パワージェム", "パワースワップ", "パワートリック", "パワフルエッジ",
    "ヒートスタンプ", "ひかりのかべ", "ひけん・ちえなみ", "ひっかく",
    "ひっくりかえす", "ひのこ", "ひゃっきやこう", "ひやみず",
    "ひょうざんおろし", "びりびりちくちく", "ビルドアップ", "ファストガード",
    "ふいうち", "ふういん", "フェアリーロック", "フェイタルクロー",
    "フェイント", "フェザーダンス", "フォトンゲイザー", "ふきとばし",
    "ふくろだたき", "ふしょくガス", "ふぶき", "ふみつけ",
    "フライングプレス", "フラフラダンス", "フラワーヒール", "フリーズドライ",
    "フリーズボルト", "フルールカノン", "ふるいたてる", "フレアソング",
    "フレアドライブ", "ふんえん", "ふんか", "ふんどのこぶし",
    "Vジェネレート", "ぶきみなじゅもん", "ぶちかまし", "ブラストバーン",
    "ブラッドムーン", "ブリザードランス", "ブレイククロー", "ブレイズキック",
    "ブレイブチャージ", "ブレイブバード", "ぶんまわす", "プリズムレーザー",
    "プレゼント", "ヘドロウェーブ", "ヘドロこうげき", "ヘドロばくだん",
    "ヘビーボンバー", "へびにらみ", "へんしん", "ベノムショック",
    "ホイールスピン", "ほうでん", "ほうふく", "ほえる",
    "ほおばる", "ほしがる", "ほたるび", "ほっぺすりすり",
    "ほのおのうず", "ほのおのキバ", "ほのおのちかい", "ほのおのパンチ",
    "ほのおのまい", "ほのおのムチ", "ほろびのうた", "ボーンラッシュ",
    "ぼうぎょしれい", "ぼうふう", "ボディプレス", "ボルテッカー",
    "ボルトチェンジ", "ポイズンテール", "ポルターガイスト", "まきつく",
    "まきびし", "マグマストーム", "マジカルシャイン", "マジカルフレイム",
    "マジカルリーフ", "マジックルーム", "マッドショット", "マッハパンチ",
    "まとわりつく", "まねっこ", "まほうのこな", "まもる",
    "まるくなる", "みかづきのいのり", "みかづきのまい", "みがわり",
    "みきり", "ミサイルばり", "ミストバースト", "ミストフィールド",
    "ミストボール", "みずあめボム", "みずしゅりけん", "みずでっぽう",
    "みずのちかい", "みずのはどう", "みずびたし", "みだれづき",
    "みだれひっかき", "みちづれ", "みねうち", "ミラーコート",
    "ミラータイプ", "みらいよち", "ミルクのみ", "みわくのボイス",
    "みをけずる", "ムーンフォース", "むしくい", "むしのさざめき",
    "むしのていこう", "むねんのつるぎ", "めいそう", "メガトンキック",
    "メガトンパンチ", "メガドレイン", "メガホーン", "めざめるダンス",
    "メタルクロー", "メタルバースト", "メテオドライブ", "メテオビーム",
    "メロメロ", "もえあがるいかり", "もえつきる", "ものまね",
    "もりののろい", "もろはのずつき", "やきつくす", "やけっぱち",
    "やどりぎのタネ", "ゆきげしき", "ゆきなだれ", "ゆびをふる",
    "ゆめくい", "ようかいえき", "ようせいのかぜ", "らいげき",
    "ライジングボルト", "らいめいげり", "ラスターカノン", "ラスターパージ",
    "リーフストーム", "リーフブレード", "リサイクル", "リフレクター",
    "りゅうせいぐん", "りゅうのいぶき", "りゅうのはどう", "りゅうのまい",
    "りんごさん", "りんしょう", "ルミナコリジョン", "レイジングブル",
    "れいとうパンチ", "れいとうビーム", "れんごく", "れんぞくぎり",
    "ローキック", "ロックオン", "ロックカット", "ロックブラスト",
    "ワイドガード", "ワイドフォース", "ワイドブレイカー", "ワイルドボルト",
    "わたほうし", "わるだくみ", "ワンダースチーム", "ワンダールーム"
]


def perform_ocr(img):
    custom_config = r'--psm 7 -l jpn'
    text = pytesseract.image_to_string(img, config=custom_config)
    return text


def preprocess_image(img, percent_boxes):
    processed_images = []
    img = img.resize((2560, 1440), Image.BICUBIC)
    width, height = img.size
    img = img.convert("L")
    threshold = 120
    img = img.point(lambda p: p < threshold and 255)

    for i, percent_box in enumerate(percent_boxes):
        left = int(width * percent_box[0] / 100)
        top = int(height * percent_box[1] / 100)
        right = int(width * percent_box[2] / 100)
        bottom = int(height * percent_box[3] / 100)

        cropped_img = img.crop((left, top, right, bottom))
        processed_images.append(cropped_img)

    return processed_images


def similarity_score(str1, str2):
    levenshtein_distance = Levenshtein.distance(str1, str2)

    common_prefix = os.path.commonprefix([str1, str2])
    common_suffix = os.path.commonprefix([str1[::-1], str2[::-1]])[::-1]
    partial_match_length = len(common_prefix) + len(common_suffix)
    partial_match_score = partial_match_length / max(len(str1), len(str2))

    similarity_score = 0.7 * (1 - levenshtein_distance /
                              max(len(str1), len(str2))) + 0.3 * partial_match_score

    return similarity_score


def compare_images(img1, img2, roi_percent):
    height, width, _ = img2.shape
    roi_start = (int(width * roi_percent[0] / 100),
                 int(height * roi_percent[1] / 100))
    roi_end = (int(width * roi_percent[2] / 100),
               int(height * roi_percent[3] / 100))
    uploaded_roi = img2[roi_start[1]:roi_end[1], roi_start[0]:roi_end[0]]

    img1_resized = cv2.resize(
        img1, (uploaded_roi.shape[1], uploaded_roi.shape[0]))

    difference = cv2.absdiff(img1_resized, uploaded_roi)
    _, threshold_diff = cv2.threshold(difference, 30, 255, cv2.THRESH_BINARY)

    similarity = np.sum(threshold_diff == 0) / np.prod(threshold_diff.shape)
    return similarity


def parallel_ocr(processed_images):
    with concurrent.futures.ThreadPoolExecutor() as executor:
        texts = list(executor.map(perform_ocr, processed_images))
    return texts


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return render_template('index.html', error='ファイルが見つかりません')

    file = request.files['file']
    if file.filename == '':
        return render_template('index.html', error='選択されたファイルがありません')

    if file:
        img_base64 = base64.b64encode(file.read()).decode('utf-8')

        img = Image.open(file)

        percent_boxes = [
            (4, 16, 19, 21),
            (51.5, 16, 66.6, 21),
            (4, 41, 19, 46),
            (51.5, 41, 66.5, 46),
            (4, 66, 19, 71),
            (51.5, 66, 66.6, 71),

            (7, 31, 20, 36),
            (54.5, 31, 69.5, 36),
            (7, 56, 20, 61),
            (54.5, 56, 67.5, 61),
            (7, 81, 20, 86),
            (54.5, 81, 69.5, 86),

            (31, 16, 45, 20),
            (31, 21, 45, 25),
            (31, 26, 45, 30),
            (31, 31, 45, 35),

            (78, 16, 92, 20),
            (78, 21, 92, 25),
            (78, 26, 92, 30),
            (78, 31, 92, 35),

            (31, 41, 45, 45),
            (31, 46, 45, 50),
            (31, 51, 45, 55),
            (31, 56, 45, 60),

            (78, 41, 92, 45),
            (78, 46, 92, 50),
            (78, 51, 92, 55),
            (78, 56, 92, 60),

            (31, 66, 45, 70),
            (31, 71, 45, 75),
            (31, 76, 45, 80),
            (31, 81, 45, 85),

            (78, 66, 92, 70),
            (78, 71, 92, 75),
            (78, 76, 92, 80),
            (78, 81, 92, 85)
        ]

        processed_images = preprocess_image(img, percent_boxes)
        texts = parallel_ocr(processed_images)

        closest_words = []
        for i, text in enumerate(texts):
            max_similarity = 0
            closest_word = ""
            if i < 6:
                target_words = poke_words
            elif i < 12:
                target_words = item_words
            else:
                target_words = move_words

            for target_word in target_words:
                similarity = similarity_score(text, target_word)
                if similarity > max_similarity:
                    max_similarity = similarity
                    closest_word = target_word
            closest_words.append(closest_word)

        file.seek(0)

        img_cv2 = cv2.imdecode(np.frombuffer(file.read(), np.uint8), 1)

        messages = [""] * 6

        for roi_percent_idx in range(6):
            roi_percent = [
                (25.45, 16.7, 27.05, 19.2),
                (72.95, 16.7, 74.55, 19.2),
                (25.45, 41.7, 27.05, 44.2),
                (72.95, 41.7, 74.55, 44.2),
                (25.45, 66.7, 27.05, 69.2),
                (72.95, 66.7, 74.55, 69.2)
            ][roi_percent_idx]

            best_similarity = 0
            best_teras_name = ""

            for teras_name, reference_image in teras_images.items():
                similarity = compare_images(
                    reference_image, img_cv2, roi_percent)

                if similarity > best_similarity:
                    best_similarity = similarity
                    best_teras_name = teras_name

            messages[roi_percent_idx] = best_teras_name

        if any(messages):
            return render_template(
                "result.html",
                img_base64=img_base64,
                texts=texts,
                closest_words=closest_words,
                message1=messages[0],
                message2=messages[1],
                message3=messages[2],
                message4=messages[3],
                message5=messages[4],
                message6=messages[5]
            )


if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0')

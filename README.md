# Zyra Corporate + LP Pack (Google Sheets連携)

このパックは **Zyraのコーポレートサイト** と **事前登録LP（Google Sheets連携）** を、そのまま配置できるレベルで同梱しています。

## 構成
- `zyra_corporate.html` / `zyra_corporate.css` … コーポレート（トップ）
- `zyra_lp.html` / `zyra_lp.css` … 登録待ちLP
- `lp_form.js` … LPの送信処理（Google Apps Script の WebアプリへPOST）
- `apps_script_waitlist.gs` … Google Apps Script（スプレッドシート保存API）
- `assets/logo.svg` / `assets/favicon.svg` … 簡易ロゴ/ファビコン

## 使い方（Google Sheets 連携）
1. **Google スプレッドシート** を新規作成（シート名は `waitlist` に）  
2. メニュー「拡張機能 → Apps Script」を開いて、`apps_script_waitlist.gs` を貼り付け
3. コード内の `SHEET_ID` をあなたのスプレッドシートIDに置換
4. 「デプロイ → 新しいデプロイ → 種類：ウェブアプリ」
   - 実行するユーザー：**自分**
   - アクセスできるユーザー：**全員**
   - デプロイ後に表示される URL をコピー
5. `lp_form.js` の `FORM_ENDPOINT` をその URL に差し替え

> 注意：初回実行時にGoogleの認可が求められます（規約に従って承認してください）。

## デプロイ
- Hostinger/Nginx の静的配信ディレクトリに **このフォルダ一式** を置けば動きます。
- GitHub Pages でもOK（フォームはGASに飛ぶためバックエンド不要）。

## 変更ポイント
- 文言/画像は自由に差し替え可能です。ブランドカラーはCSSの `--pri` / `--pri2` を変更してください。
- 追加の追跡（GA4/タグマネ）やOGP画像差し替えはHTMLのheadで編集。

## テスト
- `zyra_lp.html` をローカルで開き、ダミー情報を入れて「登録する」
- Apps Script の実行ログ or スプレッドシートに行が追加されることを確認

困ったら：`FORM_ENDPOINT` と `SHEET_ID` の2点が正しければ大体動きます。

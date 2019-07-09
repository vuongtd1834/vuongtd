export default {
  data: {
    contractId: 1,
    providerName: "株式会社●●●●●●（カブシキカイシャマルマル）",
    providerZipCode: "1030027",
    providerAddress: "東京都中央区日本橋3丁目10-5 オンワードパークビルディング10階",
    providerPhoneNumber: "03-1111-2222",
    users: [
      {
        name: "こばやし　しょうたろう",
        phoneNumber: "03-2222-4444",
        departmentName: "法人営業一部"
      },
      {
        name: "なかた　ごろう",
        phoneNumber: "03-2222-4445",
        departmentName: " 法人営業二部"
      }
    ],
    contractPeriod: "2017/12/03 ～ 2018/03/03",
    contractStatusType: "CONFIRMING_CUSTOMER",
    // contractStatusType: "CONCLUDED",
    // contractStatusTypeName: "契約済",
    contractStatusTypeName: "契約中",
    customerMemo: "メモ情報を入力してください",
    itemTables: [
      {
        itemTableName: " 飲食店向けアルバイト採用パック（求人サイト・アプリ、フリーペーパー、折込求人紙、有料求人情報誌、新聞求人）",
        mediaAccounts: [
          {
            mediaName: "バイトル",
            accountName: "test1@example.com",
            settingStatus: "未設定"
          },
          {
            mediaName: "バイトル",
            accountName: "test2@example.com",
            settingStatus: "設定済み"
          },
          {
            mediaName: "バイトル",
            accountName: "test3@example.com",
            settingStatus: "設定済み"
          },
          {
            mediaName: "バイトル",
            accountName: "test4@example.com",
            settingStatus: "未設定"
          },
          {
            mediaName: "バイトル",
            accountName: "test5@example.com",
            settingStatus: "設定済み"
          }
        ]
      },
      {
        itemTableName: " 飲食店向けアルバイト採用パック（求人サイト・アプリ、フリーペーパー、折込求人紙、有料求人情報誌、新聞求人）"
      }
    ],
    contractorName: "あいうえ　たろう",
    phoneNumber: "03-2222-1111",
    mailAddress: "test@example.com",
    customerMessage: "東北地方での採用を強化したいと考えています。商品の詳細情報を教えて欲しいと考えています。平日の13時～17時の間でご連絡頂けますでしょうか",
    // applicationDate: "2018年4月3日 16：25"
    requestDatetime: "2018-05-10T00:11:31"
  }
}

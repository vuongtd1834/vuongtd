export default
  {
    itemTableId: 1,
    hasContract: true,
    used: true,
    itemTableName: "バイトレギュラー都心3区A1",
    itemTableIndustryType: "A",
    itemPriceRange: "10,000円～69,000円",
    itemTableDescripton: `コンビニや小売店の店員アルバイト採用を協力にサポートします。メインとなるアルバイトは、CMでもお馴染み認
    知度抜群の「タウンワーク」と「バイトル」、中でも比較的利用し易い３万円から８万円の商品で高い効果を狙います。また細かなシフトの穴を埋め
るニーズにもお答えするため、主婦層、シニア層や外国人留学生の採用にもリーチできる商品をセットしています。`,
    manualUrl: "contract/detail",
    providerName: "この商品テーブルを扱っているのは株式会社ONE　です",
    promotionalText: "特徴：媒体サービス事業者の概要媒体サービス事業者の概要媒体サービス事業者の概要媒体サービス事業者の概要媒体サービス事業者の概要媒体サービス事業者の概要媒体サービス事業者の概要媒体サービ",
    staffName: "未対応",
    staffPhoneNumber: "080-00041-1234"
  }

export const listInfo =
  {
    data: {
      items: [
        {
          itemPlanId: 1,
          itemPlanName: "バイトレギュラー都心3区A1",
          itemMediaType: 1,
          itemMerit: 7,
          itemArea: "都心3区",
          itemMedias: [
            {
              name: "タウンワーク",
              mediaLogo: require("../../images/icons/item-logo.png")
            },
            {
              name: "タウンワーク2222",
              mediaLogo: null
            }
          ],
          itemCount: 1
        },
        {
          itemPlanId: 2,
          itemPlanName: "バイトレギュラー都心3区A1",
          itemMediaType: 2,
          itemMerit: 8,
          itemArea: "都心3区",
          itemMedias: [
            {
              name: "タウンワーク",
              mediaLogo: require("../../images/icons/item-logo.png")
            }
          ],
          itemCount: 2
        }
      ],
      totalItems: 2
    }
  }

export const error =
  {
    error: {
      code: 403,
      message: "Forbidden"
    }
  }

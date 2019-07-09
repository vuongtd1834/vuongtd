export default {

  data: {
    items: [{
      providerId: 2,
      providerName: "株式会社アイデム",
      staffName: "阿井　デム",
      staffPhoneNumber: "03-0002-0001",
      promotionalText: "新卒採用、中途採用、アルバイトさまざまな領域での採用に特化した媒体をご提案します！",
      // hasContract: false,
      contractStatusCategory: "REQUESTING", // '申請中'
      itemTables: [{
        itemTableId: 3,
        itemTableName: "Jobaidem",
        itemTableIndustryType: "0",
        itemPriceRange: "19,440円～75,600円",
        itemTableMediaTypes: [
          3, 1, 2
        ],
        itemTableMerits: [
          1, 4, 5
        ],
        itemAreas: ["都心3区", "副都心4区", "23区東部"],
        itemMedias: [{
          name: "Jobaidem"
        }],
        itemTableSummary: "3プラン／8商品",
        itemTableDescripton: "毎週月曜日発行。エリアの広さと効率を兼ね備えたフリーペーパー",
        used: false
      }, {
        itemTableId: 4,
        itemTableName: "イーアイデム",
        itemTableIndustryType: "0",
        itemPriceRange: "19,440円～75,600円",
        itemTableMediaTypes: [
          3, 4, 5, 1, 2
        ],
        itemTableMerits: [
          1, 6, 7
        ],
        itemAreas: ["都心3区", "副都心4区", "都心3区", "副都心4区", "23区東部", "都心3区", "都心3区"],
        itemMedias: [{
          mediaLogo: "https://mpf-stg-public.ds.jp-east.idcfcloud.com/media/5.png",
          name: "イーアイデム"
        }],
        itemTableSummary: "3プラン／8商品",
        itemTableDescripton: "地域密着・毎日更新。多彩な検索機能で高いマッチングを実現します。",
        used: false
      }]
    }, {
      providerId: 1,
      providerName: "株式会社リクルートジョブズ",
      staffName: "陸　るうと",
      staffPhoneNumber: "03-0001-0001",
      promotionalText: "知名度の高い多彩な媒体をご提案します。\nお試し無料プランもご用意していますので是非ご検討ください。",
      // hasContract: true,
      contractStatusCategory: "NOT_CONTRACT", // '未契約'
      itemTables: [{
        itemTableId: 1,
        itemTableName: "バイト（レギュラー版）",
        itemTableIndustryType: "0",
        itemPriceRange: "16,524円～367,200円",
        itemTableMediaTypes: [
          3, 4, 5, 1, 2
        ],
        itemTableMerits: [
          1, 6, 7
        ],
        itemAreas: ["都心3区", "副都心4区", "都心3区", "副都心4区", "23区東部", "都心3区", "都心3区"],
        itemMedias: [{
          mediaLogo: "https://mpf-stg-public.ds.jp-east.idcfcloud.com/media/1.png",
          name: "タウンワーク"
        }, {
          name: "はたらいく"
        }],
        itemTableSummary: "6プラン／12商品",
        itemTableDescripton: "派遣求人が乗せやすいフォーマット",
        used: true
      }]
    }, {
      providerId: 3,
      providerName: "株式会社ピーアール・デイリー",
      staffName: "日井　有",
      staffPhoneNumber: "03-0003-0001",
      promotionalText: "",
      // hasContract: true,
      contractStatusCategory: "CONCLUDED", // '契約済'
      itemTables: [{
        itemTableId: 5,
        itemTableName: "2媒体　同時掲載",
        itemTableIndustryType: "0",
        itemPriceRange: "19,440円～75,600円",
        itemTableMediaTypes: [
          3, 4, 5, 1, 2
        ],
        itemTableMerits: [
          1, 6, 7
        ],
        itemAreas: ["都心3区", "副都心4区", "都心3区", "副都心4区", "23区東部", "都心3区", "都心3区"],
        itemMedias: [{
          mediaLogo: "https://mpf-stg-public.ds.jp-east.idcfcloud.com/media/1.png",
          name: "タウンワーク"
        }, {
          name: "はたらいく"
        }],
        itemTableSummary: "3プラン／10商品",
        itemTableDescripton: "短期集中、複数媒体に効果的に掲載",
        used: false
      }, {
        itemTableId: 6,
        itemTableName: "3媒体　同時掲載",
        itemTableIndustryType: "0",
        itemPriceRange: "17,496円～64,152円",
        itemTableMediaTypes: [
          3, 4, 5, 1, 2
        ],
        itemTableMerits: [
          1, 6, 7
        ],
        itemAreas: ["都心3区", "副都心4区", "都心3区", "副都心4区", "23区東部", "都心3区", "都心3区"],
        itemMedias: [{
          mediaLogo: "https://mpf-stg-public.ds.jp-east.idcfcloud.com/media/1.png",
          name: "タウンワーク"
        }, {
          name: "はたらいく"
        }, {
          mediaLogo: "https://mpf-stg-public.ds.jp-east.idcfcloud.com/media/4.png",
          name: "フロムエーナビ"
        }],
        itemTableSummary: "3プラン／9商品",
        itemTableDescripton: "短期集中、複数媒体に効果的に掲載",
        used: true
      }]
    },
    {
      providerId: 4,
      providerName: "株式会社アイデム",
      staffName: "阿井　デム",
      staffPhoneNumber: "03-0002-0001",
      promotionalText: "新卒採用、中途採用、アルバイトさまざまな領域での採用に特化した媒体をご提案します！",
      // hasContract: false,
      contractStatusCategory: "CONCLUDED", // '契約済'
      itemTables: [{
        itemTableId: 3,
        itemTableName: "Jobaidem",
        itemTableIndustryType: "0",
        itemPriceRange: "19,440円～75,600円",
        itemTableMediaTypes: [
          3, 4, 5, 1, 2
        ],
        itemTableMerits: [
          1, 6, 7
        ],
        itemAreas: ["都心3区", "副都心4区", "都心3区", "副都心4区", "23区東部", "都心3区", "都心3区"],
        itemMedias: [{
          name: "Jobaidem"
        }],
        itemTableSummary: "3プラン／8商品",
        itemTableDescripton: "毎週月曜日発行。エリアの広さと効率を兼ね備えたフリーペーパー",
        used: true
      }, {
        itemTableId: 4,
        itemTableName: "イーアイデム",
        itemTableIndustryType: "0",
        itemPriceRange: "19,440円～75,600円",
        itemTableMediaTypes: [
          3, 4, 5, 1, 2
        ],
        itemTableMerits: [
          1, 6, 7
        ],
        itemAreas: ["都心3区", "副都心4区", "都心3区", "副都心4区", "23区東部", "都心3区", "都心3区"],
        itemMedias: [{
          mediaLogo: "https://mpf-stg-public.ds.jp-east.idcfcloud.com/media/5.png",
          name: "イーアイデム"
        }],
        itemTableSummary: "3プラン／8商品",
        itemTableDescripton: "地域密着・毎日更新。多彩な検索機能で高いマッチングを実現します。",
        used: false
      }]
    },
    {
      providerId: 2,
      providerName: "株式会社アイデム",
      staffName: "阿井　デム",
      staffPhoneNumber: "03-0002-0001",
      promotionalText: "新卒採用、中途採用、アルバイトさまざまな領域での採用に特化した媒体をご提案します！",
      // hasContract: false,
      contractStatusCategory: "REQUESTING", // '申請中'
      itemTables: [{
        itemTableId: 3,
        itemTableName: "Jobaidem",
        itemTableIndustryType: "0",
        itemPriceRange: "19,440円～75,600円",
        itemTableMediaTypes: [
          3, 1, 2
        ],
        itemTableMerits: [
          1, 4, 5
        ],
        itemAreas: ["都心3区", "副都心4区", "23区東部"],
        itemMedias: [{
          name: "Jobaidem"
        }],
        itemTableSummary: "3プラン／8商品",
        itemTableDescripton: "毎週月曜日発行。エリアの広さと効率を兼ね備えたフリーペーパー",
        used: false
      }, {
        itemTableId: 4,
        itemTableName: "イーアイデム",
        itemTableIndustryType: "0",
        itemPriceRange: "19,440円～75,600円",
        itemTableMediaTypes: [
          3, 4, 5, 1, 2
        ],
        itemTableMerits: [
          1, 6, 7
        ],
        itemAreas: ["都心3区", "副都心4区", "都心3区", "副都心4区", "23区東部", "都心3区", "都心3区"],
        itemMedias: [{
          mediaLogo: "https://mpf-stg-public.ds.jp-east.idcfcloud.com/media/5.png",
          name: "イーアイデム"
        }],
        itemTableSummary: "3プラン／8商品",
        itemTableDescripton: "地域密着・毎日更新。多彩な検索機能で高いマッチングを実現します。",
        used: false
      }]
    }
    ],
    totalItems: 4
  }
}

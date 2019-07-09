export default {
  employmentTypes: [
    {id: 1, name: "アルバイト", priority: 1},
    {id: 2, name: "パート", priority: 2},
    {id: 3, name: "正社員", priority: 3},
    {id: 4, name: "契約社員", priority: 4},
    {id: 5, name: "業務委託", priority: 5},
    {id: 6, name: "派遣", priority: 6}
  ],
  brands: [
    {id: 1, name: "COACH (コーチ)"},
    {id: 2, name: "FURLA (フルラ)"},
    {id: 3, name: "kate spade (ケイトスペード)"},
    {id: 4, name: "GUCCI (グッチ)"},
    {id: 5, name: "Vivienne Westwood (ヴィヴィアンウエストウッド)"},
    {id: 6, name: "MICHAEL KORS (マイケルマイケルコース)"},
    {id: 7, name: "TIFFANY&Co. (ティファニー)"},
    {id: 8, name: "PRADA (プラダ)"},
    {id: 9, name: "LONGCHAMP (ロンシャン)"},
    {id: 10, name: "LeSportsac (レスポートサック)"},
    {id: 11, name: "MARC JACOBS (マークジェイコブス)"},
    {id: 12, name: "Herve Chapelier (エルベシャプリエ)"},
    {id: 13, name: "Salvatore Ferragamo (サルバトーレフェラガモ)"},
    {id: 14, name: "TORY BURCH (トリーバーチ)"},
    {id: 15, name: "IL BISONTE (イルビゾンテ)"}
  ],
  workingTimes: [
    {type: "MORNING", name: "朝", priority: 1},
    {type: "DAY", name: "昼", priority: 2},
    {type: "EVENING", name: "夕方・夜", priority: 3},
    {type: "NIGHT", name: "深夜・早朝", priority: 4}
  ],
  workingPeriodTypes: [
    {type: "ONE_DAY", name: "1日のみ", priority: 1},
    {type: "FEW_DAYS", name: "数日", priority: 2},
    {type: "ONE_MONTH", name: "1ヵ月程度", priority: 3},
    {type: "SHORT_TERM", name: "短期（3か月以内）", priority: 4},
    {type: "LONG_TERM", name: "長期（3か月以上）", priority: 5}
  ],
  merits: [
    {id: 1, name: "未経験歓迎", priority: 1},
    {id: 2, name: "経験者歓迎", priority: 2},
    {id: 3, name: "学歴不問", priority: 3},
    {id: 4, name: "大学生歓迎", priority: 4},
    {id: 5, name: "高校生歓迎", priority: 5},
    {id: 6, name: "シニア歓迎", priority: 6},
    {id: 7, name: "主婦・主夫歓迎", priority: 7},
    {id: 8, name: "フリーター歓迎", priority: 8},
    {id: 9, name: "駅チカ・駅ナカ", priority: 9},
    {id: 10, name: "車OK", priority: 10},
    {id: 11, name: "バイクOK", priority: 11},
    {id: 12, name: "服装自由", priority: 12},
    {id: 13, name: "髪型自由", priority: 13},
    {id: 14, name: "制服貸与", priority: 14},
    {id: 15, name: "社会保険完備", priority: 15},
    {id: 16, name: "研修制度あり", priority: 16},
    {id: 17, name: "社員登用あり", priority: 17},
    {id: 18, name: "英語できる人歓迎", priority: 18},
    {id: 19, name: "中国語できる人歓迎", priority: 19},
    {id: 20, name: "WワークOK", priority: 20},
    {id: 21, name: "即日勤務OK", priority: 21},
    {id: 22, name: "土日祝のみOK", priority: 22},
    {id: 23, name: "平日のみOK", priority: 23},
    {id: 24, name: "短期OK", priority: 24},
    {id: 25, name: "短時間勤務OK", priority: 25},
    {id: 26, name: "土日祝休み", priority: 26},
    {id: 27, name: "シフト制", priority: 27},
    {id: 28, name: "まかない・食事補助あり", priority: 28},
    {id: 29, name: "従業員割引あり", priority: 29},
    {id: 30, name: "オープニング", priority: 30},
    {id: 31, name: "大量募集", priority: 31},
    {id: 32, name: "急募", priority: 32},
    {id: 33, name: "高収入", priority: 33},
    {id: 34, name: "昇給あり", priority: 34},
    {id: 35, name: "賞与あり", priority: 35},
    {id: 36, name: "日払い・週払い", priority: 36},
    {id: 37, name: "交通費支給", priority: 37}
  ],
  transportationFeeTypes: [
    {type: "NOT_PAID", name: "支給なし", priority: 1},
    {type: "NO_LIMIT", name: "全額支給", priority: 2},
    {type: "LIMIT_DAILY_AMOUNT", name: "上限あり(日額)", priority: 3},
    {type: "LIMIT_MONTHLY_AMOUNT", name: "上限あり(月額)", priority: 4},
    {type: "PRESCRIBED", name: "規定支給", priority: 5},
    {type: "CONFERENCE", name: "応相談", priority: 6}
  ],
  orderStatusTypes: [
    {type: "WAITING_FIRST_APPROVAL", name: "SV承認待ち", priority: 1},
    {type: "UNAPPROVAL_FIRST", name: "SV否認", priority: 2},
    {type: "WAITING_FINAL_APPROVAL", name: "本部承認待ち", priority: 3},
    {type: "UNAPPROVAL_FINAL", name: "本部否認", priority: 4},
    {type: "ORDERED", name: "担当者アサイン", priority: 5},
    {type: "PROVIDER_CONFIRMING", name: "掲載可否判断", priority: 6},
    {type: "PROVIDER_ACCEPTED", name: "入稿中", priority: 7},
    {type: "PROVIDER_REJECTED", name: "引き受け不可", priority: 8},
    {type: "SUBMITTED", name: "入稿完了", priority: 9}
  ],
  industries: [
    {
      type: "A",
      name: "指定なし"
    },
    {
      type: "B",
      name: "農業，林業"
    },
    {
      type: "C",
      name: "漁業"
    },
    {
      type: "D",
      name: "鉱業，採石業，砂利採取業"
    },
    {
      type: "E",
      name: "建設業"
    },
    {
      type: "F",
      name: "製造業"
    },
    {
      type: "G",
      name: "電気・ガス・熱供給・水道業"
    },
    {
      type: "H",
      name: "情報通信業"
    },
    {
      type: "Y",
      name: "運輸業，郵便業"
    }
  ]
}

export const error = {
  code: 400,
  errors: [
    {
      location: "field1",
      message: "No message available"
    }
  ]
}

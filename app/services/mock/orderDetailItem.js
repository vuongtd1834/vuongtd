const orderId = '1'
export default {
  linkageManuscript: {
    manuscriptId: 0,
    workplaceName: "string",
    jobofferName: "string",
    jobTypeName: "string"
  },
  item: {
    itemHistoryId: 0,
    itemName: "string",
    itemTableName: "string",
    providerName: "string",
    promotionalText: "string",
    description: "string",
    publicationPeriodDayReform: "1週間",
    medias: [
      {
        mediaName: "string",
        mediaLogoUrl: "string"
      }
    ]
  },
  order: {
    orderId: orderId,
    orderStatusType: orderId === '1' ? "WAITING_FIRST_APPROVAL" : "SUBMITED",
    amountExcludingTax: 0,
    consumptionTax: 0,
    amountIncludingTax: 0,
    companyName: "ONE Corporation",
    companyAddress: "Tokyo Nihonbashi X-X ーX",
    companyBusinessDescription: "Hiring recruitment services",
    companyHomepageUrl: "https://hr-s.co.jp",
    industryType: "Clothing / Fashion",
    workplaceName: "Sales of casual fashion",
    workplaceAddress: "Arai, Sakai, Chiba City, Japan x-x-x xxx",
    workplaceBusinessDescription: "",
    nearestStations: [
      {
        lineName: "string",
        stationName: "string"
      }
    ],
    workplaceLatitude: "	ONE Corporation Hourly 1,000 yen to 1,500 yen Hourly wage during training 1,000 yen or more (Variable according to the learning level for 3 months of training) 05: 00 ~ 09: 00 Hourly 1,300 yen ~ 1,500 yen 09: 00 ~ 18: 00 Hourly 1,000 yen ~ 1,100 yen hourly wages 18: 00 ~ 22: 00 hourly payment 1,200 yen ~ 1,300 yen ※ High school student is not possible ※ Transportation expenses are provided",
    workplaceLongitude: "string",
    staffName: "string",
    phoneNumber: "string",
    incomeDetailText: "string",
    brandName: "string",
    catchphrase: "Growth that can only be done by UNIQLO. Would you like to expand your possibilities?",
    readphrase: "	Each staff member is a \"protagonist\"! Works that can not be experienced elsewhere are waiting.",
    access: "Train: Get off at JR Saikyo Line 'Itabashi' station, 5 minutes on foot from the West Exit",
    jobTypeName: "string",
    jobTypeDisplayname: "string",
    employmentTypes: [
      {
        employmentTypeId: 0,
        employmentTypeName: "string"
      }
    ],
    workingTimeDescription: "7: 00 ~ 22: 00 (planned) ※ We will respond to consultation on time and day of the week",
    workingTimeMorning: true,
    workingTimeDay: true,
    workingTimeEvening: true,
    workingTimeNight: true,
    merits: [
      {
        meritId: 0,
        meritName: "string"
      }
    ],
    images: [
      {
        imageId: 0,
        imageUrl: "../../assets/images/1.jpg",
        imageTitle: "string",
        imageDescription: "string"
      }
    ],
    jobDescription: "Job Description",
    qualification: "Qualification requirements",
    workingPeriodType: "string",
    workingDaysPerWeek: "3nd",
    workingTimePerDay: "3 Times",
    transportationFeeType: "string",
    transportationFeeLimit: 0,
    treatmentDescription: "No payment",
    applyMethod: "string",
    hiringProcess: "string",
    trainingDescription: "string",
    holidayDescription: "string",
    supplymentText: "string",
    ordererName: "Yamada Taro",
    ordererNameKana: "Yamada Taro",
    ordererPhoneNumber: "string",
    ordererFaxNumber: "030-000-000",
    ordererMailAddress: "test@hr-s.co.jp",
    customerNote: "string",
    customerMessage: "string",
    preferredDate: "string",
    publicationDateFrom: "2018-03-31 (water)",
    publicationDateTo: "string",
    adoptionNumberPlan: 0
  }
}

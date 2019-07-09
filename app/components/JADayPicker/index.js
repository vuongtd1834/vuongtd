import React from 'react'
import DayPicker from "react-day-picker"
import "react-day-picker/lib/style.css"

const WEEKDAYS_SHORTS = ['日', '月', '火', '水', '木', '金', '土']
const WEEKDAYS_LONGS = ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日']
const MONTHS = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']

const JADayPicker = props => (
  <DayPicker {...props} months={MONTHS}
              weekdaysLong={WEEKDAYS_LONGS}
              weekdaysShort={WEEKDAYS_SHORTS}
              locale='ja'/>
)

export default JADayPicker

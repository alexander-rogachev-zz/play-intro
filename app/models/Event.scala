package models

import org.joda.time.DateTime
import play.api.libs.json.Json

case class Event(id: Option[Long] = None, comment: Option[String], eventType: Int, startDate: DateTime, endDate: DateTime, calendar: Boolean,
                 createDate: DateTime, duplicateToGoogleCalendar: Boolean, isImportant: Boolean, durationType: String)

object Event {
  implicit val eventFormat = Json.format[Event]
}

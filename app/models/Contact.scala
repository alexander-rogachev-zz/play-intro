package models

import play.api.libs.json.Json

case class Contact(id:Long, name: String, phoneNumber: Option[String], mail: Option[String], mailSecondary: Option[String],
                   title: Option[String], skype: Option[String], newsletters: Int)

object Contact {
  implicit val contactFormat = Json.format[Contact]
}

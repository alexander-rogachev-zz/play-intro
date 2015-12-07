package models

import play.api.libs.json._

case class Account(id: Long, name: String, defaultMailText: Option[String], defaultMailSubject: String)

object Account {
  implicit val accountFormat = Json.format[Account]
}

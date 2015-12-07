package models

import play.api.libs.json.Json

case class User(id: Long, name: String, userName: String, password: String, email: Option[String]) {
  def isAdmin: Boolean = (name.toLowerCase == "admin")
}

object User {
  implicit val userFormat = Json.format[User]
}
package models

import play.api.libs.json.Json

case class AccountCompanyField(id: Long, name: String, size: Int, showInListing: Int, infoFieldType_id: Int,
                               version: Int = 0, sequence: Int, enableSearch: Int, accountId: Long)

object AccountCompanyField {
  implicit val accountCompanyFieldFormat = Json.format[AccountCompanyField]
}
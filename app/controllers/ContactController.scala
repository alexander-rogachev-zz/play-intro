package controllers

import javax.inject.Inject

import dal.ContactRepository
import play.api.cache.CacheApi
import play.api.i18n.{I18nSupport, MessagesApi}
import play.api.libs.json.Json
import play.api.mvc.{Action, Controller}

import scala.concurrent.ExecutionContext

class ContactController @Inject() (repo: ContactRepository, val cache: CacheApi, val messagesApi: MessagesApi)
                                  (implicit ec: ExecutionContext) extends Controller with I18nSupport {
  def index = Action {
    Ok(views.html.index())
  }

  def getContacts = Action.async {
    repo.list().map { contact =>
      Ok(Json.toJson(contact))
    }
  }

  def getContact(name: String, phoneNumber: Option[String], mail: Option[String], mailSecondary: Option[String],
                 title: Option[String], skype: Option[String], newsletters: Int) = Action.async {
    repo.list(name, phoneNumber, mail, mailSecondary, title, skype, newsletters).map { contact =>
      Ok(Json.toJson(contact))
    }
  }

  def addContact(name: String, phoneNumber: Option[String], mail: Option[String], mailSecondary: Option[String],
                 title: Option[String], skype: Option[String], newsletters: Int) =
    Action {
      repo.createContact(name, phoneNumber, mail, mailSecondary, title, skype, newsletters)
      Redirect("/")
    }
}

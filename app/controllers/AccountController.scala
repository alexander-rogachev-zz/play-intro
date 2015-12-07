package controllers

import javax.inject.Inject

import dal.AccountRepository
import play.api.cache.CacheApi
import play.api.i18n.{I18nSupport, MessagesApi}
import play.api.libs.json.Json
import play.api.mvc.{Controller, Action}

import scala.concurrent.ExecutionContext

class AccountController@Inject() (repo: AccountRepository, val cache: CacheApi, val messagesApi: MessagesApi)
                                 (implicit ec: ExecutionContext) extends Controller with I18nSupport {

  def index = Action {
    Ok(views.html.index())
  }

  def getAccounts = Action.async {
    repo.list().map { account =>
      Ok(Json.toJson(account))
    }
  }

  /*def getAccountWithFields(id: Long) = Action.async {
    repo.accountsFields(id).map{ field =>
      Ok(Json.toJson(field))
    }
  }*/

  def getAccount(name: String, defaultMailText: Option[String], defaultMailSubject: String) =
    Action.async {
      repo.list(name, defaultMailText, defaultMailSubject).map { account =>
        Ok(Json.toJson(account))
      }
    }

  def addAccount(name: String, defaultMailText: Option[String], defaultMailSubject: String) =
    Action {
      repo.createContact(name, defaultMailText, defaultMailSubject)
      Redirect("/accounts")
    }

  def removeAccount(id: Long) =
    Action {
      repo.removeAccount(id)
      Redirect("/accounts")
    }

  def updateAccount(id: Long, name: String, defaultMailText: Option[String], defaultMailSubject: String) =
    Action {
      repo.updateAccount(id, name , defaultMailText, defaultMailSubject)
      Redirect("/accounts")
    }
}

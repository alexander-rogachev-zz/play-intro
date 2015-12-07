package controllers

import javax.inject.Inject

import dal.UserRepository
import play.api.cache.CacheApi
import play.api.i18n.{I18nSupport, MessagesApi}
import play.api.libs.json.Json
import play.api.mvc.{Action, Controller}

import scala.concurrent.ExecutionContext

class UserController @Inject() (repo: UserRepository, val cache: CacheApi, val messagesApi: MessagesApi)
                               (implicit ec: ExecutionContext) extends Controller with I18nSupport {
  def index = Action {
    Ok(views.html.index())
  }

  def getUsers = Action.async {
    repo.list().map { user =>
      Ok(Json.toJson(user))
    }
  }

}

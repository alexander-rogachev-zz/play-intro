package controllers

import play.api.cache.CacheApi
import play.api.mvc._
import play.api.i18n._
import play.api.libs.json.Json
import dal._

import scala.concurrent.ExecutionContext

import javax.inject._

class PersonController@Inject() (repo: PersonRepository, val cache: CacheApi, val messagesApi: MessagesApi)
                                 (implicit ec: ExecutionContext) extends Controller with I18nSupport {
  /**
   * The index action.
   */
  def index = Action {
    Ok(views.html.index())
  }

  /**
   * The add person action.
   *
   * This is asynchronous, since we're invoking the asynchronous methods on PersonRepository.
   */
  def addPerson(name: String, age: Int) =  Action {
    repo.create(name, age)
    Redirect("/")
  }

  def getPerson(name: String, age: Int) =  Action.async {
    repo.list(name, age).map { people =>
      Ok(Json.toJson(people))
    }
  }

  /**
   * A REST endpoint that gets all the people as JSON.
   */
  def getPersons = Action.async {
    repo.list().map { people =>
      Ok(Json.toJson(people))
    }
  }
}
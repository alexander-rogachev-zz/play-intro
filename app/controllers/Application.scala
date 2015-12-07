package controllers

import javax.inject.Inject

import dal.UserRepository
import models.User
import play.api.cache._
import play.api.mvc._
import play.api._
import play.api.mvc._
import play.api.libs.json._
import play.api.libs.functional.syntax._

import pdi.jwt._

import scala.concurrent.duration._

class Application @Inject()(repo: UserRepository, val cache: CacheApi) extends Controller with Secured {

  val cacheDuration = 1.day

  def Caching(key: String, okDuration: Duration) =
    new Cached(cache)
      .status(_ => key, OK, okDuration.toSeconds.toInt)
      .includeStatus(NOT_FOUND, 5.minutes.toSeconds.toInt)

  def index = Action {
    Ok(views.html.index())
  }

  val routeCache = {
    val jsRoutesClasses = Seq(classOf[routes.javascript])
    jsRoutesClasses.flatMap { jsRoutesClass =>
      val controllers = jsRoutesClass.getFields.map(_.get(null))
      controllers.flatMap { controller =>
        controller.getClass.getDeclaredMethods.filter(_.getName != "_defaultPrefix").map { action =>
          action.invoke(controller).asInstanceOf[play.api.routing.JavaScriptReverseRoute]
        }
      }
    }
  }

  def jsRoutes(varName: String = "jsRoutes") = Caching("jsRoutes", cacheDuration) {
    Action { implicit request =>
      Ok(play.api.routing.JavaScriptReverseRouter(varName)(routeCache: _*)).as(JAVASCRIPT)
    }
  }

  val passwords = Seq("red", "blue", "green")

  private val loginForm: Reads[(String, String)] =
    (JsPath \ "username").read[String] and
      (JsPath \ "password").read[String] tupled

  def login = Action(parse.json) { implicit request =>
    request.body.validate(loginForm).fold(
      errors => {
        BadRequest(JsError.toJson(errors))
      },
      form => {
        def user = repo.getUserByNameAndPass(form._1, form._2)
        if (user equals None) {
          Ok.addingToJwtSession("user", user)
        } else {
          Unauthorized
        }
      }
    )
  }


}

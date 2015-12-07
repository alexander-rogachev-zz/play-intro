package controllers

import javax.inject.Inject

import play.api.cache._
import play.api.mvc._

import scala.concurrent.duration._

class Application @Inject()(val cache: CacheApi) extends Controller/* with Secured*/ {

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
}

package controllers

import javax.inject._

import dal.EventRepository
import models.Event
import org.joda.time.DateTime
import play.api.cache.CacheApi
import play.api.i18n.{I18nSupport, MessagesApi}
import play.api.libs.json.Json
import play.api.mvc.{Action, Controller}
import play.api.data.Form
import play.api.data.Forms._
import play.api.data.validation.Constraints._

import scala.concurrent.ExecutionContext

class EventController@Inject() (repo: EventRepository, val cache: CacheApi, val messagesApi: MessagesApi)
                               (implicit ec: ExecutionContext) extends Controller with I18nSupport {
  val eventForm = Form(
    mapping(
      "id" -> optional(longNumber),
      "comment" -> optional(text),
      "eventType" -> number,
      "startDate" -> jodaDate,
      "endDate" -> jodaDate,
      "calendar" -> boolean,
      "startDate" -> jodaDate,
      "duplicateToGoogleCalendar" -> boolean,
      "isImportant" -> boolean,
      "durationType" -> text
    )(Event.apply)(Event.unapply))

  def index = Action {
    Ok(views.html.index())
  }

  def getEvents = Action.async {
    repo.list().map { event =>
      Ok(Json.toJson(event))
    }
  }

  def addEvent(comment: Option[String], eventType: Int, startDate: String, endDate: String, calendar: Boolean,
               duplicateToGoogleCalendar: Boolean, isImportant: Boolean,
               durationType: String) = /*Action.async {*/
    Action{implicit request =>
      val newEvent = eventForm.bindFromRequest.get
      repo.createEvent(newEvent)
      /*Redirect(routes.Application.index)
    } Action{implicit request =>
      val user = userForm.bindFromRequest.get
      Users.create(user)
      Redirect(routes.Application.index)
    }
    repo.create(comment, eventType, DateTime.now(), DateTime.now(), calendar, DateTime.now(), duplicateToGoogleCalendar,
      isImportant, durationType).map { _ =>*/
      Redirect("#/")
    }
 /* }*/
}

case class CreateEventForm(comment: Option[String], eventType: Int, startDate: DateTime, endDate: DateTime, calendar: Boolean,
                           duplicateToGoogleCalendar: Boolean, isImportant: Boolean, durationType: String)

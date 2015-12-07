package dal

import javax.inject.{ Inject, Singleton }
import org.joda.time.DateTime
import play.api.db.slick.DatabaseConfigProvider
import slick.driver.JdbcProfile
import com.github.tototoshi.slick.PostgresJodaSupport._

import models.Event

import scala.concurrent.{Future, ExecutionContext}

@Singleton
class EventRepository @Inject() (dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) {

  private val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import driver.api._

  private class EventTable(tag: Tag) extends Table[Event](tag, "event") {
    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)
    def comment = column[Option[String]]("comment")
    def eventType = column[Int]("eventType")
    def startDate = column[DateTime]("startDate")
    def endDate = column[DateTime]("endDate")
    def calendar = column[Boolean]("calendar")
    def createDate = column[DateTime]("createDate")
    def duplicateToGoogleCalendar = column[Boolean]("duplicatetogooglecalendar")
    def isImportant = column[Boolean]("important")
    def durationType = column[String]("durationType")

    def * = (id.?, comment, eventType, startDate, endDate, calendar, createDate,
      duplicateToGoogleCalendar, isImportant, durationType) <> ((Event.apply _).tupled, Event.unapply)
  }

  private val events = TableQuery[EventTable]

 /* def create(comment: Option[String], eventType: Int, startDate: DateTime, endDate: DateTime, calendar: Boolean,
             createDate: DateTime, duplicateToGoogleCalendar: Boolean, isImportant: Boolean,
             durationType: String) = db.run {
    (events.map(e => (e.comment, e.eventType, e.startDate, e.endDate, e.calendar, e.createDate, e.duplicateToGoogleCalendar, e.isImportant, e.durationType))
      returning events.map(_.id)
      into ((personInfo, id) => Event(id, personInfo._1, personInfo._2, personInfo._3, personInfo._4, personInfo._5, personInfo._6, personInfo._7, personInfo._8, personInfo._9))
      ) += (comment, eventType, startDate, endDate, calendar, createDate, duplicateToGoogleCalendar, isImportant, durationType)
  }*/

  def createEvent(newEvent: Event) {
    db.run {
      events += newEvent
    }
  }

  def list(): Future[Seq[Event]] = db.run {
    events.take(100).result
  }

}

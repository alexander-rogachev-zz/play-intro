package dal

import javax.inject.{ Inject, Singleton }
import play.api.db.slick.DatabaseConfigProvider
import slick.driver.JdbcProfile

import models.Contact

import scala.concurrent.{Future, ExecutionContext}

@Singleton
class ContactRepository @Inject() (dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) {
  // We want the JdbcProfile for this provider
  private val dbConfig = dbConfigProvider.get[JdbcProfile]

  // These imports are important, the first one brings db into scope, which will let you do the actual db operations.
  // The second one brings the Slick DSL into scope, which lets you define the table and other queries.
  import dbConfig._
  import driver.api._

  private class ContactTable(tag: Tag) extends Table[Contact](tag, "contact1") {

    def id = column[Long]("id", O.PrimaryKey)
    def name = column[String]("name")
    def phoneNumber = column[Option[String]]("phoneNumber")
    def mail = column[Option[String]]("mail")
    def mailSecondary = column[Option[String]]("mail_secondary")
    def title = column[Option[String]]("title")
    def skype = column[Option[String]]("skype")
    def newsletters = column[Int]("newsletters")
    def * = (id, name, phoneNumber, mail, mailSecondary, title, skype, newsletters) <> ((Contact.apply _).tupled, Contact.unapply)
  }

  private val contacts = TableQuery[ContactTable]

  def list(): Future[Seq[Contact]] = db.run {
    contacts.result
  }

  def list(name: String, phoneNumber: Option[String], mail: Option[String], mailSecondary: Option[String],
           title: Option[String], skype: Option[String], newsletters: Int): Future[Seq[Contact]] = db.run {
    contacts
      .filter(c => c.name === name && c.phoneNumber === phoneNumber && c.mail === mail && c.mailSecondary === mailSecondary
        && c.title === title && c.skype === skype && c.newsletters === newsletters)
      .result
  }

  def createContact(name: String, phoneNumber: Option[String], mail: Option[String], mailSecondary: Option[String],
                    title: Option[String], skype: Option[String], newsletters: Int) {
    db.run {
      (contacts.map(p => (p.name, p.phoneNumber, p.mail, p.mailSecondary, p.title, p.skype, p.newsletters))
        returning contacts.map(_.id)
        into ((contactInfo, id) => Contact(id, contactInfo._1, contactInfo._2, contactInfo._3, contactInfo._4,
        contactInfo._5, contactInfo._6, contactInfo._7))
        ) += (name, phoneNumber, mail, mailSecondary, title, skype, newsletters)
    }
 /*   db.run {
      contacts += new Contact(Some(Long), name, phoneNumber, mail, mailSecondary, title, skype, newsletters)
    }*/
  }

}

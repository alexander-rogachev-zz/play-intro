package dal

import javax.inject.{ Inject, Singleton }
import play.api.db.slick.DatabaseConfigProvider
import slick.driver.JdbcProfile

import models.{AccountCompanyField, Account}

import scala.concurrent.{ Future, ExecutionContext }

@Singleton
class AccountRepository @Inject() (dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) {

  private val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import driver.api._

  private class AccountTable(tag: Tag) extends Table[Account](tag, "account") {
    def id = column[Long]("id", O.PrimaryKey)
    def name = column[String]("name")
    def defaultMailText = column[Option[String]]("default_mail_text")
    def defaultMailSubject = column[String]("default_mail_subject")

    def * = (id, name, defaultMailText, defaultMailSubject) <> ((Account.apply _).tupled, Account.unapply)
  }

  private val accounts = TableQuery[AccountTable]

  private class AccountCompanyFieldTable(tag: Tag) extends Table[AccountCompanyField](tag, "account_comp_fields") {
    def id = column[Long]("id", O.PrimaryKey)
    def name = column[String]("name")
    def size = column[Int]("size")
    def showInListing = column[Int]("showInListing")
    def infoFieldType_id = column[Int]("infoFieldType_id")
    def version = column[Int]("version")
    def sequence = column[Int]("sequence")
    def enableSearch = column[Int]("enableSearch")
    def accountId = column[Long]("account_id")
    def * = (id, name, size, showInListing, infoFieldType_id, version, sequence, enableSearch, accountId) <> ((AccountCompanyField.apply _).tupled, AccountCompanyField.unapply)

    def account = foreignKey("account_comp_fields_account_id_fkey", accountId, accounts)(_.id)
  }

  private lazy val accountCompanyFields = TableQuery[AccountCompanyFieldTable]

  def list(): Future[Seq[Account]] = db.run {
    accounts.result
  }

  def removeAccount(id: Long) = {
    val q = accounts.filter(_.id === id)
    db.run(q.delete)
  }

  def updateAccount(id: Long, name: String, defaultMailText: Option[String], defaultMailSubject: String) = {
    val q = for { a <- accounts if a.id === id } yield (a.name, a.defaultMailText, a.defaultMailSubject)
    val updateAction = q.update(name, defaultMailText, defaultMailSubject)
    db.run(updateAction)
  }

  /*def accountsFields(id: Long) = {
    val q =
      for {
        f <- accountCompanyFields
        a <- accounts if f.accountId === id
      } yield f
    db.run(q.result)
  }*/

  /*def accountsFields(id: Long) = {
    db.run(accountCompanyFields.filter(_.accountId === id).result)
  }*/

  /*val userNameByID = for {
    id <- Parameters[Int]
    a <- accounts if a.id === id
  } yield a.first

  val nameAction = userNameByID(2).result.head*/

  def list(name: String, defaultMailText: Option[String], defaultMailSubject: String): Future[Seq[Account]] = db.run {
    accounts
      .filter(c => c.name === name && c.defaultMailText === defaultMailText && c.defaultMailSubject === defaultMailSubject)
      .result
  }

  def createContact(name: String, defaultMailText: Option[String], defaultMailSubject: String) {
    db.run {
      (accounts.map(p => (p.name, p.defaultMailText, p.defaultMailSubject))
        returning accounts.map(_.id)
        into ((contactInfo, id) => Account(id, contactInfo._1, contactInfo._2, contactInfo._3))
        ) +=(name, defaultMailText, defaultMailSubject)
    }
  }
}

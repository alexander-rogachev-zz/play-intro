package dal

import javax.inject.{Singleton, Inject}

import models.User
import play.api.db.slick.DatabaseConfigProvider
import slick.driver.JdbcProfile

import scala.concurrent.{Future, ExecutionContext}

@Singleton
class UserRepository @Inject() (dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) {

  private val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import driver.api._

  private class UserTable(tag: Tag) extends Table[User](tag, "user") {
    def id = column[Long]("id", O.PrimaryKey)
    def name = column[String]("name")
    def userName = column[String]("user_name")
    def password = column[String]("password")
    def email = column[Option[String]]("email")

    def * = (id, name, userName, password, email) <> ((User.apply _).tupled, User.unapply)
  }

  private val users = TableQuery[UserTable]

  def list(): Future[Seq[User]] = db.run {
    users.result
  }

  def getUserByNameAndPass(userName: String, pass: String) = {
    users.filter(u => u.userName === userName && u.password === pass).result
  }
}

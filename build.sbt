name := """play-scala-intro"""

version := "1.0-SNAPSHOT"

scalaVersion := "2.11.7"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

resolvers += "Scalaz Bintray Repo" at "https://dl.bintray.com/scalaz/releases"

libraryDependencies ++= Seq(
  filters,ws,
  cache,
  "com.typesafe.play" %% "play-slick" % "1.0.0",
  "com.typesafe.play" %% "play-slick-evolutions" % "1.0.0",
  "org.postgresql" % "postgresql" % "9.4-1202-jdbc4",
  "org.webjars" % "jquery" % "2.1.4",
  "org.webjars" % "requirejs" % "2.1.20",
  "org.webjars" % "underscorejs" % "1.8.3",
  "org.webjars" % "angularjs" % "1.4.7" exclude("org.webjars", "jquery"),
  "org.webjars" % "ng-table" % "0.3.3",
  "org.webjars" % "angular-ui-bootstrap" % "0.14.0" exclude("org.webjars", "jquery"),
  "org.scala-lang.modules" %% "scala-async" % "0.9.5",
  "org.webjars" % "bootstrap" % "3.3.5" exclude("org.webjars", "jquery"),
  "com.github.tototoshi" %% "slick-joda-mapper" % "2.1.0",
  "joda-time" % "joda-time" % "2.7",
  "org.joda" % "joda-convert" % "1.7",
  "org.webjars" % "angular-growl-2" % "0.7.3-1",
  "org.webjars.bower" % "angular-animate" % "1.5.0-beta.2",
  "com.pauldijou" %% "jwt-play" % "0.4.1"
)

pipelineStages := Seq(rjs, digest, gzip)

routesGenerator := InjectedRoutesGenerator

RjsKeys.paths += ("jsRoutes" -> ("/jsroutes" -> "empty:"))
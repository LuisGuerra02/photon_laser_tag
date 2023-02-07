@echo off
javac -cp .;"dependencies/postgresql-42.5.2.jar" SQLConnection.java DBOperations.java
java -cp .;"dependencies/postgresql-42.5.2.jar" SQLConnection
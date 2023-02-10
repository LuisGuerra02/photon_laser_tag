import java.sql.Connection;
import java.sql.DriverManager;

public class SQLConnection {
   public static void main(String args[]) 
   {
      Connection c = null;
      try 
      {
         Class.forName("org.postgresql.Driver");
         c = DriverManager.getConnection
         (
            "jdbc:postgresql://ec2-3-224-125-117.compute-1.amazonaws.com:5432/dh75dqtbnprdc",
            "czuiekbasptrrq",
            "699ebd62a6cb6fb16cd07cea3c8e004d56bf12e2770ad4c34f44fef6a57a22b1"
         );

         DBOperations operation = new DBOperations();

         operation.POST(c, 2, "testName", "testLastName", "testCode");
         operation.GET(c);
      } 
      catch (Exception e) 
      {
         e.printStackTrace();
         System.out.println("An error has ocurred.");
         
         System.exit(0);
      }
   }
}
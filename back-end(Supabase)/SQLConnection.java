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
            "jdbc:postgresql://db.rishgirqcyjgiezsmdmk.supabase.co:5432/postgres",
            "postgres",
            "Strother23Spring!"
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
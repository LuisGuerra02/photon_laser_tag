import java.sql.Statement;
import java.sql.Connection;
import java.sql.ResultSet;

public class DBOperations 
{
   // View all Data inside of Table
   public void GET(Connection c)
   {
      try 
      {
         Statement statement = c.createStatement();
         ResultSet rs = statement.executeQuery("SELECT * FROM player;");

         while (rs.next()) 
         {
            int id = rs.getInt("id");
            String  first_name = rs.getString("first_name");
            String last_name  = rs.getString("last_name");
            String  codename = rs.getString("codename");

            System.out.println( "Player ID: " + id );
            System.out.println( "First Name: " + first_name );
            System.out.println( "Last Name: " + last_name );
            System.out.println( "Codename: " + codename );
            System.out.println();
         }
         
         // Close connection after using
         rs.close();
         statement.close();
         c.close();
      } 
      catch (Exception e) 
      {
         e.printStackTrace();
      }
   }
}

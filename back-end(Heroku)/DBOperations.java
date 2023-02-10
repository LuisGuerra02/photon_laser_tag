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
            String first_name = rs.getString("first_name");
            String last_name  = rs.getString("last_name");
            String codename = rs.getString("codename");

            System.out.format("%s, %s, %s, %s\n", id, first_name, last_name, codename);
         }
         
         System.out.println();

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

   public void POST(Connection c, int id, String firstname, String lastname, String codename)
   {
      try 
      {
         Statement statement = c.createStatement(); 

         ResultSet rs = statement.executeQuery("SELECT COUNT(id) FROM player WHERE id = " + id + ";");
         rs.next();

         if (rs.getInt(1) == 0)
         {
            statement.executeUpdate("INSERT INTO player (id, first_name, last_name, codename) VALUES (" + id + ", '" + firstname + "', '" + lastname + "', '" + codename + "');");
            statement.close();
         }
         else
         {
            System.out.println("Player ID already exists!");
         }         
      }
      catch (Exception e)
      {
         e.printStackTrace();
      }
      
   }
}

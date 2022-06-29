﻿using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS_Service
{
    public class LMSService
    {
        public Object TestMethod()
        {

            String connectionString = @"Data Source=LAPTOP-N8VFBQPV\MSSQLSERVER01;Initial Catalog=B9IS101_LMS; User ID=sqladmin;Password=sqladmin";
            Object obj=null;
            // Assumes connectionString is a valid connection string.  
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                // Do work here. 

                SqlCommand command = new SqlCommand("SELECT * FROM Test;", connection);

                SqlDataReader reader = command.ExecuteReader();

                //DbDataReader objDataReader = connection.ExecuteReader(sql, CommandType.StoredProcedure)

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        //Console.WriteLine("{0}\t{1}", reader.GetInt32(0),
                        //    reader.GetString(1));

                        int id = Convert.ToInt32(reader["id"]);
                        string TextValue = Convert.ToString(reader["TextValue"]);
                        decimal FloatValue = Convert.ToDecimal(reader["FloatValue"]);
                        DateTime DateValue = Convert.ToDateTime(reader["DateValue"]);

                        obj = new { id = id, TextValue = TextValue, FloatValue = FloatValue, DateValue = DateValue };

                        

                    }
                }
                else
                {
                    Console.WriteLine("No rows found.");

                    
                }
                reader.Close();

            }
            return obj;
        }

    }
}
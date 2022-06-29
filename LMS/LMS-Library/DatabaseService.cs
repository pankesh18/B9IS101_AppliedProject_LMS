using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS_Library
{
    public class DatabaseService : IDisposable
    {
        private string Db_ConnectionString;
        private SqlConnection Obj_SQLConneciton;
        private SqlCommand Obj_SQLCommand;

        public DatabaseService(string ConnectionString)
        {
            Db_ConnectionString= ConnectionString;

            Obj_SQLConneciton = new SqlConnection(Db_ConnectionString);
            Obj_SQLCommand = new SqlCommand();

            Obj_SQLCommand.Connection= Obj_SQLConneciton;


        }

        public void Dispose()
        {
            try
            {
                Obj_SQLCommand.Parameters.Clear();
                Obj_SQLConneciton.Close();
                Obj_SQLCommand.Dispose();
                Obj_SQLConneciton.Dispose();
            }   
            catch(Exception ex)
            {
                throw new LMSException("Database Service", ex);
            }
        }
    }
}

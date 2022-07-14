using System;
using System.Collections.Generic;
using System.Data;
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

            Obj_SQLConneciton.Open();
        }



        public int AddParameter(string Name, object Val)
        {
            DbParameter objParam = Obj_SQLCommand.CreateParameter();
            objParam.ParameterName = Name;
            objParam.Value = Val;
            objParam.Direction = ParameterDirection.Input;
            return Obj_SQLCommand.Parameters.Add(objParam);
        }



        public void ClearParameter()
        {
                if (Obj_SQLCommand.Parameters.Count > 0)
                {
                    Obj_SQLCommand.Parameters.Clear();
                }
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

        public SqlConnection GetConnection()
        {
            return this.Obj_SQLConneciton;
        }

        public SqlCommand GetSQLCommand()
        {
            return this.Obj_SQLCommand;
        }
    }
}

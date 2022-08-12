using LMS_Library;
using LMS_Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS_Repository
{
    public static class NoteRepository
    {

        public static void AddBatchNote(DatabaseService objdatabaseService, BatchNote objBatchNote)
        {
         
            try
            {


                objdatabaseService.ClearParameter();

                objdatabaseService.AddParameter("BatchId", objBatchNote.BatchId);
                objdatabaseService.AddParameter("NoteTile", objBatchNote.NoteTile);
                objdatabaseService.AddParameter("ReferenceType", objBatchNote.ReferenceType);
                objdatabaseService.AddParameter("BatchFileId", objBatchNote.BatchFileId);
                objdatabaseService.AddParameter("BatchMeetingId", objBatchNote.BatchMeetingId);
                objdatabaseService.AddParameter("NoteBody", objBatchNote.NoteBody);
                objdatabaseService.AddParameter("CreatedBy", objBatchNote.CreatedBy);




                SqlCommand command = objdatabaseService.GetSQLCommand();

                command.CommandText = @"LMS_AddBatchNote";
                command.CommandType = CommandType.StoredProcedure;


                command.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw new DataLayerException(ex, "Data Layer Exception : " + ex.Message);
            }
           
        }



        public static List<BatchNote> GetBatchNotes(DatabaseService objdatabaseService, int BatchId,int UserId, int FileId, int MeetingId)
        {
            try
            {
                List<BatchNote> objBatchNotes = null;
                BatchNote obj = null;
                objdatabaseService.ClearParameter();
                objdatabaseService.AddParameter("BatchId", BatchId);
                objdatabaseService.AddParameter("UserId", UserId);
                objdatabaseService.AddParameter("FileId", FileId);
                objdatabaseService.AddParameter("MeetingId", MeetingId);

                SqlCommand command = objdatabaseService.GetSQLCommand();

                command.CommandText = @"LMS_GetBatchNotes";
                command.CommandType = CommandType.StoredProcedure;
                using (DbDataReader reader = command.ExecuteReader(CommandBehavior.CloseConnection))
                {
                    if (reader.HasRows)
                    {
                        objBatchNotes = new List<BatchNote>();

                        while (reader.Read())
                        {
                            obj = new BatchNote();
                            obj.BatchNoteId = Convert.ToInt32(reader["BatchNoteId"]);
                            obj.BatchId = Convert.ToInt32(reader["BatchId"]);
                            obj.NoteTile = reader["NoteTile"].ToString();
                            obj.ReferenceType = Convert.ToInt32(reader["ReferenceType"]);
                            obj.BatchFileId = Convert.ToInt32(reader["BatchFileId"]);
                            obj.FileName = reader["FileName"].ToString();
                            obj.BatchMeetingId = Convert.ToInt32(reader["BatchMeetingId"]);
                            obj.Topic = reader["Topic"].ToString();
                   
                            if  (!reader.IsDBNull(reader.GetOrdinal("StartTime")))
                            {
                                obj.StartTime =  Convert.ToDateTime(reader["StartTime"]);
                            }
                            
                            obj.NoteBody = reader["NoteBody"].ToString();
                            obj.CreatedBy = Convert.ToInt32(reader["CreatedBy"]);
                            obj.OwnerName = reader["OwnerName"].ToString();
                            obj.OwnerEmail = reader["OwnerEmail"].ToString();


                            objBatchNotes.Add(obj);
                        }
                    }
                }

                return objBatchNotes;

            }
            catch (Exception ex)
            {
                throw new DataLayerException(ex, "Data Layer Exception : " + ex.Message);
            }

        }

        public static void UpdateBatchNote(DatabaseService objdatabaseService, BatchNote objBatchNote)
        {

            try
            {


                objdatabaseService.ClearParameter();

                objdatabaseService.AddParameter("BatchNoteId", objBatchNote.BatchNoteId);
                objdatabaseService.AddParameter("NoteTile", objBatchNote.NoteTile);
                objdatabaseService.AddParameter("ReferenceType", objBatchNote.ReferenceType);
                objdatabaseService.AddParameter("BatchFileId", objBatchNote.BatchFileId);
                objdatabaseService.AddParameter("BatchMeetingId", objBatchNote.BatchMeetingId);
                objdatabaseService.AddParameter("NoteBody", objBatchNote.NoteBody);


                SqlCommand command = objdatabaseService.GetSQLCommand();

                command.CommandText = @"LMS_UpdateBatchNote";
                command.CommandType = CommandType.StoredProcedure;


                command.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw new DataLayerException(ex, "Data Layer Exception : " + ex.Message);
            }

        }



        public static List<LMSUser> GetAllStudentsInBatch(DatabaseService objdatabaseService, int BatchId)
        {
            try
            {
                List<LMSUser> objStudents = null;
                LMSUser objLMSUser = null;
                objdatabaseService.ClearParameter();
                objdatabaseService.AddParameter("BatchId", BatchId);

                SqlCommand command = objdatabaseService.GetSQLCommand();

                command.CommandText = @"LMS_GetAllStudentsInBatch";
                command.CommandType = CommandType.StoredProcedure;
                using (DbDataReader reader = command.ExecuteReader(CommandBehavior.CloseConnection))
                {
                    if (reader.HasRows)
                    {
                        objStudents = new List<LMSUser>();

                        while (reader.Read())
                        {
                            objLMSUser = new LMSUser();
                            objLMSUser.UserId = Convert.ToInt32(reader["UserId"]);
                            objLMSUser.FirstName = reader["FirstName"].ToString();
                            objLMSUser.LastName = reader["LastName"].ToString();
                            objLMSUser.Email = reader["Useremail"].ToString();
                            objLMSUser.Gender = Convert.ToInt32(reader["Gender"]);
                            objLMSUser.UserType = Convert.ToInt32(reader["UserType"]);
                            objLMSUser.ProfilePic = Convert.ToString(reader["ProfilePic"]);
                            objStudents.Add(objLMSUser);
                        }
                    }
                }

                return objStudents;

            }
            catch (Exception ex)
            {
                throw new DataLayerException(ex, "Data Layer Exception : " + ex.Message);
            }

        }



        public static void ShareBatchNote(DatabaseService objdatabaseService, List<LMSUser> users, int BatchId, int BatchNoteId)
        {

            try
            {
                List<IdList> studentIdlist = new List<IdList>();
                foreach (var student in users)
                {
                    IdList idList = new IdList();
                    idList.Id = student.UserId;
                    studentIdlist.Add(idList);
                }

                objdatabaseService.ClearParameter();

                objdatabaseService.AddParameter("BatchId", BatchId);
                objdatabaseService.AddParameter("BatchNoteId", BatchNoteId);
                objdatabaseService.AddParameter("UserId", studentIdlist.AsDataTable<IdList>());


                SqlCommand command = objdatabaseService.GetSQLCommand();

                command.CommandText = @"LMS_ShareBatchNote";
                command.CommandType = CommandType.StoredProcedure;


                command.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw new DataLayerException(ex, "Data Layer Exception : " + ex.Message);
            }

        }

    }
}

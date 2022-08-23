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
    public static class CommonSpaceRepository
    {

        public static CommonSpaceGroup CreateCommonSpace(DatabaseService objdatabaseService, CommonSpaceGroup objCommonSpaceGroup)
        {
            int BatchId = 0;
            try
            {

                List<IdList> studentIdlist = new List<IdList>();
                foreach (var student in objCommonSpaceGroup.CommonSpaceGroupStudent)
                {
                    IdList idList = new IdList();
                    idList.Id = student.UserId;
                    studentIdlist.Add(idList);
                }

                objdatabaseService.ClearParameter();

                objdatabaseService.AddParameter("BatchId", objCommonSpaceGroup.BatchId);
                objdatabaseService.AddParameter("GroupName", objCommonSpaceGroup.GroupName);
                objdatabaseService.AddParameter("StudentList", studentIdlist.AsDataTable<IdList>());



                SqlCommand command = objdatabaseService.GetSQLCommand();

                command.CommandText = @"LMS_AddCommonSpaceGroup";
                command.CommandType = CommandType.StoredProcedure;


                objCommonSpaceGroup.CommonSpaceGroupId = Convert.ToInt32(command.ExecuteScalar());
            }
            catch (Exception ex)
            {
                throw new DataLayerException(ex, "Data Layer Exception : " + ex.Message);
            }
            return objCommonSpaceGroup;
        }


        public static CommonSpaceFile AddCommonSpaceFile(DatabaseService objdatabaseService, CommonSpaceFile objCommonSpaceFile)
        {
        
            try
            {

                objdatabaseService.ClearParameter();

                objdatabaseService.AddParameter("FileName", objCommonSpaceFile.FileName);
                objdatabaseService.AddParameter("ContentType", objCommonSpaceFile.ContentType);
                objdatabaseService.AddParameter("BatchId", objCommonSpaceFile.BatchId);
                objdatabaseService.AddParameter("CommonSpaceGroupId", objCommonSpaceFile.CommonSpaceGroupId);
                objdatabaseService.AddParameter("NoteId", objCommonSpaceFile.NoteId);
                objdatabaseService.AddParameter("FileURL", objCommonSpaceFile.FileURL);
                objdatabaseService.AddParameter("FileExtension", objCommonSpaceFile.FileExtension);
                objdatabaseService.AddParameter("ContainerName", objCommonSpaceFile.ContainerName);
                objdatabaseService.AddParameter("FolderName", objCommonSpaceFile.FolderName);
                objdatabaseService.AddParameter("FileSize", objCommonSpaceFile.FileSize);
                objdatabaseService.AddParameter("CreatedBy", objCommonSpaceFile.CreatedBy);



                SqlCommand command = objdatabaseService.GetSQLCommand();

                command.CommandText = @"LMS_AddCommonSpaceFile";
                command.CommandType = CommandType.StoredProcedure;


                objCommonSpaceFile.CommonSpaceFileId = Convert.ToInt32(command.ExecuteScalar());
            }
            catch (Exception ex)
            {
                throw new DataLayerException(ex, "Data Layer Exception : " + ex.Message);
            }
            return objCommonSpaceFile;
        }



        public static List<CommonSpaceGroup> GetCommonSpaceGroup(DatabaseService objdatabaseService, int BatchId)
        {
            try
            {
                List<CommonSpaceGroup> objCommonSpaceGroup = new List<CommonSpaceGroup>();
                CommonSpaceGroup commonSpaceGroup = null;
                objdatabaseService.ClearParameter();

                objdatabaseService.AddParameter("BatchId", BatchId);

                SqlCommand command = objdatabaseService.GetSQLCommand();

                command.CommandText = @"LMS_GetCommonSpaceGroup";
                command.CommandType = CommandType.StoredProcedure;
                using (DbDataReader reader = command.ExecuteReader(CommandBehavior.Default))
                {
                    if (reader.HasRows)
                    {

                        while (reader.Read())
                        {
                            commonSpaceGroup = new CommonSpaceGroup();
                            commonSpaceGroup.CommonSpaceGroupId = Convert.ToInt32(reader["CommonSpaceGroupId"]);
                            commonSpaceGroup.BatchId = Convert.ToInt32(reader["BatchId"]);
                            commonSpaceGroup.GroupName = reader["GroupName"].ToString();
                            objCommonSpaceGroup.Add(commonSpaceGroup);
                        }
                    }
                }

                return objCommonSpaceGroup;

            }
            catch (Exception ex)
            {
                throw new DataLayerException(ex, "Data Layer Exception : " + ex.Message);
            }

        }



        public static List<LMSUser> GetCommonSpaceGroupStudent(DatabaseService objdatabaseService, int BatchId, int CommonSpaceGroupId)
        {
            try
            {
                List<LMSUser> objStudents = null;
                LMSUser objLMSUser = null;
                objdatabaseService.ClearParameter();


                SqlCommand command = objdatabaseService.GetSQLCommand();
                objdatabaseService.AddParameter("BatchId", BatchId);
                objdatabaseService.AddParameter("CommonSpaceGroupId", CommonSpaceGroupId);


                command.CommandText = @"LMS_GetCommonSpaceGroupStudent";
                command.CommandType = CommandType.StoredProcedure;
                using (DbDataReader reader = command.ExecuteReader(CommandBehavior.Default))
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


        public static List<CommonSpaceFile> GetCommonSpaceGroupFile(DatabaseService objdatabaseService, int BatchId, int CommonSpaceGroupId)
        {
            try
            {
                List<CommonSpaceFile> ListCommonSpaceFile = new List<CommonSpaceFile>();
                CommonSpaceFile objCommonSpaceFile = null;
                objdatabaseService.ClearParameter();


                SqlCommand command = objdatabaseService.GetSQLCommand();
                objdatabaseService.AddParameter("BatchId", BatchId);
                objdatabaseService.AddParameter("CommonSpaceGroupId", CommonSpaceGroupId);

                command.CommandText = @"LMS_GetCommonSpaceGroupFile";
                command.CommandType = CommandType.StoredProcedure;
                using (DbDataReader reader = command.ExecuteReader(CommandBehavior.Default))
                {
                    if (reader.HasRows)
                    {

                        while (reader.Read())
                        {
                            objCommonSpaceFile = new CommonSpaceFile();
                            objCommonSpaceFile.CommonSpaceFileId = Convert.ToInt32(reader["CommonSpaceFileId"]);
                            objCommonSpaceFile.FileName = Convert.ToString(reader["FileName"]);
                            objCommonSpaceFile.ContentType = Convert.ToInt32(reader["ContentType"]);
                            objCommonSpaceFile.BatchId = Convert.ToInt32(reader["BatchId"]);
                            objCommonSpaceFile.CommonSpaceGroupId = Convert.ToInt32(reader["CommonSpaceGroupId"]);
                            objCommonSpaceFile.NoteId = Convert.ToInt32(reader["NoteId"]==null? 0: reader["NoteId"]);


                            if (!reader.IsDBNull(reader.GetOrdinal("NoteBody")))
                            {
                                objCommonSpaceFile.NoteBody = Convert.ToString(reader["NoteBody"]);
                            }
                            if (!reader.IsDBNull(reader.GetOrdinal("BatchFileId")))
                            {
                                objCommonSpaceFile.BatchFileId = Convert.ToInt32(reader["BatchFileId"]);
                            }

                            objCommonSpaceFile.FileURL = Convert.ToString(reader["FileURL"]);
                            objCommonSpaceFile.FileExtension = Convert.ToString(reader["FileExtension"]);
                            objCommonSpaceFile.ContainerName = Convert.ToString(reader["ContainerName"]);
                            objCommonSpaceFile.FolderName = Convert.ToString(reader["FolderName"]);
                            objCommonSpaceFile.FileSize = Convert.ToString(reader["FileSize"]);
                            objCommonSpaceFile.CreatedBy = Convert.ToInt32(reader["CreatedBy"]);
                            objCommonSpaceFile.CreatedDate = Convert.ToDateTime(reader["CreatedDate"]);
                            ListCommonSpaceFile.Add(objCommonSpaceFile);
                        }
                    }
                }

                return ListCommonSpaceFile;

            }
            catch (Exception ex)
            {
                throw new DataLayerException(ex, "Data Layer Exception : " + ex.Message);
            }

        }

        public static void DeleteCommonSpaceFile(DatabaseService objdatabaseService, CommonSpaceFile objCommonSpaceFile)
        {

            try
            {

                objdatabaseService.ClearParameter();

                objdatabaseService.AddParameter("CommonSpaceFileId", objCommonSpaceFile.CommonSpaceFileId);



                SqlCommand command = objdatabaseService.GetSQLCommand();

                command.CommandText = @"LMS_DeleteCommonSpaceFile";
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

using LMS_Library;
using LMS_Models;
using LMS_Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS_Service
{
    public class NoteService
    {
        public void AddBatchNote(BatchNote objBatchNote)
        {
            
            try
            {
                string connectionString = @"Data Source=LAPTOP-N8VFBQPV\MSSQLSERVER01;Initial Catalog=B9IS101_LMS; User ID=sqladmin;Password=sqladmin";


                using (DatabaseService objdatabaseService = new DatabaseService(connectionString))
                {

                     NoteRepository.AddBatchNote(objdatabaseService, objBatchNote);
                }
            }
            catch (Exception ex)
            {
                throw new ServiceLayerException(ex, "Service Layer Exception : " + ex.Message);
            }
           
        }



        public List<BatchNote> GetBatchNotes(int BatchId, int UserId, int FileId, int MeetingId)
        {
            try
            {
                List<BatchNote> objBatchNotes = null;
                string connectionString = @"Data Source=LAPTOP-N8VFBQPV\MSSQLSERVER01;Initial Catalog=B9IS101_LMS; User ID=sqladmin;Password=sqladmin";


                using (DatabaseService objdatabaseService = new DatabaseService(connectionString))
                {

                    objBatchNotes = NoteRepository.GetBatchNotes(objdatabaseService, BatchId, UserId, FileId, MeetingId);
                }
                return objBatchNotes;
            }
            catch (Exception ex)
            {
                throw new ServiceLayerException(ex, "Service Layer Exception : " + ex.Message); 
            }
        }

        public void UpdateBatchNote(BatchNote objBatchNote)
        {

            try
            {
                string connectionString = @"Data Source=LAPTOP-N8VFBQPV\MSSQLSERVER01;Initial Catalog=B9IS101_LMS; User ID=sqladmin;Password=sqladmin";


                using (DatabaseService objdatabaseService = new DatabaseService(connectionString))
                {

                    NoteRepository.UpdateBatchNote(objdatabaseService, objBatchNote);
                }
            }
            catch (Exception ex)
            {
                throw new ServiceLayerException(ex, "Service Layer Exception : " + ex.Message);
            }

        }



        public List<LMSUser> GetAllStudentsInBatch(int BatchId)
        {
            List<LMSUser> UserList;
            try
            {
                string connectionString = @"Data Source=LAPTOP-N8VFBQPV\MSSQLSERVER01;Initial Catalog=B9IS101_LMS; User ID=sqladmin;Password=sqladmin";


                using (DatabaseService objdatabaseService = new DatabaseService(connectionString))
                {

                    UserList=NoteRepository.GetAllStudentsInBatch(objdatabaseService, BatchId);
                }

                return UserList;    
            }
            catch (Exception ex)
            {
                throw new ServiceLayerException(ex, "Service Layer Exception : " + ex.Message);
            }

        }


        public void ShareBatchNote(List<LMSUser> users, int BatchId, int BatchNoteId)
        {
   
            try
            {
                string connectionString = @"Data Source=LAPTOP-N8VFBQPV\MSSQLSERVER01;Initial Catalog=B9IS101_LMS; User ID=sqladmin;Password=sqladmin";


                using (DatabaseService objdatabaseService = new DatabaseService(connectionString))
                {

                    NoteRepository.ShareBatchNote(objdatabaseService, users, BatchId, BatchNoteId);
                }

            }
            catch (Exception ex)
            {
                throw new ServiceLayerException(ex, "Service Layer Exception : " + ex.Message);
            }

        }
    }
}

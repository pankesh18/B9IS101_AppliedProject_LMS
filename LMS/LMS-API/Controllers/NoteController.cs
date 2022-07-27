using LMS_Models;
using LMS_Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace LMS_API.Controllers
{
    public class NoteController : ApiController
    {



        [HttpPost]
        [ActionName("AddBatchNote")]
        public HttpResponseMessage AddBatchNote(BatchNote objBatchNote)
        {
            try
            {

                NoteService objNoteService = new NoteService();

                objNoteService.AddBatchNote(objBatchNote);

                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);

            }
        }


        [HttpGet]
        [ActionName("GetBatchNotes")]
        public HttpResponseMessage GetBatchNotes(int BatchId, int UserId, int FileId, int MeetingId)
        {
            try
            {
                NoteService objNoteService = new NoteService();

                List<BatchNote> objBatchNotes = objNoteService.GetBatchNotes(BatchId, UserId, FileId, MeetingId);

                return Request.CreateResponse(HttpStatusCode.OK, objBatchNotes);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);

            }
        }


        [HttpPost]
        [ActionName("UpdateBatchNote")]
        public HttpResponseMessage UpdateBatchNote(BatchNote objBatchNote)
        {
            try
            {

                NoteService objNoteService = new NoteService();

                objNoteService.UpdateBatchNote(objBatchNote);

                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);

            }
        }


        [HttpGet]
        [ActionName("GetAllStudentsInBatch")]
        public HttpResponseMessage GetAllStudentsInBatch(int BatchId)
        {
            List<LMSUser> UserList;
            try
            {
                NoteService objNoteService = new NoteService();
                UserList = objNoteService.GetAllStudentsInBatch(BatchId);

                return Request.CreateResponse(HttpStatusCode.OK, UserList);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);

            }
        }


        [HttpPost]
        [ActionName("ShareBatchNote")]
        public HttpResponseMessage ShareBatchNote(List<LMSUser> users, int BatchId, int BatchNoteId)
        {
            List<LMSUser> UserList;
            try
            {
                NoteService objNoteService = new NoteService();
                objNoteService.ShareBatchNote(users, BatchId, BatchNoteId);

                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);

            }
        }
    }
}
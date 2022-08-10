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
    public class ForumController : ApiController
    {

        [HttpPost]
        [ActionName("PostForumQuestion")]
        public HttpResponseMessage PostForumQuestion(ForumQuestion objForumQuestion)
        {
            try
            {

                ForumService objForumService = new ForumService();

                objForumService.PostForumQuestion(objForumQuestion);

                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);

            }
        }

        [HttpPost]
        [ActionName("DeleteForumQuestion")]
        public HttpResponseMessage DeleteForumQuestion(ForumQuestion objForumQuestion)
        {
            try
            {

                ForumService objForumService = new ForumService();

                objForumService.DeleteForumQuestion(objForumQuestion);

                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);

            }
        }



        [HttpPost]
        [ActionName("PostForumComment")]
        public HttpResponseMessage PostForumComment(ForumComment objForumComment)
        {
            try
            {

                ForumService objForumService = new ForumService();

                objForumService.PostForumComment(objForumComment);

                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);

            }
        }


        [HttpPost]
        [ActionName("DeleteForumComment")]
        public HttpResponseMessage DeleteForumComment(ForumComment objForumComment)
        {
            try
            {

                ForumService objForumService = new ForumService();

                objForumService.DeleteForumComment(objForumComment);

                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);

            }
        }


        [HttpGet]
        [ActionName("GetAllDiscussionForum")]
        public HttpResponseMessage GetAllDiscussionForum(int BatchId)
        {
            try
            {

                ForumService objForumService = new ForumService();

                List<ForumQuestion> forumQuestions = objForumService.GetAllDiscussionForum(BatchId);

                return Request.CreateResponse(HttpStatusCode.OK, forumQuestions);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);

            }
        }
    }
}
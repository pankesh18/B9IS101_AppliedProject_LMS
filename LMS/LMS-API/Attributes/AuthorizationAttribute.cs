using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Controllers;

namespace LMS_API.Attributes
{
    [AttributeUsage(AttributeTargets.Method)]
    public class AuthorizationAttribute : System.Web.Http.AuthorizeAttribute
    {
        public override void OnAuthorization(HttpActionContext objHttpActionContext)
        {
            base.OnAuthorization(objHttpActionContext);

            var headers= objHttpActionContext.Request.Headers.ToList();


        }
    }
}
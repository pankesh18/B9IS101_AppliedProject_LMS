using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS_Models
{
    public class LMSUser
    {
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string GoogleUserId { get; set; }
        public int Gender { get; set; }
        public int UserType { get; set; }
        public string ProfilePic { get; set; }


    }
}

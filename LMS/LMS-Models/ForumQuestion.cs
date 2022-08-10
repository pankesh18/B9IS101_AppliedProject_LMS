using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS_Models
{
    public class ForumQuestion
    {
        public int ForumQuestionId { get; set; }
        public int BatchId { get; set; }
        public string BatchName { get; set; }
        public string QuestionBody { get; set; }
        public LMSUser CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public List<ForumComment> forumComments { get; set; }   
    }
}

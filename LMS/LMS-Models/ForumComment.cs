using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS_Models
{
    public class ForumComment
    {
        public int ForumCommentId { get; set; }
        public int ForumQuestionId { get; set; }
        public int BatchId { get; set; }
        public string BatchName { get; set; }
        public string CommentBody { get; set; }
        public LMSUser CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}

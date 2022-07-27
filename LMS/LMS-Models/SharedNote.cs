using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS_Models
{
    public class SharedNote
    {
        public int SharedNoteId { get; set; }
        public int BatchId { get; set; }
        public int BatchNoteId { get; set; }
        public int UserId { get; set; }

    }
}

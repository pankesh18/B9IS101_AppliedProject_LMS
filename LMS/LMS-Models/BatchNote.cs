using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS_Models
{
    public class BatchNote
    {
        public int BatchNoteId { get; set; }
        public int BatchId { get; set; }
        public int ReferenceType { get; set; }
        public string NoteTile { get; set; }
        public int BatchFileId { get; set; }
        public string FileName { get; set; }
        public int BatchMeetingId { get; set; }
        public string Topic { get; set; }
        public DateTime StartTime { get; set; }
        public string NoteBody { get; set; }
        public int CreatedBy { get; set; }
        public string OwnerName { get; set; }
        public string OwnerEmail { get; set; }
        				
    	
        			
        			
        
    }
}

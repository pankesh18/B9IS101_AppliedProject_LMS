using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS_Models
{
    public class StudentMeeting
    {
        public int BatchMeetingId { get; set; }
        public int BatchId { get; set; }
        public string BatchName { get; set; }
        public string BatchYear { get; set; }
        public string CourseName { get; set; }
        public int UserId { get; set; }
        public string ZoomMeetingId { get; set; }
        public string StartUrl { get; set; }
        public string JoinUrl { get; set; }
        public string UUID { get; set; }
        public string HostId { get; set; }
        public string HostEmail { get; set; }
        public string Topic { get; set; }
        public string Status { get; set; }
        public DateTime StartTime { get; set; }
        public int Duration { get; set; }
        public string Timezone { get; set; }
        public string Password { get; set; }
        public int CreatedBy { get; set; }

    }
}


export class LMSUser {
  UserId: number;
  FirstName: string;
  LastName: string;
  Email: string;
  password: string
  Gender: number;
  UserType: number; 
}

export class StudentMeeting {
  BatchMeetingId: number
  BatchId: number
  BatchName: string
  BatchYear: string
  CourseName: string
  UserId: number
  ZoomMeetingId: string
  StartUrl: string
  JoinUrl: string
  UUID: string
  HostId: string
  HostEmail: string
  Topic: string
  Status: string
  StartTime: Date
  Duration: number
  Timezone: string
  Password: string
}

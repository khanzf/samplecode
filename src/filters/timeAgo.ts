import moment from 'moment';


export default function timeAgo(date: any) {
  return moment.utc(date).fromNow();
}

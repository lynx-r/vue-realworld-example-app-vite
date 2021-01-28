import { format } from 'date-fns'

const date = (date: string) => {
  console.log(date)
  return format(new Date(date), 'MMMM d, yyyy')
}

export default date

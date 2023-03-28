export const CalendarEvent = ({ event }) => {
  
  const { user, title } = event;
  const content = `Created by ${ user.name }`
  
  return (
    <>
        <strong>{ title }</strong>
        <br />
        {/* In casy that text is too large */}
        <small title={ content }>{ content }</small>
    </>
  )
}

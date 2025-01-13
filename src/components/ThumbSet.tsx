export const ThumbSet = (props: any) => {
  return (
    <div className={props.class}>

        <p>{props.data.title}</p>

        <div>
          <img src = {props.data}/>
        </div>

    </div>
  )
}

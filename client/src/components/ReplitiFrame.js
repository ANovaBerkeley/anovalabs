import { Input } from 'antd';

// props.editMode
// props.replitLink
//

// if props.editMode => return
// if replit =>
const ReplitiFrame = (props) => {
  const {editMode, replit, onChangeReplit} = props;
  let maybeReplit;
  if (editMode) {
    maybeReplit = (
      <div>
        <h2 className="textTitle"> Examples </h2>
        <div className="textBox">
          <Input
            id="replitAdd"
            allowClear
            addonBefore="Replit link:"
            autosize="true"
            defaultValue={ replit || "https://replit.com/@anova/..." }
            onChange={onChangeReplit}
          />
        </div>
      </div>
    );
  }
  else if (replit) {
    maybeReplit = (
      <div>
        <h2 className="textTitle"> Examples </h2>
        <iframe
          title="Replit example"
          className="textBox"
          width="100%"
          height="500px"
          src={replit.concat("?lite=true")}
        />
      </div>
    );
  }

  return <div> {maybeReplit} </div>;
}

export default ReplitiFrame;

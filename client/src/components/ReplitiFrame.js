import { Input } from 'antd';

const ReplitiFrame = (props) => {
  const {editMode, replit, onChangeReplit} = props;

  /**
      If we're in editMode, we'll return the input field that asks for a replit link.
      Otherwise, if we have a replit link, we'll return the iFrame with the Replit.
  */

  const renderReplit = () => {
    if (editMode) {
      return (
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
      return (
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
  }
  /** Return whatever renderReplit gives us */
  return <div> {renderReplit()} </div>;
}

export default ReplitiFrame;

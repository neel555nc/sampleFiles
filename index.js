import React from "react";
import { HELPER } from "./../../../../utils/helper";

class MyCustomTextFileRenderer extends React.Component {
  state = {
    txtValue: ""
  };
  componentDidMount() {
    const { mainState } = this.props;
    if (mainState && !mainState.currentDocument) {
      return null;
    }
    this.getTextFromFile(mainState.currentDocument.uri);
  }

  getTextFromFile = uri => {
    const request = new XMLHttpRequest();
    let txtValue = "";
    request.open("GET", uri, true);
    request.send(null);
    request.addEventListener("loadend", () => {
      if (
        request.readyState === 4 &&
        (request.status === 200 || request.status === 0)
      ) {
        const type = request.getResponseHeader("Content-Type");
        if (type.indexOf("text") !== 1) {
          txtValue = request.responseText;
        }
        this.setState({ txtValue: txtValue });
      }
    });
  };

  render() {
    const { txtValue } = this.state;
    return (
      <div id="qtm4j__txtRenderer">
        <div className="qtm4j__txtRendererArea">
          <div className="qtm4j__txtRendererContent">{txtValue}</div>
        </div>
      </div>
    );
  }
}

export default MyCustomTextFileRenderer;
